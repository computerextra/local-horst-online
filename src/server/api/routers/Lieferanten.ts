import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const LieferantenRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.lieferanten.findMany({
      include: {
        Anschprechpartner: true,
      },
    });
  }),
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.lieferanten.findUnique({
      where: {
        id: input,
      },
      include: {
        Anschprechpartner: true,
      },
    });
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Firma: z.string(),
        Kundennummer: z.string().optional(),
        Website: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lieferanten.update({
        where: {
          id: input.id,
        },
        data: {
          Firma: input.Firma,
          Kundennummer: input.Kundennummer,
          Webseite: input.Website,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        Firma: z.string(),
        Kundennummer: z.string().optional(),
        Website: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lieferanten.create({
        data: {
          Firma: input.Firma,
          Kundennummer: input.Kundennummer,
          Webseite: input.Website,
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.lieferanten.delete({
      where: {
        id: input,
      },
      include: {
        Anschprechpartner: true,
      },
    });
  }),
});
