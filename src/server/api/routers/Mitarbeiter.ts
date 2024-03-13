import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const MitarbeiterRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.mitarbeiter.findMany({
      include: {
        Einkauf: true,
      },
    });
  }),
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.mitarbeiter.findUnique({
      where: {
        id: input,
      },
      include: {
        Einkauf: {
          include: {
            Bilder: true,
          },
        },
      },
    });
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Short: z.string(),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.mitarbeiter.update({
        where: {
          id: input.id,
        },
        data: {
          Name: input.Name,
          Short: input.Short,
          Gruppenwahl: input.Gruppenwahl,
          InternTelefon1: input.InternTelefon1,
          InternTelefon2: input.InternTelefon2,
          FestnetzAlternativ: input.FestnetzAlternativ,
          FestnetzPrivat: input.FestnetzPrivat,
          HomeOffice: input.HomeOffice,
          MobilBusiness: input.MobilBusiness,
          MobilPrivat: input.MobilPrivat,
          Email: input.Email,
          Azubi: input.Azubi,
          Geburtstag: input.Geburtstag,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        Name: z.string(),
        Short: z.string(),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.mitarbeiter.create({
        data: {
          Name: input.Name,
          Short: input.Short,
          Gruppenwahl: input.Gruppenwahl,
          InternTelefon1: input.InternTelefon1,
          InternTelefon2: input.InternTelefon2,
          FestnetzAlternativ: input.FestnetzAlternativ,
          FestnetzPrivat: input.FestnetzPrivat,
          HomeOffice: input.HomeOffice,
          MobilBusiness: input.MobilBusiness,
          MobilPrivat: input.MobilPrivat,
          Email: input.Email,
          Azubi: input.Azubi,
          Geburtstag: input.Geburtstag,
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.mitarbeiter.delete({
      where: {
        id: input,
      },
      include: {
        Einkauf: true,
      },
    });
  }),
});
