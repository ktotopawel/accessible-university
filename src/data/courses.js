// Video-course categories, in the order of the category bar (same on every course page).
// `description` is the tile text on the hub, `lead` the intro on the category page.
export const COURSE_CATEGORIES = [
  {
    slug: 'science',
    name: 'Przedmioty ścisłe',
    description: 'Matematyka, fizyka, chemia, informatyka.',
    lead: 'Kursy z matematyki, fizyki, chemii i informatyki.',
  },
  {
    slug: 'humanities',
    name: 'Przedmioty humanistyczne',
    description: 'Kursy z przedmiotów humanistycznych.',
    lead: 'Kursy z przedmiotów humanistycznych.',
  },
  {
    slug: 'medical',
    name: 'Przedmioty medyczne',
    description: 'Kursy z przedmiotów medycznych.',
    lead: 'Kursy z przedmiotów medycznych.',
  },
  {
    slug: 'training',
    name: 'Szkolenia',
    description: 'BHP, pierwsza pomoc, EduPortal i dostępne materiały dydaktyczne.',
    lead: 'Szkolenia dla studentów i pracowników.',
  },
];

export const findCategory = (slug) => COURSE_CATEGORIES.find((c) => c.slug === slug);
