"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const playlist_controller_1 = require("../controller/playlist.controller");
const validator_middleware_1 = require("../middleware/validator.middleware");
const zod_schema_1 = require("../validators/zod.schema");
const router = (0, express_1.Router)();
router.post("/create-playlist", auth_middleware_1.authenticate, (0, validator_middleware_1.validate)(zod_schema_1.createPlaylistSchema), (0, asyncHandler_1.default)(playlist_controller_1.createPlaylist));
router.post("/save-video-to-playlist", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(playlist_controller_1.saveVideoToPlaylist));
router.delete("/delete-playlist");
router.delete("/:playlistId/video/:videoId", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(playlist_controller_1.removeVideoFromPlaylist));
// fetch all playlist with video or make separate route
exports.default = router;
