import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Table,
} from "react-bootstrap";
import Error from "~/Components/Error";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { ADMIN_MAILS } from "~/conf";
import { api } from "~/utils/api";

export default function AdminPage() {
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();
  const User = api.User.getAll.useQuery();
  const Delete = api.User.delete.useMutation();

  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (sessionData == null)
    return <Error error="You need to be logged in to view this page." />;
  if (!isAdmin)
    return <Error error="You need to be an admin to view this page." />;
  if (User.isLoading) return <LoadingSpinner />;
  if (User.error) return <Error error={User.error.message} />;
  if (User.isLoadingError) return <Error error={"Fehler beim Laden"} />;
  if (User.data == null) return <Error error={"Keine Daten verfügbar"} />;

  const handleDelete = async (id: string) => {
    const res = await Delete.mutateAsync({ id });
    if (res) {
      location.reload();
    }
  };

  return (
    <Container>
      <h1>Admin</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>email</th>
            <th>Email Verified</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {User.data.map((u) => {
            return (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.emailVerified
                    ? new Date(u.emailVerified).toLocaleDateString()
                    : "No"}
                </td>
                <td>{ADMIN_MAILS.includes(u.email ?? "") ? "Yes" : "No"}</td>
                <td>
                  <Dropdown>
                    <DropdownToggle variant="success" id="dropdown-basic">
                      Actions
                    </DropdownToggle>

                    <DropdownMenu>
                      <DropdownItem
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedUser(u);
                          setShowEdit(true);
                        }}
                      >
                        Bearbeiten
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          void handleDelete(u.id);
                        }}
                      >
                        Löschen
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AdminBearbeiten
        show={showEdit}
        setShow={setShowEdit}
        User={selectedUser}
      />
    </Container>
  );
}

function AdminBearbeiten({
  show,
  setShow,
  User,
}: {
  show: boolean;
  setShow: (b: boolean) => void;
  User: User | null;
}) {
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const Updater = api.User.update.useMutation();
  const handleSave = async () => {
    if (User == null) return;
    const res = await Updater.mutateAsync({
      id: User.id,
      name: name,
      email: email,
    });
    if (res) {
      location.reload();
    }
  };

  useEffect(() => {
    if (User == null) return;
    setName(User.name ?? undefined);
    setEmail(User.email ?? undefined);
  }, [User]);

  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop="static">
      <ModalHeader closeButton>
        <ModalTitle>{User?.id} bearbeiten</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Mail">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mail"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="secondary"
          onClick={() => {
            setName(undefined);
            setEmail(undefined);
            setShow(false);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  );
}
