import * as fs from "fs";
import * as path from "path";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ArchiveRouter = createTRPCRouter({
  searchArchive: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.archive.pdfs.findMany({
        where: {
          OR: [
            {
              body: {
                search: input.toLowerCase(),
              },
            },
            {
              title: {
                search: input.toLowerCase(),
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
  getDownload: publicProcedure
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      const Filename = await ctx.archive.pdfs.findUnique({
        where: { id: input },
        select: { title: true },
      });

      if (Filename == null) return;
      const filePath = path.join(env.ARCHIVE_PATH, Filename.title);
      const data = fs.readFileSync(filePath);
      const dataString = data.toString("base64");
      console.log(dataString);
      return dataString;
    }),
});
