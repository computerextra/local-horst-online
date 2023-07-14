import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

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
            <NavDropdown title="Telefonlisten">
              <NavDropdown.Item
                as={Link}
                className={`${
                  router.pathname === "/Telefonlisten/Sage" ? "active" : ""
                }`}
                href="/Telefonlisten/Sage"
                onClick={expand}>
                Kunden / Lieferanten Sage
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className={`${
                  router.pathname === "/Telefonlisten/Mitarbeiter"
                    ? "active"
                    : ""
                }`}
                href="/Telefonlisten/Mitarbeiter"
                onClick={expand}>
                Mitarbeiter
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className={`${
                  router.pathname === "/Telefonlisten/Lieferanten"
                    ? "active"
                    : ""
                }`}
                href="/Telefonlisten/Lieferanten"
                onClick={expand}>
                Lieferanten
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Service Stuff">
              <NavDropdown.Item
                as={Link}
                className={`${
                  router.pathname === "/ServiceStuff/Seriennummern"
                    ? "active"
                    : ""
                }`}
                href="/ServiceStuff/Seriennummern"
                onClick={expand}>
                CE SN
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className={`${
                  router.pathname === "/ServiceStuff/InfoAnKunde"
                    ? "active"
                    : ""
                }`}
                href="/ServiceStuff/InfoAnKunde"
                onClick={expand}>
                Info an Kunde
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                className={`${
                  router.pathname === "/ServiceStuff/Warenlieferung"
                    ? "active"
                    : ""
                }`}
                href="/ServiceStuff/Warenlieferung"
                onClick={expand}>
                Warenlieferung
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              className={`nav-link ${
                router.pathname === "/Cashback" ? "active" : ""
              }`}
              href="/Cashback"
              onClick={expand}>
              CB
            </Link>
            <Link
              className={`nav-link ${
                router.pathname === "/Kabelwand" ? "active" : ""
              }`}
              href="/Kabelwand"
              onClick={expand}>
              Kabelwand
            </Link>
            <Link
              className={`nav-link ${
                router.pathname === "/Zeit" ? "active" : ""
              }`}
              href="/Zeit"
              onClick={expand}>
              Zeit
            </Link>
            <Link
              className={`nav-link ${
                router.pathname === "/RSS" ? "active" : ""
              }`}
              href="/RSS"
              onClick={expand}>
              RSS
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
