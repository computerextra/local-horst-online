import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  InputGroup,
} from "react-bootstrap";
import CableNav from "~/Components/CableNavs";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function KabelBearbeiten() {
  const id = useRouter().query.id as string;
  const { push } = useRouter();
  const KabelUpdater = api.Kabelwand.updateKabel.useMutation();
  const Namenfinder = api.Sage.getName.useMutation();

  const KabelRes = api.Kabelwand.getOneKabel.useQuery(id);
  const Kabel = KabelRes.data;

  // Option Res
  const FachRes = api.Kabelwand.getCompartments.useQuery();
  const FarbeRes = api.Kabelwand.getColors.useQuery();
  const InputRes = api.Kabelwand.getInputs.useQuery();
  const LaengeRes = api.Kabelwand.getLengths.useQuery();
  const OutputRes = api.Kabelwand.getOutputs.useQuery();
  const RegalRes = api.Kabelwand.getShelfs.useQuery();
  const ReiheRes = api.Kabelwand.getRows.useQuery();

  // Options
  const Faecher = FachRes.data;
  const Farben = FarbeRes.data;
  const Inputs = InputRes.data;
  const Laengen = LaengeRes.data;
  const Outputs = OutputRes.data;
  const Regale = RegalRes.data;
  const Reihen = ReiheRes.data;

  // Kabel Props
  const [Artikelnummer, setArtikelnummer] = useState("");
  const [Input, setInput] = useState<string>("");
  const [Output, setOutput] = useState<string>("");
  const [Länge, setLänge] = useState<string>("");
  const [Farbe, setFarbe] = useState<string>("");
  const [Regal, setRegal] = useState<string>("");
  const [Reihe, setReihe] = useState<string>("");
  const [Fach, setFach] = useState<string>("");

  useEffect(() => {
    if (Kabel == null) return;

    setArtikelnummer(Kabel.Artikelnummer);
    setInput(Kabel.inputId);
    setOutput(Kabel.outputId);
    setLänge(Kabel.laengeId);
    setFarbe(Kabel.farbeId);
    setRegal(Kabel.regalId);
    setReihe(Kabel.reiheId);
    setFach(Kabel.fachId);
  }, [Kabel]);

  const UpdateCable = async () => {
    if (Artikelnummer == "" || Artikelnummer.length < 1) return;
    if (Input == "" || Input.length < 1) return;
    if (Output == "" || Output.length < 1) return;
    if (Länge == "" || Länge.length < 1) return;
    if (Farbe == "" || Farbe.length < 1) return;
    if (Regal == "" || Regal.length < 1) return;
    if (Reihe == "" || Reihe.length < 1) return;
    if (Fach == "" || Fach.length < 1) return;
    // Get Name
    const Name = await Namenfinder.mutateAsync(Artikelnummer);

    if (Name == null || Name.SUCHBEGRIFF == null) return;

    await KabelUpdater.mutateAsync({
      id,
      Name: Name.SUCHBEGRIFF,
      Artikelnummer,
      inputId: Input,
      outputId: Output,
      laengeId: Länge,
      farbeId: Farbe,
      fachId: Fach,
      reiheId: Reihe,
      regalId: Regal,
    });
    await push("/Kabelwand");
  };

  // Loading
  if (
    FachRes.isLoading ||
    FarbeRes.isLoading ||
    InputRes.isLoading ||
    LaengeRes.isLoading ||
    OutputRes.isLoading ||
    RegalRes.isLoading ||
    ReiheRes.isLoading ||
    KabelRes.isLoading
  )
    return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>{Kabel?.Name} bearbeiten | LocalHorst v7</title>
      </Head>
      <Container fluid="sm">
        <CableNav url="/Kabelwand" />
        <h1 className="text-center">Neues Kabel anlegen</h1>
        <Form
          className="mt-5"
          onSubmit={(e) => e.preventDefault()}>
          <FormGroup className="mb-3">
            <FloatingLabel label="Artikelnummer">
              <FormControl
                type="text"
                defaultValue={Artikelnummer}
                required
                onChange={(e) => setArtikelnummer(e.target.value)}
              />
            </FloatingLabel>
          </FormGroup>
          <InputGroup className="mb-3">
            <FloatingLabel label="Input">
              <FormSelect
                aria-label="Input"
                required
                value={Input}
                onChange={(e) => setInput(e.currentTarget.value)}>
                <option hidden>Bitte Wählen ...</option>
                {Inputs?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
            <FloatingLabel label="Output">
              <FormSelect
                aria-label="Output"
                value={Output}
                required
                onChange={(e) => setOutput(e.currentTarget.value)}>
                <option hidden>Bitte Wählen ...</option>
                {Outputs?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
          </InputGroup>
          <InputGroup className="mb-3">
            <FloatingLabel label="Farbe">
              <FormSelect
                aria-label="Farbe"
                required
                value={Farbe}
                onChange={(e) => setFarbe(e.currentTarget.value)}>
                <option hidden> Bitte Wählen ...</option>
                {Farben?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
            <FloatingLabel label="Länge">
              <FormSelect
                aria-label="Länge"
                required
                value={Länge}
                onChange={(e) => setLänge(e.currentTarget.value)}>
                <option hidden>Bitte Wählen ...</option>
                {Laengen?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
          </InputGroup>
          <small className="text-center">
            Bei Kisten immer Reihe 0 und Fach 0 auswählen!
          </small>
          <InputGroup className="mb-3">
            <FloatingLabel label="Regal">
              <FormSelect
                aria-label="Regal"
                required
                value={Regal}
                onChange={(e) => setRegal(e.currentTarget.value)}>
                <option hidden>Bitte Wählen ...</option>
                {Regale?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
            <FloatingLabel label="Reihe">
              <FormSelect
                aria-label="Reihe"
                required
                value={Reihe}
                onChange={(e) => setReihe(e.currentTarget.value)}>
                <option hidden>Bitte Wählen ...</option>
                {Reihen?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
            <FloatingLabel label="Fach">
              <FormSelect
                aria-label="Fach"
                required
                value={Fach}
                onChange={(e) => setFach(e.currentTarget.value)}>
                <option hidden>Bitte Wählen ...</option>
                {Faecher?.map((x) => (
                  <option
                    value={x.id}
                    key={x.id}>
                    {x.Name}
                  </option>
                ))}
              </FormSelect>
            </FloatingLabel>
          </InputGroup>
          <Button
            type="submit"
            onClick={() => void UpdateCable()}>
            Speichern
          </Button>
        </Form>
      </Container>
    </>
  );
}
