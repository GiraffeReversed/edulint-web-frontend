import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';
import Split from "react-split";

import { InputGroup, Form, Button } from "react-bootstrap";

import CtrlShortcut from "../utils/CtrlShortcut";
import { SecondaryLink as A } from "../utils/SecondaryLink";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubLight } from "@uiw/codemirror-theme-github";
import { ModeContext } from "../utils/Mode";

let EDITOR_LIGHT_THEME = githubLight;
let EDITOR_DARK_THEME = okaidia;

function CodeBlock() {
  let [mode, _] = React.useContext(ModeContext);
  return (
    <div id="code-block" className="d-flex flex-column ms-3 me-2 mt-1 mb-2">
      <div className="d-flex flex-row justify-content-between">
        <h5>Code</h5>
        <small id="keybind" hidden><CtrlShortcut letter="D" /> to mark current line as solved</small>
      </div>

      <CodeMirror
        className="d-flex flex-fill"
        value="print('hello world!');
          print('goodbye world!')"
        theme={mode === "light" ? EDITOR_LIGHT_THEME : EDITOR_DARK_THEME}
        extensions={[python()]}
      />

      <InputGroup className="pt-3 pb-1">
        <Form.Control type="file" accept=".py" />
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

class ProblemsBlock extends React.Component {
  render() {
    return (
      <div id="problems-block" className="d-flex flex-column m-3 ms-0 mt-1">
        <h5 className="ms-2">Problems</h5>
        <div className="pt-1 pe-1 ps-2">
          <div className="alert alert-success" role="alert" id="alertNoProblems" style={{ "display": "none" }}>
            I have found no problems with this code :)
          </div>
          <div className="alert alert-danger" role="alert" id="alertNot200" style={{ "display": "none" }}>
            Server responded with the status code <span></span>.
          </div>
          <div id="problems">
          </div>
        </div>
      </div>
    );
  }
}

export default class AnalysisBlock extends React.Component {
  render() {
    return (
      <Split className="d-flex flex-row flex-fill" id="analysis-block"
        minSize={250} snapOffset={0} sizes={[60, 40]}
      >
        <CodeBlock />
        <ProblemsBlock />
      </Split>
    )
  }
}
