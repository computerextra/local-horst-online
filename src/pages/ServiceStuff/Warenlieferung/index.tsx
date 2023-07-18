import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Warenlieferung() {
  const [loading, setLoading] = useState(false);
  const WarenlieferungRes = api.Warenlieferung.getWarenlieferung.useQuery();
  const Warenlieferung = WarenlieferungRes.data;
  const Generator = api.Warenlieferung.generate.useMutation();
  const Mailer = api.Mail.sendWarenlieferung.useMutation();

  const [notAllowed, setNotAllowed] = useState(true);

  const [NeueArtikel, setNeueArtikel] = useState<typeof Warenlieferung>([]);
  const [GelieferteArtikel, setGelieferteArtikel] = useState<
    typeof Warenlieferung
  >([]);
  const [NeuePreise, setNeuePreise] = useState<typeof Warenlieferung>([]);

  const [MailResponse, setMailResponse] = useState<string | null>(null);

  const Generate = async () => {
    setLoading(true);
    await Generator.mutateAsync();
    location.reload();
  };

  const SendMail = async () => {
    const res = await Mailer.mutateAsync();
    if (res === "No Data") setMailResponse("Keine Daten zum versenden");
    if (res === "Sent") setMailResponse("Mail gesendet");
    else setMailResponse(res);
  };

  useEffect(() => {
    if (Warenlieferung == null) return;
    const Heute = new Date().toDateString();
    const Neu: typeof Warenlieferung = [];
    const Alt: typeof Warenlieferung = [];
    const Preis: typeof Warenlieferung = [];

    if (Warenlieferung.length < 1) {
      setNotAllowed(true);
    } else {
      setNotAllowed(false);
    }

    Warenlieferung.forEach((Ware) => {
      if (Ware.Neu && new Date(Ware.Neu).toDateString() === Heute) {
        Neu.push(Ware);
      }
      if (
        Ware.Geliefert &&
        new Date(Ware.Geliefert).toDateString() === Heute &&
        Ware.Neu &&
        new Date(Ware.Neu).toDateString() !== Heute
      ) {
        Alt.push(Ware);
      }
      if (
        Ware.Modifiziert &&
        new Date(Ware.Modifiziert).toDateString() === Heute &&
        Ware.Neu &&
        new Date(Ware.Neu).toDateString() !== Heute
      ) {
        Preis.push(Ware);
      }
    });
    setNeueArtikel(Neu);
    setGelieferteArtikel(Alt);
    setNeuePreise(Preis);
  }, [Warenlieferung]);

  if (WarenlieferungRes.status !== "success") return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Warenlieferung | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Warenlieferung</h1>
        <p>
          Immer erst generieren, dann senden. Falls direkt gesendet wird, wird
          eine leere Email versendet.
        </p>

        <Button
          variant="success"
          className={`me-5 `}
          style={{ cursor: "pointer" }}
          onClick={() => void Generate()}>
          Generate
        </Button>
        <Button
          className={`${notAllowed ? "disabled" : ""}`}
          // style={{ cursor: "pointer" }}
          style={{ cursor: `${notAllowed ? "not-allowed" : "pointer"}` }}
          onClick={() => void SendMail()}>
          Versenden
        </Button>
        {MailResponse != null && <p>{MailResponse}</p>}
        <hr />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2>Aktuelle Warenlieferungsmail</h2>
            {NeueArtikel && NeueArtikel.length > 0 && (
              <>
                <h3>Neue Artikel</h3>
                <ul>
                  {NeueArtikel.map((i) => (
                    <li key={i.id}>
                      <b>{i.Artikelnummer}</b>: {i.Artikelname}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {GelieferteArtikel && GelieferteArtikel.length > 0 && (
              <>
                <h3>Heute geliefert</h3>
                <ul>
                  {GelieferteArtikel.map((i) => (
                    <li key={i.id}>
                      <b>{i.Artikelnummer}</b>: {i.Artikelname}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {NeuePreise && NeuePreise.length > 0 && (
              <>
                <h3>Preisänderungen</h3>
                <ul>
                  {NeuePreise.map((i) => (
                    <li key={i.id}>
                      <b>{i.Artikelnummer}</b>: {i.Artikelname} - Alt:{" "}
                      {i.AlterPreis}€ ={">"} Neu: {i.NeuerPreis}€
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
