"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    handle(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            statusCode: this.statusCode,
            details: this.details,
        });
    }
}
exports.default = ApiError;
// const error = new ApiError(400, "Invalid request");
// console.log(error instanceof ApiError); // ❌ Might return false wo setPrototypeOf
// console.log(error instanceof Error); // ✅ Returns true
// reserves the behavior of Error
