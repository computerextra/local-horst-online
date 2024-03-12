import { createTRPCRouter } from "@/server/api/trpc";
import { AnsprechpartnerRouter } from "./routers/Ansprechpartner";
import { ArchiveRouter } from "./routers/Archive";
import { EinkaufBilderRouter } from "./routers/Bilder";
import { EinkaufRouter } from "./routers/Einkauf";
import { LieferantenRouter } from "./routers/Lieferanten";
import { MitarbeiterRouter } from "./routers/Mitarbeiter";
import { WarenlieferungRouter } from "./routers/Warenlieferung";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  Lieferant: LieferantenRouter,
  Ansprechpartner: AnsprechpartnerRouter,
  Archive: ArchiveRouter,
  Mitarbeiter: MitarbeiterRouter,
  Einkauf: EinkaufRouter,
  EinkaufBild: EinkaufBilderRouter,
  Warenlieferung: WarenlieferungRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
