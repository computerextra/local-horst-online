import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const dokumentenRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.cms.dokumente.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.cms.dokumente.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.cms.dokumente.findMany({
      orderBy: { filename: "asc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        data: z.string(), // base64
        date_modified: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const filename = input.filename.split(".")[0];
      if (filename == null) return;
      const extension = input.filename.split(".")[1];
      if (extension == null) return;
      return await ctx.cms.dokumente.create({
        data: {
          filename,
          extension,
          date_modified: input.date_modified,
          data: input.data,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        filename: z.string(),
        data: z.string(), // base64
        date_modified: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const filename = input.filename.split(".")[0];
      if (filename == null) return;
      const extension = input.filename.split(".")[1];
      if (extension == null) return;
      return await ctx.cms.dokumente.update({
        where: { id: input.id },
        data: {
          filename,
          extension,
          date_modified: input.date_modified,
          data: input.data,
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
      return await ctx.cms.dokumente.delete({
        where: { id: input.id },
      });
    }),
});
