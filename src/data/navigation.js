// Main menu: the same 6 items on every page (3.2.3).
// `sections` are other path prefixes that belong to the item: on those pages the item
// gets aria-current="true" (you are in this section), on its own path "page".
export const MAIN_NAV = [
  { to: '/', label: 'Strona główna' },
  { to: '/studies', label: 'Studia', sections: ['/schedule'] },
  { to: '/accessibility', label: 'Dostępność' },
  { to: '/campus-map', label: 'Mapa kampusu' },
  { to: '/courses', label: 'Kursy wideo' },
  { to: '/staff', label: 'Strefa pracownika' },
];

const within = (pathname, prefix) => pathname === prefix || pathname.startsWith(prefix + '/');

/** aria-current value for a main-menu item, or undefined. */
export function mainNavCurrent(item, pathname) {
  if (pathname === item.to) return 'page';
  if (item.to === '/') return undefined;
  if (within(pathname, item.to) || item.sections?.some((s) => within(pathname, s))) return 'true';
  return undefined;
}

// Old static-site URLs (*.html) → new routes, so old links and bookmarks still work.
export function legacyRedirect(pathname) {
  const m = pathname.match(/^\/([\w-]+)\.html$/);
  if (!m) return null;
  const name = m[1];
  const simple = {
    index: '/',
    studies: '/studies',
    accessibility: '/accessibility',
    'campus-map': '/campus-map',
    courses: '/courses',
    staff: '/staff',
    schedule: '/schedule',
    'lesson-math-complex-numbers': '/courses/science/complex-numbers',
  };
  if (simple[name]) return simple[name];
  let x = name.match(/^courses-([\w]+)$/);
  if (x) return `/courses/${x[1]}`;
  x = name.match(/^schedule-([a-z]+)-sem(\d)$/);
  if (x) return `/schedule/${x[1]}/semestr-${x[2]}`;
  x = name.match(/^schedule-([a-z]+)$/);
  if (x) return `/schedule/${x[1]}`;
  return null;
}
