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
import type { Anschprechpartner } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Anschprechpartner>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Telefon",
    header: "Telefon",
    cell: ({ row }) => {
      const AP = row.original;
      return AP.Telefon ? (
        <a className="text-blue-900 underline" href={"tel:" + AP.Telefon}>
          {AP.Telefon}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Mobil",
    header: "Mobil",
    cell: ({ row }) => {
      const AP = row.original;
      return AP.Mobil ? (
        <a className="text-blue-900 underline" href={"tel:" + AP.Mobil}>
          {AP.Mobil}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Mail",
    header: "Mail",
    cell: ({ row }) => {
      const AP = row.original;
      return AP.Mail ? (
        <a className="text-blue-900 underline" href={"mailto:" + AP.Mail}>
          {AP.Mail}
        </a>
      ) : (
        "-"
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const AP = row.original;
      const APLöscher = api.Ansprechpartner.delete.useMutation();
      const handleDelete = async () => {
        await APLöscher.mutateAsync(AP.id);
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
              <Link href={`/Telefon/Lieferanten/Ansprechpartner/${AP.id}/`}>
                Bearbeiten
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
