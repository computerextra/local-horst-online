import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function MitarbeiterPage() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();
  const Deleter = api.Mitarbeiter.delete.useMutation();
  const { isAdmin } = useAdmin();

  const handleDelete = async (id: string) => {
    const res = await Deleter.mutateAsync({
      id: id,
    });
    if (res) {
      location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Mitarbeiter | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fluid>
        <Container>
          <h1>Mitarbeiter</h1>
        </Container>
        {isAdmin && (
          <Link
            className={`btn btn-lg btn-outline-primary ${
              !isAdmin && "disabled"
            } mb-2`}
            href="/Telefonlisten/Mitarbeiter/new"
          >
            Neu
          </Link>
        )}
        {Mitarbeiter.isLoading && <LoadingSpinner />}
        {!Mitarbeiter.isLoading && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gruppenwahl</th>
                <th>Tel.1</th>
                <th>Tel.2</th>
                <th>Homeoffice</th>
                <th>Tel. Priv</th>
                <th>Tel. Busi</th>
                <th>Mob. Priv</th>
                <th>Mob. Busi.</th>
                <th>Mail</th>
                <th>Azubi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Mitarbeiter.data?.map((e) => (
                <tr key={e.id}>
                  <td>{e.Name}</td>
                  <td>{e.Gruppenwahl ?? "-"}</td>
                  <td>{e.InternTelefon1 ?? "-"}</td>
                  <td>{e.InternTelefon2 ?? "-"}</td>
                  <td>{e.HomeOffice ?? "-"}</td>
                  <td>
                    {e.FestnetzPrivat ? (
                      <a href={"tel:" + e.FestnetzPrivat}>{e.FestnetzPrivat}</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {e.FestnetzAlternativ ? (
                      <a href={"tel:" + e.FestnetzAlternativ}>
                        {e.FestnetzAlternativ}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {e.MobilPrivat ? (
                      <a href={"tel:" + e.MobilPrivat}>{e.MobilPrivat}</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {e.MobilBusiness ? (
                      <a href={"tel:" + e.MobilBusiness}>{e.MobilBusiness}</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {e.Email ? (
                      <a href={"mailto:" + e.Email}>{e.Email}</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{e.Azubi ? "✔️" : "❌"}</td>
                  <td>
                    <Dropdown>
                      <DropdownToggle variant="success" id="dropdown-actions">
                        Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        {isAdmin ? (
                          <>
                            <DropdownItem
                              as={Link}
                              href={"/Telefonlisten/Mitarbeiter/edit/" + e.id}
                            >
                              Bearbeiten
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem
                              as={Link}
                              href="/#"
                              onClick={(ev) => {
                                ev.preventDefault();
                                void handleDelete(e.id);
                              }}
                            >
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
    </>
  );
}
