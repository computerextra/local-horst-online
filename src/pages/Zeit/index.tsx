import Head from "next/head";
import { useEffect, useState } from "react";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";

export default function Zeit() {
  const [hourStart, setHourStart] = useState(9);
  const [minuteStart, setMinuteStart] = useState(0);
  const [hourEnd, setHourEnd] = useState(18);
  const [minuteEnd, setMinuteEnd] = useState(0);
  const [hourPauseStart, setHourPauseStart] = useState(13);
  const [minutePauseStart, setMinutePauseStart] = useState(0);
  const [hourPauseEnd, setHourPauseEnd] = useState(14);
  const [minutePauseEnd, setMinutePauseEnd] = useState(0);

  const [pause, setPause] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);

  useEffect(() => {
    const start = (60 * hourStart + minuteStart) / 60;
    const end = (60 * hourEnd + minuteEnd) / 60;
    const pauseStart = (60 * hourPauseStart + minutePauseStart) / 60;
    const pauseEnd = (60 * hourPauseEnd + minutePauseEnd) / 60;
    const pause = pauseEnd - pauseStart;
    setPause(pause);
    const workingHours = end - start;
    setWorkingHours(workingHours);
  }, [
    hourEnd,
    hourStart,
    minuteEnd,
    minuteStart,
    hourPauseStart,
    hourPauseEnd,
    minutePauseStart,
    minutePauseEnd,
  ]);

  return (
    <>
      <Head>
        <title>Zeiterfassungshilfe | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Zeiterfassungshilfe</h1>
        <h2>
          Diese Maske dient dazu, Arbeitszeiten von einer Uhrzeit in ein
          Zahlenformat zu bringen, die kompatibel mit der Excel Datei zur
          Zeiterfassung ist.
        </h2>
        <Row md={4}>
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text>Start</InputGroup.Text>
            <FormControl
              type="time"
              min={"00:00"}
              max={"23:59"}
              value={
                (hourStart < 10 ? "0" + hourStart : hourStart) +
                ":" +
                (minuteStart < 10 ? "0" + minuteStart : minuteStart)
              }
              onChange={(e) => {
                const [hour, minute] = e.target.value.split(":");
                if (hour == null || minute == null) return;
                setHourStart(parseInt(hour));
                setMinuteStart(parseInt(minute));
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text>Ende</InputGroup.Text>
            <FormControl
              type="time"
              min={"00:00"}
              max={"23:59"}
              value={
                (hourEnd < 10 ? "0" + hourEnd : hourEnd) +
                ":" +
                (minuteEnd < 10 ? "0" + minuteEnd : minuteEnd)
              }
              onChange={(e) => {
                const [hour, minute] = e.target.value.split(":");
                if (hour == null || minute == null) return;
                setHourEnd(parseInt(hour));
                setMinuteEnd(parseInt(minute));
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text>Pause Start</InputGroup.Text>
            <FormControl
              type="time"
              min={"00:00"}
              max={"23:59"}
              value={
                (hourPauseStart < 10 ? "0" + hourPauseStart : hourPauseStart) +
                ":" +
                (minutePauseStart < 10
                  ? "0" + minutePauseStart
                  : minutePauseStart)
              }
              onChange={(e) => {
                const [hour, minute] = e.target.value.split(":");
                if (hour == null || minute == null) return;
                setHourPauseStart(parseInt(hour));
                setMinutePauseStart(parseInt(minute));
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3 w-25">
            <InputGroup.Text>Pause Ende</InputGroup.Text>
            <FormControl
              type="time"
              min={"00:00"}
              max={"23:59"}
              value={
                (hourPauseEnd < 10 ? "0" + hourPauseEnd : hourPauseEnd) +
                ":" +
                (minutePauseEnd < 10 ? "0" + minutePauseEnd : minutePauseEnd)
              }
              onChange={(e) => {
                const [hour, minute] = e.target.value.split(":");
                if (hour == null || minute == null) return;
                setHourPauseEnd(parseInt(hour));
                setMinutePauseEnd(parseInt(minute));
              }}
            />
          </InputGroup>
        </Row>
        <hr />
        {workingHours > 0 && (
          <>
            <p>
              Arbeitsbeginn: {hourStart < 10 ? "0" + hourStart : hourStart}:
              {minuteStart < 10 ? "0" + minuteStart : minuteStart} (
              {((60 * hourStart + minuteStart) / 60).toFixed(2)})
            </p>
            <p>
              Arbeitsende: {hourEnd < 10 ? "0" + hourEnd : hourEnd}:
              {minuteEnd < 10 ? "0" + minuteEnd : minuteEnd} (
              {((60 * hourEnd + minuteEnd) / 60).toFixed(2)})
            </p>
            <p>
              Pause von{" "}
              {hourPauseStart < 10 ? "0" + hourPauseStart : hourPauseStart}:
              {minutePauseStart < 10
                ? "0" + minutePauseStart
                : minutePauseStart}{" "}
              bis {hourPauseEnd < 10 ? "0" + hourPauseEnd : hourPauseEnd}:
              {minutePauseEnd < 10 ? "0" + minutePauseEnd : minutePauseEnd} (
              {pause.toFixed(2)} {pause < 2 ? "Stunde" : "Stunden"})
            </p>
            <p>
              Zeit an der Arbeit:{" "}
              {workingHours.toPrecision(3).replace(".", ",")} Stunden
            </p>
            <p>
              Arbeitszeit abzüglich Pause:{" "}
              <span className="fw-bold">
                <u>
                  <mark>
                    {workingHours < 4
                      ? workingHours.toPrecision(3).replace(".", ",")
                      : (workingHours - pause).toPrecision(3).replace(".", ",")}
                  </mark>
                </u>
              </span>
              Stunden
            </p>
          </>
        )}
      </Container>
    </>
  );
}
