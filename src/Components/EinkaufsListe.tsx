import type { Einkauf } from "@prisma/client";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

export default function EinkaufsListe({
  Einkauf,
  Name,
}: {
  Einkauf: Einkauf | undefined;
  Name: string | undefined;
}) {
  if (Einkauf?.Abgeschickt == null) return <></>;
  if (Name == null) return <></>;

  if (
    new Date(Einkauf?.Abgeschickt).toDateString() == new Date().toDateString()
  )
    return (
      <div>
        <span>Wer: {Name}</span> <br />
        <span>Pfand: {Einkauf.Pfand}</span>
        <br />
        {Einkauf.Paypal ? (
          <span className="text-danger">Bezahlung per Paypal</span>
        ) : (
          <span>Geld: {Einkauf.Geld}</span>
        )}
        <br />
        {Einkauf.Abonniert && (
          <span className="text-success">Abonnierter Einkauf</span>
        )}
        <br />
        <span>
          Was: <br />
        </span>
        <pre>{Einkauf.Dinge}</pre>
        <Row>
          {Einkauf.Bild1 &&
            Einkauf.Bild1Date &&
            new Date(Einkauf.Bild1Date).toDateString() ==
              new Date().toDateString() &&
            Einkauf.Bild1.length > 0 && (
              <Col>
                <Image
                  src={Einkauf.Bild1}
                  alt="Einkaufen Bild"
                  height={150}
                  width={150}
                  className="img-fluid rounded"
                  style={{ maxHeight: 200, width: "auto" }}
                />
              </Col>
            )}
          {Einkauf.Bild2 &&
            Einkauf.Bild2Date &&
            new Date(Einkauf.Bild2Date).toDateString() ==
              new Date().toDateString() &&
            Einkauf.Bild2.length > 0 && (
              <Col>
                <Image
                  src={Einkauf.Bild2}
                  alt="Einkaufen Bild"
                  height={150}
                  width={150}
                  className="img-fluid rounded"
                  style={{ maxHeight: 200, width: "auto" }}
                />
              </Col>
            )}
          {Einkauf.Bild3 &&
            Einkauf.Bild3Date &&
            new Date(Einkauf.Bild3Date).toDateString() ==
              new Date().toDateString() &&
            Einkauf.Bild3.length > 0 && (
              <Col>
                <Image
                  src={Einkauf.Bild3}
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
