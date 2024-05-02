import { type Warenlieferung } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function WarenlieferungPage() {
  const { isAdmin } = useAdmin();
  const { data: sessionData } = useSession();

  const Warenlieferung = api.Warenlieferung.get.useQuery();
  const Generator = api.Warenlieferung.generate.useMutation();
  const Mailer = api.Mail.WarenlieferungsMail.useMutation();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [neu, setNeu] = useState<undefined | Warenlieferung[]>(undefined);
  const [wieder, setWieder] = useState<undefined | Warenlieferung[]>(undefined);
  const [preis, setPreis] = useState<undefined | Warenlieferung[]>(undefined);

  useEffect(() => {
    if (Warenlieferung.data) {
      setLoading(true);
      const heute = new Date().toDateString();
      const neueArtikel: Warenlieferung[] = [];
      const wiederLagernd: Warenlieferung[] = [];
      const neuerPreis: Warenlieferung[] = [];
      Warenlieferung.data.forEach((x) => {
        if (x.angelegt.toDateString() == heute) {
          neueArtikel.push(x);
        } else if (x.geliefert?.toDateString() == heute) {
          wiederLagernd.push(x);
        }

        if (x.Preis?.toDateString() == heute) {
          neuerPreis.push(x);
        }
      });
      setNeu(neueArtikel);
      setWieder(wiederLagernd);
      setPreis(neuerPreis);
      setLoading(false);
    }
  }, [Warenlieferung.data]);

  const generate = async () => {
    setLoading(true);
    const res = await Generator.mutateAsync();
    if (res) {
      location.reload();
    }
  };

  const sendMail = async () => {
    setLoading(true);
    const res = await Mailer.mutateAsync();
    if (res) {
      setSent(true);
      setLoading(false);
    }
  };

  if (sessionData == null)
    return (
      <Container>
        <h1>Nicht angemeldet</h1>
      </Container>
    );

  if (!isAdmin)
    return (
      <Container>
        <h1>Kein Admin</h1>
      </Container>
    );

  const diff = (a: Decimal | null, b: Decimal | null): string => {
    if (a == null || b == null) return "0";
    // @ts-expect-error Prisma Decimal ist noch nicht so wirklich nutzbar.
    const diff = a - b;
    return diff.toFixed(2);
  };

  const diffProzent = (a: Decimal | null, b: Decimal | null): string => {
    if (a == null || b == null) return "0";
    // @ts-expect-error Prisma Decimal ist noch nicht so wirklich nutzbar.
    const percent = (diff(a, b) / a) * 100;
    return percent < 0
      ? (percent * -1).toFixed(2) + "% Teurer"
      : percent.toFixed(2) + "% Billiger";
  };

  return (
    <Container>
      <h1>Warenlieferung</h1>
      {!sent && (
        <>
          <Button className="me-3" onClick={generate} disabled={loading}>
            Generate
          </Button>
          <Button onClick={sendMail} disabled={loading}>
            Send Mail
          </Button>
        </>
      )}
      {sent && !loading && <h2 className="text-success">Mail versendet!</h2>}
      {loading && <LoadingSpinner />}
      {Warenlieferung.isLoading && <LoadingSpinner />}
      {!loading && !Warenlieferung.isLoading && Warenlieferung.data && (
        <>
          {neu && neu.length > 0 && (
            <Table hover className="table-sm caption-top">
              <caption>Neue Artikel</caption>
              <thead>
                <tr>
                  <th>Artikelnummer</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {neu.map((x) => (
                  <tr key={x.id}>
                    <td>{x.Artikelnummer}</td>
                    <td>{x.Name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {wieder && wieder.length > 0 && (
            <Table hover className="table-sm caption-top">
              <caption>Wieder Lagernde Artikel</caption>
              <thead>
                <tr>
                  <th>Artikelnummer</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {wieder.map((x) => (
                  <tr key={x.id}>
                    <td>{x.Artikelnummer}</td>
                    <td>{x.Name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {preis && preis.length > 0 && (
            <Table hover className="table-sm caption-top">
              <caption>Neue Preise</caption>
              <thead>
                <tr>
                  <th>Artikelnummer</th>
                  <th>Name</th>
                  <th>Alter Preis</th>
                  <th>Neuer Preis</th>
                  <th>Differenz €</th>
                  <th>Differenz %</th>
                </tr>
              </thead>
              <tbody>
                {preis.map((x) => {
                  if (parseInt(diff(x.AlterPreis, x.NeuerPreis)) > 0)
                    return (
                      <tr key={x.id}>
                        <td>{x.Artikelnummer}</td>
                        <td>{x.Name}</td>
                        <td>{x.AlterPreis ? <>{x.AlterPreis}</> : "n/a"}</td>
                        <td>{x.NeuerPreis ? <>{x.NeuerPreis}</> : "n/a"}</td>
                        <td>{diff(x.AlterPreis, x.NeuerPreis)}</td>
                        <td>{diffProzent(x.AlterPreis, x.NeuerPreis)}</td>
                      </tr>
                    );
                })}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
}
