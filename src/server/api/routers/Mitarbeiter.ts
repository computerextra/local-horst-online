import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { existsSync } from "fs";
import { appendFile, mkdir, readFile, unlink } from "fs/promises";
import { z } from "zod";

// ScriptBuilder
const command = "PowerShell.exe -Command (Copy-Item -Path ";
const origin = "'V:\\Compex Signaturen\\Signatures\\";
const dest =
  "' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";

export const MitarbeiterRouter = createTRPCRouter({
  getBirthday: publicProcedure.query(({ ctx }) => {
    return ctx.db.mitarbeiter.findMany({
      orderBy: {
        Name: "asc",
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.mitarbeiter.findMany({
      include: {
        Einkauf: true,
      },
      orderBy: {
        Name: "asc",
      },
    });
  }),
  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.mitarbeiter.findUnique({
      where: {
        id: input,
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
  downloadSignature: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const dir = "/upload/";
      const file = dir + "install.bat";
      if (!existsSync(dir)) {
        await mkdir(dir);
      }
      if (existsSync(file)) {
        await unlink(file);
      }
      const lines = [
        `${command}${origin}${input.name} (${input.email})-Dateien${dest}`,
        `${command}${origin}${input.name} (${input.email}).htm${dest}`,
        `${command}${origin}${input.name} (${input.email}).rtf${dest}`,
        `${command}${origin}${input.name} (${input.email}).txt${dest}`,
      ];
      for (const line of lines) {
        await appendFile(file, line);
      }
      const data = await readFile(file);
      const dataString = data.toString("base64");
      return dataString;
    }),
});
