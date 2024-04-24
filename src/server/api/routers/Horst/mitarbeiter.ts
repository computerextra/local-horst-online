import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const mitarbeiterRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.horst.mitarbeiter.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.horst.mitarbeiter.findMany({
      orderBy: { Name: "asc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        Name: z.string().min(3),
        Short: z.string().optional(),
        Gruppenwahl: z.string().optional(),
        InternTelefon1: z.string().optional(),
        InternTelefon2: z.string().optional(),
        FestnetzAlternativ: z.string().optional(),
        FestnetzPrivat: z.string().optional(),
        HomeOffice: z.string().optional(),
        MobilBusiness: z.string().optional(),
        MobilPrivat: z.string().optional(),
        Email: z.string().optional(),
        Azubi: z.boolean().default(false),
        Geburtstag: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.mitarbeiter.create({
        data: {
          ...input,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string().min(3),
        Short: z.string().optional(),
        Gruppenwahl: z.string().optional(),
        InternTelefon1: z.string().optional(),
        InternTelefon2: z.string().optional(),
        FestnetzAlternativ: z.string().optional(),
        FestnetzPrivat: z.string().optional(),
        HomeOffice: z.string().optional(),
        MobilBusiness: z.string().optional(),
        MobilPrivat: z.string().optional(),
        Email: z.string().optional(),
        Azubi: z.boolean().default(false),
        Geburtstag: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.horst.mitarbeiter.update({
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
      return await ctx.horst.mitarbeiter.delete({
        where: { id: input.id },
      });
    }),
});
