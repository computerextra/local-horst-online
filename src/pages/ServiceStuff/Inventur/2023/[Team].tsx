import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Table } from "react-bootstrap";
import { api } from "~/utils/api";

export default function Team() {
  const router = useRouter();
  const team = router.query.Team;
  const data = api.File.getInventur.useQuery({
    team: team as string,
    year: 2023,
  });

  return (
    <>
      <Head>
        <title>{team} | LocalHorst v7</title>
      </Head>
      <Container className="mt-2">
        <h1 className="text-center">Übersicht für Team: {team}</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Artikelnummer</th>
              <th>Suchbegriff</th>
              <th>Anzahl</th>
            </tr>
          </thead>
          <tbody>
            {data.data?.map((file, idx) => (
              <tr key={idx}>
                <td>{file.Artikelnummer.trim()}</td>
                <td>{file.Suchbegriff.trim()}</td>
                <td>{file.Anzahl}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
