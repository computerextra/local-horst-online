import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { api } from "~/utils/api";

export default function NeuerMitarbeiter() {
  const { push } = useRouter();
  const Update = api.Mitarbeiter.neuerMitarbeiter.useMutation();
  // States of Mitarbeiter
  const [Name, setName] = useState("");
  const [Short, setShort] = useState("");
  const [Durchwahl, setDurchwahl] = useState("");
  const [Telefon1, setTelefon1] = useState("");
  const [Telefon2, setTelefon2] = useState("");
  const [HomeOffice, setHomeoffice] = useState("");
  const [Mobil, setMobil] = useState("");
  const [Mail, setMail] = useState("");
  const [Azubi, setAzubi] = useState<boolean>();
  const [Geburtstag, setGeburtstag] = useState("");

  const handleSubmit = async () => {
    await Update.mutateAsync({
      Name,
      Short,
      Durchwahl,
      Telefon1,
      Telefon2,
      HomeOffice,
      Mobil,
      Mail,
      Azubi: Azubi == undefined ? false : Azubi,
      Geburtstag,
    });
    await push("/Telefonlisten/Mitarbeiter");
  };

  return (
    <>
      <Head>
        <title>Neuer Mitarbeiter | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Neuen Mitarbeiter anlegen</h1>
        <Form
          className="mb-5"
          onSubmit={(e) => e.preventDefault()}>
          <FormGroup className="mb-3">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              defaultValue={Name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Geburtstag</FormLabel>
            <FormControl
              type="date"
              defaultValue={Geburtstag}
              onChange={(e) => setGeburtstag(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Abkürzung</FormLabel>
            <FormControl
              type="text"
              defaultValue={Short}
              onChange={(e) => setShort(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Mail</FormLabel>
            <FormControl
              type="text"
              defaultValue={Mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Durchwahl</FormLabel>
            <FormControl
              type="text"
              defaultValue={Durchwahl}
              onChange={(e) => setDurchwahl(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Telefon 1</FormLabel>
            <FormControl
              type="text"
              defaultValue={Telefon1}
              onChange={(e) => setTelefon1(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Telefon2</FormLabel>
            <FormControl
              type="text"
              defaultValue={Telefon2}
              onChange={(e) => setTelefon2(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Mobil</FormLabel>
            <FormControl
              type="text"
              defaultValue={Mobil}
              onChange={(e) => setMobil(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>HomeOffice</FormLabel>
            <FormControl
              type="text"
              defaultValue={HomeOffice}
              onChange={(e) => setHomeoffice(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormCheck
              type="checkbox"
              label="Azubi"
              defaultChecked={Azubi}
              onChange={(e) => setAzubi(e.target.checked)}
            />
            <FormLabel>Aktuell: {Azubi ? <>✔</> : <>❌</>}</FormLabel>
          </FormGroup>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                type="submit"
                variant="success"
                onClick={() => void handleSubmit()}>
                Senden
              </Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <Button onClick={() => void push("/Telefonlisten/Mitarbeiter")}>
                Zurück
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
