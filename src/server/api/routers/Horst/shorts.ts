import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const shortsRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.shorts.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.horst.shorts.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        origin: z.string(),
        short: z.string(),
        user: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.shorts.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        origin: z.string(),
        short: z.string(),
        user: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.shorts.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.shorts.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
