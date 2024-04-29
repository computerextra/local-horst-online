import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function MitarbeiterEdit() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { isAdmin } = useAdmin();
  const { id } = router.query;
  const Mitarbeiter = api.Mitarbeiter.get.useQuery({ id: id as string });
  const Updater = api.Mitarbeiter.update.useMutation();

  // Mitarbeiter Felder
  const [Name, setName] = useState<undefined | string>(undefined);
  const [Short, setShort] = useState<undefined | string>(undefined);
  const [Gruppenwahl, setGruppenwahl] = useState<undefined | string>(undefined);
  const [InternTelefon1, setInternTelefon1] = useState<undefined | string>(
    undefined,
  );
  const [InternTelefon2, setInternTelefon2] = useState<undefined | string>(
    undefined,
  );
  const [FestnetzAlternativ, setFestnetzAlternativ] = useState<
    undefined | string
  >(undefined);
  const [FestnetzPrivat, setFestnetzprivat] = useState<undefined | string>(
    undefined,
  );
  const [HomeOffice, setHomeOffice] = useState<undefined | string>(undefined);
  const [MobilBusiness, setMobilBusiness] = useState<undefined | string>(
    undefined,
  );
  const [MobilPrivat, setMobilPrivat] = useState<undefined | string>(undefined);
  const [Email, setEmail] = useState<undefined | string>(undefined);
  const [Azubi, setAzubi] = useState<boolean>(false);
  const [Geburtstag, setGeburtstag] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (Mitarbeiter.data == null) return;

    setName(Mitarbeiter.data.Name);
    setShort(Mitarbeiter.data.Short ?? undefined);
    setGruppenwahl(Mitarbeiter.data.Gruppenwahl ?? undefined);
    setInternTelefon1(Mitarbeiter.data.InternTelefon1 ?? undefined);
    setInternTelefon2(Mitarbeiter.data.InternTelefon2 ?? undefined);
    setFestnetzprivat(Mitarbeiter.data.FestnetzPrivat ?? undefined);
    setFestnetzAlternativ(Mitarbeiter.data.FestnetzAlternativ ?? undefined);
    setHomeOffice(Mitarbeiter.data.HomeOffice ?? undefined);
    setMobilPrivat(Mitarbeiter.data.MobilPrivat ?? undefined);
    setMobilBusiness(Mitarbeiter.data.MobilBusiness ?? undefined);
    setEmail(Mitarbeiter.data.Email ?? undefined);
    setAzubi(Mitarbeiter.data.Azubi ?? false);
    setGeburtstag(Mitarbeiter.data.Geburtstag ?? undefined);
  }, [Mitarbeiter.data]);

  const handleUpdate = async () => {
    if (sessionData == null) return;
    if (!isAdmin) return;
    if (Name == undefined) return;

    const res = await Updater.mutateAsync({
      id: id as string,
      Name,
      Short,
      Gruppenwahl,
      InternTelefon1,
      InternTelefon2,
      FestnetzAlternativ,
      FestnetzPrivat,
      HomeOffice,
      MobilBusiness,
      MobilPrivat,
      Email,
      Azubi,
      Geburtstag,
    });
    if (res) {
      location.reload();
    }
  };

  if (Mitarbeiter.isError)
    return (
      <Container>
        <h1 className="text-center text-danger">
          Fehler! Mitarbeiter nicht gefunden
        </h1>
      </Container>
    );

  if (!isAdmin)
    return (
      <Container>
        <h1 className="text-center text-danger">Kein Admin!</h1>
      </Container>
    );

  if (sessionData == null)
    return (
      <Container>
        <h1 className="text-center">Nicht angemeldet. Bitte anmelden!</h1>
        <Button onClick={() => void signIn()}>Anmelden</Button>
      </Container>
    );
  return (
    <Container>
      <h1>{Mitarbeiter.data?.Name} bearbeiten</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FloatingLabel controlId="Name" label="Name" className="mb-3">
          <FormControl
            value={Name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="Short" label="Short" className="mb-3">
          <FormControl
            value={Short}
            onChange={(e) => setShort(e.target.value)}
            type="text"
            placeholder="Short"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="Gruppenwahl"
          label="Gruppenwahl"
          className="mb-3"
        >
          <FormControl
            value={Gruppenwahl}
            onChange={(e) => setGruppenwahl(e.target.value)}
            type="text"
            placeholder="Gruppenwahl"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="InternTelefon1"
          label="InternTelefon1"
          className="mb-3"
        >
          <FormControl
            value={InternTelefon1}
            onChange={(e) => setInternTelefon1(e.target.value)}
            type="text"
            placeholder="InternTelefon1"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="InternTelefon2"
          label="InternTelefon2"
          className="mb-3"
        >
          <FormControl
            value={InternTelefon2}
            onChange={(e) => setInternTelefon2(e.target.value)}
            type="text"
            placeholder="InternTelefon2"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="FestnetzAlternativ"
          label="FestnetzAlternativ"
          className="mb-3"
        >
          <FormControl
            value={FestnetzAlternativ}
            onChange={(e) => setFestnetzAlternativ(e.target.value)}
            type="text"
            placeholder="FestnetzAlternativ"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="FestnetzPrivat"
          label="FestnetzPrivat"
          className="mb-3"
        >
          <FormControl
            value={FestnetzPrivat}
            onChange={(e) => setFestnetzprivat(e.target.value)}
            type="text"
            placeholder="FestnetzPrivat"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="HomeOffice"
          label="HomeOffice"
          className="mb-3"
        >
          <FormControl
            value={HomeOffice}
            onChange={(e) => setHomeOffice(e.target.value)}
            type="text"
            placeholder="HomeOffice"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="MobilBusiness"
          label="MobilBusiness"
          className="mb-3"
        >
          <FormControl
            value={MobilBusiness}
            onChange={(e) => setMobilBusiness(e.target.value)}
            type="text"
            placeholder="MobilBusiness"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="MobilPrivat"
          label="MobilPrivat"
          className="mb-3"
        >
          <FormControl
            value={MobilPrivat}
            onChange={(e) => setMobilPrivat(e.target.value)}
            type="text"
            placeholder="MobilPrivat"
          />
        </FloatingLabel>
        <FloatingLabel controlId="Email" label="Email" className="mb-3">
          <FormControl
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </FloatingLabel>
        <FormGroup className="mb-3">
          <FormCheck
            type="switch"
            id="Azubi"
            label="Azubi"
            checked={Azubi}
            onChange={() => setAzubi((prev) => !prev)}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl
            type="date"
            value={
              Geburtstag
                ? `${Geburtstag.getFullYear()}-${Geburtstag.getMonth() < 10 ? "0" + Geburtstag.getMonth() : Geburtstag.getMonth()}-${Geburtstag.getDate() < 10 ? "0" + Geburtstag.getDate() : Geburtstag.getDate()}`
                : `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? "0" + +new Date().getMonth() : new Date().getMonth()}-${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`
            }
            onChange={(e) => {
              const date = e.target.value.split("-");
              const y = date[0];
              const m = date[1];
              const d = date[2];
              if (y == null || m == null || d == null) return;
              const yI = parseInt(y);
              const mI = parseInt(m);
              const dI = parseInt(d);
              const bday = new Date(yI, mI, dI);
              setGeburtstag(bday);
            }}
          />
        </FormGroup>
        <Button type="submit" onClick={handleUpdate}>
          Speichern
        </Button>
      </Form>
    </Container>
  );
}
