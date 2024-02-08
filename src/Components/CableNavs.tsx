import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function CableNav({ url }: { url: string }) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-center">
            <Link
              href={url}
              className="btn btn-warning">
              Zurück
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Regal"
              className="btn btn-primary">
              Regale
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Reihe"
              className="btn btn-primary">
              Reihen
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Fach"
              className="btn btn-primary">
              Fächer
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Input"
              className="btn btn-primary">
              Inputs
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Output"
              className="btn btn-primary">
              Outputs
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Farbe"
              className="btn btn-primary">
              Farben
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <Link
              href="/Kabelwand/Laenge"
              className="btn btn-primary">
              Längen
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
