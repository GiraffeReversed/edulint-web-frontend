export default function ProblemsBlock() {
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
