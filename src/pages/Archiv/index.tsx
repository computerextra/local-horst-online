import { useState } from "react";
import {
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Archive() {
  const Suche = api.Archiv.get.useMutation();
  const Download = api.Archiv.download.useMutation();

  const [search, setSearch] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [Results, setResults] = useState<
    { id: number; title: string }[] | undefined
  >(undefined);

  const handleSearch = async () => {
    setResults(undefined);
    if (search == null) return;
    if (search.length < 3) return;
    setLoading(true);
    const res = await Suche.mutateAsync({ search: search });
    if (res) {
      setResults(res);
      setLoading(false);
    }
  };

  const handleDownload = async (id: number) => {
    setLoading(true);
    const data = await Download.mutateAsync({ id: id });
    if (data == null) return;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${data}`;
    link.download = `${id}.pdf`;
    link.click();
    setLoading(false);
  };

  return (
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
              placeholder="Suchbegriff"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
      </Form>
      {loading && <LoadingSpinner />}
      {Results && (
        <ListGroup>
          {Results.map((e) => (
            <ListGroupItem
              action
              key={e.id}
              onClick={() => handleDownload(e.id)}
            >
              {e.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
