import { Request, Response } from "express";
import * as authServices from "../services/authServices";

export const postSignUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await authServices.createUser({ username, password });
  res.status(201).json(result);
};

export const postSignIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await authServices.login({
    username,
    password,
  });

  if (!result) {
    res.status(400).json({ message: "Login Failed!" });
    return;
  }

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 1000 * 60 * 15, // 15 minutes
  });
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json({ message: "Login Successfully!" });
};

export const postRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await authServices.refreshToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // or "strict" for higher security
    maxAge: 1000 * 60 * 15, // 15 minutes
  });

  res.status(200).json({ message: "Refresh Token Successfully!" });
};

export const postLogout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUserByToken = async (req: Request, res: Response) => {
  const id = req.user?.id || null
  if (!id) {
    throw res.json({
      message: "user not found.",
    });
  }

  const result = await authServices.getUserById(id);
  res.json(result);
};

export const insertMockUsers = async (_req: Request, res: Response) => {
  await authServices.insertMockUsers();
  res.status(201).json({
    message: "Mock users inserted successfully.",
  });
}