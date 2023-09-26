import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { api } from "~/utils/api";

export default function NeuerLieferant() {
  const Anleger = api.Lieferanten.neuerLieferant.useMutation();
  const { push } = useRouter();
  // States of Lieferant
  const [Firma, setFirma] = useState("");
  const [Kundennummer, setKundennummer] = useState("");
  const [Website, setWebsite] = useState("");
  const [Url, setUrl] = useState("");

  const handleSubmit = async () => {
    if (Firma.length < 1) return;
    const res = await Anleger.mutateAsync({ Firma, Kundennummer, Website, Url });
    await push("/Telefonlisten/Lieferanten/" + res.id);
  };

  return (
    <>
      <Head>
        <title>Neuer Lieferant | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Neuen Lieferanten anlegen</h1>
        <Link
          href="/Telefonlisten/Lieferanten"
          className="btn btn-primary">
          Zurück
        </Link>
        <Form
          onSubmit={(e) => e.preventDefault()}
          className="mb-5">
          <FormGroup className="mb-3">
            <FormLabel>Firma</FormLabel>
            <FormControl
              type="text"
              defaultValue={Firma}
              required
              onChange={(e) => setFirma(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Kundennummer</FormLabel>
            <FormControl
              type="text"
              defaultValue={Kundennummer}
              onChange={(e) => setKundennummer(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Websiten Anzeigename</FormLabel>
            <FormControl
              type="text"
              defaultValue={Website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Webseiten Url</FormLabel>
            <FormControl
              type="text"
              defaultValue={Url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </FormGroup>

          <Row>
            <Col>
              <Button
                type="submit"
                onClick={() => void handleSubmit()}>
                Speichern
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
