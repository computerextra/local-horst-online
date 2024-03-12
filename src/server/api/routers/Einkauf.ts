import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const EinkaufRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Paypal: z.boolean(),
        Abonniert: z.boolean(),
        Geld: z.string().optional(),
        Pfand: z.string().optional(),
        Dinge: z.string().optional(),
        mitarbeiterId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.einkauf.update({
        where: {
          id: input.id,
        },
        data: {
          Paypal: input.Paypal,
          Abonniert: input.Abonniert,
          Geld: input.Geld,
          Pfand: input.Pfand,
          Dinge: input.Dinge,
          mitarbeiterId: input.mitarbeiterId,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        Paypal: z.boolean(),
        Abonniert: z.boolean(),
        Geld: z.string().optional(),
        Pfand: z.string().optional(),
        Dinge: z.string().optional(),
        mitarbeiterId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.einkauf.create({
        data: {
          Paypal: input.Paypal,
          Abonniert: input.Abonniert,
          Geld: input.Geld,
          Pfand: input.Pfand,
          Dinge: input.Dinge,
          mitarbeiterId: input.mitarbeiterId,
        },
      });
    }),
});
