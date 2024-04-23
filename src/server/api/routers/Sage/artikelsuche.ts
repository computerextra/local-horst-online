import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const artikelSucheRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.sage.sg_auf_artikel.findFirst({
        where: {
          ARTNR: input.search,
        },
      });
    }),
});
