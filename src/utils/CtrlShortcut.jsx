export default function CtrlShortcut({ letter }) {
  return (
    <kbd className="bg-secondary">
      <kbd className="bg-secondary">ctrl</kbd> + <kbd className="bg-secondary">{letter}</kbd>
    </kbd>
  );
}