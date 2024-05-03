import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Button,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarText,
  NavbarToggle,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";

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
            <NavLink as={Link} href="/Geburtstag">
              Geburtstag
            </NavLink>
            <NavLink as={Link} href="/Archiv">
              Archiv
            </NavLink>
            <NavLink as={Link} href="/Signatures">
              Signaturen
            </NavLink>
            <NavLink as={Link} href="/Zeit">
              Zeit
            </NavLink>
            {/* <NavLink as={Link} href="/">
              RSS
            </NavLink> */}
            <NavDropdown title="Telefonlisten" id="TelefonlistenDropdown">
              <NavDropdown.Item as={Link} href="/Telefonlisten/Mitarbeiter">
                Mitarbeiter
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/Telefonlisten/Lieferanten">
                Lieferanten
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/Telefonlisten/Sage">
                Sage Suche
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Service" id="ServiceDropdown">
              <NavDropdown.Item as={Link} href="/Service/Inventur">
                Inventur
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/Service/Seriennummer">
                SN
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/Service/Info">
                Info
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/Service/Warenlieferung">
                WL
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="CMS" id="CmsDropdown">
              <NavDropdown.Item as={Link} href="/CMS/Abteilung">
                Abteilung
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/CMS/Mitarbeiter">
                Mitarbeiter
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/CMS/Partner">
                Partner
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/CMS/Angebote">
                Angebote
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} href="/Werkstatt">
              Werkstatt
            </NavLink>
          </Nav>
          <div className="d-flex">
            <Anmeldung />
          </div>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

function Anmeldung() {
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();

  if (sessionData?.user) {
    return (
      <NavbarText>
        <Dropdown>
          <DropdownToggle variant="outline-success">
            {sessionData.user.name
              ? sessionData.user.name
              : sessionData.user.email?.split("@")[0]}
          </DropdownToggle>
          <DropdownMenu>
            {isAdmin && (
              <>
                <DropdownItem as={Link} href="/admin">
                  Admin
                </DropdownItem>
                <DropdownDivider />
              </>
            )}
            <DropdownItem as={Link} href={"/profile/" + sessionData.user.id}>
              Profil
            </DropdownItem>

            <DropdownDivider />
            <DropdownItem onClick={() => void signOut()}>Abmelden</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarText>
    );
  } else {
    return (
      <Button variant="outline-success" onClick={() => void signIn()}>
        Login
      </Button>
    );
  }
}
