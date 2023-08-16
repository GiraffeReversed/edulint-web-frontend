import { Alert } from "react-bootstrap";
import Problem from "./Problem";
import { FeedbackLink } from "./AnalysisBlockElems";
import ConfigErrors from "./ConfigErrors";
import { Accordion } from "react-bootstrap";


function errorCodeToMessage(errorCode) {
  switch (errorCode) {
    case 408:
      return <>Request timed out, try again later.</>;
    case 500:
      return <>An internal server error occurred. <FeedbackLink variant="danger">Report it</FeedbackLink> and try again later.</>;
    default:
      return <>An unknown error occurred. <FeedbackLink variant="danger">Report it</FeedbackLink> and try again later.</>;
  }
}

export default function ProblemsBlock({ status, problems, configErrors, errorCode, explanations, activeProblemsRange, onProblemGotoClick }) {
  let content;
  switch (status) {
    case "init":
    case "linting":
      {
        content = <Alert variant="secondary">Code was not linted yet.</Alert>;
        break;
      }
    case "results":
      {
        content = <>
          {configErrors.length > 0 && <ConfigErrors configErrors={configErrors} />}
          {problems.length > 0 &&
            <>
              <p style={{ fontSize: "small" }}><em>
                Addressing these suggestions can fix some bugs and makes your code more readable.
              </em></p>
              <Accordion flush>
                {problems.map((problem, i) => <Problem
                  key={problem.path + problem.line + problem.code}
                  {...problem}
                  explanation={explanations[problem.code]}
                  active={activeProblemsRange.min <= i && i <= activeProblemsRange.max}
                  onProblemGotoClick={() => onProblemGotoClick(i)}
                />)}
              </Accordion >
            </>
          }
          {configErrors.length == 0 && problems.length == 0 && <Alert variant="success">No problems found in the code :)</Alert>}
        </>;
        break;
      }
    case "error":
      {
        content = <Alert variant="danger">{errorCodeToMessage(errorCode)}</Alert>;
        break;
      }
    default:
      {
        throw new Error("Unexpected status " + status);
      }
  }
  return (
    <div id="problems-block" className="d-flex flex-column m-3 ms-0 mt-1">
      <div className="pe-1 ps-2">
        <h5 className="">What to improve</h5>
        <div id="problems">
          {content}
        </div>
      </div>
    </div>
  );
}
