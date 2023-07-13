import type { Mitarbeiter } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

const Tage = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

export default function Geburtstage() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery().data;

  const [Zukunft, setZukunft] = useState<Mitarbeiter[]>([]);
  const [Vergangen, setVergangen] = useState<Mitarbeiter[]>([]);
  const [Heute, setHeute] = useState<Mitarbeiter[]>([]);
  const [Datum, setDatum] = useState("");

  useEffect(() => {
    if (Mitarbeiter == null) return;

    const d = new Date();
    const Wochentag = d.getDay();
    const WochentagString = Tage[Wochentag] || "";
    const day = d.getDate();
    let dayString = "";
    if (day < 10) dayString = "0" + day.toString();
    else dayString = day.toString();
    const month = d.getMonth() + 1;
    let monthString = "";
    if (month < 10) monthString = "0" + month.toString();
    else monthString = month.toString();
    const year = d.getFullYear();
    setDatum(`${WochentagString}, der ${dayString}.${monthString}.${year}`);
    const heute: Mitarbeiter[] = [];
    const zukunft: Mitarbeiter[] = [];
    const vergangen: Mitarbeiter[] = [];
    Mitarbeiter.map((ma) => {
      if (ma.Geburtstag) {
        const Tag = ma.Geburtstag.split(".")[0] || "";
        const Monat = ma.Geburtstag.split(".")[1] || "";
        if (Tag === day.toString() && Monat === month.toString())
          heute.push(ma);
        if (
          new Date(2000, parseInt(Monat), parseInt(Tag)) <
          new Date(2000, month, day)
        ) {
          vergangen.push(ma);
        }
        if (
          new Date(2000, parseInt(Monat), parseInt(Tag)) >
          new Date(2000, month, day)
        ) {
          zukunft.push(ma);
        }
      }
    });
    vergangen.sort((a, b) =>
      new Date(
        2000,
        parseInt(a.Geburtstag?.split(".")[1] || "0"),
        parseInt(a.Geburtstag?.split(".")[0] || "0")
      ) >
      new Date(
        2000,
        parseInt(b.Geburtstag?.split(".")[1] || "0"),
        parseInt(b.Geburtstag?.split(".")[0] || "0")
      )
        ? 1
        : -1
    );
    zukunft.sort((a, b) =>
      new Date(
        2000,
        parseInt(a.Geburtstag?.split(".")[1] || "0"),
        parseInt(a.Geburtstag?.split(".")[0] || "0")
      ) >
      new Date(
        2000,
        parseInt(b.Geburtstag?.split(".")[1] || "0"),
        parseInt(b.Geburtstag?.split(".")[0] || "0")
      )
        ? 1
        : -1
    );
    setHeute(heute);
    setVergangen(vergangen);
    setZukunft(zukunft);
  }, [Mitarbeiter]);

  if (!Mitarbeiter) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Geburtstage | LocalHorst v7</title>
      </Head>
      <Container
        fluid="sm"
        className="mt-5">
        <h2 className="text-center">Geburtstage</h2>
        <section className="mb-4 mt-4">
          Heute ist <span className="fw-bold">{Datum}</span>
        </section>
        {Vergangen.length >= 1 &&
          Vergangen.map((ma) => (
            <p key={ma.id}>
              {ma.Name} hatte am{" "}
              <span className="fw-bold">{ma.Geburtstag}</span> Geburtstag
            </p>
          ))}
        {Heute.length >= 1 &&
          Heute.map((ma) => (
            <p key={ma.id}>
              {ma.Name} hat{" "}
              <span className="text-success fw-bold text-uppercase">heute</span>{" "}
              Geburtstag.
            </p>
          ))}
        {Zukunft.length >= 1 &&
          Zukunft.map((ma) => (
            <p key={ma.id}>
              {ma.Name} hat am <span className="fw bold">{ma.Geburtstag}</span>{" "}
              Geburtstag.
            </p>
          ))}
      </Container>
    </>
  );
}
