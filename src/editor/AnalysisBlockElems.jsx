import { InputGroup, Button, Form, Spinner, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SecondaryLink as A } from "../utils/SecondaryLink";
import fileDownload from "js-file-download";

export function loadFile(e, setCode, setStatus, navigate) {
  let file = e.target.files[0];
  if (!file || !file.name.endsWith(".py")) {
    toast.warning(<>Select a <code>.py</code> file.</>)
    return;
  }

  let reader = new FileReader();
  reader.onload = () => setCode(reader.result);
  reader.readAsText(file);

  setStatus("init");

  navigate("/editor");
}

export function downloadFile(code) {
  if (!code) {
    toast.info(<>Unnecessary download of empty file.</>);
    return;
  }

  fileDownload(code, "edulint_out.py");

  toast(<>Is your browser warning you about a harmful file? The file is fine, but <Link
    to="/faq#download-warning">here is what's happening.</Link></>);
}

export function Buttons({ status, versions, version, onLoad, onDownload, onVersionChange, onCheck }) {
  let isLinting = status === "linting";

  versions = versions.map((version) =>
    <Dropdown.Item key={version} onClick={() => onVersionChange(version)}>v{version}</Dropdown.Item>
  );

  return (
    <InputGroup className="pt-3 pb-1">
      <Form.Control type="file" accept=".py" onChange={onLoad} />
      <Button variant="secondary" onClick={onDownload}>Download</Button>
      <DropdownButton variant="outline-primary" title={"v" + version}>
        {versions}
      </DropdownButton>
      <Button onClick={onCheck} disabled={isLinting}>{isLinting && <><Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="me-2"
      /></>}Check</Button>
    </InputGroup>);
}

export function FeedbackInfo() {
  return (<p className="text-muted small mb-0 text-center">Problems? Thoughts? Improvement suggestions? <A
    href="https://docs.google.com/forms/d/e/1FAIpQLSfiQDmLX_KdOdoGJKC8qhNfYNG6O7sNiNk-x7as7H02DI7XhQ/viewform">
    Let me know.</A>
  </p>);
}
