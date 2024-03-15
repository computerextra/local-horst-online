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
import type { Mitarbeiter } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Mitarbeiter>[] = [
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Gruppenwahl",
    header: "Gruppe",
  },
  {
    accessorKey: "InternTelefon1",
    header: "Tel. 1",
  },
  {
    accessorKey: "InternTelefon2",
    header: "Tel. 2",
  },
  {
    accessorKey: "FestnetzAlternativ",
    header: "Tel.",
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      return mitarbeiter.FestnetzAlternativ ? (
        <a className="underline" href={`tel:${mitarbeiter.FestnetzAlternativ}`}>
          {mitarbeiter.FestnetzAlternativ}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "FestnetzPrivat",
    header: "Tel. Priv",
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      return mitarbeiter.FestnetzPrivat ? (
        <a className="underline" href={`tel:${mitarbeiter.FestnetzPrivat}`}>
          {mitarbeiter.FestnetzPrivat}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "HomeOffice",
    header: "HomeOffice",
  },
  {
    accessorKey: "MobilBusiness",
    header: "Mobil Bus.",
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      return mitarbeiter.MobilBusiness ? (
        <a className="underline" href={`tel:${mitarbeiter.MobilBusiness}`}>
          {mitarbeiter.MobilBusiness}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "MobilPrivat",
    header: "Mobil Priv.",
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      return mitarbeiter.MobilPrivat ? (
        <a className="underline" href={`tel:${mitarbeiter.MobilPrivat}`}>
          {mitarbeiter.MobilPrivat}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      return mitarbeiter.Email ? (
        <a className="underline" href={`mailto:${mitarbeiter.Email}`}>
          {mitarbeiter.Email}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "Azubi",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Azubi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      return mitarbeiter.Azubi ? (
        <Check color="#27b41d" />
      ) : (
        <X color="#b41d1d" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mitarbeiter = row.original;
      const MitarbeiterLöscher = api.Mitarbeiter.delete.useMutation();
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
              <Link href={`/Telefon/Mitarbeiter/${mitarbeiter.id}/`}>
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
