"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const tokenService_1 = require("../utils/tokenService");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new ApiError_1.default(401, "Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded = (0, tokenService_1.verifyToken)(token);
    if (!decoded) {
        throw new ApiError_1.default(403, "Invalid or expired token");
    }
    //check what is returned by verifytoken if failed
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
};
exports.authenticate = authenticate;
