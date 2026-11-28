import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function focusTarget(el) {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

function findHashTarget(hash) {
  if (!hash) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

// In a single-page app the browser does not announce a new page, reset focus or scroll.
// After every route change: move focus to the #hash target (e.g. a room on the campus map)
// or to the page's <h1>, so screen readers read where you are and Tab continues from there.
// The <title> is set by each page (<PageTitle>). In-page #links are left to the browser.
function useRouteFocus() {
  const { pathname, hash } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    // Same path again = StrictMode re-running the effect in dev, not a navigation.
    if (lastPath.current === pathname) return;
    const initialLoad = lastPath.current === null;
    lastPath.current = pathname;

    const target = findHashTarget(hash);
    if (initialLoad) {
      // Initial load: keep focus where the browser put it (so the first Tab reaches the
      // skip link), only scroll to a #hash (the element did not exist when the browser tried).
      target?.scrollIntoView();
      return;
    }
    const el = target ?? document.querySelector('main h1');
    if (el) {
      focusTarget(el);
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on page change, not on #hash-only changes
  }, [pathname]);
}

export default function Layout() {
  useRouteFocus();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Przejdź do treści głównej
      </a>
      <Header />
      <main id="main-content" className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
