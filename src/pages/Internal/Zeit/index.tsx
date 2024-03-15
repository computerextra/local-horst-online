import SectionCard from "@/components/SectionCard";
import { useEffect, useState } from "react";

export default function TimePage() {
  const [hourStart, setHourStart] = useState(1);
  const [minuteStart, setMinuteStart] = useState(1);
  const [hourEnd, setHourEnd] = useState(1);
  const [minuteEnd, setMinuteEnd] = useState(1);

  const [timeStart, setTimeStart] = useState(1);
  const [timeEnd, setTimeEnd] = useState(1);
  const [workingHours, setWorkingHours] = useState(0);

  useEffect(() => {
    const start = (60 * hourStart + minuteStart) / 60;
    const end = (60 * hourEnd + minuteEnd) / 60;
    setTimeStart(start);
    setTimeEnd(end);
    setWorkingHours(end - start);
  }, [hourStart, minuteStart, hourEnd, minuteEnd]);

  return (
    <>
      <SectionCard title="Zeiterfassung">
        <h2>
          Diese Maske dient dazu, Arbeitszeiten von einer Uhrzeit in ein
          Zahlenformat zu bringen, damit die Exceldatei zur Zeiterfassung damit
          umgehen kann.
        </h2>
        <div className="grid max-w-max grid-cols-2 gap-5">
          <div className="flex items-baseline">
            <span className="me-5">Start:</span>
            <div className="mt-2 w-min rounded-lg bg-gray-600 p-5 shadow-xl">
              <div className="flex">
                <select
                  onChange={(e) => setHourStart(parseInt(e.target.value))}
                  name="hours"
                  className="appearance-none bg-transparent text-xl outline-none"
                >
                  {[...Array(24).keys()].map((x) => (
                    <option
                      className="bg-gray-500 text-white"
                      value={x}
                      key={x}
                    >
                      {x < 10 ? `0${x}` : x}
                    </option>
                  ))}
                </select>
                <span className="mr-3 text-xl">:</span>
                <select
                  onChange={(e) => setMinuteStart(parseInt(e.target.value))}
                  name="minutes"
                  className="mr-4 appearance-none bg-transparent text-xl outline-none"
                >
                  {[...Array(60).keys()].map((x) => (
                    <option
                      className="bg-gray-500 text-white"
                      value={x}
                      key={x}
                    >
                      {x < 10 ? `0${x}` : x}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="me-5">Ende:</span>
            <div className="mt-2 w-min rounded-lg bg-gray-600 p-5 shadow-xl">
              <div className="flex">
                <select
                  onChange={(e) => setHourEnd(parseInt(e.target.value))}
                  name="hours"
                  className="appearance-none bg-transparent text-xl outline-none"
                >
                  {[...Array(24).keys()].map((x) => (
                    <option
                      className="bg-gray-500 text-white"
                      value={x}
                      key={x}
                    >
                      {x < 10 ? `0${x}` : x}
                    </option>
                  ))}
                </select>
                <span className="mr-3 text-xl">:</span>
                <select
                  onChange={(e) => setMinuteEnd(parseInt(e.target.value))}
                  name="minutes"
                  className="mr-4 appearance-none bg-transparent text-xl outline-none"
                >
                  {[...Array(60).keys()].map((x) => (
                    <option
                      className="bg-gray-500 text-white"
                      value={x}
                      key={x}
                    >
                      {x < 10 ? `0${x}` : x}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Arbeitszeit">
        <p>
          Angefangen um: {hourStart < 10 ? `0${hourStart}` : hourStart}:
          {minuteStart < 10 ? `0${minuteStart}` : minuteStart} Uhr. Dezimal:{" "}
          {timeStart.toFixed(2).replace(".", ",")}
        </p>
        <p>
          Augehört um: {hourEnd < 10 ? `0${hourEnd}` : hourEnd}:
          {minuteEnd < 10 ? `0${minuteEnd}` : minuteEnd} Uhr. Dezimal:{" "}
          {timeEnd.toFixed(2).replace(".", ",")}
        </p>
        <p>Arbeitszeit die geschlafen wurde: {workingHours.toFixed(2)} Std.</p>
        <p>
          Da ziehen wir nun noch 5 Stunden mittagspause ab und kommen nur noch
          auf:{" "}
          <span className="text-green-600 underline">
            {(workingHours - 1).toFixed(2).replace(".", ",")} Stunden
          </span>
          .
        </p>
      </SectionCard>
    </>
  );
}
