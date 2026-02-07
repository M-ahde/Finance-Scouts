import dotenv from "dotenv";
dotenv.config();

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

class Database {
  prisma;

  constructor() {
    if ((global ).prismaInstance) {
      return (global).prismaInstance;
    }

    /**
     * Prisma 7+ requires an "accelerateUrl" or "adapter" for the client.
     * For MongoDB, we use the built-in adapter automatically via the URL
     * by providing `datasources` option.
     */
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      errorFormat: "minimal",
      log: ["query", "error"],
    });

    (global ).prismaInstance = this;
  }
}

export default new Database();
