import Head from "next/head";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import EinkaufsListe from "~/Components/EinkaufsListe";
import LoadingSpinner from "~/Components/LoadingSpinner";
import Einkaufen from "~/Components/Modals/Einkaufen";
import PayPal from "~/Components/Modals/PayPal";
import { api } from "~/utils/api";

export default function Home() {
  const Liste = api.Einkauf.getAll.useQuery();
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const Print = () => {
    const Liste = document.querySelector("#einkaufsliste");
    if (Liste == null) return;

    const Window = window.open("", "PRINT", "height=1000,width=1200");
    if (Window == null) return;
    Window.document.write("<html><body style='white-space: pre-line;'>");
    Window.document.write("<h1>Einkaufsliste</h1>");
    Window.document.write("<h2>POST MITNEHMEN!</h2>");
    Window.document.write(Liste.innerHTML);
    Window.document.write("</body></html>");
    Window.document.close();
    Window.focus();
    Window.print();
    setTimeout(() => Window.close(), 2000);
  };

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
              <Button onClick={() => setShowForm((prev) => !prev)}>
                Kaufen
              </Button>
            </Col>
            <Col className="d-grid">
              <Button onClick={Print}>Drucken</Button>
            </Col>
            <Col className="d-grid">
              <Button
                variant="success"
                onClick={() => setShowPayPal((prev) => !prev)}
              >
                PayPal Abrechnung
              </Button>
            </Col>
          </Row>
          <section id="einkaufsliste">
            {Liste.isLoading ? (
              <LoadingSpinner />
            ) : (
              Liste.data?.map((m) => (
                <EinkaufsListe
                  key={m.id}
                  Einkauf={m}
                  Name={
                    Mitarbeiter.data?.find((x) => x.id == m.mitarbeiterId)?.Name
                  }
                />
              ))
            )}
          </section>
        </Container>
        {showForm && (
          <Einkaufen
            show={showForm}
            setShow={setShowForm}
            Mitarbeiter={Mitarbeiter.data}
          />
        )}
        {showPayPal && <PayPal show={showPayPal} setShow={setShowPayPal} />}
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
