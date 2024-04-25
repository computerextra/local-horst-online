import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { abteilungsRouter } from "./routers/CMS/abteilung";
import { angeboteRouter } from "./routers/CMS/angebot";
import { jobRouter } from "./routers/CMS/jobs";
import { mitarbeiterCmsRouter } from "./routers/CMS/mitarbeiter";
import { partnerRouter } from "./routers/CMS/partner";
import { ansprechpartnerRouter } from "./routers/Horst/ansprechpartner";
import { einkaufRouter } from "./routers/Horst/einkauf";
import { lieferantenRouter } from "./routers/Horst/lieferanten";
import { mitarbeiterRouter } from "./routers/Horst/mitarbeiter";
import { pdfRouter } from "./routers/Horst/pdf";
import { shortsRouter } from "./routers/Horst/shorts";
import { userRouter } from "./routers/Horst/user";
import { warenlieferungRouter } from "./routers/Horst/warenlieferung";
import { artikelSucheRouter } from "./routers/Sage/artikelsuche";
import { kundenSucheRouter } from "./routers/Sage/kundensuche";
import { MailRouter } from "./routers/mail";
import { SignatureRouter } from "./routers/signatures";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // Horst Routes
  Ansprechpartner: ansprechpartnerRouter,
  Einkauf: einkaufRouter,
  Lieferanten: lieferantenRouter,
  Mitarbeiter: mitarbeiterRouter,
  Archiv: pdfRouter,
  Short: shortsRouter,
  Warenlieferung: warenlieferungRouter,
  User: userRouter,
  // SAGE Routes
  KundenSuche: kundenSucheRouter,
  ArtikelSuche: artikelSucheRouter,
  // CMS Routes
  Abteilung: abteilungsRouter,
  Angebot: angeboteRouter,
  Jobs: jobRouter,
  OnlineMitarbeiter: mitarbeiterCmsRouter,
  Partner: partnerRouter,
  // General Routes
  Mail: MailRouter,
  Signaturen: SignatureRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
