import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const angeboteRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.cms.angebot.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.cms.angebot.findMany({
      orderBy: { title: "desc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        date_start: z.date(),
        date_stop: z.date(),
        link: z.string().url(),
        image: z.string(),
        anzeigen: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.cms.angebot.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        date_start: z.date(),
        date_stop: z.date(),
        link: z.string().url(),
        image: z.string(),
        anzeigen: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.cms.angebot.update({
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
      return await ctx.cms.angebot.delete({
        where: { id: input.id },
      });
    }),
});
