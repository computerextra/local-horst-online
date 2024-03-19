import SectionCard from "@/components/SectionCard";
import { api } from "@/utils/api";
import Head from "next/head";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function LieferantenPage() {
  const Lieferanten = api.Lieferant.getAll.useQuery();

  if (Lieferanten.isLoading) return <p>Loading...</p>;

  const data = Lieferanten.data ?? [];
  return (
    <>
      <Head>
        <title>LocalHorst V9 | Lieferanten</title>
      </Head>
      <SectionCard title="Lieferanten Übersicht">
        <DataTable columns={columns} data={data} />
      </SectionCard>
    </>
  );
}
