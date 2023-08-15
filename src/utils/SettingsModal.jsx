import { Card, Form, Modal } from "react-bootstrap";

export function SettingsModal({ show, onHide, settings, onSettingSet }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>Clicking on problem text should:</Card.Title>
            <Form>
              <Form.Switch id="gotoLine" label="Go to code line" checked={settings["gotoLine"]} onChange={onSettingSet("gotoLine")} />
              <Form.Switch id="toggleExpls" label="Show problem details" checked={settings["toggleExpls"]} onChange={onSettingSet("toggleExpls")} />
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>

      {/* <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer> */}
    </Modal>
  );
}