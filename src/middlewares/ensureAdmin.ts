import { Response, NextFunction, Request } from "express";

export function ensureAdmin(
  resquest: Request,
  response: Response,
  next: NextFunction
) {
  const admin = true;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unathorizad",
  });
}
