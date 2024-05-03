import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, FloatingLabel, FormControl, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import type { InventurAllJson } from "~/server/api/routers/inventur";
import { api } from "~/utils/api";

export default function Jahr() {
  const router = useRouter();
  const { year } = router.query;
  const Suche = api.Inventur.getEntriesFromYear.useMutation();
  const { isAdmin } = useAdmin();

  const [entries, setEntries] = useState<InventurAllJson[] | undefined | null>(
    undefined
  );
  const [showEntries, setShowEntries] = useState<
    InventurAllJson[] | undefined | null
  >(undefined);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (input.length <= 0) {
      setShowEntries(entries);
      return;
    }

    const tmp: InventurAllJson[] = [];

    entries?.forEach((entry) => {
      if (entry.Artikelnummer.toLocaleLowerCase().includes(input)) {
        tmp.push(entry);
      }
      if (entry.Suchbegriff.toLocaleLowerCase().includes(input)) {
        tmp.push(entry);
      }
    });

    // Make entries unique
    const u: InventurAllJson[] = [];
    for (const entry of tmp) {
      if (u.indexOf(entry) === -1) {
        u.push(entry);
      }
    }
    setShowEntries(u);
  }, [input, entries]);

  useEffect(() => {
    async function x() {
      if (year == null) return;
      setLoading(true);
      const entries = await Suche.mutateAsync({
        year: parseInt(year as string),
      });
      if (entries) {
        setEntries(entries);
        setShowEntries(entries);
      }
      setLoading(false);
    }
    void x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  if (!isAdmin)
    return (
      <Container>
        <h1>Kein Admin</h1>
      </Container>
    );

  return (
    <>
      <Head>
        <title>Inventur Daten | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Inventur von {year}</h1>
        {loading && <LoadingSpinner />}
        <FloatingLabel
          controlId="floatingInput"
          label="Artikelnummer | Suchbegriff"
          className="mb-3"
        >
          <FormControl
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Artikelnummer"
          />
        </FloatingLabel>
        {!loading && entries && entries.length > 0 && (
          <Table striped hover>
            <thead>
              <tr>
                <th>Artikelnummer</th>
                <th>Suchbegriff</th>
                <th>Anzahl</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {showEntries?.map((x, idx) => (
                <tr key={idx}>
                  <td>{x.Artikelnummer}</td>
                  <td>{x.Suchbegriff}</td>
                  <td>{x.Anzahl}</td>
                  <td>
                    <Link
                      href={`/Service/Inventur/${year as string}/${x.Team}`}
                    >
                      {x.Team}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
