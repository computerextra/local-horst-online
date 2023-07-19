import Head from "next/head";
import Link from "next/link";
import { Button, Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Reihen() {
  const FachRes = api.Kabelwand.getRows.useQuery();
  const Reihen = FachRes.data;
  const Löscher = api.Kabelwand.deleteRow.useMutation();

  if (FachRes.isLoading) return <LoadingSpinner />;

  const Delete = async (id: string) => {
    await Löscher.mutateAsync(id);
    location.reload();
  };

  return (
    <>
      <Head>
        <title>Alle Reihen | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <Link
          href="/Kabelwand/new"
          className="btn btn-warning">
          Zurück
        </Link>
        <h1 className="text center">Alle Reihen</h1>
        <Link
          className="btn btn-primary mt-2"
          href="/Kabelwand/Reihe/new">
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
            {Reihen?.map((Reihe) => (
              <tr key={Reihe.id}>
                <td>{Reihe.Name}</td>
                <td>
                  <Link
                    className="btn btn-outline-success"
                    href={"/Kabelwand/Reihe/" + Reihe.id}>
                    Bearbeiten
                  </Link>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => void Delete(Reihe.id)}>
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
