import axios from "axios";
import Head from "next/head";
import type { Dokumente } from "prisma/generated/CMS";
import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function AbteilungPage() {
  const Dokumente = api.Dokumente.getAll.useQuery();
  const Finder = api.Dokumente.getOne.useMutation();
  const Create = api.Dokumente.create.useMutation();
  const Update = api.Dokumente.update.useMutation();
  const Delete = api.Dokumente.delete.useMutation();
  const { isAdmin } = useAdmin();

  const [Dokument, setDokument] = useState<Dokumente | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [filename, setFilename] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;

    const res = await Delete.mutateAsync({
      id: id,
    });
    if (res) location.reload();
  };

  const handleToggle = async (id?: string | undefined) => {
    if (id) {
      const doc = await Finder.mutateAsync({ id });
      if (doc) {
        setDokument(doc);
        setFilename(doc.filename);
        setDate(doc.date_modified);
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDokument(null);
    setFile(undefined);
    setDate(undefined);
    setFilename(undefined);
  };

  const handleDownload = async (id: string) => {
    const res = await axios.post(
      "https://computer-extra.de/php/api/download.php",
      {
        data: {
          id: id,
        },
      }
    );
    alert(res);
  };

  const handleSave = async (type: "update" | "create") => {
    if (filename == null) return;
    if (date == null) return;
    if (file == null) return;

    const file2String = (file: File) => {
      return new Promise((res, _) => {
        const reader = new FileReader();
        const readFile = () => {
          const buffer = reader.result;
          res(buffer);
        };
        reader.addEventListener("load", readFile);
        reader.readAsDataURL(file);
      });
    };
    const data = (await file2String(file)) as string;

    switch (type) {
      case "create": {
        const res = await Create.mutateAsync({
          filename: filename,
          date_modified: date,
          data: data,
        });

        if (res) {
          location.reload();
        }
      }
      case "update": {
        if (Dokument == null) return;

        const res = await Update.mutateAsync({
          id: Dokument.id,
          date_modified: date,
          filename: filename,
          data: data,
        });
        if (res) {
          location.reload();
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Datenschutz | CMS | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Datenschutz</h1>
        <Button onClick={() => void handleToggle()}>Neues Dokument</Button>
        {Dokumente.isLoading && <LoadingSpinner />}
        {Dokumente.data && (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Dokumente.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.filename}</td>
                  <td>{item.date_modified.toLocaleDateString()}</td>
                  <td>
                    <Dropdown>
                      <DropdownToggle variant="success" id="AbteilungsActions">
                        Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        {isAdmin ? (
                          <>
                            <DropdownItem
                              onClick={() => {
                                () => void handleDownload(item.id);
                              }}
                            >
                              Download
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => void handleToggle(item.id)}
                            >
                              Bearbeiten
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => void handleDelete(item.id)}
                            >
                              Löschen
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem>Nur für Admins</DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      {showModal && (
        <Modal
          show={showModal}
          backdrop="static"
          onHide={handleModalClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader>
            <ModalTitle id="contained-modal-title-vcenter">
              {Dokument ? "Dokument bearbeiten" : "Neues Dokument"}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGroup className="mb-3" controlId="filename">
                <FormLabel>Dateiname</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Dateiname"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                />
                <FormText className="text-muted">
                  Die Dateiendung (.pdf) muss mit angegeben werden!
                </FormText>
              </FormGroup>
              <FormGroup className="mb-3" controlId="date">
                <FormLabel>Änderungsdatum</FormLabel> <br />
                <DatePicker
                  id="date"
                  dateFormat={"dd.MM.yyyy"}
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                />
              </FormGroup>
              <FormGroup className="mb-3" controlId="file">
                <FormLabel>Datei</FormLabel>
                <FormControl
                  type="file"
                  onChange={(e) => {
                    const target = e.currentTarget as HTMLInputElement;
                    const files = target.files;
                    if (files && files.length > 0) {
                      setFile(files[0]);
                    }
                  }}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {Dokument ? (
              <Button
                variant="success"
                onClick={() => void handleSave("update")}
              >
                Update
              </Button>
            ) : (
              <Button onClick={() => void handleSave("create")}>
                Erstellen
              </Button>
            )}
            <Button variant="outline-danger" onClick={handleModalClose}>
              Schließen
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
