import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const mitarbeiterCmsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        short: z.string().min(2).max(3),
        image: z.boolean(),
        sex: z.string().max(1).min(1),
        tags: z.string(),
        focus: z.string(),
        abteilungId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.cms.mitarbeiter.create({
        data: {
          ...input,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.cms.mitarbeiter.findMany({
      include: {
        Abteilung: true,
      },
    });
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.cms.mitarbeiter.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Abteilung: true,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        short: z.string().min(2).max(3),
        image: z.boolean(),
        sex: z.string().max(1).min(1),
        tags: z.string(),
        focus: z.string(),
        abteilungId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.cms.mitarbeiter.update({
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
      return ctx.cms.mitarbeiter.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
