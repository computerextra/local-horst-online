import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const partnerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string().url(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.cms.partner.create({
        data: {
          ...input,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.cms.partner.findMany({});
  }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.cms.partner.findUnique({
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
        link: z.string().url(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.cms.partner.update({
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
      return ctx.cms.partner.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
