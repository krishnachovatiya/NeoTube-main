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
exports.uploadVideoOnCloudinary = exports.uploadImageOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary"); //v2 coz updated ver has last parameter as callback,to differentiate 
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = __importDefault(require("./ApiError"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImageOnCloudinary = (localFilePath, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!localFilePath) {
            throw new ApiError_1.default(400, 'No file uploaded');
        }
        const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: 'image',
            public_id: `users/${userId}/thumbnail/${Date.now()}`
        });
        if (response) {
            console.log("Response from cloudinary " + response);
            fs_1.default.unlinkSync(localFilePath);
        }
        return {
            public_id: response.public_id,
            secure_url: response.secure_url
        };
    }
    catch (error) {
        console.error("Cloudinary image upload error:", error);
        throw new ApiError_1.default(500, error.message || "Cloudinary upload error", error);
    }
});
exports.uploadImageOnCloudinary = uploadImageOnCloudinary;
const uploadVideoOnCloudinary = (localFilePath, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!localFilePath)
            throw new ApiError_1.default(400, 'No file uploaded');
        const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: "video",
            public_id: `users/${userId}/videos/${Date.now()}`,
            transformation: [{
                    quality: "auto"
                }]
        });
        if (response) {
            console.log(response);
            fs_1.default.unlinkSync(localFilePath);
        }
        return {
            public_id: response.public_id,
            secure_url: response.secure_url
        };
    }
    catch (error) {
        console.error("Cloudinary video upload error:", error);
        throw new ApiError_1.default(500, error.message || "Cloudinary upload error", error);
    }
});
exports.uploadVideoOnCloudinary = uploadVideoOnCloudinary;
// incorrect public id error
