import { Link, Navigate, useLocation } from 'react-router';
import { PageTitle } from '../components/ui.jsx';
import { legacyRedirect } from '../data/navigation.js';

export default function NotFound() {
  const { pathname, hash } = useLocation();
  const redirect = legacyRedirect(pathname);
  if (redirect) return <Navigate to={redirect + hash} replace />;

  return (
    <>
      <PageTitle>Nie ma takiej strony</PageTitle>
      <h1>Nie ma takiej strony</h1>
      <p className="lead">Adres jest błędny albo strona została przeniesiona.</p>
      <p className="action">
        <Link to="/">Przejdź do strony głównej</Link>
      </p>
    </>
  );
}
