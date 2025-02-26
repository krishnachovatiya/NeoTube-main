"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoWithThumbnail = exports.uploadProfileCover = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        if (file.mimetype.startsWith('image/')) {
            callback(null, "./src/public/imageUpload");
        }
        else if (file.mimetype.startsWith('video/')) {
            callback(null, "./src/public/videoUpload");
        }
        else {
            return callback(new ApiError_1.default(422, 'Invalid file type'), '');
        }
    },
    filename(req, file, callback) {
        const uniqueSuffix = (0, crypto_1.randomUUID)();
        const ext = path_1.default.extname(file.originalname);
        callback(null, `${file.originalname}-${uniqueSuffix}${ext}`);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
        callback(null, true);
    }
    else if (file.fieldname === "thumbnail" && file.mimetype.startsWith("image/")) {
        callback(null, true);
    }
    else if (file.fieldname === "profilePicture" && file.mimetype.startsWith("image/")) {
        callback(null, true);
    }
    else if (file.fieldname === "coverPicture" && file.mimetype.startsWith("image/")) {
        callback(null, true);
    }
    else {
        callback(new ApiError_1.default(422, `Invalid file type for field ${file.fieldname}`));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.uploadProfileCover = upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPicture', maxCount: 1 },
]);
exports.uploadVideoWithThumbnail = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
]);
// multer() is middleware, multer uses custom disk storage and fileFilter to validate files
// RequestHandler to define middleware
