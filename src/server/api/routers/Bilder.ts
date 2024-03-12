import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const EinkaufBilderRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.string(),
        image: z.string(),
        einkaufId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bild.update({
        where: {
          id: input.id,
        },
        data: {
          type: input.type,
          image: input.image,
          einkaufId: input.einkaufId,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        type: z.string(),
        image: z.string(),
        einkaufId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bild.create({
        data: {
          type: input.type,
          image: input.image,
          einkaufId: input.einkaufId,
        },
      });
    }),
});
