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

export default function OutputBearbeiten() {
  const Updater = api.Kabelwand.updateOutput.useMutation();
  const id = useRouter().query.id as string;
  const OutputRes = api.Kabelwand.getOutput.useQuery(id);
  const Output = OutputRes.data;

  const { push } = useRouter();
  const [Name, setName] = useState("");

  const Create = async () => {
    if (Name == "" || Name.length < 1) return;
    await Updater.mutateAsync({
      id,
      Name,
    });
    await push("/Kabelwand/Output");
  };

  useEffect(() => {
    if (Output == null) return;
    setName(Output.Name);
  }, [Output]);

  if (OutputRes.isLoading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>{Output?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand/Output" />
        <h1 className="text-center">{Output?.Name} bearbeiten</h1>
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
