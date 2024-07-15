import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import type {
  InventurTeamJson,
  InventurTeamOrte,
} from "~/server/api/routers/inventur";
import { api } from "~/utils/api";

export default function Team() {
  const router = useRouter();
  const { team, year } = router.query;
  const { isAdmin } = useAdmin();
  const Suche = api.Inventur.getEntriesFromTeam.useMutation();
  const TeamInfo = api.Inventur.getMitarbeiterFromTeams.useMutation();

  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<InventurTeamJson[] | undefined | null>(
    undefined
  );
  const [info, setInfo] = useState<undefined | InventurTeamOrte>(undefined);

  useEffect(() => {
    async function x() {
      if (team == null || year == null) return;
      setLoading(true);
      const erg = await Suche.mutateAsync({
        team: team as string,
        year: parseInt(year as string),
      });
      const x = await TeamInfo.mutateAsync({
        year: parseInt(year as string),
        team: team as string,
      });
      if (x) {
        setInfo(x);
      }
      if (erg) {
        setEntries(erg);
        setLoading(true);
      }
      setLoading(false);
    }
    void x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, year]);

  if (!isAdmin)
    return (
      <Container>
        <h1>Nicht angemeldet!</h1>
      </Container>
    );

  return (
    <>
      <Head>
        <title>Inventur Team | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Team: {team}</h1>
        {loading && <LoadingSpinner />}
        {!loading && info && (
          <Table>
            <tr>
              <th>Mitarbeiter</th>
              <td>{info.Mitarbeiter}</td>
            </tr>
            <tr>
              <th>Farbe</th>
              <td>{info.Farbe}</td>
            </tr>
            <tr>
              <th>Ort</th>
              <td>{info.Ort}</td>
            </tr>
          </Table>
        )}
        {!loading && entries && entries.length > 0 && (
          <Table striped hover>
            <thead>
              <tr>
                <th>Artikelnummer</th>
                <th>Suchbegriff</th>
                <th>Anzahl</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, idx) => (
                <tr key={idx}>
                  <td>{e.Artikelnummer}</td>
                  <td>{e.Suchbegriff}</td>
                  <td>{e.Anzahl}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
