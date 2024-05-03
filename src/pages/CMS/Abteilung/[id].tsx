import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function EditAbteilung() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const { id } = router.query;
  const Update = api.Abteilung.update.useMutation();
  const Abteilung = api.Abteilung.get.useQuery({ id: id as string });

  const [name, setName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Abteilung.data == null) return;
    setName(Abteilung.data.name);
  }, [Abteilung.data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAdmin) return;
    setLoading(true);
    if (name == null || name.length <= 0) return;
    const res = await Update.mutateAsync({
      id: id as string,
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
      <h1>Abteilung: {Abteilung.data?.name} bearbeiten</h1>
      {loading || Abteilung.isLoading ? (
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
