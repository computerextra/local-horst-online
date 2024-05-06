import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Error from "~/Components/Error";
import { api } from "~/utils/api";

export default function UserProfile() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { id } = router.query;

  const Updater = api.User.update.useMutation();
  const User = api.User.get.useMutation();

  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function x() {
      if (sessionData == null) return;
      if (sessionData.user.id != id) return;
      const y = await User.mutateAsync({
        id: sessionData.user.id,
      });
      if (y == null) return;
      setName(y.name ?? undefined);
      setEmail(y.email ?? undefined);
      setIsAdmin(y.isAdmin);
    }
    void x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sessionData]);

  if (sessionData == null)
    return <Error error="You need to be logged in to view this page." />;
  if (sessionData.user.id != id)
    return <Error error="You are not the correct user." />;

  const handleSubmit = async () => {
    if (sessionData == null) return;
    if (sessionData.user.id != id) return;

    const res = await Updater.mutateAsync({
      id: sessionData.user.id,
      name,
      email,
      isAdmin,
    });
    if (res) {
      location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>
          {sessionData.user.name ?? sessionData.user.email} | LocalHorst v9
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Profil {sessionData.user.name} bearbeiten</h1>
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
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={Updater.isPending}
          >
            Speichern
          </Button>
        </Form>
      </Container>
    </>
  );
}
