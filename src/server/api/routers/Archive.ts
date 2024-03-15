import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { readFile } from "fs/promises";
import path from "path";

export const ArchiveRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.pdfs.findMany({
      where: {
        OR: [
          {
            title: {
              search: input,
            },
          },
          {
            body: {
              search: input,
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
    .input(z.number().int())
    .mutation(async ({ ctx, input }) => {
      const Filename = await ctx.db.pdfs.findUnique({
        where: { id: input },
        select: { title: true },
      });

      if (Filename == null) return null;

      const filePath = path.join(env.ARCHIVE_PATH, Filename.title);
      const data = await readFile(filePath);
      const dataString = data.toString("base64");
      return dataString;
    }),
});
