import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const MitarbeiterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.mitarbeiter.findMany();
  }),
  getDailyShoppingList: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.mitarbeiter.findMany({
      where: {
        OR: [
          {
            Datum: new Date(),
          },
          {
            Abonniert: true,
          },
        ],
      },
    });
  }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
