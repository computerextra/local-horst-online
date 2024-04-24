import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";

export default function PayPal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSubmit = () => {
    console.log("hier kommt ein Formular");
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader closeButton>PayPal Abrechnung</ModalHeader>
      <ModalBody>hier kommt ein Formular</ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleSubmit}>
          Senden
        </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Schließen
        </Button>
      </ModalFooter>
    </Modal>
  );
}
