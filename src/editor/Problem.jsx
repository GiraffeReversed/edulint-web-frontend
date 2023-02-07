import { Accordion, ButtonGroup, Card, Button } from "react-bootstrap"
import React from "react";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AccordionContext } from "react-bootstrap";
import { Bullseye, Check2, ChevronDown, ChevronUp } from "react-bootstrap-icons";

function CollapseToggle({ eventKey, callback }) {
  const { activeEventKey } = React.useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button variant="outline-secondary" onClick={decoratedOnClick}>
      {isCurrentEventKey ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
}

export default function Problem({ path, line, column, code, text }) {
  return (
    <Card className="my-2">
      <Card.Header className="p-0">
        <ButtonGroup className="problem">
          <Button variant="outline-warning"><Bullseye /></Button>
          <div className="p-1 small">
            {line}: {text.replace("<", "&lt;").replace(">", "&gt;")}
          </div>
          <CollapseToggle eventKey={path + line + code} />
          <Button variant="outline-success"><Check2 /></Button>
        </ButtonGroup>
      </Card.Header>
      <Accordion.Collapse eventKey={path + line + code}>
        <Card.Body>I'm mister meeseeks, look at me!</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
