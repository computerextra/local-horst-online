import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

export default function WarenlieferungPage() {
  const [generiert, setGeneriert] = useState(false);
  const [Msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const Warenlieferung = api.Warenlieferung.get.useQuery();
  const WarenlieferungGenerator = api.Warenlieferung.generate.useMutation();
  const WarenlieferungsSender = api.Mail.sendWarenlieferung.useMutation();

  const generate = async () => {
    setLoading(true);
    await WarenlieferungGenerator.mutateAsync();
    setGeneriert(true);
    setLoading(false);
  };

  const sendMail = async () => {
    const res = await WarenlieferungsSender.mutateAsync();
    if (res === "Sent") {
      setMsg("Erfolg");
    } else {
      setMsg("Fehler");
    }
  };

  if (Warenlieferung.isLoading) {
    return <LoaderIcon />;
  }

  return (
    <>
      <SectionCard title="Warenlieferung Generator">
        <div className="grid grid-cols-2 gap-12">
          <Button variant="secondary" onClick={generate}>
            Generieren
          </Button>
          <Button
            variant="destructive"
            disabled={!generiert}
            onClick={sendMail}
          >
            Senden
          </Button>
        </div>
        <p className="text-2xl">{Msg}</p>
      </SectionCard>
      {loading ? (
        <div className="text-center text-9xl font-bold">BIN LADEN ...</div>
      ) : (
        <SectionCard title="Warenlieferung">
          {generiert && (
            <>
              <h2 className="my-4 text-2xl font-semibold underline">
                Neue Artikel
              </h2>
              <ul>
                {Warenlieferung.data?.map((item) => {
                  if (
                    new Date(item.angelegt).toDateString() ==
                    new Date().toDateString()
                  ) {
                    return (
                      <li key={item.id}>
                        <strong>{item.Artikelnummer}</strong>: {item.Name}
                      </li>
                    );
                  }
                })}
              </ul>
              <h2 className="my-4 text-2xl font-semibold underline">
                Gelieferte Artikel
              </h2>
              <ul>
                {Warenlieferung.data?.map((item) => {
                  if (
                    item.geliefert &&
                    new Date(item.geliefert).toDateString() ==
                      new Date().toDateString() &&
                    new Date(item.angelegt).toDateString() !=
                      new Date().toDateString()
                  ) {
                    return (
                      <li key={item.id}>
                        <strong>{item.Artikelnummer}</strong>: {item.Name}
                      </li>
                    );
                  }
                })}
              </ul>
              <h2 className="my-4 text-2xl font-semibold underline">
                Preisänderungen
              </h2>
              <ul>
                {Warenlieferung.data?.map((item) => {
                  if (
                    item.Preis &&
                    new Date(item.Preis).toDateString() ==
                      new Date().toDateString() &&
                    new Date(item.angelegt).toDateString() !=
                      new Date(item.Preis).toDateString() &&
                    item.AlterPreis &&
                    item.NeuerPreis &&
                    item.AlterPreis != item.NeuerPreis
                  ) {
                    return (
                      <li key={item.id}>
                        <strong>{item.Artikelnummer}</strong>: {item.Name} -&gt;{" "}
                        {item.AlterPreis.toString()} =&gt;{" "}
                        {item.NeuerPreis.toString()}
                      </li>
                    );
                  }
                })}
              </ul>
            </>
          )}
        </SectionCard>
      )}
    </>
  );
}
