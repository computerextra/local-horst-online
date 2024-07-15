import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const DIRECTORY = join(__dirname, "../../../../../src/Inventur");

export type InventurAllJson = {
  Artikelnummer: string;
  Suchbegriff: string;
  Anzahl: number;
  Team: string;
};
export type InventurTeamJson = {
  Artikelnummer: string;
  Suchbegriff: string;
  Anzahl: number;
};

export type InventurTeamOrte = {
  Team: number;
  Mitarbeiter: string;
  Farbe: string;
  Ort: string;
};

export const InventurRouter = createTRPCRouter({
  getYears: protectedProcedure.query(async () => {
    const folders = await readdir(DIRECTORY);

    return folders;
  }),
  getEntriesFromYear: protectedProcedure
    .input(
      z.object({
        year: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const path = join(DIRECTORY, input.year.toString());
      const file = await readFile(path + "/_ALL.json", "utf-8");
      const text = JSON.parse(file) as InventurAllJson[];
      return text;
    }),
  getEntriesFromTeam: protectedProcedure
    .input(
      z.object({
        team: z.string(),
        year: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const path = join(DIRECTORY, input.year.toString());
      const file = await readFile(path + `/${input.team}.json`, "utf-8");
      const text = JSON.parse(file) as InventurTeamJson[];
      return text;
    }),
  getMitarbeiterFromTeams: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        team: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const path = join(DIRECTORY, input.year.toString());
      const file = await readFile(path + `/_TEAMS.json`, "utf-8");
      const text = JSON.parse(file) as InventurTeamOrte[];
      const team = text.find((x) => x.Team === parseInt(input.team));
      return team;
    }),
});
