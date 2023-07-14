import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Lieferanten() {
  const postQuery = api.Lieferanten.getLieferantenUndAnsprechpartner.useQuery();
  const { push } = useRouter();
  if (postQuery.status !== "success") return <LoadingSpinner />;

  const Lieferanten = postQuery.data;

  return (
    <>
      <Head>
        <title>Lieferanten Liste | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Telefonliste Lieferanten</h1>
        <Button
          className="mb-5"
          variant="success"
          onClick={() => void push("/Telefonlisten/Lieferanten/new")}>
          Neuer Lieferant
        </Button>

        <Table
          striped
          className="mt-2">
          <thead>
            <tr>
              <th scope="col">Firma</th>
              <th scope="col">Kundennummer</th>
              <th scope="col">Ansprechpartner</th>
              <th scope="col">Telefon</th>
              <th scope="col">Mobil</th>
              <th scope="col">Mail</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Lieferanten.map((Lieferant) => (
              <tr key={Lieferant.id}>
                <th scope="row">{Lieferant.Firma}</th>
                <th scope="row">{Lieferant.Kundennummer}</th>
                <th scope="row">
                  {Lieferant.Ansprechpartner &&
                    Lieferant.Ansprechpartner.map((ap) => (
                      <p key={ap.id}>{ap.Name}</p>
                    ))}
                </th>
                <th scope="row">
                  {Lieferant.Ansprechpartner &&
                    Lieferant.Ansprechpartner.map((ap) => (
                      <p key={ap.id}>
                        {ap.Telefon && ap.Telefon.length > 1 ? (
                          <a href={`tel:${ap.Telefon}`}>{ap.Telefon}</a>
                        ) : (
                          " - "
                        )}
                      </p>
                    ))}
                </th>
                <th scope="row">
                  {Lieferant.Ansprechpartner &&
                    Lieferant.Ansprechpartner.map((ap) => (
                      <p key={ap.id}>
                        {ap.Mobil && ap.Mobil.length > 1 ? (
                          <a href={`tel:${ap.Mobil}`}>{ap.Mobil}</a>
                        ) : (
                          " - "
                        )}
                      </p>
                    ))}
                </th>
                <th scope="row">
                  {Lieferant.Ansprechpartner &&
                    Lieferant.Ansprechpartner.map((ap) => (
                      <p key={ap.id}>
                        {ap.Mail && ap.Mail.length > 1 ? (
                          <a href={`mailto:${ap.Mail}`}>{ap.Mail}</a>
                        ) : (
                          " - "
                        )}
                      </p>
                    ))}
                </th>
                <th scope="row">
                  <Link
                    href={"/Telefonlisten/Lieferanten/" + Lieferant.id}
                    className="btn btn-outline-success">
                    Bearbeiten
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
