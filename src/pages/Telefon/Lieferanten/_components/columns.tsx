"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/utils/api";
import type { Lieferanten } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import APTable from "../Ansprechpartner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<
  Lieferanten & {
    Anschprechpartner: {
      id: string;
      Name: string;
      Telefon: string | null;
      Mobil: string | null;
      Mail: string | null;
      lieferantenId: string | null;
    }[];
  }
>[] = [
  {
    accessorKey: "Firma",
    header: "Firma",
  },
  {
    accessorKey: "Kundennummer",
    header: "Kundennummer",
  },
  {
    accessorKey: "Webseite",
    header: "Webseite",
    cell: ({ row }) => {
      const lieferant = row.original;
      return lieferant.Webseite ? (
        <a
          href={lieferant.Webseite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 underline"
        >
          {
            lieferant.Webseite.replace("https://", "")
              .replace("www.", "")
              .split("/")[0]
          }
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Ansprechpartner",
    header: "Ansprechpartner",
    cell: ({ row }) => {
      const lieferant = row.original;
      return (
        <APTable
          data={lieferant.Anschprechpartner.sort((a, b) =>
            a.Name.localeCompare(b.Name),
          )}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      const MitarbeiterLöscher = api.Lieferant.delete.useMutation();
      const handleDelete = async () => {
        await MitarbeiterLöscher.mutateAsync(mitarbeiter.id);
        location.reload();
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/Telefon/Lieferanten/${mitarbeiter.id}/`}>
                Bearbeiten
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/Telefon/Lieferanten/Ansprechpartner/new/${mitarbeiter.id}`}
              >
                Neuer Ansprechpartner
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Löschen</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
