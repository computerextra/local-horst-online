import { PrismaClient } from "@prisma/client";
import { PrismaClient as CMSClient } from "prisma/generated/CMS";
import { PrismaClient as SageClient } from "prisma/generated/Sage";
import { env } from "~/env";

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

const createCMSClient = () =>
  new CMSClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const globalForSage = globalThis as unknown as {
  sage: ReturnType<typeof createSageClient> | undefined;
};

const globalForCMS = globalThis as unknown as {
  cms: ReturnType<typeof createCMSClient> | undefined;
};

export const horst = globalForPrisma.prisma ?? createPrismaClient();
export const sage = globalForSage.sage ?? createSageClient();
export const cms = globalForCMS.cms ?? createCMSClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = horst;
  globalForSage.sage = sage;
  globalForCMS.cms = cms;
}
