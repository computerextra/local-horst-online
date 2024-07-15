import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Seriennummer() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [Result, setResult] = useState<string | undefined>(undefined);

  const Suche = api.ArtikelSuche.search.useMutation();

  const handleSearch = async () => {
    if (search == null) return;
    setLoading(true);
    const res = await Suche.mutateAsync({ search: search });
    if (res?.SUCHBEGRIFF) {
      setResult(search + ": " + res.SUCHBEGRIFF);
      setLoading(false);
      const Textarea = document.createElement("textarea");
      Textarea.value = search + ": " + res.SUCHBEGRIFF;
      document.body.appendChild(Textarea);
      Textarea.focus();
      Textarea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.log("Unable to copy to clipboard", err);
      }
      document.body.removeChild(Textarea);
      setTimeout(() => {
        setResult(undefined);
        setSearch("");
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Seriennummer | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>CE Archiv</h1>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSearch();
          }}
        >
          <FormGroup className="mb-3 ">
            <FloatingLabel
              controlId="floatingInput"
              label="Suchbegriff"
              className="mb-3"
            >
              <FormControl
                type="text"
                required
                placeholder="Suchbegriff"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FloatingLabel>
            <Button type="submit">Suchen</Button>
          </FormGroup>
        </Form>
        {loading && <LoadingSpinner />}
        {Result && <p>{Result}</p>}
      </Container>
    </>
  );
}
