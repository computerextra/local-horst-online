import SectionCard from "@/components/SectionCard";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

export default function TimePage() {
  const [hourStart, setHourStart] = useState("9");
  const [minuteStart, setMinuteStart] = useState("0");
  const [hourEnd, setHourEnd] = useState("18");
  const [minuteEnd, setMinuteEnd] = useState("0");

  const [timeStart, setTimeStart] = useState(1);
  const [timeEnd, setTimeEnd] = useState(1);
  const [workingHours, setWorkingHours] = useState(0);

  useEffect(() => {
    const start = (60 * parseInt(hourStart) + parseInt(minuteStart)) / 60;
    const end = (60 * parseInt(hourEnd) + parseInt(minuteEnd)) / 60;
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
            <div className="mt-2 w-min rounded-lg p-5 shadow-xl dark:bg-gray-600">
              <div className="flex items-baseline">
                <Select onValueChange={setHourStart} value={hourStart}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Stunde" />
                  </SelectTrigger>
                  <SelectContent className="w-min">
                    <SelectGroup>
                      {[...Array(24).keys()].map((x) => (
                        <SelectItem key={x} value={x.toString()}>
                          {x < 10 ? `0${x}` : x}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <span className="mx-3 text-xl">:</span>
                <Select onValueChange={setMinuteStart} value={minuteStart}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Minute" />
                  </SelectTrigger>
                  <SelectContent className="w-min">
                    <SelectGroup>
                      {[...Array(60).keys()].map((x) => (
                        <SelectItem key={x} value={x.toString()}>
                          {x < 10 ? `0${x}` : x}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="me-5">Ende:</span>
            <div className="mt-2 w-min rounded-lg p-5 shadow-xl dark:bg-gray-600">
              <div className="flex items-baseline">
                <Select onValueChange={setHourEnd} value={hourEnd}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Stunde" />
                  </SelectTrigger>
                  <SelectContent className="w-min">
                    <SelectGroup>
                      {[...Array(24).keys()].map((x) => (
                        <SelectItem key={x} value={x.toString()}>
                          {x < 10 ? `0${x}` : x}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <span className="mx-3 text-xl">:</span>
                <Select onValueChange={setMinuteEnd} value={minuteEnd}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Minute" />
                  </SelectTrigger>
                  <SelectContent className="w-min">
                    <SelectGroup>
                      {[...Array(60).keys()].map((x) => (
                        <SelectItem key={x} value={x.toString()}>
                          {x < 10 ? `0${x}` : x}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Arbeitszeit">
        <p>
          Angefangen um:{" "}
          {parseInt(hourStart) < 10 ? `0${hourStart}` : hourStart}:
          {parseInt(minuteStart) < 10 ? `0${minuteStart}` : minuteStart} Uhr.
          Dezimal: {timeStart.toFixed(2).replace(".", ",")}
        </p>
        <p>
          Aufgehört um: {parseInt(hourEnd) < 10 ? `0${hourEnd}` : hourEnd}:
          {parseInt(minuteEnd) < 10 ? `0${minuteEnd}` : minuteEnd} Uhr. Dezimal:{" "}
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
