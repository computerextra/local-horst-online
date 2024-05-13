import type { Mitarbeiter } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Geburtstage() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();

  const [heute, setHeute] = useState<undefined | Mitarbeiter[]>(undefined);
  const [zukunft, setZukunft] = useState<undefined | Mitarbeiter[]>(undefined);
  const [vergangenheit, setVergangenheit] = useState<undefined | Mitarbeiter[]>(
    undefined
  );

  useEffect(() => {
    if (Mitarbeiter.data == null) return;

    const zukunft: Mitarbeiter[] = [];
    const heute: Mitarbeiter[] = [];
    const vergangenheit: Mitarbeiter[] = [];

    const sortByBirthday = (arr: Mitarbeiter[]): Mitarbeiter[] => {
      return arr.sort(
        (a, b) =>
          new Date(
            new Date().getFullYear(),
            a.Geburtstag!.getMonth(),
            a.Geburtstag!.getDate()
          ).getTime() -
          new Date(
            new Date().getFullYear(),
            b.Geburtstag!.getMonth(),
            b.Geburtstag!.getDate()
          ).getTime()
      );
    };

    Mitarbeiter.data.forEach((mitarbeiter) => {
      if (mitarbeiter.Geburtstag) {
        const bday = new Date(
          new Date().getFullYear(),
          mitarbeiter.Geburtstag.getMonth(),
          mitarbeiter.Geburtstag.getDate()
        );
        if (bday.toLocaleDateString() == new Date().toLocaleDateString())
          heute.push(mitarbeiter);
        else if (bday < new Date()) vergangenheit.push(mitarbeiter);
        else zukunft.push(mitarbeiter);
      }
    });

    setHeute(heute.length > 0 ? sortByBirthday(heute) : undefined);
    setVergangenheit(
      vergangenheit.length > 0 ? sortByBirthday(vergangenheit) : undefined
    );
    setZukunft(zukunft.length > 0 ? sortByBirthday(zukunft) : undefined);
  }, [Mitarbeiter.data]);

  return (
    <>
      <Head>
        <title>Geburtstage | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Geburtstage</h1>
        {Mitarbeiter.isLoading && <LoadingSpinner />}
        <h2>Heute ist der {new Date().toLocaleDateString()}</h2>
        {heute && (
          <div className="rounded border border-success border-4 p-4">
            <h3>Heute ist der Geburtstag von:</h3>
            <ul>
              {heute.map((mitarbeiter) => (
                <li className="fs-5 fw-bold" key={mitarbeiter.id}>
                  {mitarbeiter.Name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {vergangenheit && (
          <>
            <h3>Vergangene Geburtstage:</h3>
            <ul>
              {vergangenheit.map((mitarbeiter) => (
                <li key={mitarbeiter.id}>
                  {mitarbeiter.Name} hatte am{" "}
                  <span className="fw-bold">
                    {mitarbeiter.Geburtstag!.getDate()}.
                    {mitarbeiter.Geburtstag!.getMonth() + 1}
                  </span>{" "}
                  Geburtstag
                </li>
              ))}
            </ul>
          </>
        )}

        {zukunft && (
          <>
            <h3>Zukünftige Geburtstage:</h3>
            <ul>
              {zukunft.map((mitarbeiter) => (
                <li key={mitarbeiter.id}>
                  {mitarbeiter.Name} hat am{" "}
                  <span className="fw-bold">
                    {mitarbeiter.Geburtstag!.getDate()}.
                    {mitarbeiter.Geburtstag!.getMonth() + 1}
                  </span>{" "}
                  Geburtstag
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </>
  );
}
