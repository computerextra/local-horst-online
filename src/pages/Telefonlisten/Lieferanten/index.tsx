import {
  Container,
  DropdownItem,
  DropdownToggle,
  DropdownDivider,
  DropdownMenu,
  Dropdown,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import Link from "next/link";
import { api } from "~/utils/api";

export default function LieferantenPage() {
  const Lieferanten = api.Lieferanten.getAll.useQuery();
  const { isAdmin } = useAdmin();
  return (
    <Container fluid>
      <Container>
        <h1>Lieferanten</h1>
      </Container>
      <Link
        className={`btn btn-lg btn-outline-primary ${!isAdmin && "disabled"} mb-2`}
        href="/Telefonlisten/Lieferanten/new"
      >
        Neu
      </Link>

      {Lieferanten.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Firma</th>
              <th>KuNu</th>
              <th>APs</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Lieferanten.data?.map((e) => (
              <tr key={e.id}>
                <td>{e.Firma}</td>
                <td>{e.Kundennummer}</td>
                <td>
                  <Table hover striped>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Tel.</th>
                        <th>Mob.</th>
                        <th>Mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.Anschprechpartner?.map((a) => (
                        <tr key={a.id}>
                          <td>{a.Name}</td>
                          <td>
                            {a.Telefon ? (
                              <a href={"tel:" + a.Telefon}>{a.Telefon}</a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            {a.Mobil ? (
                              <a href={"tel:" + a.Mobil}>{a.Mobil}</a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            {a.Mail ? (
                              <a href={"mailto:" + a.Mail}>{a.Mail}</a>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
                <td>
                  {e.Webseite ? (
                    <a target="_blank" href={e.Webseite}>
                      {e.Webseite}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <Dropdown>
                    <DropdownToggle variant="success" id="dropdown-actions">
                      Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      {isAdmin ? (
                        <>
                          <DropdownItem as={Link} href="/">
                            Bearbeiten
                          </DropdownItem>
                          <DropdownDivider />
                          <DropdownItem as={Link} href="/">
                            Löschen
                          </DropdownItem>
                        </>
                      ) : (
                        <DropdownItem href="#">Nur für Admin</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
