import type { Warenlieferung } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const WarenlieferungRouter = createTRPCRouter({
  getWarenlieferung: publicProcedure.query(async ({ ctx }) => {
    const heute = new Date().toDateString();
    const morgen = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toDateString();
    return await ctx.prisma.warenlieferung.findMany({
      where: {
        OR: [
          {
            Geliefert: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
          {
            Neu: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
          {
            Modifiziert: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
        ],
      },
    });
  }),
  generate: publicProcedure.mutation(async ({ ctx }) => {
    const heute = new Date().toDateString();
    const morgen = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toDateString();
    const SageArtikel = await ctx.sage.sg_auf_artikel.findMany();
    const DbArtikel = await ctx.prisma.warenlieferung.findMany();
    if (SageArtikel == null) return;
    if (DbArtikel == null) return;
    const NeueArtikel: Warenlieferung[] = [];
    if (DbArtikel.length === 0) {
      // Keine Artikel in Datenbank, es muss einmal alles angelegt werden...
      SageArtikel.forEach((artikel) => {
        NeueArtikel.push({
          id: artikel.SG_AUF_ARTIKEL_PK,
          Artikelnummer: artikel.ARTNR,
          Artikelname: artikel.SUCHBEGRIFF,
          Importiert: new Date(),
          Neu: new Date(),
          Geliefert: null,
          AlterPreis: null,
          NeuerPreis: null,
          Modifiziert: null,
        });
      });
    } else {
      SageArtikel.forEach((artikel) => {
        const found = DbArtikel.find((x) => x.id === artikel.SG_AUF_ARTIKEL_PK);
        if (found === undefined) {
          NeueArtikel.push({
            id: artikel.SG_AUF_ARTIKEL_PK,
            Artikelnummer: artikel.ARTNR,
            Artikelname: artikel.SUCHBEGRIFF,
            Importiert: new Date(),
            Neu: new Date(),
            Geliefert: null,
            AlterPreis: null,
            NeuerPreis: null,
            Modifiziert: null,
          });
        }
      });
    }
    if (NeueArtikel) {
      NeueArtikel.map(async (artikel) => {
        await ctx.prisma.warenlieferung.create({
          data: artikel,
        });
      });
    }
    const GelieferteArtikel = await ctx.sage.sg_auf_lager_history.findMany({
      where: {
        AND: [
          {
            Hist_Datetime: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
            BEWEGUNG: { gte: 0 },
            BEMERKUNG: { contains: "Warenlieferung:" },
          },
        ],
      },
    });
    const geliefert: number[] = [];
    if (GelieferteArtikel && GelieferteArtikel.length > 0) {
      GelieferteArtikel.map((art) => {
        if (art.SG_AUF_ARTIKEL_FK) {
          geliefert.push(art.SG_AUF_ARTIKEL_FK);
        }
      });
    }
    if (geliefert && geliefert.length > 0) {
      for (let i = 0; i < geliefert.length; ++i) {
        try {
          await ctx.prisma.warenlieferung.update({
            where: { id: geliefert[i] },
            data: {
              Geliefert: new Date(),
            },
          });
        } catch (err) {
          console.error("Error on Geliefert ID", geliefert[i]);
        }
      }
    }

    const NeuePreise = await ctx.sage.sg_auf_vkpreis_history.findMany({
      where: {
        Hist_Datetime: {
          gte: new Date(heute),
          lt: new Date(morgen),
        },
      },
    });
    const Preise: Preis[] = [];
    if (NeuePreise && NeuePreise.length > 0) {
      NeuePreise.forEach((artikel) => {
        if (artikel.Hist_Action?.startsWith("Insert")) {
          if (artikel.SG_AUF_ARTIKEL_FK && artikel.PR01) {
            Preise.push({
              id: artikel.SG_AUF_ARTIKEL_FK,
              Preis_neu: artikel.PR01.toString(),
            });
          }
        }
        if (artikel.Hist_Action?.startsWith("Delete")) {
          if (artikel.SG_AUF_ARTIKEL_FK && artikel.PR01) {
            Preise.push({
              id: artikel.SG_AUF_ARTIKEL_FK,
              Preis_alt: artikel.PR01.toString(),
            });
          }
        }
      });
    }
    if (Preise != null) {
      for (let i = 0; i < Preise.length; i++) {
        if (Preise[i]) {
          if (Preise[i]?.Preis_alt && Preise[i]?.id) {
            try {
              await ctx.prisma.warenlieferung.update({
                where: { id: Preise[i]?.id },
                data: {
                  AlterPreis: Preise[i]?.Preis_alt,
                  Modifiziert: new Date(),
                },
              });
            } catch (err) {
              console.error("Error on Preis Alt ID", Preise[i]?.id);
            }
          }
          if (Preise[i]?.Preis_neu && Preise[i]?.id) {
            try {
              await ctx.prisma.warenlieferung.update({
                where: { id: Preise[i]?.id },
                data: {
                  NeuerPreis: Preise[i]?.Preis_neu,
                  Modifiziert: new Date(),
                },
              });
            } catch (err) {
              console.error("Error on Preis Neu ID", Preise[i]?.id);
            }
          }
        }
      }
    }
  }),
});

type Preis = {
  id: number;
  Preis_alt?: string;
  Preis_neu?: string;
};
