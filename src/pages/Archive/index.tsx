import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

type ArchiveSearchResult = {
  id: number;
  title: string;
};

export default function Archiv() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ArchiveSearchResult[] | null>(null);

  const { data, refetch } = api.Archive.searchArchive.useQuery(search, {
    enabled: false,
  });

  const Downloader = api.Archive.getDownload.useMutation();

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setResults(null);
    if (search.length < 3) return;
    setLoading(true);
    await refetch();
    setLoading(false);
    if (data != undefined) {
      setResults(data);
    }
  };

  const handleDownload = async (id: number) => {
    const data = await Downloader.mutateAsync(id);
    if (data == null) return;
    const a = document.createElement("a");
    a.href = "data:application/pdf;base64," + data;
    a.download = "Rechnung.pdf";
    a.click();
    // const mediaType = "data:application/pdf;base64";
    // window.location.href = `${mediaType}${data}`;
  };

  return (
    <>
      <Head>
        <title>CE Archiv | LocalHorst v7</title>
      </Head>
      <Container className="mt-5 justify-content-center text-center">
        <h1>CE Archiv</h1>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <FormControl
              type="text"
              required
              placeholder="Suchbegriff"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline-success"
              onClick={() => void handleSearch()}>
              Suchen
            </Button>
          </InputGroup>
        </Form>
        <hr />
        <h2>Ergebnisse:</h2>
        {loading && <LoadingSpinner />}
        <ul className="text-start">
          {results != null &&
            results.length >= 1 &&
            results.map((res) => (
              <li key={res.id}>
                <span
                  onClick={() => void handleDownload(res.id)}
                  className="text-decoration-underline">
                  {res.title}
                </span>
              </li>
            ))}
        </ul>
      </Container>
    </>
  );
}
