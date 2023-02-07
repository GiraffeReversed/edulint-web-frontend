import { Alert } from "react-bootstrap";
import Problem from "./Problem";
import { Accordion } from "react-bootstrap";


export default function ProblemsBlock({ status, problems }) {
  let content;
  switch (status) {
    case "init":
    case "linting":
      {
        content = <Alert variant="info">Code was not linted yet.</Alert>;
        break;
      }
    case "results":
      {
        if (problems.length > 0)
          content = <Accordion flush>
            {problems.map(problem => <Problem {...problem} key={problem.path + problem.line + problem.code} />)}
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
      <h5 className="ms-2">Problems</h5>
      <div className="pt-1 pe-1 ps-2">
        <div id="problems">
          {content}
        </div>
      </div>
    </div>
  );
}
