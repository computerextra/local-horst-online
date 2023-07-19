import Head from "next/head";
import { Container } from "react-bootstrap";
import CableNav from "~/Components/CableNavs";

export default function NeuesKabel() {
  return (
    <>
      <Head>
        <title>Neues Kabel | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand" />
      </Container>
    </>
  );
}
