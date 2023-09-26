import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  Table,
  FormLabel,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
import { useState } from "react";

export default function Lieferanten() {
  const postQuery = api.Lieferanten.getLieferantenUndAnsprechpartner.useQuery();
  const { push } = useRouter();

  const [search, setSearch] = useState("");
  const [showLieferanten, setShowLieferanten] =
    useState<typeof postQuery.data>();

  if (postQuery.status !== "success") return <LoadingSpinner />;
  const Lieferanten = postQuery.data;
  if (postQuery.status === "success") setShowLieferanten(Lieferanten);

  const getSearchResults = () => {
    if (search == "" || search.length <= 0) {
      setShowLieferanten(Lieferanten);
      return;
    }

    const tmp: typeof postQuery.data = [];
    Lieferanten.map((l) => {
      if (l.Firma.toLowerCase().includes(search.toLowerCase())) tmp.push(l);
    });
    setShowLieferanten(tmp);
    return;
  };

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
          onClick={() => void push("/Telefonlisten/Lieferanten/new")}
        >
          Neuer Lieferant
        </Button>

        <FormGroup className="mb-3 mt-3">
          <FormLabel>Suche</FormLabel>
          <FormControl
            type="text"
            defaultValue={search}
            onChange={(e) => {
              setSearch(e.target.value);
              getSearchResults();
            }}
          />
        </FormGroup>

        <Table striped className="mt-2">
          <thead>
            <tr>
              <th scope="col">Firma</th>
              <th scope="col">Kundennummer</th>
              <th scope="col">Ansprechpartner</th>
              <th scope="col">Telefon</th>
              <th scope="col">Mobil</th>
              <th scope="col">Mail</th>
              <th scope="col">Website</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {showLieferanten &&
              showLieferanten.map((Lieferant) => (
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
                    {Lieferant.WebsiteName != undefined &&
                    Lieferant.WebsiteName.length > 0 &&
                    Lieferant.WebsiteUrl != undefined ? (
                      <a
                        href={Lieferant.WebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Lieferant.WebsiteName}
                      </a>
                    ) : (
                      <>-</>
                    )}
                  </th>
                  <th scope="row">
                    <Link
                      href={"/Telefonlisten/Lieferanten/" + Lieferant.id}
                      className="btn btn-outline-success"
                    >
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
