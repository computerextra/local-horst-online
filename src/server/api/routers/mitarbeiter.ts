import * as fs from "fs";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});

function getLine(short: string) {
  let line = "";
  switch (short) {
    case "CS": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Service@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Service@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Service@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Service@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Christoph.Salowski@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Christoph.Salowski@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Christoph.Salowski@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Christoph.Salowski@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Christoph.Salowski@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Christoph Salowski (Christoph.Salowski@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "CB": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Claus.Bayer@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";

      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Claus.Bayer@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";

      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Claus.Bayer@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Claus.Bayer@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Werkstatt@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Werkstatt@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Werkstatt@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Claus Bayer (Werkstatt@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "DN": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniel Nowak (Daniel.Nowak@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniel Nowak (Daniel.Nowak@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniel Nowak (Daniel.Nowak@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniel Nowak (Daniel.Nowak@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "DW": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniela Weber (Daniela.Weber@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniela Weber (Daniela.Weber@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniela Weber (Daniela.Weber@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Daniela Weber (Daniela.Weber@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "EK": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Buchhaltung@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Buchhaltung@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Buchhaltung@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Buchhaltung@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Evelyn.Kwanka@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Evelyn.Kwanka@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Evelyn.Kwanka@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Evelyn Kwanka (Evelyn.Kwanka@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "FI": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Fabian Iske (Fabian.Iske@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Fabian Iske (Fabian.Iske@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Fabian Iske (Fabian.Iske@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Fabian Iske (Fabian.Iske@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "FG": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Felix Goehringer (Felix.Goehringer@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Felix Goehringer (Felix.Goehringer@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Felix Goehringer (Felix.Goehringer@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Felix Goehringer (Felix.Goehringer@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "IE": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Info@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Info@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Info@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Info@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Ingo.Ernst@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Ingo.Ernst@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Ingo.Ernst@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Ingo Ernst (Ingo.Ernst@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "JK": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Johannes.Kirchner@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Johannes.Kirchner@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Johannes.Kirchner@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Johannes.Kirchner@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Service@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Service@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Service@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Johannes Kirchner (Service@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "MS": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Marcus.Silber@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Marcus.Silber@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Marcus.Silber@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Marcus.Silber@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Verkauf@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Verkauf@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Verkauf@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Marcus Silber (Verkauf@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "MR": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Maximilian Rau (Maximilian.Rau@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Maximilian Rau (Maximilian.Rau@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Maximilian Rau (Maximilian.Rau@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Maximilian Rau (Maximilian.Rau@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "RJ": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Info@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Info@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Info@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Info@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Rainer.Jacob@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Rainer.Jacob@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Rainer.Jacob@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Rainer Jacob (Rainer.Jacob@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "TT": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Tim Tulowitzki (Tim.Tulowitzki@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Tim Tulowitzki (Tim.Tulowitzki@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Tim Tulowitzki (Tim.Tulowitzki@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Tim Tulowitzki (Tim.Tulowitzki@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
    case "VH": {
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Vladyslav Hapan (Vladyslav.Hapan@computer-extra.de)-Dateien\\' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Vladyslav Hapan (Vladyslav.Hapan@computer-extra.de).htm' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Vladyslav Hapan (Vladyslav.Hapan@computer-extra.de).rtf' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      line +=
        "PowerShell.exe -Command (Copy-Item -Path 'V:\\Compex Signaturen\\Signatures\\Vladyslav Hapan (Vladyslav.Hapan@computer-extra.de).txt' -Destination $env:appdata\\Microsoft\\Signatures\\ -Recurse -Force)\n";
      break;
    }
  }
  return line;
}
