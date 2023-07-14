import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const AnsprechpartnerRouter = createTRPCRouter({
  getAnsprechpartnerVonLieferant: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.ansprechpartner.findMany({
        where: {
          lieferantenId: input,
        },
        orderBy: {
          Name: "asc",
        },
      });
    }),
  neuerAnsprechpartner: publicProcedure
    .input(
      z.object({
        Name: z.string(),
        Telefon: z.string(),
        Mobil: z.string(),
        Mail: z.string(),
        lieferantenId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.ansprechpartner.create({
        data: {
          Name: input.Name,
          Telefon: input.Telefon,
          Mobil: input.Mobil,
          Mail: input.Mail,
          lieferantenId: input.lieferantenId,
        },
      });
    }),
  updateLieferant: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Telefon: z.string(),
        Mobil: z.string(),
        Mail: z.string(),
        lieferantenId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.ansprechpartner.update({
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
  getOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.ansprechpartner.findUnique({
      where: { id: input },
    });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.ansprechpartner.delete({
      where: { id: input },
    });
  }),
});
