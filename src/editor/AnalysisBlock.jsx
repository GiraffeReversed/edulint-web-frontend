import React from "react";
import Split from "react-split";

import ProblemsBlock from "./ProblemsBlock";

import CtrlShortcut from "../utils/CtrlShortcut";

import { Navigate, useLoaderData, useLocation } from "react-router-dom";
import { Buttons, FeedbackInfo } from './AnalysisBlockElems';
import CodeMirrorWrapper from './CodeBlock';

function analyze(code, setProblems, setStatus) {
  // plausible('check-button');

  // let version = getSelectedVersion();
  let version = "2.0.0";

  fetch(`https://edulint.rechtackova.cz/api/${version}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: code
    })
  })
    .then(response => {
      if (response.status !== 200) {
        const error = new Error("not 200 status code");
        error.name = "errorNot200";
        error.status = response.status;
        throw error;
      }
      return response.json() // .json() for Objects vs text() for raw
    })
    .then(problems => {
      setProblems(problems);
      setStatus("results");
    })
    .catch(error => {
      if (error?.name === "errorNot200") {
        setStatus("error");
      } else {
        throw error;
      }
    });
  // document.getElementById("keybind").hidden = false;
}

export function AnalysisBlock() {
  let { state } = useLocation();
  let [problems, setProblems] = React.useState([]);
  let [status, setStatus] = React.useState("init"); // init, linting, or results

  let [code, setCode] = React.useState(state?.code?.slice() || "");

  React.useEffect(() => {
    if (state) {
      state.code = undefined;
    }
  })

  return (
    <Split className="d-flex flex-row flex-fill" id="analysis-block"
      minSize={250} snapOffset={0} sizes={[60, 40]}
    >
      <div id="code-block" className="d-flex flex-column ms-3 me-2 mt-1 mb-2">
        <div className="d-flex flex-row justify-content-between">
          <h5>Code</h5>
          <small id="keybind" hidden><CtrlShortcut letter="D" /> to mark current line as solved</small>
        </div>

        <CodeMirrorWrapper value={code} onChange={(value, viewUpdate) => { setCode(value); }} />

        <Buttons status={status} setStatus={setStatus} code={code} setCode={setCode}
          onCheck={() => { analyze(code, setProblems, setStatus); setStatus("linting"); }} />

        <FeedbackInfo />
      </div>
      <ProblemsBlock status={status} problems={problems} />
    </Split>
  )
}


export function AnalysisBlockCodeRedirector() {
  let loaded = useLoaderData();
  return (<Navigate to="/editor" state={{ code: loaded }} />);
}