import Head from "next/head";
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
  const Update = api.Partner.update.useMutation();
  const Partner = api.Partner.get.useQuery({ id: id as string });

  const [name, setName] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [link, setLink] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Partner.data == null) return;

    setName(Partner.data.name);
    setImage(Partner.data.image);
    setLink(Partner.data.link);
  }, [Partner.data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAdmin) return;
    setLoading(true);
    if (name == null || name.length <= 0) return;
    if (image == null || image.length <= 0) return;
    if (link == null || link.length <= 0) return;
    const res = await Update.mutateAsync({
      id: id as string,
      name,
      image,
      link,
    });

    if (res) {
      setLoading(false);
      await router.push("/CMS/Partner");
    }
  };

  if (!isAdmin)
    return (
      <Container>
        <h1>Kein Admin</h1>
      </Container>
    );

  return (
    <>
      <Head>
        <title>{Partner.data?.name} | CMS | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Partner: {Partner.data?.name} bearbeiten</h1>
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
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Bild"
              className="mb-3"
            >
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                type="text"
                required
                placeholder="Bild"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Link"
              className="mb-3"
            >
              <Form.Control
                value={link}
                required
                onChange={(e) => setLink(e.target.value)}
                type="url"
                placeholder="Link"
              />
            </FloatingLabel>
            <Button type="submit">Speichern</Button>
          </Form>
        )}
      </Container>
    </>
  );
}
