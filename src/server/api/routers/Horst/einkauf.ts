import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const heute = new Date().toDateString();
const morgen = new Date(
  new Date().setDate(new Date().getDate() + 1)
).toDateString();

export const einkaufRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.einkauf.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.horst.einkauf.findMany({
      where: {
        AND: [
          {
            Abgeschickt: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
        ],
      },
      orderBy: { Abgeschickt: "desc" },
    });
  }),
  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        Paypal: z.boolean().default(false),
        Abonniert: z.boolean().default(false),
        Geld: z.string().optional(),
        Pfand: z.string().optional(),
        Dinge: z.string().optional(),
        mitarbeiterId: z.string(),
        Abgeschickt: z.date().optional(),
        Bild1: z.string().optional(),
        Bild2: z.string().optional(),
        Bild3: z.string().optional(),
        Bild1Date: z.string().optional(),
        Bild2Date: z.string().optional(),
        Bild3Date: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id ?? createId();
      return await ctx.horst.einkauf.upsert({
        where: { id: input.id },
        create: {
          ...input,
          id,
        },
        update: {
          ...input,
          id,
        },
      });
    }),
});
