import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const LieferantenRouter = createTRPCRouter({
  getLieferantenUndAnsprechpartner: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lieferanten.findMany({
      include: {
        Ansprechpartner: true,
      },
      orderBy: {
        Firma: "asc",
      },
    });
  }),
  neuerLieferant: publicProcedure
    .input(
      z.object({
        Firma: z.string(),
        Kundennummer: z.string(),
        Website: z.string(),
        Url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lieferanten.create({
        data: {
          Firma: input.Firma,
          Kundennummer: input.Kundennummer,
          WebsiteName: input.Website,
          WebsiteUrl: input.Url,
        },
      });
    }),
  updateLieferant: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Firma: z.string(),
        Kundennummer: z.string(),
        Website: z.string(),
        Url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.lieferanten.update({
        where: {
          id: input.id,
        },
        data: {
          Firma: input.Firma,
          Kundennummer: input.Kundennummer,
          WebsiteName: input.Website,
          WebsiteUrl: input.Url,
        },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.lieferanten.findUnique({
        where: { id: input.id },
        include: {
          Ansprechpartner: true,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const Alles = await ctx.prisma.lieferanten.findUnique({
        where: { id: input.id },
        include: {
          Ansprechpartner: true,
        },
      });
      if (Alles == null) return;
      const Aps = Alles.Ansprechpartner;
      if (Aps != null) {
        Aps.map(async (a) => {
          await ctx.prisma.ansprechpartner.delete({
            where: { id: a.id },
          });
        });
      }
      return await ctx.prisma.lieferanten.delete({
        where: { id: input.id },
      });
    }),
});
