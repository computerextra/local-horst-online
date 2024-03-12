import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, FormSelect } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Signaturen() {
  const postQuery = api.Mitarbeiter.getAll.useQuery();
  const Downloader = api.Mitarbeiter.getSignatureDownload.useMutation();
  const [showForm, setShowForm] = useState(false);
  const [Submitted, setSubmitted] = useState(false);
  const [SelectedValues, setSelectedValues] = useState<string[]>([]);

  if (postQuery.status !== "success") return <LoadingSpinner />;

  const Mitarbeiter = postQuery.data;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.currentTarget.selectedOptions;
    const tmp = [];
    if (!selected) return;
    for (let i = 0; i < selected.length; i++) {
      // @ts-expect-error Objekt muss definiert sein...
      tmp.push(selected[i].value);
    }
    setSelectedValues(tmp);
  };

  const handleFormSubmit = async () => {
    console.log(SelectedValues);
    if (SelectedValues.length < 1) return;
    const data = await Downloader.mutateAsync({ mitarbeiter: SelectedValues });
    if (data == null) return;

    const a = document.createElement("a");
    a.href = "data:application/bat;base64," + data;
    a.download = "install.bat";
    a.click();
    setShowForm(false);
    setSubmitted(false);
  };

  return (
    <>
      <Head>
        <title>Signaturen | LocalHorst v7</title>
      </Head>
      <Container
        fluid="sm"
        className="mt-5">
        <h1 className="text-center">Signaturen Download</h1>
        <section>
          <p>So geht`s:</p>
          <ol>
            <li>Erst lesen, dann klicken!</li>
            <li>
              Auswählen, von welchem Mitarbeiter die Signaturen installiert
              werden sollen.
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
              <Link href="/Signaturen/Wiki">Anleitung</Link>)
            </li>
            <li>
              Fertig! Die Datei &quot;install&quot; kann nun gelöscht werden.
            </li>
          </ol>
        </section>
        <section>
          {showForm ? (
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormSelect
                multiple
                onChange={handleChange}
                htmlSize={15}
                required>
                {Mitarbeiter.map((ma) => {
                  if (ma.Kurz) {
                    return (
                      <option
                        key={ma.id}
                        value={ma.Kurz}>
                        {ma.Name}
                      </option>
                    );
                  }
                })}
              </FormSelect>
              <div className="d-grid mt-2">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => void handleFormSubmit()}>
                  Absenden
                </Button>
              </div>
            </Form>
          ) : (
            <p className="d-grid mt-5">
              {!showForm && !Submitted && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowForm(true)}>
                  Gelesen?
                </Button>
              )}
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
