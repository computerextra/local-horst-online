import Head from "next/head";
import Link from "next/link";
import { Button, Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Inputs() {
  const FachRes = api.Kabelwand.getInputs.useQuery();
  const Inputs = FachRes.data;
  const Löscher = api.Kabelwand.deleteInput.useMutation();

  if (FachRes.isLoading) return <LoadingSpinner />;

  const Delete = async (id: string) => {
    await Löscher.mutateAsync(id);
    location.reload();
  };

  return (
    <>
      <Head>
        <title>Alle Inputs | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <Link
          href="/Kabelwand/new"
          className="btn btn-warning">
          Zurück
        </Link>
        <h1 className="text center">Alle Inputs</h1>
        <Table
          striped
          className="mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bearbeiten</th>
              <th>Löschen</th>
            </tr>
          </thead>
          <tbody>
            {Inputs?.map((Input) => (
              <tr key={Input.id}>
                <td>{Input.Name}</td>
                <td>
                  <Link
                    className="btn btn-outline-success"
                    href={"/Kabelwand/Input/" + Input.id}>
                    Bearbeiten
                  </Link>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => void Delete(Input.id)}>
                    Löschen
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      ;
    </>
  );
}
