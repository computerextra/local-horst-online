import { PrismaClient } from "@prisma/client";
import { PrismaClient as SageClient } from "prisma/generated/Sage";

import { env } from "@/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const createSageClient = () =>
  new SageClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
  sage: ReturnType<typeof createSageClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();
export const sage = globalForPrisma.sage ?? createSageClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
if (env.NODE_ENV !== "production") globalForPrisma.sage = sage;
