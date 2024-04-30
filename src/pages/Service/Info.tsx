import { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import LoadingSpinner from "~/Components/LoadingSpinner";
import useAdmin from "~/Hooks/useAdmin";
import { api } from "~/utils/api";

export default function Info() {
  const { isAdmin } = useAdmin();

  const [adress, setAdress] = useState("");
  const [order, setOrder] = useState("");
  const [success, setSuccess] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const Mail = api.Mail.infoMail.useMutation();

  const handleSubmit = async () => {
    if (adress.length < 5 || order.length < 5) return;
    setLoading(true);
    const res = await Mail.mutateAsync({
      receiver: adress,
      title: order,
    });
    if (res) {
      setSuccess(1);
    } else {
      setSuccess(2);
    }
    setLoading(false);
    setTimeout(() => {
      setAdress("");
      setOrder("");
      setSuccess(undefined);
    }, 2000);
  };

  if (!isAdmin)
    return (
      <Container>
        <h1>Nicht angemeldet!</h1>
      </Container>
    );

  return (
    <Container>
      <h1>Info an KD</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <FormGroup className="mb-3 ">
          <FloatingLabel
            controlId="floatingInput"
            label="Adresse"
            className="mb-3"
          >
            <FormControl
              type="text"
              required
              placeholder="Adresse"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup className="mb-3 ">
          <FloatingLabel
            controlId="floatingInput"
            label="Ufftrag"
            className="mb-3"
          >
            <FormControl
              type="text"
              required
              placeholder="Ufftrag"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <Button type="submit">Senden</Button>
      </Form>
      {loading && <LoadingSpinner />}
      {success === 1 && <p className="text-success fs-2">Mail verschickt!</p>}
      {success === 2 && (
        <p className="text-danger fs-2">FEHLER!!!!! JUNGE!!!</p>
      )}
    </Container>
  );
}
