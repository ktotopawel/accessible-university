import { Link, useLocation } from 'react-router';
import A11yToolbar from './A11yToolbar.jsx';
import { MAIN_NAV, mainNavCurrent } from '../data/navigation.js';
import { UNIVERSITY } from '../data/university.js';

// Not sticky on purpose: a sticky header would cover the focused element (2.4.11).
export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <A11yToolbar />
      <div className="container">
        <Link className="logo" to="/">
          <span className="logo__mark" aria-hidden="true">
            {UNIVERSITY.initials}
          </span>
          {UNIVERSITY.name}
          <span className="sr-only"> – strona główna</span>
        </Link>
      </div>
      <nav className="main-nav" aria-label="Główne menu">
        <ul className="container" role="list">
          {MAIN_NAV.map((item) => (
            <li key={item.to}>
              <Link to={item.to} aria-current={mainNavCurrent(item, pathname)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
