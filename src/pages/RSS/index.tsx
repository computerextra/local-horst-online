import Head from "next/head";
import Image from "next/image";
import { Card, Col, Container, Row } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";
// TODO: Alles

export default function RSS() {
  const SecRes = api.RSS.getHeiseSecurity.useQuery();
  const TipsRes = api.RSS.getHeiseTipps.useQuery();

  const Sec = SecRes.data;
  const Tips = TipsRes.data;

  if (SecRes.status !== "success" || TipsRes.status !== "success")
    return <LoadingSpinner />;

  if (SecRes.isError || TipsRes.isError) return <>Fehler in der Abfrage</>;

  if (Sec == null || Tips == null) return <>Keine Feeds gefunden</>;

  return (
    <>
      <Head>
        <title>RSS Feeds | LocalHorst v7</title>
      </Head>
      <Container className="mt-5">
        <h1 className="text-center">Aktueller RSS Feeds von Heise</h1>
        <Row>
          <Col>
            <h2 className="text-center mb-5">Security-Alert Meldungen</h2>
            <Container
              fluid
              className="d-flex flex-column">
              {Sec.map((item) => {
                const linkArr = item.content.split('"');
                const link = linkArr[1];
                const pic = linkArr[3];
                const pArr = item.content.split("<p>");
                let p = "";
                if (pArr[2]) p = pArr[2].replace("</p>", "");
                if (link && pic)
                  return (
                    <Card
                      className="mb-3"
                      key={item.id}>
                      <Row className="g-0">
                        <Col md={4}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer">
                            <Image
                              className="img-fluid rounded-start"
                              width={200}
                              height={100}
                              src={pic}
                              alt=""
                            />
                          </a>
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{p}</Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  );
              })}
            </Container>
          </Col>
          <Col>
            <h2 className="text-center mb-5">heise tipps+tricks 🦄💻📱</h2>
            <Container
              fluid
              className="d-flex flex-column">
              {Tips.map((item) => {
                return (
                  <Card
                    className="mb-3"
                    key={item.id}>
                    <Card.Body>
                      <Card.Title>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
