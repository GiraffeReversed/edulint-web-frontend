import { Accordion, ButtonGroup, Card, Button } from "react-bootstrap"
import React from "react";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AccordionContext } from "react-bootstrap";
import { Bullseye, ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { ModeContext } from "../utils/Mode";


function CollapseToggle({ eventKey, callback, hasExplanation }) {
  const { activeEventKey } = React.useContext(AccordionContext);
  let [mode,] = React.useContext(ModeContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      className={"explCollapseButton" + (hasExplanation ? "" : " noExpl")}
      variant={hasExplanation ? "outline-secondary" : mode === "light" ? "outline-light" : "outline-dark"}
      onClick={decoratedOnClick}
    >
      {isCurrentEventKey ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
}

export default function Problem({ path, line, column, source, code, text, explanation, active, onProblemGotoClick }) {
  let why = explanation?.why;
  let examples = explanation?.examples;

  return (
    <Card className={(active ? "active " : "") + "problem my-2"}>
      <Card.Header className="p-0 border-bottom-0">
        <ButtonGroup className="d-flex">
          <Button variant="outline-warning" onClick={onProblemGotoClick}><Bullseye /></Button>
          <div className="p-1 small w-100">
            {line}: {text}
          </div>
          <CollapseToggle eventKey={path + line + code} hasExplanation={explanation !== undefined} />
        </ButtonGroup>
      </Card.Header>
      <Accordion.Collapse eventKey={path + line + code}>
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
          <p className="text-muted tiny-text mb-0">
            <span className="fw-bold">Debug</span> {/*v${getSelectedVersion()}*/} {source} {line} {code}
            <span className="text-break"> {path.replace(/\.py$/, "").replace(/^[a-z]*\//, "")}</span>
          </p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
