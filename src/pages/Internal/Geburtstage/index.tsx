import SectionCard from "@/components/SectionCard";
import { api } from "@/utils/api";
import type { Mitarbeiter } from "@prisma/client";
import { useEffect, useState } from "react";

export default function BirthdayPage() {
  const Mitarbeiter = api.Mitarbeiter.getBirthday.useQuery();

  const [zukunft, setZukuenft] = useState<Mitarbeiter[] | undefined>(undefined);
  const [vergangen, setVergangen] = useState<Mitarbeiter[] | undefined>(
    undefined,
  );
  const [geburtstag, setGeburtstag] = useState<Mitarbeiter[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (Mitarbeiter.data == null) return;

    const today = new Date().toLocaleDateString();
    const year = new Date().getFullYear();

    Mitarbeiter.data.forEach((mitarbeiter) => {
      if (mitarbeiter.Geburtstag) {
        const day = new Date(mitarbeiter.Geburtstag).getDate();
        const month = new Date(mitarbeiter.Geburtstag).getMonth();
        const bday = new Date(year, month, day).toLocaleDateString();
        if (bday === today) {
          setGeburtstag((prev) => [...(prev ?? []), mitarbeiter]);
        } else if (bday < today) {
          setVergangen((prev) => [...(prev ?? []), mitarbeiter]);
        } else {
          setZukuenft((prev) => [...(prev ?? []), mitarbeiter]);
        }
      }
    });
  }, [Mitarbeiter.data]);

  if (Mitarbeiter.isLoading) return <p>Loading...</p>;

  return (
    <SectionCard title="Geburtstage">
      <h2 className="py-4 text-2xl">
        Heute ist der {new Date().toLocaleDateString()}
      </h2>
      {geburtstag && geburtstag.length > 0 && (
        <>
          <h2 className="py-4 text-2xl">Heute Geburtstag</h2>
          <ul>
            {geburtstag.map((mitarbeiter) => (
              <li
                key={mitarbeiter.id}
                className="text-xl font-bold text-red-700"
              >
                {mitarbeiter.Name}
              </li>
            ))}
          </ul>
        </>
      )}
      {vergangen && vergangen.length > 0 && (
        <>
          {geburtstag && geburtstag.length > 0 && <hr />}

          <h2 className="py-4 text-2xl">Vergangene Geburtstage</h2>
          <ul>
            {vergangen.map((mitarbeiter) => (
              <li key={mitarbeiter.id}>
                {mitarbeiter.Name} am{" "}
                {mitarbeiter.Geburtstag &&
                  new Date(
                    new Date().getFullYear(),
                    new Date(mitarbeiter.Geburtstag).getMonth(),
                    new Date(mitarbeiter.Geburtstag).getDate(),
                  ).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
      {zukunft && zukunft.length > 0 && (
        <>
          {vergangen && vergangen.length > 0 && <hr />}
          <h2 className="py-4 text-2xl">Zukünftige Geburtstage</h2>
          <ul>
            {zukunft.map((mitarbeiter) => (
              <li key={mitarbeiter.id}>
                {mitarbeiter.Name} am{" "}
                {mitarbeiter.Geburtstag &&
                  new Date(
                    new Date().getFullYear(),
                    new Date(mitarbeiter.Geburtstag).getMonth(),
                    new Date(mitarbeiter.Geburtstag).getDate(),
                  ).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </SectionCard>
  );
}
