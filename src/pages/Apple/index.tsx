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
  const AppleFwRes = api.Apple.getLatestFirmware.useMutation();
  const [Eingabe, setEingabe] = useState("");
  const [Result, setResult] = useState("");
  const [Firmware, setFirmware] = useState<
    {
      url: string | undefined,
      version: string | undefined
    } | undefined | string
  >()

  const handleSearch = async () => {
    if (Eingabe.length < 1) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await AppleRes.mutateAsync(Eingabe);
    if (res == null) return;
    //console.log(res);
    setResult(res);
    const model = res;
    const fw = await AppleFwRes.mutateAsync(model);
    setFirmware(fw);
  };

  return (
    <>
      <Head>
        <title>Apple | LocalHorst v7</title>
      </Head>
      <Container fluid="sm" className="mt-5 pt-2 text-center">
        <h1>Identifiziere mein Apple Gerät</h1>
        <p>Einfach die Modellnummer eingeben und Formular absenden</p>
        <p>BEISPIEL:</p>
        <p>
          Eingabe: A1670 <br />
          Ausgabe: iPad7,1
        </p>

        <Form onSubmit={(e) => e.preventDefault()} className="mt-2 mb-5">
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
        <Container className="mb-5">
          <h2>Model:</h2>
          <p>{Result}</p>
          <h2>Aktuelle Firmware:</h2>
          {Firmware != undefined && typeof Firmware != "string" && (
            <>
              <p>{Firmware?.version}</p>
              <p>
                <a href={Firmware?.url} target="_blank" rel="noopener noreferrer">Download</a>
              </p>
            </>
          )}
        </Container>
      </Container>
    </>
  );
}
