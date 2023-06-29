import Link from "next/link";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      bg="dark"
      expand="lg"
      variant="dark"
      className="rounded mt-1"
      expanded={expanded}>
      <Container fluid>
        <Link
          className="navbar-brand"
          href="/">
          LocalHorst
        </Link>
        <Navbar.Collapse>
          <Nav
            className="me-aut"
            variant="tabs">
            {/* Einkaufen */}
            <Link
              className="nav-link"
              href="/Einkaufen"
              onClick={expand}>
              Einkaufen
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
