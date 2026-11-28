// Video-course categories, in the order of the category bar (same on every course page).
// Kept small on purpose (mock): one category per programme that needs video lessons,
// plus training for everybody. `description` is the tile text on the hub, `lead` the intro
// on the category page.
export const COURSE_CATEGORIES = [
  {
    slug: 'science',
    name: 'Przedmioty ścisłe',
    description: 'Matematyka dla kierunku Informatyka.',
    lead: 'Kursy z matematyki dla kierunku Informatyka.',
  },
  {
    slug: 'medical',
    name: 'Przedmioty medyczne',
    description: 'Podstawy pielęgniarstwa dla kierunku Pielęgniarstwo.',
    lead: 'Kursy z podstaw pielęgniarstwa dla kierunku Pielęgniarstwo.',
  },
  {
    slug: 'training',
    name: 'Szkolenia',
    description: 'BHP i dostępne materiały dydaktyczne – dla studentów i pracowników.',
    lead: 'Szkolenia dla studentów i pracowników wszystkich kierunków.',
  },
];

export const findCategory = (slug) => COURSE_CATEGORIES.find((c) => c.slug === slug);
