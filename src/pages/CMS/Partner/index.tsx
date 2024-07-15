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

export default function PartnergPage() {
  const Partner = api.Partner.getAll.useQuery();
  const Delete = api.Partner.delete.useMutation();
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
        <title>Partner | CMS | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Partner</h1>
        {Partner.isLoading && <LoadingSpinner />}
        {isAdmin && (
          <Link
            className="btn btn-lg btn-outline-primary"
            href="/CMS/Partner/new"
          >
            Neu
          </Link>
        )}
        {Partner.data && (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Bild</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Partner.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.image}</td>
                  <td>{item.link}</td>
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
                              href={"/CMS/Partner/" + item.id}
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
