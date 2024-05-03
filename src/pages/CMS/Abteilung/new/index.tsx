import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function NewAbteilung() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const Anlegen = api.Abteilung.create.useMutation();

  const [name, setName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAdmin) return;
    setLoading(true);
    if (name == null || name.length <= 0) return;
    const res = await Anlegen.mutateAsync({
      name,
    });

    if (res) {
      setLoading(false);
      await router.push("/CMS/Abteilung");
    }
  };

  if (!isAdmin)
    return (
      <Container>
        <h1>Kein Admin</h1>
      </Container>
    );

  return (
    <Container>
      <h1>Neue Abteilungen</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </FloatingLabel>
          <Button type="submit">Speichern</Button>
        </Form>
      )}
    </Container>
  );
}
