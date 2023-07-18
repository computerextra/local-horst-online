import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

// TODO: Formular für Feedback

export default function Home() {
  const Mailer = api.Mail.sendFeedback.useMutation();
  const MitarbeiterRes = api.Mitarbeiter.getAll.useQuery();
  const Mitarbeiter = MitarbeiterRes.data;

  const [Nachricht, setNachricht] = useState<string>("");
  const [Absender, setAbsender] = useState<string>("");
  const [MailResponse, setMailResponse] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const SendMail = async () => {
    if (Nachricht.length < 1) {
      setMailResponse("Bitte eine Nachricht eingeben");
      return;
    }
    if (Absender.length < 1) {
      setMailResponse("Bitte deinen Namen auswählen");
      return;
    }
    setLoading(true);
    const res = await Mailer.mutateAsync({ Sender: Absender, Nachricht });
    if (res === "Sent") {
      setMailResponse("Versendet");
      setTimeout(() => {
        setNachricht("");
        setAbsender("");
        setMailResponse(null);
        setLoading(false);
      }, 5000);
    } else {
      setMailResponse(res);
      setLoading(false);
    }
  };

  if (MitarbeiterRes.isLoading) return <LoadingSpinner />;

  return (
    <Container className="mt-5">
      <h1 className="text-center">Willkommen auf dem ganz neuen Local Horst</h1>
      <p className="text-center fs-5">
        Fehler gefunden oder einfach nur neue Wünsche?
      </p>
      <p className="text-center fs-5">
        Dann einfach das Formular ausfüllen und absenden 🤩
      </p>
      {MailResponse != null && (
        <p className="text-center fs-1">{MailResponse}</p>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5">
          <FloatingLabel
            label="Mitarbeiter"
            className="mb-3">
            <FormSelect
              name="id"
              id="id"
              required
              onChange={(e) => {
                setAbsender(e.target.value);
              }}
              defaultValue="">
              <option
                value=""
                hidden>
                Wählen...
              </option>
              {Mitarbeiter?.map((ma) => (
                <option
                  value={ma.Name}
                  key={ma.id}
                  label={ma.Name}
                />
              ))}
            </FormSelect>
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            label="Einkauf">
            <FormControl
              as="textarea"
              placeholder="Nachricht"
              rows={6}
              style={{ height: "100%" }}
              required
              value={Nachricht}
              onChange={(e) => setNachricht(e.target.value)}
            />
          </FloatingLabel>
          <FormGroup className="mb-3">
            <Button
              type="submit"
              variant="primary"
              onClick={() => {
                void SendMail();
              }}>
              Senden
            </Button>
          </FormGroup>
        </Form>
      )}
    </Container>
  );
}
