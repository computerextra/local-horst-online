import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import CableNav from "~/Components/CableNavs";
import { api } from "~/utils/api";

// TODO: ALLES

export default function NeuerInput() {
  const Anleger = api.Kabelwand.createInput.useMutation();
  const { push } = useRouter();
  const [Name, setName] = useState("");

  const Create = async () => {
    if (Name == "" || Name.length < 1) return;
    await Anleger.mutateAsync(Name);
    await push("/Kabelwand/Farbe");
  };

  return (
    <>
      <Head>
        <title>Neuer Input | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand/Farbe" />
        <h1 className="text-center">Neuen Input anlegen</h1>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup className="mb-3">
            <FloatingLabel label="Name">
              <FormControl
                type="text"
                defaultValue={Name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </FormGroup>
          <Button
            type="submit"
            onClick={() => void Create()}>
            Speichern
          </Button>
        </Form>
      </Container>
    </>
  );
}
