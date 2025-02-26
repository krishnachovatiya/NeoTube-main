"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = require("../middleware/multer.middleware");
const validator_middleware_1 = require("../middleware/validator.middleware");
const zod_schema_1 = require("../validators/zod.schema");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const video_controller_1 = require("../controller/video.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/upload", auth_middleware_1.authenticate, multer_middleware_1.uploadVideoWithThumbnail, (0, validator_middleware_1.validate)(zod_schema_1.videoUploadSchema), (0, asyncHandler_1.default)(video_controller_1.uploadVideo));
router.delete("/:id", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.deleteVideoById));
router.get("/:userId/videos", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.getVideosByUser));
router.get("/", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.getAllVideos));
router.get("/liked-videos", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.getLikedVideos));
router.get("/:id", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.getVideoById));
router.post("/:id/like", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.likeVideo));
router.post("/:id/dislike", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.dislikeVideo));
router.post("/:videoId/comment", auth_middleware_1.authenticate, (0, validator_middleware_1.validate)(zod_schema_1.commentSchema), (0, asyncHandler_1.default)(video_controller_1.addComment));
// router.get("/:videoId/comments", authenticate ,asyncHandler(getComments)) // not needed as comment will be fetched in getVideoById
router.delete("/:userId/comment/:commentId", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(video_controller_1.deleteCommentById));
// need to update, should be video id and commentid
exports.default = router;
// The as assertion forces TypeScript to accept it, while direct type annotation (:) requires TypeScript to infer the type properly.
// update video details
// subscribe to channel
// add notification on video upload
