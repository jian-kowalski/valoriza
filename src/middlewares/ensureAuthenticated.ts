import { Response, NextFunction, Request, request } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  resquest: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = resquest.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(
      token,
      "ed41df8cbbae16cbb3e43d0d8debe6bd"
    ) as IPayLoad;
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
