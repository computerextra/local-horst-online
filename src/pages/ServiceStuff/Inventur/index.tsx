import Head from "next/head";
import Link from "next/link";
import { Container, Table } from "react-bootstrap";

const Inventur = () => {
  return (
    <>
      <Head>
        <title>Inventur | LocalHorst v7</title>
      </Head>
      <Container className="mt-2">
        <h1 className="text-center">Inventur Übersicht</h1>

        <Table striped>
          <thead>
            <tr>
              <th>Jahr</th>
              <th>Ansicht</th>
            </tr>
          </thead>
          <tbody>
            <InventurRow year="2023" />
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Inventur;

function InventurRow({ year }: { year: string }) {
  return (
    <tr>
      <td>{year}</td>
      <td>
        <Link href={`/ServiceStuff/Inventur/${year}`}>Zur Inventur</Link>
      </td>
    </tr>
  );
}
