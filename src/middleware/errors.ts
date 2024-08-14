import type { Request, Response, NextFunction } from "express";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const error = new Error(`PATH ${req.originalUrl} NOT FOUND`);
  error["status"] = 404;
  next(error);
}

export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log({ message: error.message });
  res.status(error["status"] || 500);
  return res.json({ error: { message: error.message } });
}
