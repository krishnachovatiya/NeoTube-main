"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("./ApiError"));
const library_1 = require("@prisma/client/runtime/library");
const errorHandler = (err, req, res, next) => {
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        console.log("Prisma Error:", err);
        err = new ApiError_1.default(400, "A database error occurred", err.message);
    }
    else if (!(err instanceof ApiError_1.default)) {
        console.log("Unknown Error:", err);
        err = new ApiError_1.default(500, "Internal Server Error", err.message);
    }
    return err.handle(res);
};
exports.default = errorHandler;
// import { Request, Response, NextFunction } from "express"; does not work
// Explicitly type the error handler as ErrorRequestHandler
