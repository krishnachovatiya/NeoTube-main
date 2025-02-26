import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import videoRouter from "./routes/video";
import playlistRouter from "./routes/playlist";
import errorHandler from "./utils/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS properly
app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/playlist", playlistRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

export { app };


// "scripts": {
//     "start": "node dist/index.js",
//     "dev": "npm start && nodemon --exec tsc.cmd",
//   },

//  "dev": "npx tsc && npx nodemon dist/server.js
// ts-node allows you to skip the compilation step and run TypeScript directly in a Node.js environment.
// Nodemon watches the files and restarts the server on any changes (with --exec ts-node, it automatically handles .ts files)