"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// const asyncHandler =
//   (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log("asyncHandler reached for:", req.method, req.url);
//     Promise.resolve(fn(req, res, next))
//       .then(() => console.log("Handler executed successfully"))
//       .catch((error) => {
//         console.error("Error in asyncHandler:", error);
//         next(error);
//       });
//   };
exports.default = asyncHandler;
// We need to define signature again in inner function because TS can not take arguments from outer function
