import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
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
              className={`nav-link ${
                router.pathname === "/Einkaufen" ? "active" : ""
              }`}
              href="/Einkaufen"
              onClick={expand}>
              Einkaufen
            </Link>
            <Link
              className={`nav-link ${
                router.pathname === "/Geburtstage" ? "active" : ""
              }`}
              href="/Geburtstage"
              onClick={expand}>
              Geburtstage
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
