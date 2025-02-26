"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const video_1 = __importDefault(require("./routes/video"));
const playlist_1 = __importDefault(require("./routes/playlist"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/video", video_1.default);
app.use("/api/v1/playlist", playlist_1.default);
app.use(errorHandler_1.default);
app.listen(3000);
// "scripts": {
//     "start": "node dist/index.js",
//     "dev": "npm start && nodemon --exec tsc.cmd",
//   },
//  "dev": "npx tsc && npx nodemon dist/server.js
// ts-node allows you to skip the compilation step and run TypeScript directly in a Node.js environment.
// Nodemon watches the files and restarts the server on any changes (with --exec ts-node, it automatically handles .ts files)
