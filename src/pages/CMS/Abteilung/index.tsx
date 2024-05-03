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

export default function AbteilungPage() {
  const Abteilungen = api.Abteilung.getAll.useQuery();
  const Delete = api.Abteilung.delete.useMutation();
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
      <h1>Abteilungen</h1>
      {Abteilungen.isLoading && <LoadingSpinner />}
      {isAdmin && (
        <Link
          className="btn btn-lg btn-outline-primary"
          href="/CMS/Abteilung/new"
        >
          Neu
        </Link>
      )}
      {Abteilungen.data && (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Abteilungen.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Dropdown>
                    <DropdownToggle variant="success" id="AbteilungsActions">
                      Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      {isAdmin ? (
                        <>
                          <DropdownItem
                            as={Link}
                            href={"/CMS/Abteilung/" + item.id}
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
