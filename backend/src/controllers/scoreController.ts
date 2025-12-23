import { Request, Response } from "express";
import * as scoreServices from "../services/scoreServices";

export const postInsertScore = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw res.status(400).json({
      message: "User not found.",
    });
  }
  const { score } = req.body;

  await scoreServices.insertScore({
    userId,
    score,
  });
  res.status(201).json({
    message: "Score inserted successfully.",
  });
};

export const getUserScores = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw res.status(400).json({
      message: "User not found.",
    });
  }

  const scores = await scoreServices.getUserScores(userId);
  res.status(200).json(scores);
};

export const getAllScores = async (_req: Request, res: Response) => {
  const scores = await scoreServices.getAllScores();
  res.status(200).json(scores);
}