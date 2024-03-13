import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Prisma, type Warenlieferung } from "@prisma/client";
import type { sg_auf_artikel } from "prisma/generated/Sage";

const heute = new Date().toDateString();
const morgen = new Date(
  new Date().setDate(new Date().getDate() + 1),
).toDateString();

export const WarenlieferungRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.warenlieferung.findMany({
      where: {
        OR: [
          {
            geliefert: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
          {
            angelegt: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
          },
        ],
      },
    });
  }),
  generate: publicProcedure.mutation(async ({ ctx }) => {
    const SageArtikel = await ctx.sage.sg_auf_artikel.findMany();
    const DbArtikel = await ctx.db.warenlieferung.findMany();
    const NeueArtikel: Warenlieferung[] = findNeueArtikel(
      SageArtikel,
      DbArtikel,
    );
    if (NeueArtikel.length > 0) {
      await ctx.db.warenlieferung.createMany({
        data: NeueArtikel,
      });
    }

    const Warenlieferung = await ctx.sage.sg_auf_lager_history.findMany({
      where: {
        AND: [
          {
            Hist_Datetime: {
              gte: new Date(heute),
              lt: new Date(morgen),
            },
            BEWEGUNG: { gte: 0 },
            BEMERKUNG: { contains: "Warenlieferung" },
            Hist_Action: { contains: "Insert" },
          },
        ],
      },
    });
    const geliefert: number[] = [];
    if (Warenlieferung.length > 0) {
      Warenlieferung.forEach((x) => {
        if (x.SG_AUF_ARTIKEL_FK) {
          geliefert.push(x.SG_AUF_ARTIKEL_FK);
        }
      });
    }
    if (geliefert.length > 0) {
      await ctx.db.warenlieferung.updateMany({
        where: {
          id: {
            in: geliefert,
          },
        },
        data: {
          geliefert: new Date(),
        },
      });
    }

    const Preise = await ctx.sage.sg_auf_vkpreis_history.findMany({
      where: {
        Hist_Datetime: {
          gte: new Date(heute),
          lt: new Date(morgen),
        },
      },
    });

    const AlleArtikelNeu = await ctx.db.warenlieferung.findMany();
    const Preisanpassung: Warenlieferung[] = [];
    if (Preise.length > 0) {
      Preise.forEach((x) => {
        if (x.SG_AUF_ARTIKEL_FK) {
          const item = AlleArtikelNeu.find((y) => y.id === x.SG_AUF_ARTIKEL_FK);
          if (item) {
            if (x.Hist_Action?.startsWith("Insert")) {
              if (x.PR01) {
                item.NeuerPreis = new Prisma.Decimal(x.PR01);
              }
            }
            if (x.Hist_Action?.startsWith("Delete")) {
              if (x.PR01) {
                item.AlterPreis = new Prisma.Decimal(x.PR01);
              }
            }
            item.Preis = new Date();
            Preisanpassung.push(item);
          }
        }
      });
    }
    for (const x of Preisanpassung) {
      await ctx.db.warenlieferung.update({
        where: {
          id: x.id,
        },
        data: x,
      });
    }
  }),
});

function findNeueArtikel(
  SageArtikel: sg_auf_artikel[],
  DbArtikel: Warenlieferung[],
): Warenlieferung[] {
  const NeueArtikel: Warenlieferung[] = [];
  if (DbArtikel.length == 0) {
    // Alles Anlegen
    NeueArtikel.push(...ReturnAll(SageArtikel));
  } else {
    SageArtikel.forEach((artikel) => {
      if (
        DbArtikel.find((x) => x.id === artikel.SG_AUF_ARTIKEL_PK) === undefined
      ) {
        NeueArtikel.push({
          id: artikel.SG_AUF_ARTIKEL_PK,
          Artikelnummer: artikel.ARTNR ?? "",
          Name: artikel.SUCHBEGRIFF ?? "",
          angelegt: new Date(),
          geliefert: null,
          AlterPreis: null,
          NeuerPreis: null,
          Preis: null,
        });
      }
    });
  }
  return NeueArtikel;
}

function ReturnAll(SageArtikel: sg_auf_artikel[]): Warenlieferung[] {
  const NeueArtikel: Warenlieferung[] = [];
  SageArtikel.forEach((artikel) => {
    NeueArtikel.push({
      id: artikel.SG_AUF_ARTIKEL_PK,
      Artikelnummer: artikel.ARTNR ?? "",
      Name: artikel.SUCHBEGRIFF ?? "",
      angelegt: new Date(),
      geliefert: null,
      AlterPreis: null,
      NeuerPreis: null,
      Preis: null,
    });
  });
  return NeueArtikel;
}
