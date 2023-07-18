import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type {
  sg_adressen,
  sg_auf_artikel,
} from "../../../../prisma/generated/Sage";
import { Prisma } from "../../../../prisma/generated/Sage";

export const SageRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const query = `SELECT * FROM sg_adressen WHERE Suchbegriff LIKE '%${input.searchTerm}%' OR KundNr LIKE '%${input.searchTerm}%' OR LiefNr LIKE '%${input.searchTerm}%'`;
      return await ctx.sage.$queryRaw<sg_adressen[] | null>(Prisma.raw(query));
    }),
  reverseSearch: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const search = input.searchTerm
        .replaceAll("+49", "0")
        .replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("/", "")
        .replaceAll("-", "")
        .replaceAll(",", "");
      const query = `SELECT * FROM sg_adressen WHERE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') LIKE '%${search}%' OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') LIKE '%${search}%' OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') LIKE '%${search}%' OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','') LIKE '%${search}%'`;
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
  getBestand: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const sql = `SELECT * FROM sg_auf_artikel WHERE Artnr IN (${input
        .map((v) => `'${v}'`)
        .join(",")})`;
      return await ctx.sage.$queryRaw<sg_auf_artikel[] | null>(Prisma.raw(sql));
    }),
});
