import type { Anschprechpartner } from "@prisma/client";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function APTable({ data }: { data: Anschprechpartner[] }) {
  return <DataTable columns={columns} data={data} />;
}
