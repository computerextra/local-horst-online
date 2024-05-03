import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function NeuerMitarbeiter() {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const Neu = api.OnlineMitarbeiter.create.useMutation();
  const Abteilungen = api.Abteilung.getAll.useQuery();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string | undefined>(undefined);
  const [short, setShort] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<boolean>(false);
  const [sex, setSex] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string | undefined>(undefined);
  const [focus, setfocus] = useState<string | undefined>(undefined);
  const [abteilungId, setAbteilungId] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (name == null) return;
    if (short == null) return;
    if (image == null) return;
    if (sex == null) return;
    if (abteilungId == null) return;
    if (sex == "none") return;
    if (abteilungId == "none") return;

    const res = await Neu.mutateAsync({
      name,
      short,
      image,
      sex,
      tags: tags ?? "",
      focus: focus ?? "",
      abteilungId,
    });

    if (res) {
      await router.push("/CMS/Mitarbeiter");
    }

    setIsLoading(false);
  };

  if (!isAdmin)
    return (
      <Container>
        <h1>Kein Admin</h1>
      </Container>
    );

  return (
    <Container>
      <h1>Neuer Mitarbeiter</h1>
      {isLoading || (Abteilungen.isLoading && <LoadingSpinner />)}
      {!isLoading && !Abteilungen.isLoading && (
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <FormControl
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Short"
            className="mb-3"
          >
            <FormControl
              value={short}
              required
              onChange={(e) => setShort(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </FloatingLabel>
          <FormSelect
            className="mb-3"
            value={sex}
            required
            defaultValue="none"
            onChange={(e) => setSex(e.target.value)}
          >
            <option disabled value="none">
              Geschlecht...
            </option>
            <option value="m">Männlich</option>
            <option value="w">Weiblich</option>
          </FormSelect>
          <FloatingLabel
            controlId="floatingInput"
            label="Tags Komma getrennt"
            className="mb-3"
          >
            <FormControl
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              type="text"
              placeholder="Tags Komma getrennt"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Focus Komma getrennt"
            className="mb-3"
          >
            <FormControl
              value={focus}
              onChange={(e) => setfocus(e.target.value)}
              type="text"
              placeholder="Focus Komma getrennt"
            />
          </FloatingLabel>
          <FormSelect
            className="mb-3"
            required
            value={abteilungId}
            defaultValue="none"
            onChange={(e) => setAbteilungId(e.target.value)}
          >
            <option value="none" disabled>
              Abteilung...
            </option>
            {Abteilungen.data?.map((abteilung) => (
              <option key={abteilung.id} value={abteilung.id}>
                {abteilung.name}
              </option>
            ))}
          </FormSelect>
          <FormCheck
            className="mb-3"
            type="switch"
            id="image"
            label="Bild?"
            value={image ? 1 : 0}
            onChange={() => setImage((prev) => !prev)}
          />
          <Button type="submit">Speichern</Button>
        </Form>
      )}
    </Container>
  );
}
