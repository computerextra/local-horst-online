import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        online: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.cms.jobs.create({
        data: {
          ...input,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.cms.jobs.findMany({});
  }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.cms.jobs.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        online: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.cms.jobs.update({
        where: {
          id: input.id,
        },
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
      return ctx.cms.jobs.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
