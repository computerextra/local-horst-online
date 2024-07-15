import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function EditAngebot() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const { id } = router.query;
  const Anlegen = api.Angebot.update.useMutation();
  const Angebot = api.Angebot.get.useQuery({ id: id as string });

  const [title, setTitle] = useState<undefined | string>(undefined);
  const [subtitle, setSubTitle] = useState<undefined | string>(undefined);
  const [Bild, setBild] = useState<undefined | string>(undefined);
  const [Link, setLink] = useState<undefined | string>(undefined);
  const [Start, setStart] = useState<Date>(new Date());
  const [End, setEnd] = useState<Date>(new Date());
  const [Active, setActive] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Angebot.data == null) return;
    setTitle(Angebot.data.title);
    setSubTitle(Angebot.data.subtitle ?? undefined);
    setBild(Angebot.data.image);
    setLink(Angebot.data.link);
    setStart(Angebot.data.date_start);
    setEnd(Angebot.data.date_stop);
    setActive(Angebot.data.anzeigen ?? false);
  }, [Angebot.data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAdmin) return;
    setLoading(true);
    if (title == null || title.length <= 0) return;
    if (Bild == null) return;
    if (Link == null) return;
    if (Start == null) return;
    if (End == null) return;
    const res = await Anlegen.mutateAsync({
      id: id as string,
      title,
      subtitle,
      image: Bild,
      link: Link,
      anzeigen: Active,
      date_start: Start,
      date_stop: End,
    });

    if (res) {
      setLoading(false);
      await router.push("/CMS/Angebote");
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
        <title>{Angebot.data?.title} | CMS | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Angebot: {Angebot.data?.title} bearbeiten</h1>
        {loading || Angebot.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Subtitle"
              className="mb-3"
            >
              <Form.Control
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                type="text"
                placeholder="Subtitle"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Bild"
              className="mb-3"
            >
              <Form.Control
                value={Bild}
                required
                onChange={(e) => setBild(e.target.value)}
                type="text"
                placeholder="Bild"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Link"
              className="mb-3"
            >
              <Form.Control
                value={Link}
                required
                onChange={(e) => setLink(e.target.value)}
                type="url"
                placeholder="Link"
              />
            </FloatingLabel>
            <FormGroup className="mb-3">
              <DatePicker
                dateFormat={"dd.MM.yyyy"}
                selected={Start}
                onChange={(date: Date) => setStart(date)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <DatePicker
                dateFormat={"dd.MM.yyyy"}
                selected={End}
                onChange={(date: Date) => setEnd(date)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormCheck
                type="switch"
                id="Aktiv"
                label="Aktiv"
                checked={Active}
                onChange={() => setActive((prev) => !prev)}
              />
            </FormGroup>
            <Button type="submit">Speichern</Button>
          </Form>
        )}
      </Container>
    </>
  );
}
