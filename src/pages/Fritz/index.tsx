import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

export default function Fritz() {
  const [Eingabe, setEingabe] = useState("");
  const [WarrantyDate, setWarrantyDate] = useState("");
  const [Warranty, setWarranty] = useState<boolean | null>(null);
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const getDifferenceInDays = (date1: Date, date2: Date) => {
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
  };

  const Year = {
    A: 2008,
    B: 2009,
    C: 2010,
    D: 2011,
    E: 2012,
    F: 2013,
    G: 2014,
    H: 2015,
    I: 2016,
    J: 2017,
    K: 2019,
    L: 2020,
    M: 2021,
    N: 2022,
    O: 2023,
    P: 2024,
    Q: 2025,
    R: 2026,
    S: 2027,
    T: 2028,
    U: 2029,
    V: 2030,
    W: 2031,
    X: 2032,
    Y: 2033,
    Z: 2034,
  };

  const getDateFromSN = (sn: string): Date => {
    const split = sn.split("");
    if (!split[0] || !split[1] || !split[2] || !split[3]) return new Date();
    const j = split[0].toUpperCase();
    const k = split[1] + split[2];
    const t = split[3];
    const Monat: number = parseInt(k);
    const Tag: number = parseInt(t);
    let Jahr = 0;
    switch (j) {
      case "A":
        Jahr = Year.A;
        break;
      case "B":
        Jahr = Year.B;
        break;
      case "C":
        Jahr = Year.C;
        break;
      case "D":
        Jahr = Year.D;
        break;
      case "E":
        Jahr = Year.E;
        break;
      case "F":
        Jahr = Year.F;
        break;
      case "G":
        Jahr = Year.G;
        break;
      case "H":
        Jahr = Year.H;
        break;
      case "I":
        Jahr = Year.I;
        break;
      case "J":
        Jahr = Year.J;
        break;
      case "K":
        Jahr = Year.K;
        break;
      case "L":
        Jahr = Year.L;
        break;
      case "M":
        Jahr = Year.M;
        break;
      case "N":
        Jahr = Year.N;
        break;
      case "O":
        Jahr = Year.O;
        break;
      case "P":
        Jahr = Year.P;
        break;
      case "Q":
        Jahr = Year.Q;
        break;
      case "R":
        Jahr = Year.R;
        break;
      case "S":
        Jahr = Year.S;
        break;
      case "T":
        Jahr = Year.T;
        break;
      case "U":
        Jahr = Year.U;
        break;
      case "V":
        Jahr = Year.V;
        break;
      case "W":
        Jahr = Year.W;
        break;
      case "X":
        Jahr = Year.X;
        break;
      case "Y":
        Jahr = Year.Y;
        break;
      case "Z":
        Jahr = Year.Z;
        break;
    }

    const test = getDateOfISOWeek(Tag, Monat, Jahr);
    return test;
  };

  const getZeroBasedIsoWeekDay = (date: Date) => (date.getDay() + 6) % 7;
  const getIsoWeekDay = (date: Date) => getZeroBasedIsoWeekDay(date) + 1;

  const getDateOfISOWeek = (
    weekDay: number,
    week: number,
    year: number
  ): Date => {
    const zeroBasedWeek = week - 1;
    const zeroBasedWeekDay = weekDay - 1;
    let days = zeroBasedWeek * 7 + zeroBasedWeekDay;

    // Dates start at 2017-01-01 and not 2017-01-00
    days += 1;

    const firstDayOfYear = new Date(year, 0, 1);
    const firstIsoWeekDay = getIsoWeekDay(firstDayOfYear);
    const zeroBasedFirstIsoWeekDay = getZeroBasedIsoWeekDay(firstDayOfYear);

    // If year begins with W52 or W53
    if (firstIsoWeekDay > 4) days += 8 - firstIsoWeekDay;
    // Else begins with W01
    else days -= zeroBasedFirstIsoWeekDay;

    return new Date(year, 0, days);
  };

  useEffect(() => {
    if (Eingabe === "" || Eingabe.length < 4) return;
    setWarrantyDate(
      getDateFromSN(Eingabe).toLocaleDateString("de-DE", {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
    const Days = getDifferenceInDays(getDateFromSN(Eingabe), new Date());
    if (Days > 1825) setWarranty(false);
    else setWarranty(true);
  }, [Eingabe]);

  useEffect(() => {
    setWarrantyDate(
      new Date(1977, 0, 1).toLocaleDateString("de-DE", {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
  }, []);

  return (
    <>
      <Head>
        <title>Fritz Box | LocalHorst v7</title>
      </Head>
      <Container
        fluid="sm"
        className="mt-5 pt-2 text-center">
        <h1>Wann wurde die Fritz!Box hergestellt / produziert?</h1>
        <p>
          Anhand der Seriennummern kann man das Produktionsdatum herausfinden.
          Dazu einfach den ersten Block der Seriennummer in die Eingabemaske
          eingeben.
        </p>
        <div className="d-flex align-content-center align-items-center justify-content-center mt-5">
          <Card
            style={{ width: "50%" }}
            className="bg-secondary-subtle">
            <Card.Body>
              <Card.Title>Hier Seriennummer eingeben</Card.Title>
              <Card.Text>
                Die Seriennummer muss folgendes Format aufweisen: <br />1
                Großbuchstaben gefolgt von 3 Ziffern.
              </Card.Text>
              <form
                className="mt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}>
                <input
                  maxLength={4}
                  size={4}
                  value={Eingabe}
                  onChange={(e) => setEingabe(e.target.value)}
                  className="FormInputFritz"
                />{" "}
                . XXX . XX . XXX . XXX
              </form>
              <h2>Produktionsdatum</h2>
              <span className="fs-3">{WarrantyDate}</span>
              <p className="fs-3 fw-bold">Heute ist {today}</p>
              {Warranty == null && (
                <p className="fs-2 fw-bold text-warning">
                  Bitte eine Seriennummer eingeben.
                </p>
              )}
              {Warranty && (
                <p className="text-success fs-2 fw-bold">
                  Gerät ist innerhalb der Garantie
                </p>
              )}
              {Warranty != null && !Warranty && (
                <p className="text-danger fs-2 fw-bold">
                  Gerät ist älter als 5-Jahre und außerhalb der Garantie!
                </p>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
      ;
    </>
  );
}
