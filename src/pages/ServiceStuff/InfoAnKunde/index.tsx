import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { api } from "~/utils/api";

export default function InfoAnKunde() {
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState("");
  const [send, setSend] = useState(false);
  const [success, setSuccess] = useState(false);

  const Mailer = api.Mail.sendInfoMail.useMutation();

  const handleSubmit = async () => {
    if (address === "") return;
    if (order === "") return;
    const res = await Mailer.mutateAsync({
      Empfänger: address,
      Auftrag: order,
    });
    if (res === "Sent") {
      setSuccess(true);
    }
    setSend(true);
    setTimeout(function () {
      setSend(false);
      setSuccess(false);
      setAddress("");
      setOrder("");
    }, 3000); //Time before execution
  };

  return (
    <>
      <Head>
        <title>Info an Kunde | LocalHorst v7</title>
      </Head>
      <Container className="mt-2">
        <h1 className="text-center">Info an Kunden</h1>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup className="mb-3">
            <FormLabel>
              Auftragsnummer <strong>OHNE</strong> AU
            </FormLabel>
            <FormControl
              required
              type="text"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Email Adresse</FormLabel>
            <FormControl
              required
              type="email"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>
          <Button
            variant="primary"
            type="submit"
            onClick={() => void handleSubmit()}>
            Senden
          </Button>
        </Form>
        {send && (
          <div className="text-center mt-5">
            {success ? (
              <h2 className="text-success">Mail erfolgreich versendet</h2>
            ) : (
              <h2 className="text-danger">Fehler beim Versenden</h2>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
