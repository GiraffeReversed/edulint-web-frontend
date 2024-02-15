import React from "react";
import Split from "react-split";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

import ProblemsBlock from "./ProblemsBlock";

import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Buttons, downloadFile, loadFile } from './AnalysisBlockElems';
import CodeMirrorWrapper, { useCodeMirrorCustom, onCodeSelect, gotoLine } from './CodeBlock';

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
    "/api/explanations",
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
    "/api/versions",
    <>Failed to fetch available versions. Please retry later.</>,
    [],
    (versions) => {
      setVersion(versions[0]);
    }
  );
}

function analyze(code, setProblems, setConfigErrors, setErrorCode, setActiveProblemsRange, setStatus) {
  window.plausible('check-button');
  let version = "latest";

  setStatus("linting");
  setActiveProblemsRange({ min: undefined, max: undefined });
  setProblems([]);
  setConfigErrors([]);

  fetch(`/api/${version}/analyze`, {
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
    .then(result => {
      let problems = result.problems.map(problem => {
        if (problem.source === "flake8")
          problem.line = Math.max(problem.line, 1);
        return problem;
      });
      setProblems(problems);
      setConfigErrors(result.config_errors);
      setStatus("results");
    })
    .catch(error => {
      if (error?.name === "errorNot200") {
        setStatus("error");
        setErrorCode(error.status);
      } else {
        throw error;
      }
    });
}

export function AnalysisBlock() {
  let loc = useLocation();
  let navigate = useNavigate();

  let [problems, setProblems] = React.useState([]);
  let [configErrors, setConfigErrors] = React.useState([]);
  let [status, setStatus] = React.useState("init"); // init, linting, results or error
  let [errorCode, setErrorCode] = React.useState(200);
  let [explanations, setExplanations] = React.useState({});

  let [code, setCode] = React.useState(loc.state?.code?.slice() || window.localStorage.getItem("edulintCode") || "");

  let [activeProblemsRange, setActiveProblemsRange] = React.useState({ min: undefined, max: undefined });

  let { view, editor } = useCodeMirrorCustom({
    value: code,
    onChange: setCode,
    problems: problems,
    onProblemArrowClick: setActiveProblemsRange,
    onCodeSelect: update => onCodeSelect(update, setActiveProblemsRange)
  });

  React.useEffect(() => {
    if (loc.state) {
      loc.state.code = undefined;
    }

    fetchExplanations(setExplanations);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("edulintCode", code);
  }, [code]);

  return (
    <Split className="d-flex flex-row flex-fill" id="analysis-block"
      minSize={250} snapOffset={0} sizes={[60, 40]}
    >
      <div id="code-block" className="d-flex flex-column ms-3 me-2 mt-1 mb-0">
        <div className="d-flex flex-row justify-content-between">
          <h5>Code</h5>
        </div>

        <CodeMirrorWrapper view={view} editor={editor} problems={problems} />

        <Buttons status={status}
          onLoad={(e) => loadFile(e, setCode, setProblems, setConfigErrors, setStatus, setActiveProblemsRange, navigate)}
          onDownload={() => downloadFile(code)}
          onCheck={() => analyze(code, setProblems, setConfigErrors, setErrorCode, setActiveProblemsRange, setStatus)} />
      </div>
      <ProblemsBlock status={status} problems={problems} explanations={explanations}
        activeProblemsRange={activeProblemsRange} configErrors={configErrors}
        onProblemGotoClick={i => gotoLine(view, i)} errorCode={errorCode}
      />
    </Split>
  )
}


export function AnalysisBlockCodeRedirector() {
  let loaded = useLoaderData();
  return (<Navigate to="/editor" state={{ code: loaded }} />);
}