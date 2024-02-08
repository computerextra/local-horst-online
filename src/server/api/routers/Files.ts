import * as fs from "fs";
import { open } from "node:fs/promises";
import * as path from "path";
import pdf from "pdf-parse";
import { Prisma, type sg_auf_artikel } from "prisma/generated/Sage";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type AvmCB = {
  Name: string;
  Artikelnummer: string;
  Bonus: string;
  UVP_Netto: string;
  UVP_Brutto: string;
  SageArtikelnummer?: string;
};

type BrotherCB = {
  Sage?: string;
  Menge: string;
  Gerät: string;
  Bonus: string;
  MaximalerBonus: string;
};

type InventurDate = {
  Artikelnummer: string;
  Suchbegriff: string;
  Anzahl: number;
};

type AllInventur = {
  Artikelnummer: string;
  Suchbegriff: string;
  Anzahl: number;
  Team: string;
};

export const FileRouter = createTRPCRouter({
  getAllInventur: publicProcedure
    .input(z.object({ year: z.number().int() }))
    .query(({ input }) => {
      const file = path.join(
        __dirname,
        "../../../../../src/_InventurData",
        input.year.toString(),
        "_ALL.json"
      );
      if (!fs.existsSync(file)) {
        return null;
      }
      return JSON.parse(fs.readFileSync(file, "utf-8")) as AllInventur[];
    }),
  getInventur: publicProcedure
    .input(z.object({ team: z.string(), year: z.number().int() }))
    .query(({ input }) => {
      const file = path.join(
        __dirname,
        "../../../../../src/_InventurData",
        input.year.toString(),
        input.team
      );
      if (!fs.existsSync(file + ".json")) {
        return null;
      }
      return JSON.parse(
        fs.readFileSync(file + ".json", "utf-8")
      ) as InventurDate[];
    }),
  getAvm: publicProcedure.query(async ({ ctx }) => {
    const file = path.join(
      __dirname,
      "../../../../../src/server/data/AVM_Service-Bonus-Liste_PP.pdf"
    );
    if (!fs.existsSync(file)) {
      return null;
    }
    const buffer = fs.readFileSync(file);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const data = await pdf(buffer);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const text: string = data.text;

    const AVM: AvmCB[] = [];
    const arr: string[] = text.split("\n");
    arr.map((line) => {
      if (line && line.startsWith("FRITZ")) {
        const x = line.split("2000");
        let Name = "";
        if (!x[0]) {
          Name = "";
        } else {
          Name = x[0].trim();
        }
        const Nummer = [...line.matchAll(/2000[0-9]+/g)];
        const Preis = [...line.matchAll(/[0-9]+,[0-9]+/g)];
        let Artikelnummer = "";
        let Bonus = "";
        let UVP_Netto = "";
        let UVP_Brutto = "";
        if (!Nummer || !Nummer[0] || !Nummer[0][0]) {
          Artikelnummer = "";
        } else {
          Artikelnummer = Nummer[0][0];
        }
        if (!Preis || !Preis[0] || !Preis[0][0]) {
          Bonus = "";
        } else {
          Bonus = Preis[0][0];
        }
        if (!Preis || !Preis[1] || !Preis[1][0]) {
          UVP_Netto = "";
        } else {
          UVP_Netto = Preis[1][0];
        }
        if (!Preis || !Preis[2] || !Preis[2][0]) {
          UVP_Brutto = "";
        } else {
          UVP_Brutto = Preis[2][0];
        }
        AVM.push({
          Name,
          Artikelnummer,
          Bonus,
          UVP_Netto,
          UVP_Brutto,
        });
      }
    });
    const HerstellerNummern: string[] = [];
    AVM.map((art) => {
      HerstellerNummern.push(art.Artikelnummer);
    });
    const sql = `SELECT * FROM sg_auf_artikel WHERE herstellernummer IN (${HerstellerNummern.map(
      (v) => `'${v}'`
    ).join(",")})`;
    const Artikel = await ctx.sage.$queryRaw<sg_auf_artikel[] | null>(
      Prisma.raw(sql)
    );
    if (Artikel == null) {
      return AVM;
    }

    AVM.map((art) => {
      const sage = Artikel.find((x) => x.herstellernummer == art.Artikelnummer);
      if (sage && sage.ARTNR) {
        art.SageArtikelnummer = sage.ARTNR;
      }
    });

    return AVM;
  }),
  getBrother: publicProcedure.query(async ({ ctx }) => {
    const file = path.join(
      __dirname,
      "../../../../../src/server/data/Brother_Cashback_Drucker.csv"
    );
    if (!fs.existsSync(file)) {
      return null;
    }

    const Inhalt = await open(file);
    const lines: string[] = [];
    for await (const line of Inhalt.readLines()) {
      lines.push(line);
    }
    const BROTHER: BrotherCB[] = [];
    const Nummern: string[] = [];

    lines.forEach((line) => {
      if (!line.startsWith("Max_Menge;")) {
        const splitLine = line.split(";");
        if (splitLine) {
          let Menge = "";
          if (splitLine[0]) {
            Menge = splitLine[0].trim();
          }
          let Gerät = "";
          if (splitLine[1]) {
            Gerät = splitLine[1].trim();
            Nummern.push(Gerät.replace("-", ""));
          }
          let Bonus = "";
          if (splitLine[2]) {
            Bonus = splitLine[2].trim();
          }
          let MaximalerBonus = "";
          if (splitLine[3]) {
            MaximalerBonus = splitLine[3].trim();
          }
          BROTHER.push({ Menge, Gerät, Bonus, MaximalerBonus });
        }
      }
    });
    const sql = `SELECT * FROM sg_auf_artikel WHERE herstellernummer IN (${Nummern.map(
      (v) => `'${v}'`
    ).join(",")})`;
    const Artikel = await ctx.sage.$queryRaw<sg_auf_artikel[] | null>(
      Prisma.raw(sql)
    );
    if (Artikel == null) {
      return BROTHER;
    }
    BROTHER.map((art) => {
      const sage = Artikel.find((x) =>
        x.herstellernummer?.includes(art.Gerät.replace("-", ""))
      );
      if (sage && sage.ARTNR) {
        art.Sage = sage.ARTNR;
      }
    });
    return BROTHER;
  }),
});
