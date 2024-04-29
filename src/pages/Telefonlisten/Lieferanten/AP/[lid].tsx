import {
  Form,
  FloatingLabel,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import useAdmin from "~/Hooks/useAdmin";
import { useSession, signIn } from "next-auth/react";

export default function NeuerAnsprechpartner() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();
  const { lid } = router.query;
  const Anlegen = api.Ansprechpartner.create.useMutation();

  const [Name, setName] = useState<undefined | string>(undefined);
  const [Telefon, setTelefon] = useState<undefined | string>(undefined);
  const [Mobil, setMobil] = useState<undefined | string>(undefined);
  const [Mail, setMail] = useState<undefined | string>(undefined);

  const handleSave = async () => {
    if (!isAdmin) return;
    if (Name == null) return;

    const res = await Anlegen.mutateAsync({
      Name,
      Telefon,
      Mobil,
      Mail,
      lieferantenId: lid as string,
    });
    if (res) {
      router.push("/Telefonlisten/Lieferanten/edit/" + lid);
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
      <h1>Neuen Ansprechpartner anlegen</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FloatingLabel className="mb-3" label="Name" controlId="Name">
          <FormControl
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Telefon" controlId="Telefon">
          <FormControl
            type="text"
            placeholder="Telefon"
            value={Telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Mobil" controlId="Mobil">
          <FormControl
            type="text"
            placeholder="Mobil"
            value={Mobil}
            onChange={(e) => setMobil(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Mail" controlId="Mail">
          <FormControl
            type="text"
            placeholder="Mail"
            value={Mail}
            onChange={(e) => setMail(e.target.value)}
          />{" "}
        </FloatingLabel>
        <Button type="submit" onClick={handleSave}>
          Speichern
        </Button>
      </Form>
    </Container>
  );
}
