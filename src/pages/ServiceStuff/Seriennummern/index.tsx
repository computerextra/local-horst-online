import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { api } from "~/utils/api";
export default function Seriennummern() {
  const [Nummer, setNummer] = useState("");
  const [Output, setOutput] = useState("");

  const Searcher = api.Sage.getName.useMutation();

  const handleSubmit = async () => {
    if (Nummer.length < 1) return;

    const res = await Searcher.mutateAsync(Nummer);
    let out = "";
    if (res && res.SUCHBEGRIFF) {
      out = Nummer + ": " + res.SUCHBEGRIFF;
      setOutput(out);
    }
    const Textarea = document.createElement("textarea");
    Textarea.value = out;
    document.body.appendChild(Textarea);
    Textarea.focus();
    Textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.log("Unable to copy to clipboard", err);
    }
    document.body.removeChild(Textarea);
    setNummer("");

    setTimeout(() => {
      setOutput("");
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Seriennummern | LocalHorst v7</title>
      </Head>
      <Container className="mt-5 text-center">
        <h1>CE SN Eingabe</h1>
        <p>
          Einfach die Artikelnummer eingeben, der Artikel wird rausgesucht und
          direkt in die Zwischenablage kopiert.
        </p>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <FormControl
              type="text"
              value={Nummer}
              required
              onChange={(e) => setNummer(e.target.value)}
              placeholder="Artikelnummer"
            />
            <Button
              variant="primary"
              type="submit"
              onClick={() => void handleSubmit()}>
              Senden
            </Button>
          </InputGroup>
        </Form>
        <p>{Output}</p>
      </Container>
    </>
  );
}
