import { prisma } from "../prisma/client";
import { handlePrismaError } from "../utils/errorHandler";

// type
interface ScoreData {
  userId: number;
  score: number;
}

export const insertScore = async (data: ScoreData) => {
  try {
    return await prisma.score.create({
      data,
    });
  } catch (err) {
    handlePrismaError(err);
  }
};

export const getAllScores = async () => {
  try {
    // Group by user and sum scores
    const groupedScores = await prisma.score.groupBy({
      by: ["userId"],
      _sum: {
        score: true,
      },
    });

    // Get user details and latest createdAt for each grouped score
    const scoresWithUsers = await Promise.all(
      groupedScores.map(async (item: any) => {
        const user = await prisma.user.findUnique({
          where: { id: item.userId },
          select: { username: true },
        });

        // Get the latest score record for this user
        const latestScore = await prisma.score.findFirst({
          where: { userId: item.userId },
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        });

        return {
          userId: item.userId,
          score: item._sum.score || 0,
          createdAt: latestScore?.createdAt || new Date(),
          user: {
            username: user?.username || "Unknown",
          },
        };
      })
    );

    // Sort by score descending
    return scoresWithUsers.sort((a: any, b: any) => b.score - a.score);
  } catch (err) {
    handlePrismaError(err);
  }
};

export const getUserScores = async (userId: number) => {
  try {
    return await prisma.score.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    handlePrismaError(err);
  }
};
