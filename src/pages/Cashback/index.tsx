import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  FormCheck,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

const AUTORISIERTE_BROTHER = [
  "ALLDIS Computer GmbH",
  "ALSO Deutschland GmbH",
  "API Computer Handels Gesellschaft mbH",
  "Brother International GmbH",
  "BÜRORING eG Zentrale",
  "COS COMPUTER GMBH",
  "Herweck AG",
  "Ingram Micro Distribution GmbH",
  "KOMSA AG",
  "Michael Telecom AG",
  "Printec Distribution AG",
  "Siewert und Kau Computertechnik GmbH",
  "Soennecken eG",
  "SYSTEAM Gesellschaft für Computersysteme mbH",
  "TD SYNNEX Service GmbH",
  "UFP Deutschland GmbH",
  "Wortmann AG",
];
const AUTORISIERTE_AVM = [
  "ALSO Deutschland GmbH",
  "api Computerhandels GmbH",
  "Herweck AG",
  "Ingram Micro Distribution GmbH",
  "KOMSA Kommunikation Sachsen AG",
  "Wortmann AG",
];

type Result = {
  Gerät: string;
  Bonus: string;
  Sage: string | null | undefined;
};

export default function Cashback() {
  const avmRes = api.File.getAvm.useQuery();
  const DruckerRes = api.File.getBrother.useQuery();

  const avm = avmRes.data;
  const Drucker = DruckerRes.data;

  const [search, setSearch] = useState("");
  const [Ergebnis, setErgebnis] = useState<Result[]>([]);

  const [showDrucker, setShowDrucker] = useState(true);
  const [showAvm, setShowAvm] = useState(true);

  useEffect(() => {
    if (search == "" || search.length < 1) {
      setErgebnis([]);
      return;
    } else {
      const results: Result[] = [];

      Drucker?.forEach((element) => {
        if (
          element.Gerät.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          (element.Sage && element.Sage.indexOf(search) > -1)
        ) {
          results.push({
            Gerät: element.Gerät,
            Bonus: element.Bonus,
            Sage: element.Sage,
          });
        }
      });

      avm?.forEach((element) => {
        if (
          element.Name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          (element.SageArtikelnummer &&
            element.SageArtikelnummer.indexOf(search) > -1)
        ) {
          results.push({
            Gerät: element.Name,
            Bonus: element.Bonus + "€",
            Sage: element.SageArtikelnummer,
          });
        }
      });
      setErgebnis(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (avmRes.status !== "success" || DruckerRes.status !== "success")
    return <LoadingSpinner />;

  if (avmRes.isError || DruckerRes.isError) return <>Fehler in der Abfrage</>;

  if (avm == null || Drucker == null) return <>Kein Daten gefunden</>;

  return (
    <>
      <Head>
        <title>Cashback | LocalHorst v7</title>
      </Head>

      <Container
        fluid
        className="mt-5">
        <h1 className="text-center">Cashback</h1>
        <div className="mb-3">
          <FormCheck
            type="switch"
            label="Drucker"
            defaultChecked={showDrucker}
            onChange={() => setShowDrucker(!showDrucker)}
          />

          <FormCheck
            type="switch"
            label="AVM"
            defaultChecked={showAvm}
            onChange={() => setShowAvm(!showAvm)}
          />
        </div>
        <Container>
          <FloatingLabel label="Suche nach Gerät">
            <FormControl
              type="text"
              placeholder="Suche"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FloatingLabel>
          {Ergebnis &&
            search !== "" &&
            Ergebnis.map((item) => (
              <p key={item.Gerät}>
                <b>{item.Sage}</b>:{item.Gerät} - CB: {item.Bonus}
              </p>
            ))}
        </Container>
        <h2>Brother</h2>
        <p>
          Erlaubte Distributoren: <br />
          {AUTORISIERTE_BROTHER.map((Distributor) => (
            <small
              key={Distributor}
              className="text-secondary border me-2 ps-1 pe-1">
              {Distributor}
            </small>
          ))}
        </p>
        <Row>
          {showDrucker && (
            <Col>
              <h5>Drucker</h5>
              <Table
                striped
                bordered>
                <thead>
                  <tr>
                    <th>Art.Nr. Sage</th>
                    <th>Maximale Menge</th>
                    <th>Gerät</th>
                    <th>Bonus</th>
                    <th>Maximaler Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {Drucker.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Sage}</td>
                      <td>{item.Menge}</td>
                      <td>{item.Gerät}</td>
                      <td>{item.Bonus}</td>
                      <td>{item.MaximalerBonus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          )}
        </Row>

        <h2>AVM</h2>
        <p>
          Erlaubte Distributoren: <br />
          {AUTORISIERTE_AVM.map((Distributor) => (
            <small
              key={Distributor}
              className="text-secondary border me-2 ps-1 pe-1">
              {Distributor}
            </small>
          ))}
        </p>
        {showAvm && (
          <Table
            striped
            bordered>
            <thead>
              <tr>
                <th>Art.Nr. Sage</th>
                <th>Produkt</th>
                <th>Artikelnummer</th>
                <th>Bonus</th>
                <th>UVP Netto</th>
                <th>UVP Brutto</th>
              </tr>
            </thead>
            <tbody>
              {avm.map((item) => (
                <tr key={item.Artikelnummer}>
                  <td>{item?.SageArtikelnummer}</td>
                  <td>{item.Name}</td>
                  <td>{item.Artikelnummer}</td>
                  <td>{item.Bonus}€</td>
                  <td>{item.UVP_Netto}€</td>
                  <td>{item.UVP_Brutto}€</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
