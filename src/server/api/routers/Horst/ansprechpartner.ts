import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ansprechpartnerRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.anschprechpartner.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.horst.anschprechpartner.findMany({
      orderBy: { Name: "desc" },
    });
  }),
  getFromLieferant: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.anschprechpartner.findMany({
        where: {
          lieferantenId: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        Name: z.string().min(3),
        Telefon: z.string().optional(),
        Mobil: z.string().optional(),
        Mail: z.string().optional(),
        lieferantenId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.anschprechpartner.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string().min(3),
        Telefon: z.string().optional(),
        Mobil: z.string().optional(),
        Mail: z.string().optional(),
        lieferantenId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.anschprechpartner.update({
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
      return await ctx.horst.anschprechpartner.delete({
        where: { id: input.id },
      });
    }),
});
