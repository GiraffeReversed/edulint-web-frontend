import React from "react";
import Split from "react-split";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

import ProblemsBlock, { toggleProblemSolved } from "./ProblemsBlock";

import CtrlShortcut from "../utils/CtrlShortcut";

import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Buttons, FeedbackInfo, downloadFile, loadFile } from './AnalysisBlockElems';
import CodeMirrorWrapper, { onCodeSelect } from './CodeBlock';

function fetchData(url, toastContents, errorReturn, processResult) {
  fetch(url)
    .then(response => {
      if (response.status !== 200) {
        toast.error(toastContents);
        return errorReturn;
      }
      return response.json();
    }).then(processResult);
}

function fetchExplanations(setExplanations) {
  fetchData(
    "https://edulint.com/api/explanations",
    <>Failed to fetch explanations. Please retry later.</>,
    {},
    (data) => {
      let res = Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, {
          why: DOMPurify.sanitize(v.why),
          examples: DOMPurify.sanitize(v.examples),
        }])
      );
      setExplanations(res);
    });
}

function fetchVersions(setVersions, setVersion) {
  fetchData(
    "https://edulint.com/api/versions",
    <>Failed to fetch available versions. Please retry later.</>,
    [],
    (versions) => {
      versions = versions.map(({ version }) => version.join("."));
      setVersions(versions);
      setVersion(versions[0]);
    }
  );
}

function analyze(code, version, setProblems, setSolvedProblems, setStatus) {
  // plausible('check-button');

  fetch(`https://edulint.com/api/${version}/analyze`, {
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
      setSolvedProblems(new Array(problems.length).fill(false));
      setStatus("results");
    })
    .catch(error => {
      if (error?.name === "errorNot200") {
        setStatus("error");
      } else {
        throw error;
      }
    });
}

export function AnalysisBlock() {
  let { state } = useLocation();
  let navigate = useNavigate();

  let [problems, setProblems] = React.useState([]);
  let [solvedProblems, setSolvedProblems] = React.useState([]);
  let [status, setStatus] = React.useState("init"); // init, linting, results or error
  let [explanations, setExplanations] = React.useState({});
  let [versions, setVersions] = React.useState([]);

  let [code, setCode] = React.useState(state?.code?.slice() || "");
  let [version, setVersion] = React.useState(null);

  let [activeProblemsRange, setActiveProblemsRange] = React.useState({ min: undefined, max: undefined });

  React.useEffect(() => {
    if (state) {
      state.code = undefined;
    }

    fetchExplanations(setExplanations);
    fetchVersions(setVersions, setVersion);
  }, []);

  return (
    <Split className="d-flex flex-row flex-fill" id="analysis-block"
      minSize={250} snapOffset={0} sizes={[60, 40]}
    >
      <div id="code-block" className="d-flex flex-column ms-3 me-2 mt-1 mb-2">
        <div className="d-flex flex-row justify-content-between">
          <h5>Code</h5>
          <small hidden={problems.length == 0}>
            <CtrlShortcut letter="D" /> to mark current line as solved
          </small>
        </div>

        <CodeMirrorWrapper value={code} onChange={setCode} problems={problems}
          onProblemArrowClick={setActiveProblemsRange}
          onCodeSelect={update => onCodeSelect(update, setActiveProblemsRange)}
        />

        <Buttons status={status} versions={versions} version={version}
          onLoad={(e) => loadFile(e, setCode, setProblems, setStatus, navigate)}
          onDownload={() => downloadFile(code)}
          onVersionChange={setVersion}
          onCheck={() => { analyze(code, version, setProblems, setSolvedProblems, setStatus); setStatus("linting"); }} />

        <FeedbackInfo />
      </div>
      <ProblemsBlock status={status} problems={problems} explanations={explanations} solvedProblems={solvedProblems}
        activeProblemsRange={activeProblemsRange} onProblemSolvedClick={i => toggleProblemSolved(i, solvedProblems, setSolvedProblems)}
      />
    </Split>
  )
}


export function AnalysisBlockCodeRedirector() {
  let loaded = useLoaderData();
  return (<Navigate to="/editor" state={{ code: loaded }} />);
}