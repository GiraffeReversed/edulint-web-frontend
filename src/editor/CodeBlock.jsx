import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';

import { InputGroup, Form, Button } from "react-bootstrap";

import CtrlShortcut from "../utils/CtrlShortcut";
import { SecondaryLink as A } from "../utils/SecondaryLink";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ModeContext } from "../utils/Mode";
import { toast } from "react-toastify";

let EDITOR_LIGHT_THEME = githubLight;
let EDITOR_DARK_THEME = okaidia;

function loadFile(e, setCode, navigate) {
  let file = e.target.files[0];
  if (!file || !file.name.endsWith(".py")) {
    toast.warning(<>Select a <code>.py</code> file.</>)
    return;
  }

  let reader = new FileReader();
  reader.onload = () => setCode(reader.result);
  reader.readAsText(file);
  navigate("/editor");

  // TODO reset linted problems
}

export default function CodeBlock() {
  let [mode,] = React.useContext(ModeContext);
  let [code, setCode] = React.useState('');
  const navigate = useNavigate();

  let loaded = useLoaderData();
  if (loaded)
    code = loaded;

  return (
    <div id="code-block" className="d-flex flex-column ms-3 me-2 mt-1 mb-2">
      <div className="d-flex flex-row justify-content-between">
        <h5>Code</h5>
        <small id="keybind" hidden><CtrlShortcut letter="D" /> to mark current line as solved</small>
      </div>

      <CodeMirror
        className="d-flex flex-fill"
        value={code}
        placeholder="Enter your code here..."
        theme={mode === "light" ? EDITOR_LIGHT_THEME : EDITOR_DARK_THEME}
        extensions={[python()]}
      />

      <InputGroup className="pt-3 pb-1">
        <Form.Control type="file" accept=".py" onChange={(e) => loadFile(e, setCode, navigate)} />
        <Button variant="secondary">Download</Button>
        <Button>Check</Button>
      </InputGroup>

      <p className="text-muted small mb-0 text-center">Problems? Thoughts? Improvement suggestions? <A
        href="https://docs.google.com/forms/d/e/1FAIpQLSfiQDmLX_KdOdoGJKC8qhNfYNG6O7sNiNk-x7as7H02DI7XhQ/viewform">
        Let me know.</A>
      </p>
    </div>
  );
}
