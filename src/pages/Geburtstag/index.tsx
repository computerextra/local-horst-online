import type { Mitarbeiter } from "@prisma/client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import { api } from "~/utils/api";

export default function Geburtstage() {
  const Mitarbeiter = api.Mitarbeiter.getAll.useQuery();

  const [heute, setHeute] = useState<undefined | Mitarbeiter[]>(undefined);
  const [andere, setAndere] = useState<undefined | Mitarbeiter[]>(undefined);

  useEffect(() => {
    if (Mitarbeiter.data == null) return;

    const today = new Date().toLocaleDateString();
    const jahr = new Date().getFullYear();

    const andere: Mitarbeiter[] = [];
    const heute: Mitarbeiter[] = [];

    Mitarbeiter.data.forEach((mitarbeiter) => {
      if (mitarbeiter.Geburtstag) {
        const day = mitarbeiter.Geburtstag.getDate();
        const month = mitarbeiter.Geburtstag.getMonth();
        const bday = new Date(jahr, month, day).toLocaleDateString();
        console.log(mitarbeiter.Name, bday, today, mitarbeiter.Geburtstag);
        if (bday == today) {
          heute.push(mitarbeiter);
        } else {
          andere.push(mitarbeiter);
        }
      }
    });

    if (heute.length > 0) heute.sort((a, b) => a.Name.localeCompare(b.Name));
    if (andere.length > 0) andere.sort((a, b) => a.Name.localeCompare(b.Name));

    if (heute.length > 0) setHeute(heute);
    else setHeute(undefined);

    if (andere.length > 0) setAndere(andere);
    else setAndere(undefined);
  }, [Mitarbeiter.data]);

  return (
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
      {andere && (
        <>
          <h3>Aktuelle Liste:</h3>
          <ul>
            {andere.map((mitarbeiter) => (
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
  );
}
