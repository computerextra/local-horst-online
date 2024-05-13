import type { Mitarbeiter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Button,
  FloatingLabel,
  FormControl,
  FormGroup,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import { api } from "~/utils/api";

export default function PayPal({
  show,
  setShow,
  Mitarbeiter,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  Mitarbeiter: Mitarbeiter[] | undefined;
}) {
  const Liste = api.Einkauf.getAll.useQuery();
  const Mailer = api.Mail.paypalMail.useMutation();

  const [PayPalBezahlung, setPayPalBezahlung] = useState<
    undefined | Mitarbeiter[]
  >(undefined);
  const [Auswahl, setAuswahl] = useState<undefined | Mitarbeiter>(undefined);
  const [Gold, setGold] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [Ergebnis, setErgebnis] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    if (Auswahl == null) {
      setErgebnis("Mitarbeiter wurde nicht ausgewählt!");
      return;
    }
    if (Auswahl.Email == null) {
      setErgebnis(
        "Mitarbeiter hat keine Email Adresse, eine Abrechnung ist nicht möglich!"
      );
      return;
    }
    if (username == null) {
      setErgebnis("PayPal Benutzername wurde nicht eingetragen!");
      return;
    }
    if (Gold == null) {
      setErgebnis("PayPal Betrag wurde nicht eingetragen!");
      return;
    }
    const res = await Mailer.mutateAsync({
      paypalName: username,
      Schulden: Gold,
      receiverMail: Auswahl.Email,
      receiverName: Auswahl.Name,
    });
    if (res) {
      setErgebnis("Erfolgreich abgerechnet!");
      setTimeout(() => {
        setErgebnis(undefined);
      }, 2000);
    } else {
      setErgebnis("Fehler beim Mailversand, bitte an Johannes wenden!");
    }
  };

  useEffect(() => {
    if (Mitarbeiter == null) return;
    const x: Mitarbeiter[] = [];
    Mitarbeiter.forEach((m) => {
      console.log("Check ma: ", m.Name);
      console.log("Mail: ", m.Email);
      if (Liste.data?.find((e) => e.mitarbeiterId == m.id)?.Paypal) {
        x.push(m);
        console.log(`${m.Name} hat Paxpal`);
      }
    });
    setPayPalBezahlung(x);
  }, [Mitarbeiter, Liste.data]);

  if (Mitarbeiter == null) return <></>;
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader closeButton>PayPal Abrechnung</ModalHeader>
      <ModalBody>
        <FormSelect
          className="mb-3 "
          size="lg"
          onChange={(e) =>
            setAuswahl(Mitarbeiter.find((m) => m.id == e.target.value))
          }
        >
          <option hidden selected value="">
            Bitte Wählen
          </option>
          {PayPalBezahlung?.map((m) => {
            const e = Liste.data?.find((e) => e.mitarbeiterId == m.id);
            if (e == null) return <></>;
            if (
              e.Paypal &&
              e.Abgeschickt &&
              (new Date(e.Abgeschickt).toDateString() ==
                new Date().toDateString() ||
                e.Abonniert)
            )
              return (
                <option key={m.id} value={m.id}>
                  {m.Name}
                </option>
              );
          })}
        </FormSelect>
        <FormGroup className="mb-3 ">
          <FloatingLabel
            controlId="floatingInput"
            label="Paypal Username"
            className="mb-3"
          >
            <FormControl
              type="text"
              placeholder="Paypal Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup className="mb-3 ">
          <FloatingLabel
            controlId="floatingInput"
            label="Geschuldetes Gold in €"
            className="mb-3"
          >
            <FormControl
              type="text"
              placeholder="2 Mark 50"
              value={Gold}
              onChange={(e) => setGold(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <p
          className={`text-center ${
            Ergebnis?.includes("Erfolg") ? "text-success" : "text-danger"
          }`}
        >
          {Ergebnis}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleSubmit}>
          Mail Senden
        </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Schließen
        </Button>
      </ModalFooter>
    </Modal>
  );
}
