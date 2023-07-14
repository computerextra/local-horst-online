import Head from "next/head";
import Link from "next/link";
import { Container, Table } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Mitarbeiter() {
  const postQuery = api.Mitarbeiter.getAll.useQuery();

  if (postQuery.status !== "success") return <LoadingSpinner />;

  const Mitarbeiter = postQuery.data;

  return (
    <>
      <Head>
        <title>Mitarbeiter Liste | LocalHorst v7</title>
      </Head>
      <Container
        fluid="sm"
        className="mt-5">
        <h1 className="text-center">Telefonliste Mitarbeiter</h1>
        <Link
          href="/Telefonlisten/Mitarbeiter/new"
          className="btn btn-success float-end">
          Neuen Mitarbeiter anlegen
        </Link>

        <Table
          striped
          className="mt-2">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Gruppenwahl</th>
              <th scope="col">Tel. 1</th>
              <th scope="col">Tel. 2</th>
              <th scope="col">HomeOffice</th>
              <th scope="col">Mobil</th>
              <th scope="col">Mail</th>
              <th scope="col">Azubi</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Mitarbeiter.map((ma) => (
              <tr key={ma.id}>
                <th scope="row">{ma.Name}</th>
                <th scope="row">{ma.Durchwahl != null ? ma.Durchwahl : ""}</th>
                <th scope="row">{ma.Telefon1 != null ? ma.Telefon1 : ""}</th>
                <th scope="row">{ma.Telefon2 != null ? ma.Telefon2 : ""}</th>
                <th scope="row">
                  {ma.HomeOffice != null ? ma.HomeOffice : ""}
                </th>
                <th scope="row">
                  {ma.Mobil != null ? (
                    <a href={`tel:${ma.Mobil}`}>{ma.Mobil}</a>
                  ) : (
                    ""
                  )}
                </th>
                <th scope="row">
                  {ma.Mail != null ? (
                    <a href={`mailto:${ma.Mail}`}>{ma.Mail}</a>
                  ) : (
                    ""
                  )}
                </th>
                <th scope="row">{ma.Azubi ? "✔" : "❌"}</th>
                <th scope="row">
                  <Link
                    href={"/Telefonlisten/Mitarbeiter/" + ma.id}
                    className="btn btn-outline-success">
                    Bearbeiten
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
