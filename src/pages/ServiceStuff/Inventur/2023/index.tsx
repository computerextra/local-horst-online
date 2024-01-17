import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, FormCheck, FormControl, Table } from "react-bootstrap";
import { api } from "~/utils/api";

export default function Uebersicht() {
  const [showAll, setShowAll] = useState(false);
  const all = api.File.getAllInventur.useQuery({ year: 2023 });
  const [search, setSearch] = useState("");
  const [res, setRes] = useState(all.data);

  useEffect(() => {
    if (all == null) return;
    if (all.data == null) return;
    if (search == "") setRes(all.data);

    const res = all.data.filter((file) => {
      return file.Artikelnummer.includes(search);
    });
    setRes(res);
  }, [search, all]);

  return (
    <>
      <Head>
        <title>Inventur | LocalHorst v7</title>
      </Head>
      <Container className="mt-2">
        <h1 className="text-center">Inventur Übersicht 2023</h1>
        <FormCheck
          type="switch"
          id="teams"
          label="Alle Einträge anzeigen"
          onChange={() => setShowAll(!showAll)}
          defaultChecked={showAll}
        />
        {showAll && (
          <>
            <FormControl
              className="mt-2 mb-2"
              placeholder="Suche nach Artikelnummer..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Table striped>
              <thead>
                <tr>
                  <th>Artikelnummer</th>
                  <th>Suchbegriff</th>
                  <th>Anzahl</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {res?.map((file, idx) => (
                  <tr key={idx}>
                    <td>{file.Artikelnummer.trim()}</td>
                    <td>{file.Suchbegriff.trim()}</td>
                    <td>{file.Anzahl}</td>
                    <td>
                      <Link href={`/ServiceStuff/Inventur/2023/${file.Team}`}>
                        {file.Team}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        {!showAll && (
          <Table striped>
            <thead>
              <tr>
                <th>Team/Ort Nr.</th>
                <th>Mitwirkende</th>
                <th>Farbe</th>
                <th>Ort</th>
              </tr>
            </thead>
            <tbody>
              <InventurRow
                Team="215"
                Mitarbeiter="Ingo Ernst"
                Farbe="weiß"
                Ort="Büro oben"
              />
              <InventurRow
                Team="216"
                Mitarbeiter="Johannes Kirchner / Christoph Salowski"
                Farbe="Lila"
                Ort="Lager"
              />
              <InventurRow
                Team="217"
                Mitarbeiter="Claus Bayer, Vladyslav Hapan"
                Farbe="schwarz"
                Ort="Werkstatt hinten"
              />
              <InventurRow
                Team="218"
                Mitarbeiter="Weber / Silber"
                Farbe="Lila"
                Ort="Tintenwand"
              />
              <InventurRow
                Team="219"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Kabelwand"
              />
              <InventurRow
                Team="220"
                Mitarbeiter="Fabian/Tim/Max"
                Farbe="weiß"
                Ort="Außendienst"
              />
              <InventurRow
                Team="221"
                Mitarbeiter="Weber / Silber"
                Farbe="Lila"
                Ort="Tresen"
              />
              <InventurRow
                Team="222"
                Mitarbeiter="Weber / Silber"
                Farbe="Lila"
                Ort="Telekom Ecke"
              />
              <InventurRow
                Team="223"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Unter der Kasse"
              />
              <InventurRow
                Team="224"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Auf der Kasse"
              />
              <InventurRow
                Team="225"
                Mitarbeiter="Claus Bayer, Vladyslav Hapan"
                Farbe="schwarz"
                Ort="Werkstatt vorne"
              />
              <InventurRow
                Team="226"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Ecke mit Tüten bei Kasse"
              />
              <InventurRow
                Team="227"
                Mitarbeiter="Claus Bayer, Maximilian Rau"
                Farbe="weiß"
                Ort="Verkaufsraum"
              />
              <InventurRow
                Team="228"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Notebooktische"
              />
              <InventurRow
                Team="229"
                Mitarbeiter="Weber / Silber"
                Farbe="blau"
                Ort="TFT/PC/Notebook Regal"
              />
              <InventurRow
                Team="230"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Notebooktaschen"
              />
              <InventurRow
                Team="231"
                Mitarbeiter="Johannes Kirchner / Christoph Salowski"
                Farbe="Lila"
                Ort="Flur"
              />
              <InventurRow
                Team="232"
                Mitarbeiter="Johannes Kirchner / Christoph Salowski"
                Farbe="Lila"
                Ort="Pausenraum"
              />
              <InventurRow
                Team="233"
                Mitarbeiter="Johannes Kirchner / Christoph Salowski"
                Farbe="Lila"
                Ort="Keller"
              />
              <InventurRow
                Team="234"
                Mitarbeiter="Philip & Felix"
                Farbe="gelb"
                Ort="Vitrine bei Kasse"
              />
              <InventurRow
                Team="235"
                Mitarbeiter="Christoph Salowski, Maximilian Rau"
                Farbe="weiß"
                Ort="Tasaturregal, Mausregal"
              />
              <InventurRow
                Team="236"
                Mitarbeiter="Weber / Silber"
                Farbe="blau"
                Ort="Regal Telekom Ecke"
              />
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

function InventurRow({
  Team,
  Mitarbeiter,
  Farbe,
  Ort,
}: {
  Team: string;
  Mitarbeiter: string;
  Farbe: string;
  Ort: string;
}) {
  return (
    <tr>
      <th>
        <Link href={`/ServiceStuff/Inventur/2023/${Team}`}>{Team}</Link>
      </th>
      <th>{Mitarbeiter}</th>
      <th>{Farbe}</th>
      <th>{Ort}</th>
    </tr>
  );
}
