import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: unknown): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    switch (error.code) {
      case "P2002":
        // Unique constraint violation
        throw new Error(`Duplicate field value: ${error.meta?.target}`);
      case "P2025":
        // Record not found
        throw new Error("Record not found");
      case "P2003":
        // Foreign key constraint violation
        throw new Error("Related record not found");
      default:
        throw new Error(`Database error: ${error.message}`);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new Error("Invalid data provided");
  }

  // For unknown errors, rethrow
  throw error;
};
