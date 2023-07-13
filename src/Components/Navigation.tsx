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
            <Link
              className={`nav-link ${
                router.pathname === "/Archive" ? "active" : ""
              }`}
              href="/Archive"
              onClick={expand}>
              CE Archiv
            </Link>
            <Link
              className={`nav-link ${
                router.pathname === "/Fritz" ? "active" : ""
              }`}
              href="/Fritz"
              onClick={expand}>
              Fritz Box
            </Link>
            <Link
              className={`nav-link ${
                router.pathname === "/Signaturen" ? "active" : ""
              }`}
              href="/Signaturen"
              onClick={expand}>
              Signaturen
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
