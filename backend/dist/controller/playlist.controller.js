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
exports.removeVideoFromPlaylist = exports.saveVideoToPlaylist = exports.createPlaylist = void 0;
const client_1 = require("@prisma/client");
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const prisma = new client_1.PrismaClient();
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const userId = req.userId;
    const playlistExists = yield prisma.playlist.findFirst({
        where: {
            name,
            userId
        }
    });
    if (playlistExists) {
        throw new ApiError_1.default(400, "Playlist already exists!");
    }
    const playlist = yield prisma.playlist.create({
        data: {
            name,
            userId
        }
    });
    return new ApiResponse_1.default(200, "New playlist created", playlist).send(res);
});
exports.createPlaylist = createPlaylist;
const saveVideoToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { videoId, playlistId } = req.body
    const videoId = parseInt(req.body.videoId, 10);
    const playlistId = parseInt(req.body.playlistId, 10);
    const videoExists = yield prisma.playlist_videos.findFirst({
        where: {
            videoId,
            playlistId
        }
    });
    if (videoExists) {
        throw new ApiError_1.default(400, "Video already exists in the playlist");
    }
    yield prisma.playlist_videos.create({
        data: {
            videoId,
            playlistId
        }
    });
    return new ApiResponse_1.default(200, "Video added to playlist").send(res);
});
exports.saveVideoToPlaylist = saveVideoToPlaylist;
const removeVideoFromPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistId, videoId } = req.params;
    const videoExists = yield prisma.playlist_videos.findFirst({
        where: {
            playlistId: Number(playlistId),
            videoId: Number(videoId)
        }
    });
    if (!videoExists) {
        throw new ApiError_1.default(404, "Video not found in the playlist");
    }
    yield prisma.playlist_videos.delete({
        where: {
            playlistId_videoId: {
                playlistId: Number(playlistId),
                videoId: Number(videoId)
            }
        }
    });
    return new ApiResponse_1.default(200, "Video removed from playlist").send(res);
});
exports.removeVideoFromPlaylist = removeVideoFromPlaylist;
