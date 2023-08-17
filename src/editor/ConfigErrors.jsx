import { ListGroup, Card } from "react-bootstrap";

function levelToVariant(level) {
  switch (level.toLowerCase()) {
    case "critical":
    case "error":
      return "danger"
    case "warning":
      return "warning"
    case "info":
      return "info"
    default:
      return "secondary"
  }
}

function ConfigError({ message, level }) {
  return (
    <ListGroup.Item variant={levelToVariant(level)}><small>{message}</small></ListGroup.Item>
  );
}

export default function ConfigErrors({ configErrors }) {
  return (
    <>
      <Card className="my-2">
        <ListGroup>
          <ListGroup.Item>EduLint configuration errors</ListGroup.Item>
          {configErrors.map((error, i) => <ConfigError message={error.message} level={error.level} key={i} />)}
          <ListGroup.Item><small>Did you misspell or change some option?</small></ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}
