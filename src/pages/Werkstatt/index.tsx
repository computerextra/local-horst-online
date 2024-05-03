import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

export default function Werkstatt() {
  const [auswahl, setAuswahl] = useState<"MS" | "G" | "A" | "T" | "">("");
  const [Vorname, setVorname] = useState("");
  const [Nachname, setNachname] = useState("");
  const [Mail, setMail] = useState("");
  const [PassMail, setPassMail] = useState("");
  const [Geburtstag, setGeburtstag] = useState("");
  const [Geschlecht, setGeschlecht] = useState("");
  const [Handynummer, setHandynummer] = useState("");
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");

  const Intrexx = () => {
    const area = document.querySelector("[data-intrexx=true]");
    if (area == null) return;
    const myWindow = window.open("", "PRINT", "height=1000,width=1200");
    if (myWindow == null) return;
    myWindow.document.write("<html><body>");
    myWindow.document.write(area.innerHTML);
    myWindow.document.write("</body></html>");
    myWindow.document.close();
    myWindow.focus();
  };

  const Print = () => {
    if (auswahl === "") return;
    const area = document.querySelector("[data-druck=true]");
    if (area == null) return;
    const myWindow = window.open("", "PRINT", "height=1000,width=1200");
    if (myWindow == null) return;
    myWindow.document.write("<html><body style='white-space: pre-line;'>");
    if (auswahl == "MS") myWindow.document.write("<h1>Microsoft Konto</h1>");
    if (auswahl == "G") myWindow.document.write("<h1>Google Konto</h1>");
    if (auswahl == "A") myWindow.document.write("<h1>Apple ID</h1>");
    if (auswahl == "T") myWindow.document.write("<h1>Telekom Freemail</h1>");

    myWindow.document.write(area.innerHTML);
    myWindow.document.write("</body></html>");
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    setTimeout(() => {
      myWindow.close();
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Formular Gen für Faule! | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Formular Gen für Faule!</h1>
        <Form.Check
          type="radio"
          name="Auswahl"
          inline
          id="Microsoft"
          label="Microsoft"
          onChange={(e) => {
            if (e.target.checked) setAuswahl("MS");
          }}
        />
        <Form.Check
          type="radio"
          inline
          name="Auswahl"
          id="Google"
          label="Google"
          onChange={(e) => {
            if (e.target.checked) setAuswahl("G");
          }}
        />
        <Form.Check
          type="radio"
          inline
          name="Auswahl"
          id="Apple"
          label="Apple"
          onChange={(e) => {
            if (e.target.checked) setAuswahl("A");
          }}
        />
        <Form.Check
          type="radio"
          inline
          name="Auswahl"
          id="Telekom"
          label="Telekom"
          onChange={(e) => {
            if (e.target.checked) setAuswahl("T");
          }}
        />
        <Form
          onSubmit={(e) => e.preventDefault()}
          className="mt-2 mb-5 text-start"
        >
          <Row>
            <Col>
              <FloatingLabel
                controlId="Vorname"
                label="Vorname"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Vorname"
                  defaultValue={Vorname}
                  onChange={(e) => setVorname(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="Nachname"
                label="Nachname"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={Nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  placeholder="Nachname"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="RegMail"
                label="Mail für Registrierung"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  defaultValue={Mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Mail für Registrierung"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="Passwort für Mail"
                label="Passwort für Mail"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={PassMail}
                  onChange={(e) => setPassMail(e.target.value)}
                  placeholder="Passwort für Mail"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel
            controlId="Geburtstag"
            label="Geburtstag"
            className="mb-3"
          >
            <Form.Control
              defaultValue={Geburtstag}
              type="date"
              onChange={(e) => setGeburtstag(e.target.value)}
            />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="Geschlecht">
            <div>Geschlecht</div>
            <Form.Check
              inline
              type="radio"
              onChange={(e) => {
                if (e.target.checked) setGeschlecht("Männlich");
              }}
              name="M"
              id="Männlich"
              label="Männlich"
            />
            <Form.Check
              inline
              type="radio"
              name="W"
              onChange={(e) => {
                if (e.target.checked) setGeschlecht("Weiblich");
              }}
              id="Weiblich"
              label="Weiblich"
            />
            <Form.Check
              inline
              type="radio"
              name="D"
              onChange={(e) => {
                if (e.target.checked) setGeschlecht("Divers");
              }}
              id="Divers"
              label="Divers"
            />
          </Form.Group>
          <FloatingLabel
            controlId="Nummer"
            label="Handynummer"
            className="mb-3"
          >
            <Form.Control
              type="tel"
              defaultValue={Handynummer}
              onChange={(e) => setHandynummer(e.target.value)}
              placeholder="Handynummer"
            />
          </FloatingLabel>
          <hr />
          <Row>
            <Col>
              <FloatingLabel
                controlId="Username"
                label="Login Informationen"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={Login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Login Information"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="Passwort"
                label="Login Passwort"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Login Passwort"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Button variant="primary" className="me-5" onClick={Print}>
            Drucken
          </Button>
          <Button variant="info" onClick={Intrexx}>
            Für Intrexx
          </Button>
        </Form>
      </Container>
      <Container>
        <div data-intrexx="true" className="d-none">
          <p>
            {auswahl == "A"
              ? "Apple ID"
              : auswahl == "G"
              ? "Google Konto"
              : auswahl == "MS"
              ? "Microsoft Konto"
              : auswahl == "T"
              ? "Telekom Freemail"
              : "FEHLENDE EINGABE!"}{" "}
            <br />
            Name: {Vorname} {Nachname} <br />
            Mail: {Mail} <br />
            PW: {PassMail} <br />
            Geburtstag: {new Date(Geburtstag).toLocaleDateString()} <br />
            Geschlecht: {Geschlecht} <br />
            Handy: {Handynummer} <br />
            Login: {Login} <br />
            PW: {Password}
          </p>
        </div>
        <div data-druck="true" className="d-none">
          <p>Vorname: {Vorname}</p>
          <p>Nachname: {Nachname}</p>
          <p>E-Mail-Adresse: {Mail}</p>
          <p>E-Mail-Passwort: {PassMail}</p>
          <p>Geburtstag: {new Date(Geburtstag).toLocaleDateString()}</p>
          <p>Geschlecht: {Geschlecht}</p>
          <p>Mobilfunk Nummer: {Handynummer}</p>
          <hr />
          <p>Benutzername: {Login}</p>
          <p>Passwort: {Password}</p>
        </div>
      </Container>
    </>
  );
}
