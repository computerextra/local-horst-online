import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const lieferantenRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.lieferanten.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.horst.lieferanten.findMany({
      orderBy: { Firma: "desc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        Firma: z.string().min(3),
        Kundennummer: z.string().optional(),
        Webseite: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.lieferanten.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        Firma: z.string().min(3),
        Kundennummer: z.string().optional(),
        Webseite: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.lieferanten.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.lieferanten.delete({
        where: { id: input.id },
      });
    }),
});
