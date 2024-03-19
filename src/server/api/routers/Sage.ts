import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { sg_adressen } from "prisma/generated/Sage";
import { Prisma } from "prisma/generated/Sage";
import { z } from "zod";

export const SageRouter = createTRPCRouter({
  search: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    // const query = `SELECT * FROM sg_adressen WHERE Suchbegriff LIKE '%${input}%' OR KunNr LIKE '%${input}%' OR LiefNr LIKE '%${input}%'`;

    return await ctx.sage.sg_adressen.findMany({
      where: {
        OR: [
          {
            Suchbegriff: {
              contains: input,
            },
          },
          {
            KundNr: {
              contains: input,
            },
          },
          {
            LiefNr: {
              contains: input,
            },
          },
        ],
      },
    });

    // return await ctx.sage.$queryRaw(Prisma.raw(query));
  }),
  searchReverse: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const search = input
        .replaceAll("+49", "0")
        .replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("/", "")
        .replaceAll("-", "")
        .replaceAll(",", "");
      const replaceQuery = (input: string) =>
        `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${input}, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')`;
      const query = `SELECT * FROM sg_adressen WHERE ${replaceQuery("Telefon1")} LIKE '%${search}%' OR ${replaceQuery("Telefon2")} LIKE '%${search}%'`;
      return await ctx.sage.$queryRaw<sg_adressen[] | null>(Prisma.raw(query));
    }),
  getName: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.sage.sg_auf_artikel.findFirst({
        where: {
          ARTNR: input,
        },
      });
    }),
});
