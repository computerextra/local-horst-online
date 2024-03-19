import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const LieferantenRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.lieferanten.findMany({
      include: {
        Anschprechpartner: true,
      },
      orderBy: {
        Firma: "asc",
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
        Website: z.string().url().optional(),
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
        Webseite: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return ctx.db.lieferanten.create({
        data: {
          Firma: input.Firma,
          Kundennummer: input.Kundennummer,
          Webseite: input.Webseite,
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
