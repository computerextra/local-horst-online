import { readFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pdfRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.pdfs.findMany({
        where: {
          OR: [
            {
              title: {
                ...input,
              },
            },
            {
              body: {
                ...input,
              },
            },
          ],
        },
        select: {
          id: true,
          title: true,
        },
      });
    }),
  download: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const filename = await ctx.horst.pdfs.findUnique({
        where: { id: input.id },
        select: { title: true },
      });

      if (filename == null) return null;

      const filePath = path.join(env.ARCHIVE_PATH, filename.title);
      const data = await readFile(filePath);
      const dataString = data.toString("base64");
      return dataString;
    }),
});
