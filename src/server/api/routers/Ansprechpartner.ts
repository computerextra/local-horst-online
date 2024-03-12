import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const AnsprechpartnerRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.anschprechpartner.findMany({
      where: {
        lieferantenId: input,
      },
    });
  }),
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.anschprechpartner.findUnique({
      where: {
        id: input,
      },
    });
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Telefon: z.string().optional(),
        Mobil: z.string().optional(),
        Mail: z.string().optional(),
        lieferantenId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.anschprechpartner.update({
        where: {
          id: input.id,
        },
        data: {
          Name: input.Name,
          Telefon: input.Telefon,
          Mobil: input.Mobil,
          Mail: input.Mail,
          lieferantenId: input.lieferantenId,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        Name: z.string(),
        Telefon: z.string().optional(),
        Mobil: z.string().optional(),
        Mail: z.string().optional(),
        lieferantenId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.anschprechpartner.create({
        data: {
          Name: input.Name,
          Telefon: input.Telefon,
          Mobil: input.Mobil,
          Mail: input.Mail,
          lieferantenId: input.lieferantenId,
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.anschprechpartner.delete({
      where: {
        id: input,
      },
    });
  }),
});
