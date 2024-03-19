"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import type { sg_adressen } from "prisma/generated/Sage";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<sg_adressen>[] = [
  {
    accessorKey: "KundNr",
    header: "Kunde",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.KundNr && erg.KundNr.length > 1 ? (
        <Check color="#27b41d" />
      ) : (
        <X color="#b41d1d" />
      );
    },
  },
  {
    accessorKey: "KundNr",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kunden- / Lieferanten Nummer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const erg = row.original;
      return erg.KundNr && erg.KundNr.length > 1
        ? erg.KundNr
        : erg.KredNr && erg.KredNr.length > 1
          ? erg.KredNr
          : "FEHLER!";
    },
  },
  {
    accessorKey: "Suchbegriff",
    header: "Name",
  },
  {
    accessorKey: "Telefon1",
    header: "Telefon1",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.Telefon1 ? (
        <a className="text-blue-900 underline" href={`tel:${erg.Telefon1}`}>
          {erg.Telefon1}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Telefon2",
    header: "Telefon2",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.Telefon2 ? (
        <>
          <a className="text-blue-900 underline" href={`tel:${erg.Telefon2}`}>
            {erg.Telefon2}
          </a>
        </>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Mobiltelefon1",
    header: "Mobiltelefon1",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.Mobiltelefon1 ? (
        <>
          <a
            className="text-blue-900 underline"
            href={`tel:${erg.Mobiltelefon1}`}
          >
            {erg.Mobiltelefon1}
          </a>
        </>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Mobiltelefon2",
    header: "Mobiltelefon2",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.Mobiltelefon2 ? (
        <>
          <a
            className="text-blue-900 underline"
            href={`tel:${erg.Mobiltelefon2}`}
          >
            {erg.Mobiltelefon2}
          </a>
        </>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "EMail1",
    header: "EMail1",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.EMail1 ? (
        <>
          <a className="text-blue-900 underline" href={`mailto:${erg.EMail1}`}>
            {erg.EMail1}
          </a>
        </>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "EMail2",
    header: "EMail2",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.EMail2 ? (
        <>
          <a className="text-blue-900 underline" href={`mailto:${erg.EMail2}`}>
            {erg.EMail2}
          </a>
        </>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "KundUmsatz",
    header: "Umsatz in €",
    cell: ({ row }) => {
      const erg = row.original;
      return erg.KundUmsatz
        ? erg.KundUmsatz.toFixed(2)
        : erg.LiefUmsatz
          ? erg.LiefUmsatz.toFixed(2)
          : "-";
    },
  },
];
