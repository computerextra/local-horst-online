import Head from "next/head";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
export default function Zeit() {
  const [start, setStart] = useState("");
  const [ende, setEnde] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [WorkingHours, setWorkingHours] = useState("");

  const CalcValues = () => {
    if (start.length < 1 || ende.length < 1) return;
    const bs = start.split(":");
    let BeginStunden: number | undefined = undefined,
      BeginMinuten: number | undefined = undefined;
    if (bs[0]) {
      BeginStunden = parseInt(bs[0]);
    }
    if (bs[1] != undefined) {
      BeginMinuten = parseInt(bs[1]);
    } else {
      BeginMinuten = 0;
    }
    const ba = ende.split(":");
    let EndeStunden: number | undefined = undefined,
      EndeMinuten: number | undefined = undefined;
    if (ba[0]) EndeStunden = parseInt(ba[0]);
    if (ba[1] != undefined) EndeMinuten = parseInt(ba[1]);
    else EndeMinuten = 0;
    if (
      BeginMinuten === undefined ||
      BeginStunden === undefined ||
      EndeMinuten === undefined ||
      EndeStunden === undefined
    )
      return;
    const ZeitBegin = (60 * BeginStunden + BeginMinuten) / 60;
    const ZeitEnde = (60 * EndeStunden + EndeMinuten) / 60;
    setStartTime(ZeitBegin.toFixed(2).toString());
    setEndTime(ZeitEnde.toFixed(2).toString());
    setWorkingHours((ZeitEnde - ZeitBegin).toFixed(2).toString());
  };
  return (
    <>
      <Head>
        <title>Zeiterfassung | LocalHorst v7</title>
      </Head>
      <Container className="mt-5 text-center">
        <h1>Zeiterfassung</h1>
        <h2>
          Diese Maske dient dazu, Arbeitszeiten von einer Uhrzeit in ein
          Zahlenformat zu bringen, damit die Exceldatei zur Zeiterfassung damit
          umgehen kann.
        </h2>
        <Form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 d-flex flex-column justify-content-center align-items-center border">
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text>Start</InputGroup.Text>
            <FormControl
              type="time"
              min={"00:00"}
              max={"23:59"}
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text>Ende</InputGroup.Text>
            <FormControl
              type="time"
              min={"00:00"}
              max={"23:59"}
              value={ende}
              onChange={(e) => setEnde(e.target.value)}
            />
          </InputGroup>
          <Button
            type="submit"
            className="mb-3"
            onClick={() => CalcValues()}>
            Senden
          </Button>
        </Form>
        {WorkingHours !== "" && (
          <p className="mt-3">
            Arbeitsbeginn: {StartTime} <br />
            Arbeitsende: {EndTime} <br />
            Gesamtzeit: {WorkingHours} <br />
            Abzüglich Pause:{" "}
            {parseFloat(WorkingHours) < 4
              ? WorkingHours
              : (parseFloat(WorkingHours) - 1).toString()}
          </p>
        )}
      </Container>
    </>
  );
}
