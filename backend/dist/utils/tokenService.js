"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const ApiError_1 = __importDefault(require("./ApiError"));
dotenv_1.default.config();
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../keys/private.pem"), "utf8");
const publicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../keys/public.pem"), "utf8");
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "20d",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "7d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ["RS256"] });
    if (typeof decoded !== "object" || decoded === null) {
        throw new ApiError_1.default(403, "Invalid or expired token");
    }
    return decoded;
    // return jwt.verify(token, publicKey, { algorithms: ["RS256"] }) as TokenPayload  
};
exports.verifyToken = verifyToken;
