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

export default function AngebotePage() {
  const Abteilungen = api.Angebot.getAll.useQuery();
  const Delete = api.Angebot.delete.useMutation();
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
    <Container>
      <h1>Angebote</h1>
      {Abteilungen.isLoading && <LoadingSpinner />}
      {isAdmin && (
        <Link
          className="btn btn-lg btn-outline-primary"
          href="/CMS/Angebote/new"
        >
          Neu
        </Link>
      )}
      {Abteilungen.data && (
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Sub Title</th>
              <th>Bild</th>
              <th>Link</th>
              <th>Start</th>
              <th>Ende</th>
              <th>Online</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Abteilungen.data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.subtitle}</td>
                <td>{item.image}</td>
                <td>{item.link}</td>
                <td>{item.date_start.toLocaleDateString()}</td>
                <td>{item.date_stop.toLocaleDateString()}</td>
                <td>{item.anzeigen ? "✔️" : "❌"}</td>
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
                            href={"/CMS/Angebote/" + item.id}
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
  );
}
