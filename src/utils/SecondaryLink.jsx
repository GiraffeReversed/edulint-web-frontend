export function SecondaryLink({ href, children }) {
    return (
        <a target="_blank" rel="noreferrer" href={href} className="link-secondary">{children}</a>
    );
}
