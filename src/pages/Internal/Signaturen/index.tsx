import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/api";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function SignaturePage() {
  const Mitarbeiter = api.Mitarbeiter.getBirthday.useQuery();
  const Download = api.Mitarbeiter.downloadSignature.useMutation();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [gelesen, setGelesen] = useState(false);

  if (Mitarbeiter.isLoading) return <p>Loading...</p>;

  const handleDownload = async () => {
    console.log("Click");
    // Get Mitarbeiter
    const mitarbeiter = Mitarbeiter.data?.find((x) => x.id === selectedId);
    if (mitarbeiter == null) return;
    if (mitarbeiter.Email == null) return;
    console.log("Mitarbeiter da.");
    const file = await Download.mutateAsync({
      name: mitarbeiter.Name,
      email: mitarbeiter.Email,
    });
    console.log("Datei angelegt?");
    if (file == null) return;
    console.log("Datei da");
    const a = document.createElement("a");
    a.href = "data:application/bat;base64," + file;
    a.download = "install.bat";
    a.click();
    setGelesen(false);
    setSelectedId(undefined);
  };

  return (
    <>
      <Head>
        <title>LocalHorst V9 | Signaturen</title>
      </Head>
      <SectionCard title="So geht's">
        <ol className="list-decimal ps-5">
          <li>Erst lesen, dann klicken!</li>
          <li>
            Auswählen, von welchem Mitarbeiter die Signaturen installiert werden
            sollen.
          </li>
          <li>
            <strong>Wichtig:</strong> Die Signaturen haben das Format: Vorname
            Nachname (Email Adresse). <br />
            Falls eine Signatur mit diesem Namen bereits vorhanden ist, wird
            diese ohne Nachfrage überschrieben!
          </li>
          <li>Auf Download drücken</li>
          <li>Outlook schließen</li>
          <li>Die Datei &quot;install&quot; ausführen</li>
          <li>
            Outlook öffnen und die neue Signatur hinterlegen. (
            <Link href="/Internal/Signaturen/Wiki" className="underline">
              Anleitung
            </Link>
            )
          </li>
          <li>
            Fertig! Die Datei &quot;install&quot; kann nun gelöscht werden.
          </li>
        </ol>
      </SectionCard>
      <SectionCard title="Signaturen">
        {!gelesen && (
          <Button onClick={() => setGelesen(true)}>Gelesen?!</Button>
        )}
        {gelesen && (
          <div className="flex gap-5">
            <Select required value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-[280px]">
                <SelectValue
                  placeholder="Mitarbeiter Auswahl"
                  aria-label={selectedId}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Mitarbeiter.data?.map((mitarbeiter) => {
                    if (mitarbeiter.Short && mitarbeiter.Email) {
                      return (
                        <SelectItem key={mitarbeiter.id} value={mitarbeiter.id}>
                          {mitarbeiter.Name}
                        </SelectItem>
                      );
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit" onClick={handleDownload}>
              Download
            </Button>
          </div>
        )}
      </SectionCard>
    </>
  );
}
