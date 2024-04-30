import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function NeuerLieferant() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();
  const Anlegen = api.Lieferanten.create.useMutation();
  // Lieferanten States
  const [Firma, setFirma] = useState<undefined | string>(undefined);
  const [Kundennummer, setKundennummer] = useState<undefined | string>(
    undefined
  );
  const [Webseite, setWebseite] = useState<undefined | string>(undefined);

  const handleSave = async () => {
    if (Firma == null) return;
    if (!isAdmin) return;

    const res = await Anlegen.mutateAsync({
      Firma,
      Kundennummer,
      Webseite,
    });
    if (res) {
      await router.push("/Telefonlisten/Lieferanten/edit/" + res.id);
    }
  };

  if (!isAdmin)
    return (
      <Container>
        <h1 className="text-center text-danger">Kein Admin!</h1>
      </Container>
    );

  if (sessionData == null)
    return (
      <Container>
        <h1 className="text-center">Nicht angemeldet. Bitte anmelden!</h1>
        <Button onClick={() => void signIn()}>Anmelden</Button>
      </Container>
    );

  return (
    <Container>
      <h1>Neuen Lieferant anlegen</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FloatingLabel className="mb-3" label="Firma" controlId="Firma">
          <FormControl
            type="text"
            placeholder="Firma"
            value={Firma}
            onChange={(e) => setFirma(e.target.value)}
          />{" "}
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Kundennummer"
          controlId="Kundennummer"
        >
          <FormControl
            type="text"
            placeholder="Kundennummer"
            value={Kundennummer}
            onChange={(e) => setKundennummer(e.target.value)}
          />{" "}
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Webseite" controlId="Webseite">
          <FormControl
            type="text"
            placeholder="Webseite"
            value={Webseite}
            onChange={(e) => setWebseite(e.target.value)}
          />{" "}
        </FloatingLabel>
        <Button type="submit" onClick={handleSave}>
          Speichern
        </Button>
      </Form>
    </Container>
  );
}
