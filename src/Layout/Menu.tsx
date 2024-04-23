import Link from "next/link";
import {
  Container,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";

export default function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarBrand href="/">Da LocalHorst</NavbarBrand>
        <NavbarToggle aria-controls="navbarNav" />
        <NavbarCollapse id="navbarNav">
          <Nav className="me-auto" variant="underline">
            <NavLink as={Link} href="/">
              Frühstück
            </NavLink>
            <NavLink as={Link} href="/">
              Geburtstag
            </NavLink>
            <NavLink as={Link} href="/">
              Archiv
            </NavLink>
            <NavLink as={Link} href="/">
              Signaturen
            </NavLink>
            <NavLink as={Link} href="/">
              Zeit
            </NavLink>
            <NavLink as={Link} href="/">
              RSS
            </NavLink>
            <NavDropdown title="Telefonlisten" id="TelefonlistenDropdown">
              <NavDropdown.Item as={Link} href="/">
                Mitarbeiter
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/">
                Lieferanten
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/">
                Sage Suche
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Service" id="ServiceDropdown">
              <NavDropdown.Item as={Link} href="/">
                SN
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/">
                Info
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/">
                WL
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="CMS" id="CmsDropdown">
              <NavDropdown.Item as={Link} href="/">
                Abteilung
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/">
                Mitarbeiter
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/">
                Partner
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/">
                Angebote
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} href="/">
              Werkstatt
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
