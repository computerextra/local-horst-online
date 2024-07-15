import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function MitarbeiterPage() {
  const Mitarbeiter = api.OnlineMitarbeiter.getAll.useQuery();
  const Delete = api.OnlineMitarbeiter.delete.useMutation();
  const { isAdmin } = useAdmin();

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;

    const res = await Delete.mutateAsync({
      id: id,
    });
    if (res) {
      location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Mitarbeiter | CMS | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Mitarbeiter</h1>
        {Mitarbeiter.isLoading && <LoadingSpinner />}
        {isAdmin && (
          <Link
            className="btn btn-lg btn-outline-primary"
            href="/CMS/Mitarbeiter/new"
          >
            Neu
          </Link>
        )}
        {Mitarbeiter.data && (
          <Table striped hover bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Short</th>
                <th>Bild</th>
                <th>Geschlecht</th>
                <th>Tags</th>
                <th>Focus</th>
                <th>Abteilung</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Mitarbeiter.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.short}</td>
                  <td>{item.image ? "✔️" : "❌"}</td>
                  <td>{item.sex == "m" ? "♂️" : "♀️"}</td>
                  <td>
                    <ul>
                      {item.tags.split(",").map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {item.focus.split(",").map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.Abteilung.name}</td>
                  <td>
                    <Dropdown>
                      <DropdownToggle variant="success" id="AngeboteActions">
                        Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        {isAdmin ? (
                          <>
                            <DropdownItem
                              as={Link}
                              href={"/CMS/Mitarbeiter/" + item.id}
                            >
                              Bearbeiten
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => void handleDelete(item.id)}
                            >
                              Löschen
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem>Nur für Admins</DropdownItem>
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
