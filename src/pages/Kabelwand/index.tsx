import type {
  Fach,
  Farbe,
  Input,
  Kabel,
  Laenge,
  Output,
  Regal,
  Reihe,
} from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Col, Container, FormCheck, Row } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

// TODO: Alles

type Kabelwand = Kabel & {
  Fach: Fach;
  Farbe: Farbe;
  Input: Input;
  Laenge: Laenge;
  Output: Output;
  Regal: Regal;
  Reihe: Reihe;
} & {
  Bestand?: number | null;
  Verfügbar?: number | null;
};

export default function Kabelwand() {
  const KabelRes = api.Kabelwand.getKabelwand.useQuery();
  const Kabel = KabelRes.data;

  const [Auswahl, setAuswahl] = useState<"all" | "Kabel" | "Kiste" | "Telefon">(
    "all"
  );
  const [AlleKabel, setAlleKabel] = useState<Kabelwand[]>([]);
  const [KabelwandKabel, setKabelwandKabel] = useState<Kabelwand[]>([]);
  const [KistenKabel, setKistenKabel] = useState<Kabelwand[]>([]);
  const [TelefonKabel, setTelefonKabel] = useState<Kabelwand[]>([]);

  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    if (Kabel == null) return;

    // Ziehe Bestände aus Sage:
    const Artikelnummern: string[] = [];
    Kabel.forEach((x) => {
      Artikelnummern.push(x.Artikelnummer);
    });
    const SageInfosRes = api.Sage.getBestand.useQuery(Artikelnummern);
    const SageInfos = SageInfosRes.data;
    const RichtigeKabel: Kabelwand[] = [];
    const KabelwandKabel: Kabelwand[] = [];
    const KistenKabel: Kabelwand[] = [];
    const TelefonKabel: Kabelwand[] = [];
    if (SageInfos != null) {
      if (SageInfos.length >= 1) {
        Kabel.forEach((Kab) => {
          const art = SageInfos.find((x) => x.ARTNR === Kab.Artikelnummer);
          if (art != undefined) {
            RichtigeKabel.push({
              ...Kab,
              Bestand: art.BESTAND,
              Verfügbar: art.VERFUEGBAR,
            });

            if (
              Kab.Regal.Name.startsWith("Regal") &&
              !Kab.Regal.Name.startsWith("Regal T")
            ) {
              KabelwandKabel.push({
                ...Kab,
                Bestand: art.BESTAND,
                Verfügbar: art.VERFUEGBAR,
              });
            }
            if (Kab.Regal.Name.startsWith("Kiste"))
              KistenKabel.push({
                ...Kab,
                Bestand: art.BESTAND,
                Verfügbar: art.VERFUEGBAR,
              });
            if (Kab.Regal.Name.startsWith("Regal T"))
              TelefonKabel.push({
                ...Kab,
                Bestand: art.BESTAND,
                Verfügbar: art.VERFUEGBAR,
              });
          } else {
            RichtigeKabel.push({ ...Kab });
            if (
              Kab.Regal.Name.startsWith("Regal") &&
              !Kab.Regal.Name.startsWith("Regal T")
            )
              KabelwandKabel.push({ ...Kab });
            if (Kab.Regal.Name.startsWith("Kiste"))
              KistenKabel.push({ ...Kab });
            if (Kab.Regal.Name.startsWith("Regal T"))
              TelefonKabel.push({ ...Kab });
          }
        });
      }
    }
    setAlleKabel(RichtigeKabel);
    setKabelwandKabel(KabelwandKabel);
    setKistenKabel(KistenKabel);
    setTelefonKabel(TelefonKabel);
  }, [Kabel]);

  if (KabelRes.isLoading) return <LoadingSpinner />;

  const toggleAdmin = () => {
    setAdmin(!Admin);
  };

  return (
    <>
      <Head>
        <title>Kabelwand | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Kabelwand</h1>
        <Button onClick={toggleAdmin}>Admin</Button>
        <Row>
          <Col>
            <fieldset
              id="Auswahl"
              className="mt-5">
              <FormCheck
                className="form-switch"
                name="Auswahl">
                <FormCheck.Input
                  role="switch"
                  name="Auswahl"
                  type="radio"
                  id="all"
                  value="all"
                  defaultChecked={Auswahl == "all" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAuswahl("all");
                    }
                  }}
                />
                <FormCheck.Label htmlFor="all">Alle</FormCheck.Label>
              </FormCheck>
              <FormCheck
                className="form-switch"
                name="Auswahl">
                <FormCheck.Input
                  role="switch"
                  name="Auswahl"
                  type="radio"
                  id="Kabel"
                  value="Kabel"
                  defaultChecked={Auswahl == "Kabel" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAuswahl("Kabel");
                    }
                  }}
                />
                <FormCheck.Label htmlFor="Kabel">
                  Große Kabelwand
                </FormCheck.Label>
              </FormCheck>
              <FormCheck
                className="form-switch"
                name="Auswahl">
                <FormCheck.Input
                  role="switch"
                  name="Auswahl"
                  type="radio"
                  id="Kiste"
                  value="Kiste"
                  defaultChecked={Auswahl == "Kiste" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAuswahl("Kiste");
                    }
                  }}
                />
                <FormCheck.Label htmlFor="Kiste">
                  Kisten unter der Kasse und im Lager
                </FormCheck.Label>
              </FormCheck>
              <FormCheck
                className="form-switch"
                name="Auswahl">
                <FormCheck.Input
                  role="switch"
                  name="Auswahl"
                  type="radio"
                  id="Telefon"
                  value="Telefon"
                  defaultChecked={Auswahl == "Telefon" ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAuswahl("Telefon");
                    }
                  }}
                />
                <FormCheck.Label htmlFor="Telefon">
                  Kleine Kabelwand für Telefonkabel
                </FormCheck.Label>
              </FormCheck>
            </fieldset>
          </Col>
          {Admin && (
            <Col>
              <Row className="mb-3">
                <Col>
                  {/* <Link
                  to={Urls.Kabelwand.NeuesKabel}
                  className="btn btn-primary"
                >
                  Neues Kabel
                </Link> */}
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        {Auswahl === "all" && (
          <KabelTable
            Kabel={AlleKabel}
            Admin={Admin}
          />
        )}
        {Auswahl === "Kabel" && (
          <KabelTable
            Kabel={KabelwandKabel}
            Admin={Admin}
          />
        )}
        {Auswahl === "Kiste" && (
          <KabelTable
            Kabel={KistenKabel}
            Admin={Admin}
          />
        )}
        {Auswahl === "Telefon" && (
          <KabelTable
            Kabel={TelefonKabel}
            Admin={Admin}
          />
        )}
      </Container>
    </>
  );
}
