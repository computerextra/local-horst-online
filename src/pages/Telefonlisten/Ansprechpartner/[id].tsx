import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function EditAnsprechpartner() {
  const id = useRouter().query.id as string;
  const APRes = api.Ansprechpartner.getOne.useQuery(id);
  const AP = APRes.data;
  const { push } = useRouter();
  const Updater = api.Ansprechpartner.updateLieferant.useMutation();
  const Löscher = api.Ansprechpartner.delete.useMutation();
  // AP States
  const [Name, setName] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Mobil, setMobil] = useState("");
  const [Mail, setMail] = useState("");

  const handleSubmit = async () => {
    if (AP == null) return;
    if (AP.lieferantenId == null) return;
    if (Name.length < 1) return;
    await Updater.mutateAsync({
      id,
      Name,
      Telefon,
      Mobil,
      Mail,
      lieferantenId: AP.lieferantenId,
    });
    await push("/Telefonlisten/Lieferanten/" + AP.lieferantenId);
  };

  const handleDelete = async () => {
    if (AP == null) return;
    if (AP.lieferantenId == null) return;
    await Löscher.mutateAsync(id);
    await push("/Telefonlisten/Lieferanten/" + AP.lieferantenId);
  };

  useEffect(() => {
    if (AP == null) return;
    setName(AP.Name);
    if (!AP.Telefon) {
      setTelefon("");
    } else setTelefon(AP.Telefon);
    if (!AP.Mail) setMail("");
    else setMail(AP.Mail);
    if (!AP.Mobil) setMobil("");
    else setMobil(AP.Mobil);
  }, [AP]);

  if (APRes.isLoading) return <LoadingSpinner />;
  if (APRes.isError) return <>Fehler in der Abfrage</>;

  if (AP == null) return <>Kein Mitarbeiter gefunden</>;

  return (
    <>
      <Head>
        <title>Neuer Ansprechpartner | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Neuen Ansprechpartner anlegen</h1>
        {AP.lieferantenId && (
          <Link
            className="btn btn-primary"
            href={"/Telefonlisten/Lieferanten/" + AP.lieferantenId}>
            Zurück
          </Link>
        )}

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
                variant="danger"
                onClick={() => void handleDelete()}>
                Löschen
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
