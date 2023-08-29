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
} from "react-bootstrap";
import { api } from "~/utils/api";

// Filepond
import type { Mitarbeiter } from "@prisma/client";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import LoadingSpinner from "./LoadingSpinner";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

type EinkaufProps = {
  id: string;
  Einkauf: string;
  Geld: string;
  Pfand: string;
  Abonniert: boolean;
  Bild1: string;
  Bild2: string;
  Bild3: string;
  Bild1Type: string;
  Bild2Type: string;
  Bild3Type: string;
};

export default function EinkaufEingabe({
  show,
  setShow,
  refreshData,
}: {
  show: boolean;
  setShow: (i: boolean) => void;
  refreshData: () => void;
}) {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();
  const UpdateEinkauf = api.Mitarbeiter.updateEinkauf.useMutation();
  // States Einkaufen
  const [Einkauf, setEinkauf] = useState("");
  const [Pfand, setPfand] = useState("");
  const [Geld, setGeld] = useState("");
  const [Abonniert, setAbonniert] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // FilePond
  const [files1, setFiles1] = useState();
  const [files2, setFiles2] = useState();
  const [files3, setFiles3] = useState();

  let pond1: FilePond | null = null,
    pond2: FilePond | null = null,
    pond3: FilePond | null = null;

  useEffect(() => {
    if (userId == null) return;
    if (Mitarbeiter == null || Mitarbeiter.data == null) return;
    const ma = Mitarbeiter.data.find((x: Mitarbeiter) => x.id === userId); // eslint-disable-line
    if (ma == null) return;

    if (ma.Einkauf == null) setEinkauf("");
    else setEinkauf(ma.Einkauf);
    if (ma.Pfand == null) setPfand("");
    else setPfand(ma.Pfand);
    if (ma.Geld == null) setGeld("");
    else setGeld(ma.Geld);
    if (ma.Abonniert == null) setAbonniert(false);
    else setAbonniert(ma.Abonniert);
  }, [userId]);

  if (!Mitarbeiter || Mitarbeiter.data == null) return <LoadingSpinner />;

  const handleSubmit = async () => {
    if (userId == null) return;

    let Bild1Type = "",
      Bild1 = "";
    let Bild2Type = "",
      Bild2 = "";
    let Bild3Type = "",
      Bild3 = "";

    if (pond1) {
      const files = pond1.getFiles();
      files.forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        Bild1 = file.getFileEncodeBase64String();
        Bild1Type = file.fileType;
      });
      pond1.processFiles(files).catch((err) => console.log(err));
    }
    if (pond2) {
      const files = pond2.getFiles();
      files.forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        Bild2 = file.getFileEncodeBase64String();
        Bild2Type = file.fileType;
      });
      pond2.processFiles(files).catch((err) => console.log(err));
    }
    if (pond3) {
      const files = pond3.getFiles();
      files.forEach((file) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        Bild3 = file.getFileEncodeBase64String();
        Bild3Type = file.fileType;
      });
      pond3.processFiles(files).catch((err) => console.log(err));
    }

    const EinkaufData: EinkaufProps = {
      id: userId,
      Einkauf,
      Pfand,
      Geld,
      Abonniert,
      Bild1,
      Bild2,
      Bild3,
      Bild1Type,
      Bild2Type,
      Bild3Type,
    };
    const res = await UpdateEinkauf.mutateAsync(EinkaufData);
    if (res == null) return;
    else {
      setEinkauf("");
      setPfand("");
      setAbonniert(false);
      setFiles1(undefined);
      setFiles2(undefined);
      setFiles3(undefined);
      setGeld("");
      setUserId(null);
      pond1 = null;
      pond2 = null;
      pond3 = null;
      setShow(false);
      refreshData();
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}>
      <ModalHeader closeButton>Eingabe Einkauf</ModalHeader>
      <ModalBody>
        <Form onSubmit={(e) => e.preventDefault()}>
          <p>
            Bei Bezahlung mit Paypal bitte &quot;Paypal&quot; in das Feld Geld
            eintragen.
          </p>
          <p className="text-danger fw-bold">
            Vor dem Eintragen bitte mit dem Einkäufer absprechen, ob eine
            Zahlung mit Paypal möglich ist!
          </p>
          <FloatingLabel
            label="Mitarbeiter"
            className="mb-3">
            <FormSelect
              name="id"
              id="id"
              required
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              defaultValue="">
              <option
                value=""
                hidden
                disabled>
                Wählen...
              </option>
              {Mitarbeiter &&
                Mitarbeiter.data &&
                Mitarbeiter.data.map((ma) => (
                  <option
                    value={ma.id}
                    key={ma.id}
                    label={ma.Name}
                  />
                ))}
            </FormSelect>
          </FloatingLabel>
          <FloatingLabel
            label="Geld"
            className="mb-3">
            <FormControl
              type="text"
              placeholder="Geld"
              value={Geld}
              onChange={(e) => setGeld(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            label="Pfand"
            className="mb-3">
            <FormControl
              type="text"
              placeholder="Pfand"
              value={Pfand}
              onChange={(e) => setPfand(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            label="Einkauf">
            <FormControl
              as="textarea"
              placeholder="Einkauf"
              rows={5}
              style={{ height: "100%" }}
              required
              value={Einkauf}
              onChange={(e) => setEinkauf(e.target.value)}
            />
          </FloatingLabel>
          {/* BILDER!! */}
          <FormGroup className="mb-3">
            <Row>
              <h5 className="text-center">
                Bitte beachten: Wenn ein Eintrag geändert wird, müssen
                vorhandene Bilder wieder ersetzt werden, sonst werden diese
                wieder gelöscht.
              </h5>
              <Col>
                <FilePond
                  files={files1}
                  ref={(ref) => {
                    pond1 = ref;
                  }}
                  allowFileEncode
                  // @ts-expect-error Filepond ist komisch in React.
                  onupdatefiles={setFiles1}
                  allowFileSizeValidation={true}
                  maxFileSize={"1MB"}
                  labelMaxFileSizeExceeded={"Das Bild ist zu groß!"}
                  labelMaxFileSize="Maximal 1 MB"
                  instantUpload={false}
                  allowMultiple={false}
                  maxFiles={1}
                  server="https://httpbin.org/post"
                  name="file1"
                  labelIdle="Bild hier ablegen oder <span className='filepond--label-action'>Durchsuchen</span>"
                />
              </Col>
              <Col>
                {" "}
                <FilePond
                  files={files2}
                  ref={(ref) => {
                    pond2 = ref;
                  }}
                  allowFileEncode
                  // @ts-expect-error Filepond ist komisch in React.
                  onupdatefiles={setFiles2}
                  allowFileSizeValidation={true}
                  maxFileSize={"1MB"}
                  labelMaxFileSizeExceeded={"Das Bild ist zu groß!"}
                  labelMaxFileSize="Maximal 1 MB"
                  instantUpload={false}
                  allowMultiple={false}
                  maxFiles={1}
                  server="https://httpbin.org/post"
                  name="file1"
                  labelIdle="Bild hier ablegen oder <span className='filepond--label-action'>Durchsuchen</span>"
                />
              </Col>
              <Col>
                {" "}
                <FilePond
                  files={files3}
                  ref={(ref) => {
                    pond3 = ref;
                  }}
                  allowFileEncode
                  // @ts-expect-error Filepond ist komisch in React.
                  onupdatefiles={setFiles3}
                  allowFileSizeValidation={true}
                  maxFileSize={"1MB"}
                  labelMaxFileSizeExceeded={"Das Bild ist zu groß!"}
                  labelMaxFileSize="Maximal 1 MB"
                  instantUpload={false}
                  allowMultiple={false}
                  maxFiles={1}
                  server="https://httpbin.org/post"
                  name="file1"
                  labelIdle="Bild hier ablegen oder <span className='filepond--label-action'>Durchsuchen</span>"
                />
              </Col>
            </Row>
          </FormGroup>
          {/* Abo */}
          <FormGroup className="mb-3">
            <FormCheck
              type="switch"
              id="AboSwitch"
              label="Abonnieren"
              checked={Abonniert}
              onChange={() => setAbonniert(!Abonniert)}
            />
            <small className="text-secondary">
              Wenn dieser Einkauf abonniert wird, wird dieser jeden Tag
              automatisch in die Einkaufsliste eingetragen. Zum Entfernen des
              Abonnements muss der haken rausgenommen und erneut gespeichert
              werden.
            </small>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="primary"
          onClick={() => void handleSubmit()}>
          Speichern
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShow(false)}>
          Schließen
        </Button>
      </ModalFooter>
    </Modal>
  );
}
