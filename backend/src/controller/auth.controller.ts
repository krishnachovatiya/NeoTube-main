import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import bcrypt from "bcryptjs"; 
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/tokenService";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import { AuthRequest } from "../utils/types";

const prisma = new PrismaClient();

interface MulterFileFields {
  profilePicture: Express.Multer.File[],
  coverPicture: Express.Multer.File[],
}

export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    })

    if (existingUser) {
      throw new ApiError(400, "Email or username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = generateAccessToken({ userId: newUser.id, username:newUser.username })
    const refreshToken = generateRefreshToken({ userId: newUser.id, username:newUser.username })
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure:true
    })
    
    return new ApiResponse(201, "User signed up successfully", { newUser, accessToken}).send(res); 
}

export const setupProfile = async (req: Request, res: Response) => {
  const { channelName, description } = req.body
  const userId = (req as AuthRequest).userId
  const files = req.files as MulterFileFields | undefined
  const profilePicturePath = files?.profilePicture?.[0]?.path 
  const coverPicturePath = files?.coverPicture?.[0]?.path
  
  const existingUser = await prisma.user.findUnique({
    where:{
      id: userId
    }
  })
  
  if(!existingUser){
    throw new ApiError(404, "User does not exist")
  }
  
  if (channelName && channelName !== existingUser.channelName) {
    const channelNameExists = await prisma.user.findUnique({
      where: { channelName },
    });
  
    if(channelNameExists){
      throw new ApiError(422, "Channel name already exists")
    }
  }
  
  const updateData: Record<string, any> = {}
  
  if (channelName) {
    updateData.channelName = channelName;
  }
  
  if (profilePicturePath) {
    const uploadedProfile = await uploadImageOnCloudinary(profilePicturePath, userId)
    updateData.profilePicture = uploadedProfile.secure_url
  }
  
  if (coverPicturePath) {
    const uploadedCover = await uploadImageOnCloudinary(coverPicturePath, userId)
    updateData.coverPicture = uploadedCover.secure_url
  }
  
  if (description) {
    updateData.description = description
  }
  
  if (Object.keys(updateData).length > 0) {
    await prisma.user.update({
      where: { 
        id: userId 
      },
      data: updateData,
    })
  }
  
  return new ApiResponse(200, "Profile updated successfully").send(res)
}


export const signIn = async (req: Request, res: Response) => {
  const { password } = req.body
  const username = req.body.usernameOrEmail
  const email = req.body.usernameOrEmail

  const user = await prisma.user.findFirstOrThrow({ 
    where: {
      OR: [ 
        { username }, 
        { email } 
      ]
    }
  })
  
  const isValidPassword = await bcrypt.compare(password, user.password)
  if(!isValidPassword) {
    throw new ApiError(401, "Invalid password")
  }

  const accessToken = generateAccessToken({ userId: user.id, username:user.username })
  const refreshToken = generateRefreshToken({ userId: user.id, username:user.username })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure:true
  })

  return new ApiResponse(200, "Signed In successfully", { accessToken }).send(res)
}

export const getuserById = async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).userId


  const user = await prisma.user.findUnique({
    where:{
      id:userId
    },
    select:{
      id: true,
      username: true,
      email: true,
      channelName: true,
      profilePicture: true,
      coverPicture: true,
      description: true,
      createdAt: true,
      comments: true,
      community: true,
      playList: true,
      videos: true
    }
  })

  if(!user) throw new ApiError(404, "User does not exist")

  return new ApiResponse(200, "User fetched successfully", user).send(res)
}

export const refresh = (req: Request, res: Response) => {

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required!")
  }

  const decoded = verifyToken(refreshToken);
  if (!decoded) {
    throw new ApiError(401, "Invalid Refresh token!")
  }

  const newAccessToken = generateAccessToken({ userId: (decoded as any).userId, username: decoded.username });
  res.json({ accessToken: newAccessToken });
};

