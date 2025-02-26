import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";
import { createPlaylist, removeVideoFromPlaylist, saveVideoToPlaylist } from "../controller/playlist.controller";
import { validate } from "../middleware/validator.middleware";
import { createPlaylistSchema } from "../validators/zod.schema";

const router = Router()

router.post("/create-playlist", authenticate, validate(createPlaylistSchema) ,asyncHandler(createPlaylist))

router.post("/save-video-to-playlist", authenticate, asyncHandler(saveVideoToPlaylist))

router.delete("/delete-playlist")

router.delete("/:playlistId/video/:videoId", authenticate, asyncHandler(removeVideoFromPlaylist))

// fetch all playlist with video or make separate route
export default router