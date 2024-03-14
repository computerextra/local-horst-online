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
      return ctx.db.einkauf.upsert({
        where: {
          mitarbeiterId: input.mitarbeiterId,
        },
        create: {
          ...input,
        },
        update: {
          ...input,
        },
      });
    }),
});
