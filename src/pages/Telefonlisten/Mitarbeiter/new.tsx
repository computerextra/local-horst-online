import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function NeuerMitarbeiter() {
  const Create = api.Mitarbeiter.create.useMutation();
  const { isAdmin } = useAdmin();
  const router = useRouter();

  const [Name, setName] = useState<undefined | string>(undefined);
  const [Short, setShort] = useState<undefined | string>(undefined);
  const [Gruppenwahl, setGruppenwahl] = useState<undefined | string>(undefined);
  const [InternTelefon1, setInternTelefon1] = useState<undefined | string>(
    undefined
  );
  const [InternTelefon2, setInternTelefon2] = useState<undefined | string>(
    undefined
  );
  const [FestnetzPrivat, setFestnetzPrivat] = useState<undefined | string>(
    undefined
  );
  const [FestnetzAlternativ, setFestnetzAlternativ] = useState<
    undefined | string
  >(undefined);
  const [HomeOffice, setHomeOffice] = useState<undefined | string>(undefined);
  const [MobilBusiness, setMobilBusiness] = useState<undefined | string>(
    undefined
  );
  const [MobilPrivat, setMobilPrivat] = useState<undefined | string>(undefined);
  const [Email, setEmail] = useState<undefined | string>(undefined);
  const [Azubi, setAzubi] = useState(false);
  const [Geburtstag, setGeburtstag] = useState<Date>(new Date());

  const handleSubmit = async () => {
    if (Name == null) return;

    const res = await Create.mutateAsync({
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
      await router.push("/Telefonlisten/Mitarbeiter");
    }
  };

  if (!isAdmin)
    return (
      <Container>
        <h1 className="text-center text-danger">
          Diese Seite kann nur von Administatoren genutzt werden
        </h1>
      </Container>
    );

  return (
    <>
      <Head>
        <title>Neuer Mitarbeiter | LocalHorst v9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Neuer Mitarbeiter</h1>
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
              onChange={(e) => setFestnetzPrivat(e.target.value)}
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
            <ReactDatePicker
              dateFormat={"dd.MM.yyyy"}
              selected={Geburtstag}
              onChange={(date: Date) => setGeburtstag(date)}
            />
          </FormGroup>
          <Button type="submit" onClick={handleSubmit}>
            Speichern
          </Button>
        </Form>
      </Container>
    </>
  );
}
