import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function AnsprechpartnerEdit() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();
  const { lid, id } = router.query;
  const Ansprechpartner = api.Ansprechpartner.get.useQuery({
    id: id as string,
  });
  const Updater = api.Ansprechpartner.update.useMutation();

  // AP States
  const [Name, setName] = useState<undefined | string>(undefined);
  const [Telefon, setTelefon] = useState<undefined | string>(undefined);
  const [Mobil, setMobil] = useState<undefined | string>(undefined);
  const [Mail, setMail] = useState<undefined | string>(undefined);

  const handleSave = async () => {
    if (!isAdmin) return;
    if (Name == null) return;
    const res = await Updater.mutateAsync({
      id: id as string,
      Name,
      Telefon,
      Mobil,
      Mail,
      lieferantenId: lid as string,
    });
    if (res) {
      await router.push("/Telefonlisten/Lieferanten/edit/" + lid?.toString());
    }
  };

  useEffect(() => {
    if (Ansprechpartner.data == null) return;

    setName(Ansprechpartner.data.Name);
    setTelefon(Ansprechpartner.data.Telefon ?? undefined);
    setMobil(Ansprechpartner.data.Mobil ?? undefined);
    setMail(Ansprechpartner.data.Mail ?? undefined);
  }, [Ansprechpartner.data]);

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
    <>
      <Head>
        <title>{Ansprechpartner.data?.Name} | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>{Ansprechpartner.data?.Name} bearbeiten</h1>

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
    </>
  );
}
