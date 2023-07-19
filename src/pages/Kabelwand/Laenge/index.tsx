import Head from "next/head";
import Link from "next/link";
import { Button, Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Laengen() {
  const FachRes = api.Kabelwand.getLengths.useQuery();
  const Längen = FachRes.data;
  const Löscher = api.Kabelwand.deleteLength.useMutation();

  if (FachRes.isLoading) return <LoadingSpinner />;

  const Delete = async (id: string) => {
    await Löscher.mutateAsync(id);
    location.reload();
  };

  return (
    <>
      <Head>
        <title>Alle Längen | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <Link
          href="/Kabelwand/new"
          className="btn btn-warning">
          Zurück
        </Link>
        <h1 className="text center">Alle Längen</h1>
        <Link
          className="btn btn-primary mt-2"
          href="/Kabelwand/Laenge/new">
          Neu
        </Link>
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
            {Längen?.map((Länge) => (
              <tr key={Länge.id}>
                <td>{Länge.Name}</td>
                <td>
                  <Link
                    className="btn btn-outline-success"
                    href={"/Kabelwand/Laenge/" + Länge.id}>
                    Bearbeiten
                  </Link>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => void Delete(Länge.id)}>
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
