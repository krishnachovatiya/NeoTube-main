"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.getuserById = exports.signIn = exports.setupProfile = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenService_1 = require("../utils/tokenService");
const cloudinary_1 = require("../utils/cloudinary");
const prisma = new client_1.PrismaClient();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    // const profilePicture = files?.profilePicture?.[0]?.path || null
    // const coverPicture = files?.coverPicture?.[0]?.path || null
    const existingUser = yield prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username },
            ],
        },
    });
    if (existingUser) {
        throw new ApiError_1.default(400, "Email or username already exists.");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // let profilePictureUrl: string | null=null
    // let coverPictureUrl: string | null=null
    // if (profilePicture) {
    //       const uploadedProfile = await uploadImageOnCloudinary(profilePicture, username);
    //       profilePictureUrl = uploadedProfile.secure_url;
    //       console.log(profilePictureUrl)
    // }
    // if (coverPicture) {
    //   try {
    //       const uploadedCover = await uploadImageOnCloudinary(coverPicture, username);
    //       coverPictureUrl = uploadedCover.secure_url;
    //   } catch (error) {
    //       throw new ApiError(500, "Cover picture upload failed");
    //   }
    // }
    const newUser = yield prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            // profilePicture: profilePictureUrl,
            // coverPicture: coverPictureUrl,
            // description: description ?? null,
        },
    });
    const accessToken = (0, tokenService_1.generateAccessToken)({ userId: newUser.id, username: newUser.username });
    const refreshToken = (0, tokenService_1.generateRefreshToken)({ userId: newUser.id, username: newUser.username });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true
    });
    return new ApiResponse_1.default(201, "User signed up successfully", { newUser, accessToken }).send(res);
});
exports.signUp = signUp;
const setupProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { channelName, description } = req.body;
    const userId = req.userId;
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const files = req.files;
    const profilePicturePath = (_b = (_a = files === null || files === void 0 ? void 0 : files.profilePicture) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path;
    const coverPicturePath = (_d = (_c = files === null || files === void 0 ? void 0 : files.coverPicture) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.path;
    const existingUser = yield prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!existingUser) {
        throw new ApiError_1.default(404, "User does not exist");
    }
    const channelNameExists = yield prisma.user.findUnique({
        where: {
            channelName
        },
    });
    if (channelNameExists) {
        throw new ApiError_1.default(422, "Channel name already exists");
    }
    const updateData = {};
    updateData.channelName = channelName;
    if (profilePicturePath) {
        const uploadedProfile = yield (0, cloudinary_1.uploadImageOnCloudinary)(profilePicturePath, userId);
        updateData.profilePicture = uploadedProfile.secure_url;
    }
    if (coverPicturePath) {
        const uploadedCover = yield (0, cloudinary_1.uploadImageOnCloudinary)(coverPicturePath, userId);
        updateData.coverPicture = uploadedCover.secure_url;
    }
    if (description) {
        updateData.description = description;
    }
    if (Object.keys(updateData).length > 0) {
        yield prisma.user.update({
            where: {
                id: userId
            },
            data: updateData,
        });
    }
    return new ApiResponse_1.default(200, "Profile updated successfully").send(res);
});
exports.setupProfile = setupProfile;
// If existingUser is found, the ApiError will be thrown => .catch(next) from asyncHandler => Global error Handler(For customised error)
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const username = req.body.usernameOrEmail;
    const email = req.body.usernameOrEmail;
    // Can't use findUniqueOrThrow because it can not more than 1 unique field in OR: [ {},{} ]
    const user = yield prisma.user.findFirstOrThrow({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    });
    const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new ApiError_1.default(401, "Invalid password");
    }
    const accessToken = (0, tokenService_1.generateAccessToken)({ userId: user.id, username: user.username });
    const refreshToken = (0, tokenService_1.generateRefreshToken)({ userId: user.id, username: user.username });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true
    });
    return new ApiResponse_1.default(200, "Signed In successfully", { accessToken }).send(res);
});
exports.signIn = signIn;
const getuserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // check if any data you want to hide from other user such as email, playlists to implement this pass id from parameter, and check if userId and and id from param are same 
    const user = yield prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
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
    });
    if (!user)
        throw new ApiError_1.default(404, "User does not exist");
    return new ApiResponse_1.default(200, "User fetched successfully", user).send(res);
});
exports.getuserById = getuserById;
const refresh = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new ApiError_1.default(401, "Refresh token required!");
    }
    const decoded = (0, tokenService_1.verifyToken)(refreshToken);
    if (!decoded) {
        throw new ApiError_1.default(401, "Invalid Refresh token!");
    }
    const newAccessToken = (0, tokenService_1.generateAccessToken)({ userId: decoded.userId, username: decoded.username });
    res.json({ accessToken: newAccessToken });
};
exports.refresh = refresh;
