import * as fs from "fs";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  CB,
  CK,
  CS,
  DN,
  DW,
  EG,
  EK,
  FG,
  FI,
  IE,
  JK,
  MR,
  MS,
  PC,
  RJ,
  TT,
  VH,
} from "~/signatures";

export const MitarbeiterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.mitarbeiter.findMany({
      orderBy: { Name: "asc" },
    });
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.mitarbeiter.findUnique({
        where: { id: input.id },
      });
    }),
  getDailyShoppingList: publicProcedure.query(async ({ ctx }) => {
    const x = new Date().toDateString();
    const today = new Date(x);
    const d = today.getDate() + 1;
    const m = today.getMonth() + 1;
    const y = today.getFullYear();
    const tomorrow = new Date(y, m, d);
    return await ctx.prisma.mitarbeiter.findMany({
      where: {
        OR: [
          {
            Datum: {
              lte: tomorrow,
              gte: today,
            },
          },

          {
            Abonniert: true,
          },
        ],
      },
      orderBy: {
        Datum: "asc",
      },
    });
  }),
  updateEinkauf: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Einkauf: z.string(),
        Pfand: z.string(),
        Geld: z.string(),
        Abonniert: z.boolean(),
        Bild1: z.string(),
        Bild2: z.string(),
        Bild3: z.string(),
        Bild1Type: z.string(),
        Bild2Type: z.string(),
        Bild3Type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.mitarbeiter.update({
        where: { id: input.id },
        data: {
          Einkauf: input.Einkauf,
          Pfand: input.Pfand,
          Geld: input.Geld,
          Abonniert: input.Abonniert,
          Bild1: input.Bild1,
          Bild2: input.Bild2,
          Bild3: input.Bild3,
          Bild1Type: input.Bild1Type,
          Bild2Type: input.Bild2Type,
          Bild3Type: input.Bild3Type,
          Datum: new Date(),
        },
      });
    }),
  getSignatureDownload: publicProcedure
    .input(
      z.object({
        mitarbeiter: z.array(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log("Started");
      if (!ctx) {
        console.log("");
      }
      if (input.mitarbeiter.length < 1) return;
      const dir = path.join(__dirname, "upload");
      const file = path.join(dir, "install.bat");
      try {
        fs.mkdirSync(dir);
      } catch (err) {}
      if (fs.existsSync(file)) {
        fs.rmSync(file);
      }

      input.mitarbeiter.forEach((x) => {
        const line = getLine(x);
        fs.appendFileSync(file, line);
      });

      // Return File as b64
      const data = fs.readFileSync(file);
      const dataString = data.toString("base64");
      return dataString;
    }),
  updateMitarbeiter: publicProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Short: z.string(),
        Durchwahl: z.string(),
        Telefon1: z.string(),
        Telefon2: z.string(),
        HomeOffice: z.string(),
        Mobil: z.string(),
        Mail: z.string(),
        Azubi: z.boolean(),
        Geburtstag: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let Birthday = "";
      if (input.Geburtstag.length > 0) {
        const split = input.Geburtstag.split("-");
        if (split && split[0] && split[1] && split[2]) {
          Birthday = split[2] + "." + split[1] + ".";
        }
      }
      return await ctx.prisma.mitarbeiter.update({
        where: { id: input.id },
        data: {
          Name: input.Name,
          Mail: input.Mail,
          Durchwahl: input.Durchwahl,
          Telefon1: input.Telefon1,
          Telefon2: input.Telefon2,
          Mobil: input.Mobil,
          Kurz: input.Short,
          Azubi: input.Azubi,
          HomeOffice: input.HomeOffice,
          Geburtstag: Birthday,
        },
      });
    }),
  neuerMitarbeiter: publicProcedure
    .input(
      z.object({
        Name: z.string(),
        Short: z.string(),
        Durchwahl: z.string(),
        Telefon1: z.string(),
        Telefon2: z.string(),
        HomeOffice: z.string(),
        Mobil: z.string(),
        Mail: z.string(),
        Azubi: z.boolean(),
        Geburtstag: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let Birthday = "";
      if (input.Geburtstag.length > 0) {
        const split = input.Geburtstag.split("-");
        if (split && split[0] && split[1] && split[2]) {
          Birthday = split[2] + "." + split[1] + ".";
        }
      }
      return await ctx.prisma.mitarbeiter.create({
        data: {
          Name: input.Name,
          Mail: input.Mail,
          Durchwahl: input.Durchwahl,
          Telefon1: input.Telefon1,
          Telefon2: input.Telefon2,
          Mobil: input.Mobil,
          Kurz: input.Short,
          Azubi: input.Azubi,
          HomeOffice: input.HomeOffice,
          Geburtstag: Birthday,
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.mitarbeiter.delete({
      where: {
        id: input,
      },
    });
  }),
});

function getLine(short: string) {
  let line = "";
  switch (short) {
    case "CS": {
      CS.forEach((l) => {
        line += l;
      });
      break;
    }
    case "CB": {
      CB.forEach((l) => {
        line += l;
      });
      break;
    }
    case "CK": {
      CK.forEach((l) => {
        line += l;
      });
      break;
    }
    case "DN": {
      DN.forEach((l) => {
        line += l;
      });
      break;
    }
    case "DW": {
      DW.forEach((l) => {
        line += l;
      });
      break;
    }
    case "EK": {
      EK.forEach((l) => {
        line += l;
      });
      break;
    }
    case "FI": {
      FI.forEach((l) => {
        line += l;
      });
      break;
    }
    case "FG": {
      FG.forEach((l) => {
        line += l;
      });
      break;
    }
    case "IE": {
      IE.forEach((l) => {
        line += l;
      });
      break;
    }
    case "JK": {
      JK.forEach((l) => {
        line += l;
      });
      break;
    }
    case "MS": {
      MS.forEach((l) => {
        line += l;
      });
      break;
    }
    case "MR": {
      MR.forEach((l) => {
        line += l;
      });
      break;
    }
    case "RJ": {
      RJ.forEach((l) => {
        line += l;
      });
      break;
    }
    case "TT": {
      TT.forEach((l) => {
        line += l;
      });
      break;
    }
    case "VH": {
      VH.forEach((l) => {
        line += l;
      });
      break;
    }
    case "EG": {
      EG.forEach((l) => {
        line += l;
      });
      break;
    }
    case "PC": {
      PC.forEach((l) => {
        line += l;
      });
      break;
    }
  }
  return line;
}
