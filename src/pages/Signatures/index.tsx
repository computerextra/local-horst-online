import Head from "next/head";
import Link from "next/link";
import { Button, Container, Form, FormSelect } from "react-bootstrap";
import { api } from "~/utils/api";

export default function index() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();
  const Download = api.Signaturen.download.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector("#signatureForm");
    if (form == null) return;
    const formData = new FormData(form as HTMLFormElement);
    const id = formData.get("id");
    const ma = Mitarbeiter.data?.find((m) => m.id === id);
    if (ma == null) return;
    if (ma.Email == null) return;
    const data = await Download.mutateAsync({ name: ma.Name, mail: ma.Email });
    if (data == null) return;
    const link = document.createElement("a");
    link.href = `data:application/bat;base64,${data}`;
    link.download = "install.bat";
    link.click();
  };

  return (
    <>
      <Head>
        <title>Signaturen | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Signaturen</h1>
        <ol>
          <li>Erst lesen, dann klicken!</li>
          <li>
            Auswählen, von welchem Mitarbeiter die Signaturen installiert werden
            sollen.
          </li>
          <li>
            <strong>Wichtig:</strong> Die Signaturen haben das Format: Vorname
            Nachname (Email Adresse). <br />
            Falls eine Signatur mit diesem Namen bereits vorhanden ist, wird
            diese ohne Nachfrage überschrieben!
          </li>
          <li>Auf Download drücken</li>
          <li>Outlook schließen</li>
          <li>Die Datei &quot;install&quot; ausführen</li>
          <li>
            Outlook öffnen und die neue Signatur hinterlegen. (
            <Link href="/Signatures/Wiki">Anleitung</Link>)
          </li>
          <li>
            Fertig! Die Datei &quot;install&quot; kann nun gelöscht werden.
          </li>
        </ol>
        <Form onSubmit={handleSubmit} id="signatureForm">
          <FormSelect size="lg" id="id" name="id" className="mb-3" required>
            <option hidden selected value="">
              Bitte Wählen
            </option>
            {Mitarbeiter.data?.map((m) => {
              if (m.Email)
                return (
                  <option key={m.id} value={m.id}>
                    {m.Name}
                  </option>
                );
            })}
          </FormSelect>
          <Button type="submit">Download</Button>
        </Form>
      </Container>
    </>
  );
}
