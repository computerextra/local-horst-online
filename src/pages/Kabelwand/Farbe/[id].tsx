import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import CableNav from "~/Components/CableNavs";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function FarbeBearbeiten() {
  const Updater = api.Kabelwand.updateColor.useMutation();
  const id = useRouter().query.id as string;
  const FarbeRes = api.Kabelwand.getColor.useQuery(id);
  const Farbe = FarbeRes.data;

  const { push } = useRouter();
  const [Name, setName] = useState("");

  const Create = async () => {
    if (Name == "" || Name.length < 1) return;
    await Updater.mutateAsync({
      id,
      Name,
    });
    await push("/Kabelwand/Farbe");
  };

  useEffect(() => {
    if (Farbe == null) return;
    setName(Farbe.Name);
  }, [Farbe]);

  if (FarbeRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>{Farbe?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand/Farbe" />
        <h1 className="text-center">{Farbe?.Name} bearbeiten</h1>
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
