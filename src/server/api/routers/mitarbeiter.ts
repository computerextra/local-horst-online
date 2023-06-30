import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const MitarbeiterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.mitarbeiter.findMany({
      orderBy: { Name: "asc" },
    });
  }),
  getDailyShoppingList: publicProcedure.query(async ({ ctx }) => {
    const x = new Date().toDateString();
    const today = new Date(x);
    const d = today.getDate() + 1;
    const m = today.getMonth() + 1;
    const y = today.getFullYear();
    const tomorrow = new Date(y, m, d);
    return await ctx.prisma.mitarbeiter.findMany({
      where: {
        OR: [
          {
            Datum: {
              lte: tomorrow,
              gte: today,
            },
          },

          {
            Abonniert: true,
          },
        ],
      },
      orderBy: {
        Datum: "asc",
      },
    });
  }),
  updateEinkauf: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Einkauf: z.string(),
        Pfand: z.string(),
        Geld: z.string(),
        Abonniert: z.boolean(),
        Bild1: z.string(),
        Bild2: z.string(),
        Bild3: z.string(),
        Bild1Type: z.string(),
        Bild2Type: z.string(),
        Bild3Type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.mitarbeiter.update({
        where: { id: input.id },
        data: {
          Einkauf: input.Einkauf,
          Pfand: input.Pfand,
          Geld: input.Geld,
          Abonniert: input.Abonniert,
          Bild1: input.Bild1,
          Bild2: input.Bild2,
          Bild3: input.Bild3,
          Bild1Type: input.Bild1Type,
          Bild2Type: input.Bild2Type,
          Bild3Type: input.Bild3Type,
          Datum: new Date(),
        },
      });
    }),
});
