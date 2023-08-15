import { Alert } from "react-bootstrap";
import Problem from "./Problem";
import { Accordion } from "react-bootstrap";

export default function ProblemsBlock({ status, problems, explanations, activeProblemsRange, onProblemGotoClick }) {
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
        if (problems.length > 0)
          content = <Accordion flush>
            {problems.map((problem, i) => <Problem
              key={problem.path + problem.line + problem.code}
              {...problem}
              explanation={explanations[problem.code]}
              active={activeProblemsRange.min <= i && i <= activeProblemsRange.max}
              onProblemGotoClick={() => onProblemGotoClick(i)}
            />)}
          </Accordion >;
        else
          content = <Alert variant="success">No problems found in the code :)</Alert>;
        break;
      }
    case "error":
      {
        // TODO message displays error
        content = <Alert variant="danger">Some problem</Alert>;
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
        {status == "results" && problems.length > 0 && <p style={{ fontSize: "small" }}><em>
          Addressing these suggestions can fix some bugs and makes your code more readable.
        </em></p>}
        <div id="problems">
          {content}
        </div>
      </div>
    </div>
  );
}
