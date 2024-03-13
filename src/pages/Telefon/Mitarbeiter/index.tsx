import SectionCard from "@/components/SectionCard";
import { api } from "@/utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MitarbeiterPage() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();

  if (Mitarbeiter.isLoading) return <p>Loading...</p>;

  const data = Mitarbeiter.data ?? [];

  return (
    <SectionCard title="Mitarbeiter Übersicht">
      <DataTable columns={columns} data={data} />
    </SectionCard>
  );
}
