import Card from 'react-bootstrap/Card';

export function DescCard({ children }) {
  let classyBody = children.slice(1).map((ch, i) => <Card.Text key={i}>{ch.props.children}</Card.Text>);

  return (
    <div className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{children[0].props.children}</Card.Title>
          {classyBody}
        </Card.Body>
      </Card>
    </div>
  );
}
