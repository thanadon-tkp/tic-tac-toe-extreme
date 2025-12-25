import { prisma } from "../prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { handlePrismaError } from "../utils/errorHandler";
// types
import { SignUp, JwtPayload } from "../types/auth";

export const createUser = async (user: {username: string; password: string}) => {
  try {
    user.password = await hashPassword(user.password);

    await prisma.user.create({ data: user });

    return { message: "Created successfully" };
  } catch (err) {
    handlePrismaError(err);
  }
};

export const login = async (credentials: SignUp) => {
  try {
    // find user in db
    const user = await prisma.user.findUnique({
      where: { username: credentials.username },
    });

    if (!user) {
      throw {
        status: 400,
        message: "Invalid username or password",
      };
    }

    // check password
    const isCompare = await comparePassword(
      credentials.password,
      user.password!
    );

    if (!isCompare) {
      throw {
        status: 400,
        message: "Invalid username or password",
      };
    }

    // genarate token
    const payload: JwtPayload = {
      user: {
        id: user.id,
      },
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    handlePrismaError(err);
  }
};

export const refreshToken = async (token: string) => {
  try {
    const payload = verifyRefreshToken(token) as JwtPayload;
    const accessToken = signAccessToken({ user: payload.user });

    return accessToken;
  } catch (err) {
    throw {
      status: 403,
      message: "Refresh Token Failed!",
    };
  }
};

export const getUserById = async (id: number) => {
  try {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  } catch (err) {
    handlePrismaError(err);
  }
};

export const insertMockUsers = async () => {
  try {
    const userCount = await prisma.user.count();
    
    if (userCount > 0) {
      return { message: "Users already exist", count: userCount };
    }

    // mock users
    const mockUsers = [
      {
        username: "player1",
        password: "1234",
      },
      {
        username: "player2",
        password: "1234",
      },
      {
        username: "player3",
        password: "1234",
      },
      {
        username: "player4",
        password: "1234",
      },
      {
        username: "player5",
        password: "1234",
      },
    ];

    const createdUsers = await prisma.user.createMany({
      data: mockUsers,
    });

    return { 
      message: "Mock users created successfully", 
      count: createdUsers.count 
    };
  } catch (err) {
    handlePrismaError(err);
    throw err;
  }
};