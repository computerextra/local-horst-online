import Head from "next/head";
import type { sg_adressen } from "prisma/generated/Sage";
import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormSelect,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Sage() {
  const [Suche, setSuche] = useState<string>("N");
  const [isLoading, setIsLoading] = useState(false);
  const [Results, setResults] = useState<sg_adressen[]>([]);

  const SageSearcher = api.Sage.search.useMutation();
  const SageReverseSearcher = api.Sage.reverseSearch.useMutation();

  const handleSearch = async (input: string) => {
    if (input.length < 3) return;

    setIsLoading(true);
    const response = await SageSearcher.mutateAsync({ searchTerm: input });
    if (response != null) {
      setResults(response);
    }
    setIsLoading(false);
  };
  const handleReverseSearch = async (input: string) => {
    if (input.length < 3) return;

    setIsLoading(true);
    const response = await SageReverseSearcher.mutateAsync({
      searchTerm: input,
    });
    if (response != null) {
      setResults(response);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sage Suche | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Kunden- und Lieferanten Suche im SAGE</h1>
        <FormSelect
          className="mb-5"
          onChange={(e) => setSuche(e.target.value)}
          defaultValue={Suche}>
          <option value="N">Normale Suche</option>
          <option value="I">Rückwärts Suche</option>
        </FormSelect>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FloatingLabel
            label={
              Suche === "N"
                ? "Kundennummer oder Name"
                : "Telefon- oder Mobilfunk Nummer mit oder ohne Vorwahl (Formatierung ist egal, z.B. +49 (561) 60144 - 0)"
            }
            className="mb-3">
            <FormControl
              type="text"
              required
              id="input-search"
              placeholder={
                Suche === "N"
                  ? "Kundennummer oder Name"
                  : "Telefon- oder Mobilfunk Nummer mit oder ohne Vorwahl (Formatierung ist egal, z.B. +49 (561) 60144 - 0)"
              }
            />
          </FloatingLabel>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              const input: HTMLInputElement | null =
                document.querySelector("#input-search");
              if (!input) return;
              Suche === "N"
                ? void handleSearch(input.value)
                : void handleReverseSearch(input.value);
            }}>
            Suchen
          </Button>
        </Form>
        <hr />
        {isLoading && <LoadingSpinner />}
        {!isLoading && Results.length < 1 && (
          <h2 className="text-center">Keine Ergebnisse</h2>
        )}
        {!isLoading && Results.length >= 1 && (
          <Table striped>
            <thead>
              <tr>
                <th>Kunde?</th>
                <th>Kunden- / Lieferanten Nummer</th>
                <th>Name</th>
                <th>Nummer</th>
                <th>Mobil</th>
                <th>Mail</th>
                <th>Umsatz in €</th>
              </tr>
            </thead>
            <tbody>
              {Results.map((res) => (
                <tr key={res.SG_Adressen_PK}>
                  <th>{res.KundNr && res.KundNr.length > 1 ? "✔" : "❌"}</th>
                  <th>
                    {res.KundNr && res.KundNr.length > 1
                      ? res.KundNr
                      : res.KredNr && res.KredNr.length > 1
                      ? res.KredNr
                      : "FEHLER!"}
                  </th>
                  <th>{res.Suchbegriff ? res.Suchbegriff : "FEHLER"}</th>
                  <th>
                    {res.Telefon1 ? (
                      <a href={`tel:${res.Telefon1}`}>{res.Telefon1}</a>
                    ) : (
                      ""
                    )}
                    {res.Telefon2 ? (
                      <>
                        <br />
                        <a href={`tel:${res.Telefon2}`}>{res.Telefon2}</a>
                      </>
                    ) : (
                      ""
                    )}
                  </th>
                  <th>
                    {res.Mobiltelefon1 ? (
                      <a href={`tel:${res.Mobiltelefon1}`}>
                        {res.Mobiltelefon1}
                      </a>
                    ) : (
                      ""
                    )}
                    {res.Mobiltelefon2 ? (
                      <>
                        <br />
                        <a href={`tel:${res.Mobiltelefon2}`}>
                          {res.Mobiltelefon2}
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </th>
                  <th>
                    {res.EMail1 ? (
                      <a href={`mailto:${res.EMail1}`}>{res.EMail1}</a>
                    ) : (
                      ""
                    )}
                    {res.EMail2 ? (
                      <>
                        <br />
                        <a href={`mailto:${res.EMail2}`}>{res.EMail2}</a>
                      </>
                    ) : (
                      ""
                    )}
                  </th>
                  <th>
                    {res.KundUmsatz
                      ? res.KundUmsatz.toString()
                      : res.LiefUmsatz
                      ? res.LiefUmsatz.toString()
                      : ""}
                  </th>
                </tr>
              ))}
            </tbody>{" "}
          </Table>
        )}
      </Container>
    </>
  );
}
