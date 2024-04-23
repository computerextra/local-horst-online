import type { Einkauf, Mitarbeiter } from "@prisma/client";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

export default function EinkaufsListe({
  Mitarbeiter,
}: {
  Mitarbeiter: Mitarbeiter & { Einkauf?: Einkauf };
}) {
  if (Mitarbeiter.Einkauf?.Abgeschickt == null) return <></>;

  if (
    new Date(Mitarbeiter.Einkauf?.Abgeschickt).toDateString() ==
    new Date().toDateString()
  )
    return (
      <div>
        <p>Wer: {Mitarbeiter.Name}</p>
        <p>Pfand: {Mitarbeiter.Einkauf.Pfand}</p>

        {Mitarbeiter.Einkauf.Paypal ? (
          <p className="text-red-500">Paypal</p>
        ) : (
          <p>Geld: {Mitarbeiter.Einkauf.Geld}</p>
        )}
        {Mitarbeiter.Einkauf.Abonniert && (
          <p className="text-green-600">Abonnierter Einkauf</p>
        )}
        <p>
          Was: <br />
        </p>
        <pre>{Mitarbeiter.Einkauf.Dinge}</pre>
        <Row>
          {Mitarbeiter.Einkauf.Bild1 &&
            Mitarbeiter.Einkauf.Bild1Date &&
            new Date(Mitarbeiter.Einkauf.Bild1Date).toDateString() ==
              new Date().toDateString() &&
            Mitarbeiter.Einkauf.Bild1.length > 0 && (
              <Col>
                <Image
                  src={Mitarbeiter.Einkauf.Bild1}
                  alt="Einkaufen Bild"
                  height={150}
                  width={150}
                  className="img-fluid rounded"
                  style={{ maxHeight: 200, width: "auto" }}
                />
              </Col>
            )}
          {Mitarbeiter.Einkauf.Bild2 &&
            Mitarbeiter.Einkauf.Bild2Date &&
            new Date(Mitarbeiter.Einkauf.Bild2Date).toDateString() ==
              new Date().toDateString() &&
            Mitarbeiter.Einkauf.Bild2.length > 0 && (
              <Col>
                <Image
                  src={Mitarbeiter.Einkauf.Bild2}
                  alt="Einkaufen Bild"
                  height={150}
                  width={150}
                  className="img-fluid rounded"
                  style={{ maxHeight: 200, width: "auto" }}
                />
              </Col>
            )}
          {Mitarbeiter.Einkauf.Bild3 &&
            Mitarbeiter.Einkauf.Bild3Date &&
            new Date(Mitarbeiter.Einkauf.Bild3Date).toDateString() ==
              new Date().toDateString() &&
            Mitarbeiter.Einkauf.Bild3.length > 0 && (
              <Col>
                <Image
                  src={Mitarbeiter.Einkauf.Bild3}
                  alt="Einkaufen Bild"
                  height={150}
                  width={150}
                  className="img-fluid rounded"
                  style={{ maxHeight: 200, width: "auto" }}
                />
              </Col>
            )}
        </Row>
        <hr />
      </div>
    );

  return <></>;
}
