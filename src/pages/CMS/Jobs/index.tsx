import Head from "next/head";
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
  const Jobs = api.Jobs.getAll.useQuery();
  const Update = api.Jobs.update.useMutation();
  const Delete = api.Jobs.delete.useMutation();
  const { isAdmin } = useAdmin();

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;

    const res = await Delete.mutateAsync({
      id: id,
    });
    if (res) location.reload();
  };

  const handleToggle = async (id: string) => {
    if (!isAdmin) return;
    const job = Jobs.data?.find((x) => x.id === id);
    if (job == null) return;

    const res = await Update.mutateAsync({
      id: job.id,
      online: !job.online,
      name: job.name,
    });

    if (res) location.reload();
  };

  return (
    <>
      <Head>
        <title>Jobs | CMS | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Jobs</h1>
        {Jobs.isLoading && <LoadingSpinner />}
        {Jobs.data && (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Auf Webseite angezeigt?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Jobs.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.online ? "✔️" : "❌"}</td>
                  <td>
                    <Dropdown>
                      <DropdownToggle variant="success" id="AbteilungsActions">
                        Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        {isAdmin ? (
                          <>
                            <DropdownItem
                              onClick={() => void handleToggle(item.id)}
                            >
                              Sichtbarkeit umschalten
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
