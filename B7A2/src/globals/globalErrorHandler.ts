import { type NextFunction, type Request, type Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: err?.message || "Internal Server Error!",
    error: err,
  });
};

export default globalErrorHandler;
