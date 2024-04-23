import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import EinkaufsListe from "~/Components/EinkaufsListe";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Home() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();

  return (
    <>
      <Head>
        <title>LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <h1>Einkaufsliste</h1>

          <Row>
            <Col className="d-grid">
              <Button>Kaufen</Button>
            </Col>
            <Col className="d-grid">
              <Button>Drucken</Button>
            </Col>
            <Col className="d-grid">
              <Button variant="success">PayPal Abrechnung</Button>
            </Col>
          </Row>

          {Mitarbeiter.isLoading ? (
            <LoadingSpinner />
          ) : (
            Mitarbeiter.data?.map((m) => (
              <EinkaufsListe key={m.id} Mitarbeiter={m} />
            ))
          )}
        </Container>
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div>
//       <p>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
