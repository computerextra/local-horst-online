import { Prisma } from "@prisma/client";
import type { sg_adressen } from "prisma/generated/Sage";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const kundenSucheRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.sage.sg_adressen.findMany({
        where: {
          OR: [
            {
              Suchbegriff: {
                contains: input.search,
              },
            },
            {
              KundNr: {
                contains: input.search,
              },
            },
            {
              LiefNr: {
                contains: input.search,
              },
            },
          ],
        },
      });
    }),
  searchReverse: publicProcedure
    .input(z.object({ search: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const search = input.search
        .replaceAll("+49", "0")
        .replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("/", "")
        .replaceAll("-", "")
        .replaceAll(",", "");
      const replaceQuery = (input: string) =>
        `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${input}, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')`;
      const query = `SELECT * FROM sg_adressen WHERE ${replaceQuery(
        "Telefon1"
      )} LIKE '%${search}%' OR ${replaceQuery("Telefon2")} LIKE '%${search}%'`;
      return await ctx.sage.$queryRaw<sg_adressen[] | null>(Prisma.raw(query));
    }),
});
