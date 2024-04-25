import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.user.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.horst.user.findMany({
      orderBy: { id: "desc" },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.user.update({
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
      return await ctx.horst.user.delete({
        where: { id: input.id },
      });
    }),
});
