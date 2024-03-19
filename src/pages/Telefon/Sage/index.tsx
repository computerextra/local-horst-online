import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "@/utils/api";
import Head from "next/head";
import type { sg_adressen } from "prisma/generated/Sage";
import { useState } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function SageSearch() {
  const [Suche, setSuche] = useState<"N" | "R">("N");
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Results, setResults] = useState<sg_adressen[]>([]);

  const SageSucher = api.Sage.search.useMutation();
  const SageReverseSucher = api.Sage.searchReverse.useMutation();

  const handleSearch = async () => {
    if (term.length < 3) return;
    setIsLoading(true);
    const response = await SageSucher.mutateAsync(term);
    if (response != null) {
      setResults(response);
    }
    setIsLoading(false);
  };
  const handleReverseSearch = async () => {
    if (term.length < 3) return;
    setIsLoading(true);
    const response = await SageReverseSucher.mutateAsync(term);
    if (response != null) {
      setResults(response);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>LocalHorst V9 | Sage Suche</title>
      </Head>
      <SectionCard title="Kunden- und Lieferanten Suche im SAGE">
        <div className="mb-5 flex items-center space-x-2">
          <Switch
            id="mode"
            onCheckedChange={() =>
              setSuche((prev) => (prev === "N" ? "R" : "N"))
            }
          />
          <Label htmlFor="mode">
            {Suche === "N" ? "Normale Suche" : "Rückwärts Suche"}
          </Label>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder={Suche === "N" ? "Suchbegriff" : "Telefonnummer"}
          />
          <Button
            onClick={() =>
              Suche === "N" ? void handleSearch() : void handleReverseSearch()
            }
          >
            Suchen
          </Button>
        </div>
      </SectionCard>
      <SectionCard title="Suchergebnisse">
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={Results} />
          </div>
        )}
      </SectionCard>
    </>
  );
}
