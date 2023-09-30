import { Button, InputGroup, ToggleButton, Collapse, Form } from "react-bootstrap";
import React from "react";
import { HandThumbsUp, HandThumbsDown, ChatLeftDots } from "react-bootstrap-icons";

function sendFeedback(defectCode, opinion, comment, sourceCodeHash, line) {
  fetch(`http://172.20.51.33:5000/api/explanations/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      defect_code: defectCode,
      good: opinion === null ? null : opinion === "good",
      comment: comment,
      source_code_hash: sourceCodeHash,
      line: line,
    })
  });
}

function handleOpinionClick(opinion, value, setOpinion, defectCode, sourceCodeHash, line) {
  if (opinion == value)
    setOpinion(null);
  else {
    setOpinion(value);
    sendFeedback(defectCode, value, null, sourceCodeHash, line);
  }
}

function handleCommentSubmitClick(comment, defectCode, sourceCodeHash, line) {
  sendFeedback(defectCode, null, comment, sourceCodeHash, line);
}


export function ExplanationFeedback({ defectCode, sourceCodeHash, line }) {
  let [opinion, setOpinion] = React.useState(null);
  let [commentBlockOpen, setCommentBlockOpen] = React.useState(false);
  let [comment, setComment] = React.useState("");

  return (
    <>
      <InputGroup size="sm" className="mt-1 mb-2">
        <InputGroup.Text id="inputGroup-sizing-sm" className="flex-fill">Was this helpful?</InputGroup.Text>
        {
          [
            { value: "good", variant: "success", label: <HandThumbsUp /> },
            { value: "bad", variant: "danger", label: <HandThumbsDown /> }
          ].map((opinion_data, idx) => (
            <ToggleButton
              className="d-flex align-items-center justify-content-center feedback flex-fill"
              key={idx}
              type="radio"
              variant={"outline-" + opinion_data.variant}
              value={opinion_data.value}
              checked={opinion == opinion_data.value}
              onClick={() => handleOpinionClick(opinion, opinion_data.value, setOpinion, defectCode, sourceCodeHash, line)}
            >{opinion_data.label}</ToggleButton>
          ))
        }

        <Button
          variant="secondary-outline"
          className="feedback flex-fill"
          onClick={() => setCommentBlockOpen(!commentBlockOpen)}
          aria-controls="comment-block"
          aria-expanded={commentBlockOpen}
        ><ChatLeftDots /></Button>
      </InputGroup >
      <Collapse in={commentBlockOpen}>
        <div id="comment-block">
          <InputGroup size="sm" className="mb-2">
            <Form.Control
              className="flex-fill"
              aria-label="Comment"
              placeholder="e.g. the examples do not help me fix the defect"
              as="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={() => handleCommentSubmitClick(comment, defectCode, sourceCodeHash, line)}
            >Submit</Button>
          </InputGroup>
        </div>
      </Collapse>
    </>
  );
}