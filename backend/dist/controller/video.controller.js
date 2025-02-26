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
exports.deleteCommentById = exports.addComment = exports.dislikeVideo = exports.likeVideo = exports.getAllVideos = exports.getLikedVideos = exports.getVideosByUser = exports.deleteVideoById = exports.getVideoById = exports.uploadVideo = void 0;
const cloudinary_1 = require("../utils/cloudinary");
const client_1 = require("@prisma/client");
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const prisma = new client_1.PrismaClient();
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const authReq = req;
    const { title, description } = authReq.body;
    const { userId } = authReq;
    const files = req.files;
    const videoFilePath = ((_b = (_a = files === null || files === void 0 ? void 0 : files.video) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path) || null;
    const thumbnailFilePath = ((_d = (_c = files === null || files === void 0 ? void 0 : files.thumbnail) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.path) || null;
    let videoResponse;
    if (videoFilePath) {
        const response = yield (0, cloudinary_1.uploadVideoOnCloudinary)(videoFilePath, userId);
        videoResponse = response;
    }
    else {
        throw new ApiError_1.default(400, 'Video file is required');
    }
    let thumbnailUrl;
    if (thumbnailFilePath) {
        const response = yield (0, cloudinary_1.uploadImageOnCloudinary)(thumbnailFilePath, userId);
        thumbnailUrl = response.secure_url;
    }
    // const [videoResponse, thumbnailResponse] = await Promise.all([
    //     videoFilePath ? uploadVideoOnCloudinary(videoFilePath, userId) : null,
    //     thumbnailFilePath ? uploadImageOnCloudinary(thumbnailFilePath, userId) : null
    // ]);
    const video = yield prisma.video.create({
        data: {
            title,
            description,
            videoUrl: videoResponse === null || videoResponse === void 0 ? void 0 : videoResponse.secure_url,
            videoPublicId: videoResponse === null || videoResponse === void 0 ? void 0 : videoResponse.public_id,
            thumbnailUrl: thumbnailUrl || '',
            userId
        }
    });
    return new ApiResponse_1.default(200, "Video uploaded successfully").send(res);
});
exports.uploadVideo = uploadVideo;
const getVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = parseInt(req.params.id, 10);
    if (isNaN(videoId))
        throw new ApiError_1.default(400, "Invalid video ID");
    // update video view counts
    const video = yield prisma.video.findUnique({
        where: {
            id: videoId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    profilePicture: true,
                    // include subscribers
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            profilePicture: true
                        }
                    }
                }
            },
            videoEngagement: true,
        }
    });
    if (!video)
        throw new ApiError_1.default(404, "Video not found");
    return new ApiResponse_1.default(200, "Video fetched successfully", video).send(res);
});
exports.getVideoById = getVideoById;
const deleteVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // need to make sure if user is owner
    const videoId = parseInt(req.params.id, 10);
    const userId = req.userId;
    yield prisma.video.delete({
        where: {
            id: videoId,
            userId
        }
    });
    return new ApiResponse_1.default(200, "Video is deleted!!").send(res);
});
exports.deleteVideoById = deleteVideoById;
const getVideosByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10);
    // const userId = (req as AuthRequest).userId
    // need to check if user wants his own videos or other user's videos
    const videos = yield prisma.video.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            description: true,
            videoUrl: true,
            videoPublicId: true,
            thumbnailUrl: true,
            userId: true,
            views: true,
            createdAt: true,
        }
    });
    return new ApiResponse_1.default(200, "Videos fetched successfully", videos).send(res);
});
exports.getVideosByUser = getVideosByUser;
const getLikedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const engagementById = yield prisma.videoEngagement.findMany({
        where: {
            userId,
            engagementType: 'LIKE'
        },
    });
    const likedVideoIds = engagementById.map(videoEngagement => videoEngagement.videoId);
    const likedVideos = yield prisma.video.findMany({
        where: {
            id: {
                in: likedVideoIds
            }
        },
        select: {
            id: true,
            title: true,
            description: true,
            videoUrl: true,
            videoPublicId: true,
            thumbnailUrl: true,
            userId: true,
            views: true,
            createdAt: true,
        }
    });
    return new ApiResponse_1.default(200, "Fetched liked videos...", likedVideos).send(res);
});
exports.getLikedVideos = getLikedVideos;
const getAllVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getAllVideos = getAllVideos;
const likeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = parseInt(req.params.id, 10);
    const userId = req.userId;
    const existingEngagement = yield prisma.videoEngagement.findUnique({
        where: { videoId_userId: { videoId, userId } }
    });
    if (existingEngagement) {
        // If video is already liked then need to remove like
        if (existingEngagement.engagementType === 'LIKE') {
            yield prisma.videoEngagement.delete({
                where: {
                    videoId_userId: {
                        videoId, userId
                    }
                }
            });
            return new ApiResponse_1.default(200, "Removed like", { liked: false, likeCount: yield getLikeCount(videoId) }).send(res);
        }
        // if video is disliked
        yield prisma.videoEngagement.update({
            where: {
                videoId_userId: {
                    videoId,
                    userId
                }
            },
            data: {
                engagementType: "LIKE"
            },
        });
        return new ApiResponse_1.default(200, "Liked", { liked: true, likeCount: yield getLikeCount(videoId) }).send(res);
    }
    yield prisma.videoEngagement.create({
        data: {
            videoId,
            userId,
            engagementType: 'LIKE'
        }
    });
    return new ApiResponse_1.default(200, "Liked", { liked: true, likeCount: yield getLikeCount(videoId) }).send(res);
});
exports.likeVideo = likeVideo;
const dislikeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = parseInt(req.params.id, 10);
    const userId = req.userId;
    const existingEngagement = yield prisma.videoEngagement.findUnique({
        where: {
            videoId_userId: {
                videoId,
                userId
            }
        }
    });
    if (existingEngagement) {
        if (existingEngagement.engagementType === 'DISLIKE') {
            yield prisma.videoEngagement.delete({
                where: {
                    videoId_userId: {
                        videoId,
                        userId
                    }
                }
            });
            return new ApiResponse_1.default(200, "Removed dislike", { disliked: false, dislikeCount: yield getDislikeCount(videoId) }).send(res);
        }
        yield prisma.videoEngagement.update({
            where: {
                videoId_userId: {
                    userId,
                    videoId
                }
            },
            data: {
                engagementType: 'DISLIKE'
            }
        });
        return new ApiResponse_1.default(200, "Disliked", { disliked: true, dislikeCount: yield getDislikeCount(videoId) }).send(res);
    }
    yield prisma.videoEngagement.create({
        data: {
            userId,
            videoId,
            engagementType: 'DISLIKE'
        }
    });
    return new ApiResponse_1.default(200, "Disliked", { disliked: true, dislikeCount: yield getDislikeCount(videoId) }).send(res);
});
exports.dislikeVideo = dislikeVideo;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = parseInt(req.params.videoId, 10);
    const { content } = req.body;
    const userId = req.userId;
    const comment = yield prisma.comment.create({
        data: {
            content,
            videoId,
            userId,
        }
    });
    return new ApiResponse_1.default(200, "Comment added successfully", comment).send(res);
});
exports.addComment = addComment;
const deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = parseInt(req.params.commentId, 10);
    const userId = parseInt(req.params.userId, 10);
    yield prisma.comment.delete({
        where: {
            id: commentId,
            userId
        },
    });
    return new ApiResponse_1.default(200, "Comment deleted successfully").send(res);
});
exports.deleteCommentById = deleteCommentById;
// req: AuthRequest<{ title: string; description: string }>
// export interface AuthRequest<T = any> extends Request {
//     userId: string,
//     username: string,
//     body: T
// }
const getLikeCount = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.videoEngagement.count({
        where: {
            videoId,
            engagementType: 'LIKE'
        }
    });
});
const getDislikeCount = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.videoEngagement.count({
        where: {
            videoId,
            engagementType: 'DISLIKE'
        }
    });
});
