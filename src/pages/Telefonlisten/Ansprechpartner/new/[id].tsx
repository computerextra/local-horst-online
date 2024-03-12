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

export default function NeuerAnsprechpartner() {
  const LieferantenId = useRouter().query.id as string;
  const { push } = useRouter();
  const Anleger = api.Ansprechpartner.neuerAnsprechpartner.useMutation();
  // AP States
  const [Name, setName] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Mobil, setMobil] = useState("");
  const [Mail, setMail] = useState("");

  const handleSubmit = async (neu = false) => {
    if (Name.length < 1) return;
    await Anleger.mutateAsync({
      Name,
      Telefon,
      Mobil,
      Mail,
      lieferantenId: LieferantenId,
    });
    if (neu) {
      location.reload();
    } else {
      await push("/Telefonlisten/Lieferanten/" + LieferantenId);
    }
  };

  return (
    <>
      <Head>
        <title>Neuer Ansprechpartner | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Neuen Ansprechpartner anlegen</h1>
        <Link
          className="btn btn-primary"
          href={"/Telefonlisten/Lieferanten/" + LieferantenId}>
          Zurück
        </Link>
        <Form onSubmit={(e) => e.preventDefault()}>
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
            <FormLabel>Telefon</FormLabel>
            <FormControl
              type="text"
              defaultValue={Telefon}
              onChange={(e) => setTelefon(e.target.value)}
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
            <FormLabel>Mail</FormLabel>
            <FormControl
              type="text"
              defaultValue={Mail}
              onChange={(e) => setMail(e.target.value)}
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
            <Col>
              <Button
                type="submit"
                onClick={() => {
                  void handleSubmit(true);
                }}>
                Speichern + neu
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
