import { Response, NextFunction, Request, request } from "express";
import { ValidationUserService } from "../services/ValidationUserService";

export function ensureAdmin(
  resquest: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const validationUserService = new ValidationUserService();

  if (validationUserService.isUserAdmin({ user_id })) {
    return next();
  }

  return response.status(401).json({
    error: "Unathorizad",
  });
}
