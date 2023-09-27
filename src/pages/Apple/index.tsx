import { useState } from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

export default function Apple() {
  const AppleRes = api.Apple.getAppleModel.useMutation();
  const [Eingabe, setEingabe] = useState("");
  const [Result, setResult] = useState("");

  const handleSearch = () => {
    const res = AppleRes.mutate(Eingabe);
    console.log(res);
    if (res == null) return;
    setResult(res);
  };

  return (
    <>
      <Head>
        <title>Apple | LocalHorst v7</title>
      </Head>
      <Container fluid="sm" className="mt-5 pt-2 text-center">
        <h1>Identifiziere mein Apple Gerät</h1>
        <p>Einfach die Modellnummer eingeben und Formular absenden</p>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <FormControl
              type="text"
              required
              placeholder="Modellnummer"
              value={Eingabe}
              onChange={(e) => setEingabe(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline-success"
              onClick={() => void handleSearch()}
            >
              Suchen
            </Button>
          </InputGroup>
        </Form>
        )<h2>Model:</h2>
        <p>{Result}</p>
      </Container>
    </>
  );
}
