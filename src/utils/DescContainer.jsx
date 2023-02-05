export default function DescContainer({ id, children }) {
  return (
    <div className="m-3 mt-0 card-container" id={id}>
      {children}
    </div>
  );
}