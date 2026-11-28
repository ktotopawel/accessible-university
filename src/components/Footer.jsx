import { Link } from 'react-router';
import { DEAN_OFFICE, DISABILITY_OFFICE, UNIVERSITY } from '../data/university.js';

// "Potrzebujesz pomocy?" – same place on every page (3.2.6).
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <h2>Potrzebujesz pomocy?</h2>
        <ul>
          <li>
            Dziekanat {DEAN_OFFICE.facultyGenitive}: {DEAN_OFFICE.short}{' '}
            <Link to="/studies#dean-office">Wszystkie godziny dziekanatu</Link>
          </li>
          <li>
            {DISABILITY_OFFICE.name}:{' '}
            <a href={DISABILITY_OFFICE.phone.href}>{DISABILITY_OFFICE.phone.label}</a>{' '}
            <a href={`mailto:${DISABILITY_OFFICE.email}`}>{DISABILITY_OFFICE.email}</a>
          </li>
          <li>
            Centrala, {UNIVERSITY.address}:{' '}
            <a href={`mailto:${UNIVERSITY.email}`}>{UNIVERSITY.email}</a>
          </li>
        </ul>
        <p className="action">
          <Link to="/accessibility/statement">Deklaracja dostępności</Link>
        </p>
      </div>
    </footer>
  );
}
