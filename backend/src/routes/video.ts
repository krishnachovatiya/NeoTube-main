import { Router } from "express"
import { uploadVideoWithThumbnail } from "../middleware/multer.middleware"
import { validate } from "../middleware/validator.middleware"
import { commentSchema, videoUploadSchema } from "../validators/zod.schema"
import asyncHandler from "../utils/asyncHandler"
import { deleteVideoById, getAllVideos, getVideoById, getVideosByUser, uploadVideo, addComment, deleteCommentById, likeVideo, dislikeVideo, getLikedVideos } from "../controller/video.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

router.post("/upload", authenticate, uploadVideoWithThumbnail, validate(videoUploadSchema), asyncHandler(uploadVideo)) //--> used

router.delete("/:id", authenticate, asyncHandler(deleteVideoById))

router.get("/:userId/videos", authenticate, asyncHandler(getVideosByUser))  //--> used  (if i enter userId it shows me number of videos they have uploaded )

router.get("/", asyncHandler(getAllVideos)) // --> used

router.get("/liked-videos", authenticate, asyncHandler(getLikedVideos))

router.get("/:id", asyncHandler(getVideoById))  //--> used (to get a particular video using videoId)
router.post("/:id/like", authenticate, asyncHandler(likeVideo)) //--> used

router.post("/:id/dislike", authenticate, asyncHandler(dislikeVideo)) //--> used

router.post("/:videoId/comment", authenticate, validate(commentSchema), asyncHandler(addComment)) //-->used

// router.get("/:videoId/comments", authenticate ,asyncHandler(getComments)) // not needed as comment will be fetched in getVideoById

router.delete("/:userId/comment/:commentId", authenticate, asyncHandler(deleteCommentById)) 
// need to update, should be video id and commentid

export default router

// The as assertion forces TypeScript to accept it, while direct type annotation (:) requires TypeScript to infer the type properly.

// update video details
// subscribe to channel
// add notification on video upload
