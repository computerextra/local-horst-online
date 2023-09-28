import Head from "next/head";
import { Container, Form } from "react-bootstrap";
import { type ChangeEvent, useState } from "react";
import axios from "axios";

export default function QRCode() {
  const [file, setFile] = useState<File>();
  const [inhalt, setInhalt] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const res = await axios<
      {
        symbol: {
          data: string | null;
          error: string | null;
          seq: number;
        }[];
        type: string;
      }[]
    >({
      method: "POST",
      url: "http://api.qrserver.com/v1/read-qr-code/",
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: {
        file: file,
      },
    });
    if (res.data) {
      const data = res.data;

      if (data[0]?.symbol[0]?.data) {
        const i = data[0].symbol[0].data;
        setInhalt(i);
      }
    }
    console.log(res.data);
  };

  return (
    <>
      <Head>
        <title>QR Code Checker | LocalHorst v7</title>
      </Head>

      <Container fluid="sm" className="mt-5 pt-2 text-center">
        <h1>Prüfe QR Codes</h1>
        <p>
          Einfach den QR Code aus einer Email (Meistens Bilddateien) mit
          Rechtsklick auswählen, &quot;Als Grafik speichern...&quot; auswählen,
          das Bild abspeichern und danach auf dieser Seite auswählen und auf
          Senden drücken.
        </p>
        <p>
          Als Ergebnis werden die Daten angezeigt, die in dem Code eingebettet
          sind.
        </p>

        <Form onSubmit={(e) => e.preventDefault()} className="mt-2 mb-5">
          <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
          <input type="file" name="file" onChange={handleFileChange} required />
          <input
            type="submit"
            value="Senden"
            onClick={() => void handleSubmit()}
          />
        </Form>
      </Container>
      <Container fluid="sm" className="mt-5 pt-2 text-center">
        <h2>Inhalt des QR Codes:</h2>
        <p className="text-danger">
          Info: Links sind mit absicht deaktiviert. Der Inhalt wird als Text
          ausgegeben.
        </p>
        <p className="text-danger">
          Bitte darauf achten, dass nicht vertrauenwürdige Links nicht einfach
          geöffnet werden sollten.
        </p>
        <p className="text-danger">
          Im Zweifel in der Werkstatt nachfragen, ob der angegebene Inhalt Okay
          ist.
        </p>
        <p className="border pt-3 pb-3">{inhalt}</p>
      </Container>
    </>
  );
}
