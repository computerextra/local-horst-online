import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FloatingLabel,
  Form,
  FormControl,
  Table,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function LieferantenEdit() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();
  const { id } = router.query;
  const Lieferant = api.Lieferanten.get.useQuery({ id: id as string });
  const Update = api.Lieferanten.update.useMutation();
  const DeleteAp = api.Ansprechpartner.delete.useMutation();

  // Lieferanten States
  const [Firma, setFirma] = useState<undefined | string>(undefined);
  const [Kundennummer, setKundennummer] = useState<undefined | string>(
    undefined
  );
  const [Webseite, setWebseite] = useState<undefined | string>(undefined);

  useEffect(() => {
    if (Lieferant.data == null) return;

    setFirma(Lieferant.data.Firma);
    setKundennummer(Lieferant.data.Kundennummer ?? undefined);
    setWebseite(Lieferant.data.Webseite ?? undefined);
  }, [Lieferant.data]);

  const handleUpdate = async () => {
    if (Firma == null) return;

    const res = await Update.mutateAsync({
      id: id as string,
      Firma,
      Kundennummer,
      Webseite,
    });
    if (res) {
      await router.push("/Telefonlisten/Lieferanten");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await DeleteAp.mutateAsync({ id });
    if (res) {
      location.reload();
    }
  };

  if (Lieferant.isError)
    return (
      <Container>
        <h1 className="text-center text-danger">
          Fehler! Mitarbeiter nicht gefunden
        </h1>
      </Container>
    );

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
        <title>{Lieferant.data?.Firma} | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>{Lieferant.data?.Firma} bearbeiten</h1>
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
          <Button type="submit" onClick={handleUpdate}>
            Speichern
          </Button>
        </Form>
        <h2>Ansprechpartner</h2>
        <Link
          href={"/Telefonlisten/Lieferanten/AP/" + Lieferant.data?.id}
          className="btn btn-lg btn-outline-primary mb-3"
        >
          Neuer AP
        </Link>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mail</th>
              <th>Mobil</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {Lieferant.data?.Anschprechpartner?.map((x) => (
              <tr key={x.id}>
                <td>{x.Name}</td>
                <td>{x.Mail ?? "-"}</td>
                <td>{x.Mobil ?? "-"}</td>
                <td>{x.Telefon ?? "-"}</td>
                <td>
                  <Dropdown>
                    <DropdownToggle variant="success" id="dropdown-actions">
                      Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        as={Link}
                        href={
                          "/Telefonlisten/Lieferanten/AP/edit/" +
                          Lieferant.data?.id +
                          "/" +
                          x.id
                        }
                      >
                        Bearbeiten
                      </DropdownItem>
                      <DropdownItem
                        href="#"
                        onClick={() => void handleDelete(x.id)}
                      >
                        AP Löschen
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
