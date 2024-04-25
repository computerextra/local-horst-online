import Image from "next/image";
import { Card, Col, Container, Row } from "react-bootstrap";
import i1 from "~/Assets/Wiki/1.png";
import i10 from "~/Assets/Wiki/10.png";
import i11 from "~/Assets/Wiki/11.jpg";
import i2 from "~/Assets/Wiki/2.png";
import i3 from "~/Assets/Wiki/3.png";
import i4 from "~/Assets/Wiki/4.png";
import i5 from "~/Assets/Wiki/5.png";
import i6_1 from "~/Assets/Wiki/6.1.png";
import i6 from "~/Assets/Wiki/6.png";
import i7_1 from "~/Assets/Wiki/7.1.png";
import i7 from "~/Assets/Wiki/7.png";
import i8_1 from "~/Assets/Wiki/8.1.png";
import i8 from "~/Assets/Wiki/8.png";
import i9_1 from "~/Assets/Wiki/9.1.png";
import i9 from "~/Assets/Wiki/9.png";

export default function Wiki() {
  return (
    <Container>
      <h1>Wie werden die Computer Extra Signaturen installiert?</h1>
      <Card className="mb-3 mt-5">
        <Row className="g-0">
          <Col md={4}>
            <Image className="img-fluid rounded" src={i1} alt="" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Schritt 1</Card.Title>
              <Card.Body>Outlook öffnen</Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Card className="mb-3 mt-5">
        <Row className="g-0">
          <Col md={4}>
            <Image className="img-fluid rounded" src={i2} alt="" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Schritt 2</Card.Title>
              <Card.Body>
                Auf <kbd>Datei</kbd> drücken
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Card className="mb-3 mt-5">
        <Row className="g-0">
          <Col md={4}>
            <Image className="img-fluid rounded" src={i3} alt="" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Schritt 3</Card.Title>
              <Card.Body>
                Auf <kbd>Optionen</kbd> drücken, ein neues Fenster öffnet sich
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Card className="mb-3 mt-5">
        <Row className="g-0">
          <Col md={4}>
            <Image className="img-fluid rounded" src={i4} alt="" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Schritt 4</Card.Title>
              <Card.Body>
                Auf der linken Seite den Reiter <kbd>E-Mail</kbd> drücken
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Card className="mb-3 mt-5">
        <Row className="g-0">
          <Col md={4}>
            <Image className="img-fluid rounded" src={i5} alt="" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Schritt 5</Card.Title>
              <Card.Body>
                In dem sich öffnenden Reiter auf <kbd>Signaturen...</kbd>{" "}
                drücken, ein neues Fenster öffnet sich
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Row className="mb-3 mt-5">
        <Col md={6}>
          <h3 className="text-center">Altes Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i6} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 6</Card.Title>
                  <Card.Body>
                    Unter &quot;Standardsignatur auswählen&quot; sein eigenes
                    E-Mail-Konto auswählen, für diese Hilfestellung nutzen wir
                    das E-Mail-Konto:
                    &quot;Johannes.Kirchner@computer-extra.de&quot;, dies dient
                    ausschließlich Demonstrationszwecken, in dem eigenen Outlook
                    kann an dieser Stelle ein anderes E-Mail-Konto angezeigt
                    werden.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <h3 className="text-center">Neues Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i6_1} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 6</Card.Title>
                  <Card.Body>
                    Unter &quot;E-Mail-Konto&quot; sein eigenes E-Mail-Konto
                    auswählen, für diese Hilfestellung nutzen wir das
                    E-Mail-Konto:
                    &quot;Johannes.Kirchner@computer-extra.de&quot;, dies dient
                    ausschließlich Demonstrationszwecken, in dem eigenen Outlook
                    kann an dieser Stelle ein anderes E-Mail-Konto angezeigt
                    werden.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3 mt-5">
        <Col md={6}>
          <h3 className="text-center">Altes Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i7} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 7</Card.Title>
                  <Card.Body>
                    Unter &quot;Standardsignatur auswählen&quot; wählen wir nun
                    das Dropdown Menü mit der linksseitigen Beschriftung
                    &quot;Neue Nachrichten:&quot; aus und wählen dort den Namen
                    eines Mitarbeiters aus, dessen Namen wir in unseren E-Mails
                    stehen haben möchten. Für diese Hilfestellung nutzen wir den
                    Namen &quot;Johannes Kirchner&quot;, dies dient
                    ausschließlich Demonstrationszwecken, in den eigenen Outlook
                    kann an dieser Stelle ein anderer Name angezeigt werden.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <h3 className="text-center">Neues Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i7_1} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 7</Card.Title>
                  <Card.Body>
                    Unter &quot;Standardsignatur auswählen&quot; wählen wir nun
                    das Dropdown Menü mit der linksseitigen Beschriftung
                    &quot;Neue Nachrichten:&quot; aus und wählen dort den Namen
                    eines Mitarbeiters aus, dessen Namen wir in unseren E-Mails
                    stehen haben möchten. Für diese Hilfestellung nutzen wir den
                    Namen &quot;Johannes Kirchner&quot;, dies dient
                    ausschließlich Demonstrationszwecken, in den eigenen Outlook
                    kann an dieser Stelle ein anderer Name angezeigt werden.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3 mt-5">
        <Col md={6}>
          <h3 className="text-center">Altes Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i8} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 8</Card.Title>
                  <Card.Body>
                    Unter &quot;Standardsignatur auswählen&quot; wählen wir nun
                    das Dropdown Menü mit der linksseitigen Beschriftung
                    &quot;Antworten/Weiterleitungen:&quot; aus und wählen dort
                    den Namen eines Mitarbeiters aus, dessen Namen wir in
                    unseren E-Mails stehen haben möchten. Für diese
                    Hilfestellung nutzen wir den Namen &quot;Johannes
                    Kirchner&quot;, dies dient ausschließlich
                    Demonstrationszwecken, in den eigenen Outlook kann an dieser
                    Stelle ein anderer Name angezeigt werden.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <h3 className="text-center">Neues Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i8_1} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 8</Card.Title>
                  <Card.Body>
                    Unter &quot;Standardsignatur auswählen&quot; wählen wir nun
                    das Dropdown Menü mit der linksseitigen Beschriftung
                    &quot;Antworten/Weiterleitungen:&quot; aus und wählen dort
                    den Namen eines Mitarbeiters aus, dessen Namen wir in
                    unseren E-Mails stehen haben möchten. Für diese
                    Hilfestellung nutzen wir den Namen &quot;Johannes
                    Kirchner&quot;, dies dient ausschließlich
                    Demonstrationszwecken, in den eigenen Outlook kann an dieser
                    Stelle ein anderer Name angezeigt werden.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3 mt-5">
        <Col md={6}>
          <h3 className="text-center">Altes Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i9} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 9</Card.Title>
                  <Card.Body>
                    Es wird nun mit dem Button <kbd>OK</kbd> am unteren Rand des
                    Fensters Bestätigt.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <h3 className="text-center">Neues Outlook</h3>
          <Card>
            <Row className="g-0">
              <Col md={6}>
                <Image className="img-fluid rounded" src={i9_1} alt="" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>Schritt 9</Card.Title>
                  <Card.Body>
                    Es wird nun mit dem Button <kbd>OK</kbd> am unteren Rand des
                    Fensters Bestätigt.
                  </Card.Body>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card className="mb-3 mt-5">
        <Row className="g-0">
          <Col md={4}>
            <Image className="img-fluid rounded" src={i10} alt="" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Schritt 10</Card.Title>
              <Card.Body>
                Es wird nun mit dem Button <kbd>OK</kbd> am unteren Rand des
                Fensters Bestätigt.
              </Card.Body>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Card className="mb-3 mt-5">
        <Image className="img-fluid rounded" src={i11} alt="" />
      </Card>
    </Container>
  );
}
