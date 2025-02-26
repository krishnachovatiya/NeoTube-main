"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylistSchema = exports.commentSchema = exports.videoUploadSchema = exports.signInSchema = exports.setupProfileSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
//     optional: z.string().optional(), // field not provided, or explicitly `undefined`
//     nullable: z.string().nullable(), // field explicitly `null`
//     nullish: z.string().nullish(), // field not provided, explicitly `null`, or explicitly `undefined`
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(5, "Username must be at least 5 characters long").max(30, "Username cannot exceed 30 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long").max(100, "Password cannot exceed 100 characters"),
    // profilePicture: z.instanceof(File).optional(),
    // coverPicture: z.instanceof(File).optional(),
    // description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
});
exports.setupProfileSchema = zod_1.z.object({
    channelName: zod_1.z.string().min(3, "Channel name must be at least 3 characters long").nonempty("Channel name can not be empty"),
    profilePicture: zod_1.z.instanceof(File).optional(),
    coverPicture: zod_1.z.instanceof(File).optional(),
    description: zod_1.z.string().max(500, "Description cannot exceed 500 characters").optional(),
});
exports.signInSchema = zod_1.z.object({
    usernameOrEmail: zod_1.z.string().min(5, "Username must be at least 5 characters long").max(30, "Username cannot exceed 30 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long").max(100, "Password cannot exceed 100 characters"),
});
exports.videoUploadSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, "Title must be at least 5 characters long"),
    description: zod_1.z.string(),
    // video: z.instanceof(File),
    // category: z.string(),
    // thumbnail: z.instanceof(File)
});
exports.commentSchema = zod_1.z.object({
    content: zod_1.z.string(),
});
exports.createPlaylistSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("String cannot be empty")
});
