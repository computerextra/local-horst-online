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

// TODO: ALLES

export default function ReiheBearbeiten() {
  const Updater = api.Kabelwand.updateRow.useMutation();
  const id = useRouter().query.id as string;
  const ReiheRes = api.Kabelwand.getRow.useQuery(id);
  const Reihe = ReiheRes.data;

  const { push } = useRouter();
  const [Name, setName] = useState("");

  const Create = async () => {
    if (Name == "" || Name.length < 1) return;
    await Updater.mutateAsync({
      id,
      Name,
    });
    await push("/Kabelwand/Reihe");
  };

  useEffect(() => {
    if (Reihe == null) return;
    setName(Reihe.Name);
  }, [Reihe]);

  if (ReiheRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>{Reihe?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand/Reihe" />
        <h1 className="text-center">{Reihe?.Name} bearbeiten</h1>
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
