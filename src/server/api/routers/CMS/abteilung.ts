import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const abteilungsRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.cms.abteilung.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.cms.abteilung.findMany({
      orderBy: { name: "desc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.cms.abteilung.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.cms.abteilung.update({
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
      return await ctx.cms.abteilung.delete({
        where: { id: input.id },
      });
    }),
});
