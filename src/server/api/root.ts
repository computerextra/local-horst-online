import { createTRPCRouter } from "~/server/api/trpc";
import { MitarbeiterRouter } from "./routers/mitarbeiter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  Mitarbeiter: MitarbeiterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
