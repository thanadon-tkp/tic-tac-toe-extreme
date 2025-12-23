import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "../types/auth";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyAccessToken(token) as JwtPayload;
    req.user = payload.user;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
