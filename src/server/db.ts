import { PrismaClient } from "@prisma/client";
import { PrismaClient as ArchiveClient } from "prisma/generated/Archive";
import { PrismaClient as SageClient } from "prisma/generated/Sage";
import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  archive: ArchiveClient | undefined;
  sage: SageClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const sage =
  globalForPrisma.sage ??
  new SageClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
export const archive =
  globalForPrisma.archive ??
  new ArchiveClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
if (env.NODE_ENV !== "production") globalForPrisma.archive = archive;
if (env.NODE_ENV !== "production") globalForPrisma.sage = sage;
