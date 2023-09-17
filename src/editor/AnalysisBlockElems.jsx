import { InputGroup, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SecondaryLink } from "../utils/SecondaryLink";
import fileDownload from "js-file-download";

export function loadFile(e, setCode, setProblems, setConfigErrors, setStatus, setActiveProblemsRange, navigate) {
  let file = e.target.files[0];
  if (!file || !file.name.endsWith(".py")) {
    toast.warning(<>Select a <code>.py</code> file.</>)
    return;
  }

  let reader = new FileReader();
  reader.onload = () => { setCode(reader.result); setProblems([]); setConfigErrors([]); };
  reader.readAsText(file);

  setStatus("init");
  setActiveProblemsRange({ min: undefined, max: undefined });

  navigate("/editor");
}

export function downloadFile(code) {
  if (!code) {
    toast.info(<>Unnecessary download of empty file.</>);
    return;
  }

  fileDownload(code, "edulint_out.py");

  toast.info(<>Is your browser warning you about a harmful file? The file is fine, but <Link
    to="/faq#download-warning">here is what's happening.</Link></>);
}

export function Buttons({ status, onLoad, onDownload, onCheck }) {
  let isLinting = status === "linting";

  return (
    <InputGroup className="pt-3 pb-1">
      <Form.Control type="file" accept=".py" onChange={onLoad} />
      <Button variant="secondary" onClick={onDownload}>Download</Button>
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
  return (
    <p className="text-muted small mb-0 text-center">
      Problems? Thoughts? Improvement suggestions? <FeedbackLink variant="secondary">Let me know.</FeedbackLink>
    </p>
  );
}

export function FeedbackLink({ variant, children }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href="https://docs.google.com/forms/d/e/1FAIpQLSfiQDmLX_KdOdoGJKC8qhNfYNG6O7sNiNk-x7as7H02DI7XhQ/viewform"
      className={"link-" + variant}
    >
      {children}
    </a>
  );
}
