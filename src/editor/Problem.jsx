import { Accordion, ButtonGroup, Card, Button } from "react-bootstrap";
import React from "react";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AccordionContext } from "react-bootstrap";
import { Bullseye, ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { ModeContext } from "../utils/Mode";
import { ProblemClickSettingsContext } from "../utils/ProblemClickSettings";
import { ExplanationFeedback } from "./ExplanationsFeedback";


function CollapseToggle({ eventKey, hasExplanation, onClick }) {
  const { activeEventKey } = React.useContext(AccordionContext);
  let [mode,] = React.useContext(ModeContext);

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      className={"explCollapseButton" + (hasExplanation ? "" : " noExpl")}
      variant={hasExplanation ? "outline-secondary" : mode === "light" ? "outline-light" : "outline-dark"}
      onClick={onClick}
    >
      {isCurrentEventKey ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
}

export default function Problem({ path, line, enabled_by, source, code, text, explanation, active, onProblemGotoClick }) {
  let eventKey = path + line + code;

  let settings = React.useContext(ProblemClickSettingsContext);
  let accordionOnClick = useAccordionButton(eventKey);
  let onTextClick = () => {
    if (settings["gotoLine"])
      onProblemGotoClick();
    if (settings["toggleExpls"]) {
      accordionOnClick();
    }
  }

  let why = explanation?.why;
  let examples = explanation?.examples;

  let sourceCodeHash = path.replace(/\.py$/, "").replace(/^[a-z]*\//, "");

  return (
    <Card className={(active ? "active " : "") + "problem my-2"}>
      <Card.Header className="p-0 border-bottom-0">
        <ButtonGroup className="d-flex">
          <Button variant="outline-warning" onClick={onProblemGotoClick}><Bullseye /></Button>
          <div className={"p-1 small w-100" + (Object.values(settings).some(v => v) ? " clickable" : "")} onClick={onTextClick}>
            {line}: {text}
          </div>
          <CollapseToggle eventKey={eventKey} hasExplanation={explanation !== undefined} onClick={accordionOnClick} />
        </ButtonGroup>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body className="small border-top">
          {why && <>
            <h6>Why is it a problem?</h6>
            <div dangerouslySetInnerHTML={{ __html: why }} />
            <hr className="my-2" />
          </>}
          {examples && <>
            <h6>How to solve it?</h6>
            <div dangerouslySetInnerHTML={{ __html: examples }} />
            <hr className="my-2" /></>}
          {(why || examples) && <ExplanationFeedback defectCode={code} sourceCodeHash={sourceCodeHash} line={line} />}
          <p className="text-muted tiny-text mb-0">
            <span className="fw-bold">Debug</span> {source} {line} {code}
            <span className="text-break"> {sourceCodeHash}</span>
          </p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
