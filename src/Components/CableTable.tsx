import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import type { Kabelwand } from "~/pages/Kabelwand";

export default function CableTable({
  Kabel,
  Admin,
}: {
  Kabel: Kabelwand[] | undefined;
  Admin: boolean;
}) {
  // Filtered States
  const [GefilterteKabel, setGefilterteKabel] = useState<Kabelwand[]>([]);
  const [Inputs, setInputs] = useState<string[]>([]);
  const [Outputs, setOutputs] = useState<string[]>([]);
  const [Längen, setLängen] = useState<string[]>([]);
  const [Farben, setFarben] = useState<string[]>([]);
  const [Bestände, setBestände] = useState<string[]>([]);
  const [Verfügbare, setVerfügbare] = useState<string[]>([]);

  //Filter
  const [Suchbegriff, setSuchbegriff] = useState("");
  const [Artikelnummer, setArtikelnummer] = useState("");
  const [Input, setInput] = useState("all");
  const [Output, setOutput] = useState("all");
  const [Länge, setLänge] = useState("all");
  const [Farbe, setFarbe] = useState("all");
  const [Bestand, setBestand] = useState("all");
  const [Verfügbar, setVerfügbar] = useState("all");

  // init Kabel
  useEffect(() => {
    if (Kabel == null) return;
    const filter = AuswahlFilter(Kabel, GefilterteKabel);
    if (!filter) return;
    setInputs(filter.Input);
    setOutputs(filter.Output);
    setLängen(filter.Länge);
    setFarben(filter.Farbe);
    setBestände(filter.Bestand);
    setVerfügbare(filter.Verfügbar);
  }, [Kabel]);

  useEffect(() => {
    if (Kabel == null) return;

    setGefilterteKabel(
      Filter(
        Kabel,
        Artikelnummer,
        Suchbegriff,
        Input,
        Output,
        Länge,
        Farbe,
        Bestand,
        Verfügbar
      )
    );
  }, [
    Kabel,
    Suchbegriff,
    Artikelnummer,
    Input,
    Output,
    Länge,
    Farbe,
    Bestand,
    Verfügbar,
  ]);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>
            Art. Nr.
            <br />
            <input
              type="text"
              placeholder="Suche..."
              value={Artikelnummer}
              onChange={(e) => setArtikelnummer(e.target.value)}
            />
          </th>
          <th>
            Artikelname
            <br />
            <input
              type="text"
              placeholder="Suche..."
              value={Suchbegriff}
              onChange={(e) => setSuchbegriff(e.target.value)}
            />
          </th>
          <th>
            Input
            <br />
            <select
              name="InputFilter"
              title="InputFilter"
              onChange={(e) => setInput(e.currentTarget.value)}>
              <option
                value="all"
                defaultChecked={Input === "all"}>
                Alle
              </option>
              {Inputs.map((i) => (
                <option
                  value={i}
                  key={i}
                  defaultChecked={Input === i}>
                  {i}
                </option>
              ))}
            </select>
          </th>
          <th>
            Output <br />
            <select
              name="OutputFilter"
              title="OutputFilter"
              onChange={(e) => setOutput(e.currentTarget.value)}>
              <option
                value="all"
                defaultChecked={Output === "all"}>
                Alle
              </option>
              {Outputs.map((i) => (
                <option
                  value={i}
                  key={i}
                  defaultChecked={Output === i}>
                  {i}
                </option>
              ))}
            </select>
          </th>
          <th>
            Länge in m <br />
            <select
              name="LängeFilter"
              title="LängeFilter"
              onChange={(e) => setLänge(e.currentTarget.value)}>
              <option
                value="all"
                defaultChecked={Länge === "all"}>
                Alle
              </option>
              {Längen.map((i) => (
                <option
                  value={i}
                  key={i}
                  defaultChecked={Länge === i}>
                  {i}
                </option>
              ))}
            </select>
          </th>
          <th>
            Farben <br />
            <select
              name="FarbeFilter"
              title="FarbeFilter"
              onChange={(e) => setFarbe(e.currentTarget.value)}>
              <option
                value="all"
                defaultChecked={Farbe === "all"}>
                Alle
              </option>
              {Farben.map((i) => (
                <option
                  value={i}
                  key={i}
                  defaultChecked={Farbe === i}>
                  {i}
                </option>
              ))}
            </select>
          </th>
          <th>Regal</th>
          <th>Reihe</th>
          <th>Fach</th>
          <th>
            Bestand <br />
            <select
              name="BestandFilter"
              title="BestandFilter"
              onChange={(e) => setBestand(e.currentTarget.value)}>
              <option
                value="all"
                defaultChecked={Bestand === "all"}>
                Alle
              </option>
              {Bestände.map((i) => (
                <option
                  value={i}
                  key={i}
                  defaultChecked={Bestand === i}>
                  {i}
                </option>
              ))}
            </select>
          </th>
          <th>
            Verfügbar <br />
            <select
              name="VerfügbarFilter"
              title="VerfügbarFilter"
              onChange={(e) => setVerfügbar(e.currentTarget.value)}>
              <option
                value="all"
                defaultChecked={Verfügbar === "all"}>
                Alle
              </option>
              {Verfügbare.map((i) => (
                <option
                  value={i}
                  key={i}
                  defaultChecked={Verfügbar === i}>
                  {i}
                </option>
              ))}
            </select>
          </th>
          {Admin && <th></th>}
        </tr>
      </thead>
      <tbody>
        {GefilterteKabel.map((Kabel) => (
          <tr key={Kabel.id}>
            <td>{Kabel.Artikelnummer}</td>
            <td>{Kabel.Name}</td>
            <td>{Kabel.Input.Name}</td>
            <td>{Kabel.Output.Name}</td>
            <td>{Kabel.Laenge.Name}</td>
            <td>{Kabel.Farbe.Name}</td>
            <td>{Kabel.Regal.Name}</td>
            <td>{Kabel.Reihe.Name}</td>
            <td>{Kabel.Fach.Name}</td>
            <td>{Kabel.Bestand}</td>
            <td>{Kabel.Verfügbar}</td>
            {Admin && (
              <td>
                <Link
                  href={`/Kabelwand/${Kabel.id}`}
                  className="btn btn-primary">
                  Edit
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const AuswahlFilter = (
  AlleKabel: Kabelwand[] | undefined,
  GefilterteKabel: Kabelwand[] | undefined
) => {
  const Input: string[] = [];
  const Output: string[] = [];
  const Länge: string[] = [];
  const Farbe: string[] = [];
  const Bestand: string[] = [];
  const Verfügbar: string[] = [];

  if (!AlleKabel) return undefined;

  if (!GefilterteKabel) {
    AlleKabel.map((Kabel) => {
      Input.push(Kabel.Input.Name);
      Output.push(Kabel.Output.Name);
      Länge.push(Kabel.Laenge.Name);
      Farbe.push(Kabel.Farbe.Name);
      if (Kabel.Bestand !== undefined) {
        if (Kabel.Bestand === null) Bestand.push("0");
        else Bestand.push(Kabel.Bestand.toString());
      }
      if (Kabel.Verfügbar !== undefined) {
        if (Kabel.Verfügbar === null) Verfügbar.push("0");
        else Verfügbar.push(Kabel.Verfügbar.toString());
      }
    });
  } else {
    GefilterteKabel.map((Kabel) => {
      Input.push(Kabel.Input.Name);
      Output.push(Kabel.Output.Name);
      Länge.push(Kabel.Laenge.Name);
      Farbe.push(Kabel.Farbe.Name);
      if (Kabel.Bestand !== undefined) {
        if (Kabel.Bestand === null) Bestand.push("0");
        else Bestand.push(Kabel.Bestand.toString());
      }
      if (Kabel.Verfügbar !== undefined) {
        if (Kabel.Verfügbar === null) Verfügbar.push("0");
        else Verfügbar.push(Kabel.Verfügbar.toString());
      }
    });
  }

  return {
    Input: [...new Set(Input)].sort((a, b) => (a === b ? 0 : a < b ? -1 : 1)),
    Output: [...new Set(Output)].sort((a, b) => (a === b ? 0 : a < b ? -1 : 1)),
    Länge: [...new Set(Länge)].sort((a, b) => (a === b ? 0 : a < b ? -1 : 1)),
    Farbe: [...new Set(Farbe)].sort((a, b) => (a === b ? 0 : a < b ? -1 : 1)),
    Bestand: [...new Set(Bestand)].sort((a, b) =>
      a === b ? 0 : a < b ? -1 : 1
    ),
    Verfügbar: [...new Set(Verfügbar)].sort((a, b) =>
      a === b ? 0 : a < b ? -1 : 1
    ),
  };
};

const Filter = (
  AlleKabel: Kabelwand[],
  Artikelnummer: string,
  Name: string,
  Input: string,
  Output: string,
  Länge: string,
  Farbe: string,
  Bestand: string,
  Verfügbar: string
) => {
  let GefilterteKabel: Kabelwand[] = [];
  GefilterteKabel = SortiereNachArtikelnummer(AlleKabel, Artikelnummer);
  GefilterteKabel = SortiereNachSuchbegriff(AlleKabel, GefilterteKabel, Name);
  GefilterteKabel = SortiereNachInput(AlleKabel, GefilterteKabel, Input);
  GefilterteKabel = SortiereNachOutput(AlleKabel, GefilterteKabel, Output);
  GefilterteKabel = SortiereNachLänge(AlleKabel, GefilterteKabel, Länge);
  GefilterteKabel = SortiereNachFarbe(AlleKabel, GefilterteKabel, Farbe);
  GefilterteKabel = SortiereNachBestand(AlleKabel, GefilterteKabel, Bestand);
  GefilterteKabel = SortiereNachVerfügbar(
    AlleKabel,
    GefilterteKabel,
    Verfügbar
  );
  // Only Uniques
  return [...new Set(GefilterteKabel)];
};

const SortiereNachArtikelnummer = (
  AlleKabel: Kabelwand[],
  Artikelnummer: string
) => {
  if (Artikelnummer.length < 0) return AlleKabel;

  const tmp: Kabelwand[] = [];
  AlleKabel.map((Kabel) => {
    if (
      Kabel.Artikelnummer.toLowerCase().indexOf(Artikelnummer.toLowerCase()) >
      -1
    )
      tmp.push(Kabel);
  });
  return tmp;
};

const SortiereNachSuchbegriff = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Suchbegriff: string
) => {
  if (Suchbegriff.length < 1) {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }
  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Name.toLowerCase().indexOf(Suchbegriff.toLowerCase()) > -1)
        tmp.push(Kabel);
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Name.toLowerCase().indexOf(Suchbegriff.toLowerCase()) > -1)
      tmp.push(Kabel);
  });
  return tmp;
};

const SortiereNachInput = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Input: string
) => {
  if (Input.length > 0 && Input === "all") {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }

  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Input.Name === Input) tmp.push(Kabel);
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Input.Name === Input) tmp.push(Kabel);
  });
  return tmp;
};

const SortiereNachOutput = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Output: string
) => {
  if (Output.length > 0 && Output === "all") {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }

  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Output.Name === Output) tmp.push(Kabel);
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Output.Name === Output) tmp.push(Kabel);
  });
  return tmp;
};

const SortiereNachFarbe = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Farbe: string
) => {
  if (Farbe.length > 0 && Farbe === "all") {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }

  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Farbe.Name === Farbe) tmp.push(Kabel);
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Farbe.Name === Farbe) tmp.push(Kabel);
  });
  return tmp;
};

const SortiereNachLänge = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Länge: string
) => {
  if (Länge.length > 0 && Länge === "all") {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }

  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Laenge.Name === Länge) tmp.push(Kabel);
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Laenge.Name === Länge) tmp.push(Kabel);
  });
  return tmp;
};

const SortiereNachBestand = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Bestand: string
) => {
  if (Bestand.length > 0 && Bestand === "all") {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }

  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Bestand !== undefined) {
        if (Kabel.Bestand === null && Bestand === "0") tmp.push(Kabel);
        if (Kabel.Bestand && Kabel.Bestand.toString() === Bestand)
          tmp.push(Kabel);
      }
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Bestand !== undefined) {
      if (Kabel.Bestand === null && Bestand === "0") tmp.push(Kabel);
      if (Kabel.Bestand && Kabel.Bestand.toString() === Bestand)
        tmp.push(Kabel);
    }
  });
  return tmp;
};

const SortiereNachVerfügbar = (
  AlleKabel: Kabelwand[],
  GefilterteKabel: Kabelwand[],
  Verfügbar: string
) => {
  if (Verfügbar.length > 0 && Verfügbar === "all") {
    if (GefilterteKabel.length < 1) return AlleKabel;
    else return GefilterteKabel;
  }

  const tmp: Kabelwand[] = [];
  if (GefilterteKabel.length > 0) {
    GefilterteKabel.map((Kabel) => {
      if (Kabel.Verfügbar !== undefined) {
        if (Kabel.Verfügbar === null && Verfügbar === "0") tmp.push(Kabel);
        if (Kabel.Verfügbar && Kabel.Verfügbar.toString() === Verfügbar)
          tmp.push(Kabel);
      }
    });
    return tmp;
  }

  AlleKabel.map((Kabel) => {
    if (Kabel.Verfügbar !== undefined) {
      if (Kabel.Verfügbar === null && Verfügbar === "0") tmp.push(Kabel);
      if (Kabel.Verfügbar && Kabel.Verfügbar.toString() === Verfügbar)
        tmp.push(Kabel);
    }
  });
  return tmp;
};
