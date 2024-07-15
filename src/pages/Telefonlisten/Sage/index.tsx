import Head from "next/head";
import type { sg_adressen } from "prisma/generated/Sage";
import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function SageSuche() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [reversed, setReversed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Results, setResults] = useState<undefined | null | sg_adressen[]>(
    undefined
  );

  const Search = api.KundenSuche.search.useMutation();
  const ReverseSearch = api.KundenSuche.searchReverse.useMutation();

  const handleSearch = async () => {
    if (search == null) return;
    setLoading(true);
    if (reversed) {
      const res = await ReverseSearch.mutateAsync({ search: search });
      if (res) {
        setResults(res);
        setLoading(false);
      }
    } else {
      const res = await Search.mutateAsync({ search: search });
      if (res) {
        setResults(res);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sage Suche | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Sage Suche</h1>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSearch();
          }}
        >
          <FormGroup className="mb-3 ">
            <FormCheck
              type="switch"
              checked={reversed}
              onChange={() => setReversed((prev) => !prev)}
              id="custom-switch"
              label="Rückwärts Suche?"
            />
          </FormGroup>
          <FormGroup className="mb-3 ">
            <FloatingLabel
              controlId="floatingInput"
              label={reversed ? "Telefonnummer" : "Kundennummer oder Name"}
              className="mb-3"
            >
              <FormControl
                type="text"
                placeholder="Suchbegriff"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FloatingLabel>
          </FormGroup>
          <Button className="mb-3 me-3" type="submit">
            Suchen
          </Button>
          <Button
            variant="secondary"
            className="mb-3"
            type="reset"
            onClick={() => {
              setSearch(undefined);
              setResults(undefined);
            }}
          >
            Reset
          </Button>
        </Form>
        {loading && <LoadingSpinner />}
        {!loading && Results === null && <p>Keine Ergebnisse</p>}
        {!loading && Results && Results.length < 1 && <p>Keine Ergebnisse</p>}
        {Results && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Kunde/Lieferant</th>
                <th>Debi- / Kreditorennummer</th>
                <th>Name</th>
                <th>Nummer</th>
                <th>Mobil</th>
                <th>Mail</th>
                <th>Umsatz</th>
              </tr>
            </thead>
            <tbody>
              {Results.map((r) => (
                <tr key={r.SG_Adressen_PK}>
                  <td>
                    {r.KundNr && r.KundNr.length > 1 ? "Kunde" : "Lieferant"}
                  </td>
                  <td>
                    {r.KundNr && r.KundNr.length > 1
                      ? r.KundNr
                      : r.KredNr && r.KredNr.length > 1
                      ? r.KredNr
                      : "FEHLER!"}
                  </td>
                  <td>{r.Suchbegriff}</td>
                  <td>
                    <ListGroup>
                      {r.Telefon1 && r.Telefon1.length > 1 && (
                        <ListGroupItem action href={`tel:${r.Telefon1}`}>
                          {r.Telefon1}
                        </ListGroupItem>
                      )}
                      {r.Telefon2 && r.Telefon2.length > 1 && (
                        <ListGroupItem action href={`tel:${r.Telefon2}`}>
                          {r.Telefon2}
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </td>
                  <td>
                    <ListGroup>
                      {r.Mobiltelefon1 && r.Mobiltelefon1.length > 1 && (
                        <ListGroupItem action href={`tel:${r.Mobiltelefon1}`}>
                          {r.Mobiltelefon1}
                        </ListGroupItem>
                      )}
                      {r.Mobiltelefon2 && r.Mobiltelefon2.length > 1 && (
                        <ListGroupItem action href={`tel:${r.Mobiltelefon2}`}>
                          {r.Mobiltelefon2}
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </td>
                  <td>
                    <ListGroup>
                      {r.EMail1 && r.EMail1.length > 1 && (
                        <ListGroupItem action href={`mailto:${r.EMail1}`}>
                          {r.EMail1}
                        </ListGroupItem>
                      )}
                      {r.EMail2 && r.EMail2.length > 1 && (
                        <ListGroupItem action href={`mailto:${r.EMail2}`}>
                          {r.EMail2}
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </td>
                  <td>
                    {r.KundUmsatz
                      ? r.KundUmsatz.toFixed(2) + "€"
                      : r.LiefUmsatz
                      ? r.LiefUmsatz.toFixed(2) + "€"
                      : "-"}
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
