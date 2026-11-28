import { Link } from 'react-router';
import { UNIVERSITY } from '../data/university.js';

/** Sets the document title, "Strona – Akademia Jasnogrodzka" (2.4.2). React 19 hoists <title> to <head>. */
export function PageTitle({ children }) {
  return <title>{`${children} – ${UNIVERSITY.name}`}</title>;
}

/**
 * Breadcrumb. `items` are the ancestors ({ to, label }); `current` is this page and carries
 * the page's only aria-current="page".
 */
export function Breadcrumb({ items, current }) {
  return (
    <nav aria-label="Ścieżka nawigacji">
      <ol className="breadcrumb" role="list">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

/**
 * Section bar (course categories, programmes). Plain links, not ARIA tabs.
 * The item whose `to` equals `currentTo` gets aria-current="true" ("you are in this section").
 */
export function SubNav({ label, items, currentTo }) {
  return (
    <nav className="subnav" aria-label={label}>
      <ul role="list">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} aria-current={item.to === currentTo ? 'true' : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Grid of clickable tiles ("stretched link": the whole tile is the link's hit area). */
export function Tiles({ children }) {
  return (
    <ul className="tiles" role="list">
      {children}
    </ul>
  );
}

export function Tile({ to, title, children }) {
  return (
    <li className="tile">
      <h3>
        <Link to={to}>{title}</Link>
      </h3>
      {children}
    </li>
  );
}

/** Unfinished content: a pink box that describes what goes here. Don't invent fake content. */
export function Placeholder({ children, className = '' }) {
  return <div className={`placeholder ${className}`.trim()}>{children}</div>;
}

/** tel: / mailto: links as definition-list values, with 44 px targets (.action). */
export function PhoneLink({ phone }) {
  return <a href={phone.href}>{phone.label}</a>;
}

export function EmailLink({ email }) {
  return <a href={`mailto:${email}`}>{email}</a>;
}
