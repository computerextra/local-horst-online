import { createTRPCRouter } from "~/server/api/trpc";
import { ArchiveRouter } from "./routers/Archiv";
import { MailRouter } from "./routers/mail";
import { MitarbeiterRouter } from "./routers/mitarbeiter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  Mitarbeiter: MitarbeiterRouter,
  Mail: MailRouter,
  Archive: ArchiveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
