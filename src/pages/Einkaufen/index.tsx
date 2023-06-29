import type { Mitarbeiter } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import sendMail from "~/server/api/sendMail";
import { api } from "~/utils/api";

export default function Einkaufen() {
  // Aktuelle Einkaufsliste
  const EinkaufslisteRes = api.Mitarbeiter.getDailyShoppingList.useQuery();
  // Alle Mitarbeiter
  const MitarbeiterRes = api.Mitarbeiter.getAll.useQuery();

  const Einkaufsliste = EinkaufslisteRes.data;
  const Mitarbeiter = MitarbeiterRes.data;

  // Paypal Abrechnung
  const [showAbrechnung, setShowAbrechnung] = useState(false);
  const [userName, setUserName] = useState("");
  const [Schuldner, setSchuldner] = useState("");
  const [Schulden, setSchulden] = useState("");
  const [Versendet, setVersendet] = useState<Mitarbeiter[]>([]);
  const [Fehler, setFehler] = useState("");

  const Print = () => {
    const area = document.querySelector("[data-druck=true]");
    if (area == null) return;
    const myWindow = window.open("", "PRINT", "height=1000,width=1200");
    if (myWindow == null) return;
    myWindow.document.write("<html><body style='white-space: pre-line;'>");
    myWindow.document.write("<h1>Einkaufsliste</h1>");
    myWindow.document.write("<h2>POST MITNEHMEN!</h2>");
    myWindow.document.write(area.innerHTML);
    myWindow.document.write("</body></html>");
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    setTimeout(() => {
      myWindow.close();
    }, 2000);
  };

  const sendeMail = async () => {
    // Do Something
    if (userName == null || userName.length < 1) {
      setFehler("Kein Benutzername angegeben.");
      return;
    }
    if (Schuldner == null || Schuldner.length < 1) {
      setFehler("Kein Mitarbeiter angegeben.");
      return;
    }
    if (Schulden == null || Schulden.length < 1) {
      setFehler("Kein Geld angegeben.");
      return;
    }
    const ma = Mitarbeiter?.find((x) => x.id === Schuldner);
    if (ma == null) {
      setFehler("Kein Mitarbeiter gefunden.");
      return;
    }
    if (ma.Mail == null) {
      setFehler("Mitarbeiter hat keine Mailadresse hinterlegt.");
      return;
    }
    const PaypalLink = `https://paypal.me/${userName}/${Schulden}`;
    const QRCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${PaypalLink}`;
    const body = `<h1>Hallo ${ma.Name}</h1><p>Bitte bezahle ${Schulden}€ über Paypal.</p><p>Link: ${PaypalLink}</p><p>Oder ganz Einfach mit dem Smartphone. Dafür einfach den QR-Code scannen</p><p><img src="${QRCode}"></p>`;
    const res = await sendMail(
      "service@computer-extra.de",
      ma.Mail,
      "Abrechnung Paypal",
      body
    );
    if (res === "Gesendet") {
      setSchulden("");
      setFehler("ERFOLG");
      setVersendet((prev) => [...prev, ma]);
    } else {
      setFehler(res);
    }
    setTimeout(() => {
      setFehler("");
    }, 5000);
  };

  if (!Einkaufsliste || !Mitarbeiter) return <>Loading...</>;

  return (
    <Container
      fluid
      className="mt-3">
      {/* Buttons */}
      <Row>
        <Col className="ms-2 me-2">
          <Row>
            <Button>Eingabe</Button>
          </Row>
        </Col>
        <Col className="ms-2 me-2">
          <Row>
            <Button onClick={Print}>Drucken</Button>
          </Row>
        </Col>
        <Col className="ms-2 me-2">
          <Row>
            <Button
              variant="success"
              onClick={() => setShowAbrechnung(!showAbrechnung)}>
              Abrechnung
            </Button>
          </Row>
        </Col>
      </Row>
      {/* Abrechnung Paypal */}
      {showAbrechnung && (
        <div className="mt-2 me-2">
          <p>Gespeicherter Benutzername für Paypal: {userName}</p>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FloatingLabel
              label="Benutzername für Paypal"
              className="mb-3">
              <FormControl
                type="text"
                required
                placeholder="Benutzername für Paypal"
                defaultValue={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FloatingLabel>
            <FormSelect
              required
              className="mb-3"
              value={Schuldner}
              onChange={(e) => setSchuldner(e.target.value)}>
              <option
                value=""
                hidden>
                Bitte Wählen...
              </option>
              {Einkaufsliste.map((ma) => {
                if (
                  ma.Geld?.toLowerCase().trim() === "paypal" &&
                  !Versendet.includes(ma)
                ) {
                  return (
                    <option
                      value={ma.id}
                      key={ma.id}>
                      {ma.Name}
                    </option>
                  );
                }
              })}
            </FormSelect>
            <FloatingLabel
              className="mb-3"
              label="Geld">
              <FormControl
                type="text"
                required
                placeholder="Geld"
                value={Schulden}
                onChange={(e) => setSchulden(e.target.value)}
              />
            </FloatingLabel>
            <Button
              type="submit"
              variant="secondary"
              onClick={() => void sendeMail()}>
              Mail senden
            </Button>
            {Fehler === "ERFOLG" ? (
              <span className="text-success ms-3 p-1 fs-5 fw-bold">
                {Fehler}
              </span>
            ) : (
              <span className="text-danger ms-3 p-1 fs-5 fw-bold">
                {Fehler} - Eingaben prüfen
              </span>
            )}
          </Form>
        </div>
      )}

      {/* Liste */}
      <div
        className="mt-5"
        data-druck="true">
        {Einkaufsliste.map((ma) => (
          <section key={ma.id}>
            <p className="p-0 m-0">Wer: {ma.Name}</p>
            {ma.Abonniert && (
              <p className="p-0 m-0 text-success fw-bold">
                Abonnierter Einkauf
              </p>
            )}
            <p className="p-0 m-0">
              {ma.Geld && ma.Geld.toLowerCase().trim() === "paypal" ? (
                <span className="text-danger fw-bold">
                  Bezahlung per Paypal
                </span>
              ) : (
                <span>Geld: {ma.Geld}</span>
              )}
            </p>
            <p className="p-0 m-0">Pfand: {ma.Pfand}</p>
            <p className="p-0 m-0">
              Was: <br />
              <div className="pre">{ma.Einkauf}</div>
              {(ma.Bild1 || ma.Bild2 || ma.Bild3) && <br />}
              {ma.Bild1 && ma.Bild1Type && (
                <Image
                  src={`data:${ma.Bild1Type};base64,${ma.Bild1}`}
                  alt="Einkaufen Bild 1"
                  height={150}
                  className="me-2 rounded"
                />
              )}
              {ma.Bild2 && ma.Bild2Type && (
                <Image
                  src={`data:${ma.Bild2Type};base64,${ma.Bild2}`}
                  alt="Einkaufen Bild 2"
                  height={150}
                  className="me-2 rounded"
                />
              )}
              {ma.Bild3 && ma.Bild3Type && (
                <Image
                  src={`data:${ma.Bild3Type};base64,${ma.Bild3}`}
                  alt="Einkaufen Bild 3"
                  height={150}
                  className="me-2 rounded"
                />
              )}
            </p>
            <hr />
          </section>
        ))}
      </div>

      {/* Modal Neueingabe */}
    </Container>
  );
}
