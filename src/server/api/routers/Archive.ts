import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ArchiveRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
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
    });
  }),
});
