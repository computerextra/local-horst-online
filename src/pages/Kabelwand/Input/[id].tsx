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

export default function InputBearbeiten() {
  const Updater = api.Kabelwand.updateInput.useMutation();
  const id = useRouter().query.id as string;
  const InputRes = api.Kabelwand.getInput.useQuery(id);
  const Input = InputRes.data;

  const { push } = useRouter();
  const [Name, setName] = useState("");

  const Create = async () => {
    if (Name == "" || Name.length < 1) return;
    await Updater.mutateAsync({
      id,
      Name,
    });
    await push("/Kabelwand/Input");
  };

  useEffect(() => {
    if (Input == null) return;
    setName(Input.Name);
  }, [Input]);

  if (InputRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>{Input?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand/Input" />
        <h1 className="text-center">{Input?.Name} bearbeiten</h1>
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
