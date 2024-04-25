import { Container } from "react-bootstrap";

export default function Error({ error }: { error: string }) {
  return (
    <Container>
      <h1 className="text-danger">Fehler!</h1>
      <p>{error}</p>
    </Container>
  );
}
