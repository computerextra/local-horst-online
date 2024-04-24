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
        Bild1Date: z.date().optional(),
        Bild2Date: z.date().optional(),
        Bild3Date: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.einkauf.upsert({
        where: { mitarbeiterId: input.mitarbeiterId },
        create: {
          ...input,
        },
        update: {
          ...input,
          Bild1: input.Bild1 ?? null,
          Bild2: input.Bild2 ?? null,
          Bild3: input.Bild3 ?? null,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.einkauf.update({
        where: { id: input.id },
        data: {
          Abgeschickt: null,
          Bild1: null,
          Bild2: null,
          Bild3: null,
          Bild1Date: null,
          Bild2Date: null,
          Bild3Date: null,
          Dinge: null,
          Geld: null,
          Pfand: null,
          Paypal: false,
          Abonniert: false,
        },
      });
    }),
});
