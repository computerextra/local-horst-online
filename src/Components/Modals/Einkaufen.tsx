import type { Mitarbeiter } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { api } from "~/utils/api";
import { UploadButton } from "~/utils/uploadthing";

export default function Einkaufen({
  show,
  setShow,
  Mitarbeiter,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  Mitarbeiter: Mitarbeiter[] | undefined;
}) {
  const Liste = api.Einkauf.getAll.useQuery();
  const EinkaufUpdater = api.Einkauf.upsert.useMutation();
  const Einkauflöscher = api.Einkauf.delete.useMutation();

  const [Auswahl, setAuswahl] = useState<undefined | Mitarbeiter>(undefined);

  const [file1, setFile1] = useState<string | undefined>(undefined);
  const [file2, setFile2] = useState<string | undefined>(undefined);
  const [file3, setFile3] = useState<string | undefined>(undefined);

  const [allowed2, setAllowed2] = useState(false);
  const [allowed3, setAllowed3] = useState(false);

  const [Gold, setGold] = useState<string | undefined>(undefined);
  const [Flaschen, setFlaschen] = useState<string | undefined>(undefined);
  const [Essen, setEssen] = useState<string | undefined>(undefined);
  const [PayPal, setPayPal] = useState<boolean>(false);
  const [Abonniert, setAbonniert] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (Auswahl == null) return;
    const res = await EinkaufUpdater.mutateAsync({
      Paypal: PayPal,
      Abonniert: Abonniert,
      Geld: Gold,
      Pfand: Flaschen,
      Dinge: Essen,
      mitarbeiterId: Auswahl.id,
      Abgeschickt: new Date(),
      Bild1: file1,
      Bild2: file2,
      Bild3: file3,
      Bild1Date: file1 != null ? new Date() : undefined,
      Bild2Date: file2 != null ? new Date() : undefined,
      Bild3Date: file3 != null ? new Date() : undefined,
    });
    if (res) {
      location.reload();
    }
  };

  const handleDelete = async () => {
    if (Auswahl == null) return;
    const Einkauf = Liste.data?.find((e) => e.mitarbeiterId == Auswahl.id);
    if (Einkauf == null) return;
    const res = await Einkauflöscher.mutateAsync({
      id: Einkauf.id,
    });
    if (res) {
      location.reload();
    }
  };

  useEffect(() => {
    if (Auswahl == null) return;
    const Einkauf = Liste.data?.find((e) => e.mitarbeiterId == Auswahl.id);
    if (Einkauf == null) return;

    setGold(Einkauf.Geld ?? undefined);
    setFlaschen(Einkauf.Pfand ?? undefined);
    setEssen(Einkauf.Dinge ?? undefined);
    setFile1(Einkauf.Bild1 ?? undefined);
    setFile2(Einkauf.Bild2 ?? undefined);
    setFile3(Einkauf.Bild3 ?? undefined);
    setAllowed2(Einkauf.Bild1 != null);
    setAllowed3(Einkauf.Bild2 != null);
    setPayPal(Einkauf.Paypal);
    setAbonniert(Einkauf.Abonniert);
  }, [Auswahl, Liste.data]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader closeButton>Einkauf eingeben</ModalHeader>
      <ModalBody>
        {Mitarbeiter == null ? (
          <p>Keine Mitarbeiter gefunden.</p>
        ) : (
          <>
            <MitarbeiterAuswahl
              Mitarbeiter={Mitarbeiter}
              setAuswahl={setAuswahl}
            />
            {Auswahl && (
              <>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <FormGroup className="mb-3 mt-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Gold"
                      className="mb-3"
                    >
                      <FormControl
                        type="text"
                        placeholder="2 Mark 50"
                        value={Gold}
                        onChange={(e) => setGold(e.target.value)}
                      />
                    </FloatingLabel>
                  </FormGroup>
                  <FormGroup className="mb-3 ">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Flaschen in €"
                      className="mb-3"
                    >
                      <FormControl
                        type="text"
                        placeholder="2 Mark 50"
                        value={Flaschen}
                        onChange={(e) => setFlaschen(e.target.value)}
                      />
                    </FloatingLabel>
                  </FormGroup>
                  <FormGroup className="mb-3 ">
                    <FloatingLabel controlId="floatingTextarea2" label="Fraß">
                      <Form.Control
                        as="textarea"
                        value={Essen}
                        onChange={(e) => setEssen(e.target.value)}
                        placeholder="Was darfs denn sein?"
                        style={{ height: "200px" }}
                      />
                    </FloatingLabel>
                  </FormGroup>
                  <FormGroup className="mb-3 ">
                    <FormCheck
                      type="switch"
                      id="PayPal"
                      label="PayPal Abrechnung"
                      onChange={() => setPayPal(!PayPal)}
                      checked={PayPal}
                    />
                  </FormGroup>
                  <FormGroup className="mb-3 ">
                    <FormCheck
                      type="switch"
                      id="Abonniert"
                      label="Abonnieren"
                      onChange={() => setAbonniert(!Abonniert)}
                      checked={Abonniert}
                    />
                    <small className="text-muted">
                      Wenn dieser Einkauf abonniert wird, wird dieser{" "}
                      <strong>jeden Tag</strong> automatisch in die
                      Einkaufsliste eingetragen. Zum Entfernen des Abonnements
                      muss der haken rausgenommen und erneut gespeichert werden.
                    </small>
                  </FormGroup>
                </Form>
                <small>Bülderz</small>
                <Row className="g-5" md={3}>
                  <Col>
                    <ImagePreview
                      file={file1}
                      setFile={setFile1}
                      allowNext={setAllowed2}
                    />
                  </Col>
                  <Col>
                    <ImagePreview
                      file={file2}
                      setFile={setFile2}
                      allowed={allowed2}
                      allowNext={setAllowed3}
                    />
                  </Col>
                  <Col>
                    <ImagePreview
                      file={file3}
                      setFile={setFile3}
                      allowed={allowed3}
                    />
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={Auswahl == null}
        >
          Speichern
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={Auswahl == null}
        >
          Einkauf löschen
        </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Schließen
        </Button>
      </ModalFooter>
    </Modal>
  );
}

function MitarbeiterAuswahl({
  Mitarbeiter,
  setAuswahl,
}: {
  Mitarbeiter: Mitarbeiter[] | undefined;
  setAuswahl: React.Dispatch<React.SetStateAction<Mitarbeiter | undefined>>;
}) {
  if (Mitarbeiter == null) return <></>;
  return (
    <FormSelect
      size="lg"
      onChange={(e) =>
        setAuswahl(Mitarbeiter.find((m) => m.id == e.target.value))
      }
    >
      <option hidden selected value="">
        Bitte Wählen
      </option>
      {Mitarbeiter.map((m) => (
        <option key={m.id} value={m.id}>
          {m.Name}
        </option>
      ))}
    </FormSelect>
  );
}

function ImagePreview({
  file,
  setFile,
  allowed = true,
  allowNext,
}: {
  file: string | undefined;
  setFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  allowed?: boolean;
  allowNext?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Stack gap={3}>
      {file && !loading && (
        <Image
          height={200}
          width={200}
          style={{ maxHeight: 200, width: "auto" }}
          src={file}
          alt="Bild 1"
        />
      )}
      {loading && <Spinner animation="border" variant="success" />}
      {!file && allowed && (
        <UploadButton
          endpoint="imageUploader"
          onUploadProgress={() => setLoading(true)}
          onClientUploadComplete={(res) => {
            setLoading(false);
            setFile(res[0]?.url);
            allowNext != null && allowNext(true);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
      {file && <Button onClick={() => setFile(undefined)}>Löschen</Button>}
    </Stack>
  );
}
