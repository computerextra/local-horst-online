import { createTRPCRouter } from "~/server/api/trpc";
import { AnsprechpartnerRouter } from "./routers/Ansprechpartner";
import { ArchiveRouter } from "./routers/Archiv";
import { FileRouter } from "./routers/Files";
import { LieferantenRouter } from "./routers/Lieferanten";
import { RSSRouter } from "./routers/RSS";
import { SageRouter } from "./routers/Sage";
import { WarenlieferungRouter } from "./routers/Warenlieferung";
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
  Sage: SageRouter,
  Lieferanten: LieferantenRouter,
  Ansprechpartner: AnsprechpartnerRouter,
  File: FileRouter,
  RSS: RSSRouter,
  Warenlieferung: WarenlieferungRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
