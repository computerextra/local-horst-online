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
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function EditLieferant() {
  const id = useRouter().query.id as string;
  const LieferantenRes = api.Lieferanten.getOne.useQuery({ id });
  const Updater = api.Lieferanten.updateLieferant.useMutation();
  const Deleter = api.Lieferanten.delete.useMutation();
  const { push } = useRouter();
  const Lieferant = LieferantenRes.data;

  // States of Lieferant
  const [Firma, setFirma] = useState("");
  const [Kundennummer, setKundennummer] = useState("");
  const [Website, setWebsite] = useState("");
  const [Url, setUrl] = useState("");

  useEffect(() => {
    if (Lieferant == null) return;
    setFirma(Lieferant.Firma);
    setKundennummer(Lieferant.Kundennummer);
    if (Lieferant.WebsiteName == undefined) {
      setWebsite("")
    } else
      setWebsite(Lieferant.WebsiteName);
    if (Lieferant.WebsiteUrl == undefined) {
      setUrl("")
    } else
      setUrl(Lieferant.WebsiteUrl);
  }, [Lieferant]);

  const handleSubmit = async () => {
    if (Firma.length < 1) return;
    await Updater.mutateAsync({ id, Firma, Kundennummer, Website, Url });
    location.reload();
  };

  const handleDelete = async () => {
    await Deleter.mutateAsync({ id });
    await push("/Telefonlisten/Lieferanten");
  };

  if (LieferantenRes.isLoading) return <LoadingSpinner />;
  if (LieferantenRes.isError) return <>Fehler in der Abfrage</>;

  if (Lieferant == null) return <>Kein Lieferant gefunden</>;

  return (
    <>
      <Head>
        <title>{Lieferant.Firma} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">{Lieferant.Firma} bearbeiten</h1>
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
            <FormLabel>Websiten Name</FormLabel>
            <FormControl
              type="text"
              defaultValue={Website}
              onChange={(e) => setWebsite(e.target.value)} />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Website Url</FormLabel>
            <FormControl
              type="text"
              defaultValue={Url}
              onChange={(e) => setUrl(e.target.value)} />
          </FormGroup>
          <Table striped>
            <thead>
              <tr>
                <th>Ansprechpartner</th>
                <th>Telefon</th>
                <th>Mobil</th>
                <th>Mail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Lieferant.Ansprechpartner &&
                Lieferant.Ansprechpartner.map((ap) => (
                  <tr key={ap.id}>
                    <td>{ap.Name}</td>
                    <td>{ap.Telefon}</td>
                    <td>{ap.Mobil}</td>
                    <td>{ap.Mail}</td>
                    <td>
                      <Link
                        href={"/Telefonlisten/Ansprechpartner/" + ap.id}
                        className="btn btn-outline-success">
                        Bearbeiten
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
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
                variant="outline-danger"
                onClick={() => void handleDelete()}>
                Löschen
              </Button>
            </Col>
            <Col>
              <Link
                href={"/Telefonlisten/Ansprechpartner/new/" + Lieferant.id}
                className="btn btn-outline-info">
                Neuer Ansprechpartner
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
