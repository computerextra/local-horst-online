import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const EinkaufRouter = createTRPCRouter({
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        Paypal: z.boolean(),
        Abonniert: z.boolean(),
        Geld: z.string().optional(),
        Pfand: z.string().optional(),
        Dinge: z.string().optional(),
        mitarbeiterId: z.string(),
        Abgeschickt: z.date(),
        Bild1: z.string().optional(),
        Bild2: z.string().optional(),
        Bild3: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("BILD1", input.Bild1);
      console.log("BILD2", input.Bild2);
      console.log("BILD3", input.Bild3);
      return ctx.db.einkauf.upsert({
        where: {
          mitarbeiterId: input.mitarbeiterId,
        },
        create: {
          ...input,
          Bild1: input.Bild1 ? input.Bild1 : null,
          Bild2: input.Bild2 ? input.Bild2 : null,
          Bild3: input.Bild3 ? input.Bild3 : null,
          Bild1Date: input.Bild1 ? new Date() : null,
          Bild2Date: input.Bild2 ? new Date() : null,
          Bild3Date: input.Bild3 ? new Date() : null,
        },
        update: {
          ...input,
          Bild1: input.Bild1 ? input.Bild1 : null,
          Bild2: input.Bild2 ? input.Bild2 : null,
          Bild3: input.Bild3 ? input.Bild3 : null,
          Bild1Date: input.Bild1 ? new Date() : null,
          Bild2Date: input.Bild2 ? new Date() : null,
          Bild3Date: input.Bild3 ? new Date() : null,
        },
      });
    }),
});
