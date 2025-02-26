"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const validator_middleware_1 = require("../middleware/validator.middleware");
const zod_schema_1 = require("../validators/zod.schema");
const multer_middleware_1 = require("../middleware/multer.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/signup", multer_middleware_1.uploadProfileCover, (0, validator_middleware_1.validate)(zod_schema_1.signUpSchema), (0, asyncHandler_1.default)(auth_controller_1.signUp));
router.post("/setup-profile", auth_middleware_1.authenticate, multer_middleware_1.uploadProfileCover, (0, validator_middleware_1.validate)(zod_schema_1.setupProfileSchema), (0, asyncHandler_1.default)(auth_controller_1.setupProfile));
router.post("/signin", (0, validator_middleware_1.validate)(zod_schema_1.signInSchema), (0, asyncHandler_1.default)(auth_controller_1.signIn));
router.get("/user", auth_middleware_1.authenticate, (0, asyncHandler_1.default)(auth_controller_1.getuserById));
// we can create a video tag by cloudinary.video("public_id")
// cloudinary.url("public_id", {type:"fetch"}) => for auto updation of image we are using remote source
exports.default = router;
