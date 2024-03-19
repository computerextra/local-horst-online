import SectionCard from "@/components/SectionCard";
import { api } from "@/utils/api";
import Head from "next/head";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function MitarbeiterPage() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();

  if (Mitarbeiter.isLoading) return <p>Loading...</p>;

  const data = Mitarbeiter.data ?? [];

  return (
    <>
      <Head>
        <title>LocalHorst V9 | Mitarbeiter</title>
      </Head>
      <SectionCard title="Mitarbeiter Übersicht">
        <DataTable columns={columns} data={data} />
      </SectionCard>
    </>
  );
}
