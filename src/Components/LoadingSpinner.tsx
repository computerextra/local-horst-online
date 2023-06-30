import { Container, Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Container className="mt-5">
      <div className="d-flex align-items-center justify-content-center mt-5 pb-5">
        <Spinner
          style={{ width: "15rem", height: "15rem" }}
          animation="border"
          role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Container>
  );
}
