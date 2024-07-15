import { Container, Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Container className="d-flex justify-content-center pt-5">
      <Spinner animation="border" variant="primary" />
      <Spinner animation="grow" variant="primary" />

      <Spinner animation="border" variant="secondary" />
      <Spinner animation="grow" variant="secondary" />

      <Spinner animation="border" variant="success" />
      <Spinner animation="grow" variant="success" />

      <Spinner animation="border" variant="danger" />
      <Spinner animation="grow" variant="danger" />

      <Spinner animation="border" variant="warning" />
      <Spinner animation="grow" variant="warning" />

      <Spinner animation="border" variant="info" />
      <Spinner animation="grow" variant="info" />
    </Container>
  );
}
