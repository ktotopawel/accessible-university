// Fictional university: every name, address, phone and e-mail here is made up.
// Change contact details here, not in the components.

export const UNIVERSITY = {
  name: 'Akademia Jasnogrodzka',
  initials: 'AJ',
  address: 'ul. Słoneczna 12, 12-345 Jasnogród',
  phone: { href: 'tel:+48120001000', label: '+48 12 000 10 00' },
  email: 'aj@jasnogrodzka.edu.pl',
};

export const DISABILITY_OFFICE = {
  name: 'Biuro ds. Osób z Niepełnosprawnościami',
  hours: 'Wtorek i czwartek 9:00–13:00',
  phone: { href: 'tel:+48120001020', label: '+48 12 000 10 20' },
  email: 'bon@jasnogrodzka.edu.pl',
};

// One programme per faculty, on purpose: fewer timetables and course pages to maintain.
// `slug` is used in URLs (/schedule/<slug>).
export const PROGRAMMES = [
  { slug: 'informatyka', name: 'Informatyka', faculty: 'Wydział Nauk Technicznych' },
  { slug: 'pielegniarstwo', name: 'Pielęgniarstwo', faculty: 'Wydział Nauk o Zdrowiu' },
  { slug: 'zarzadzanie', name: 'Zarządzanie', faculty: 'Wydział Nauk Społecznych i Humanistycznych' },
];

export const findProgramme = (slug) => PROGRAMMES.find((p) => p.slug === slug);

// Dean's office of the first faculty; shown in the table on Studia and in the footer.
export const DEAN_OFFICE = {
  faculty: 'Wydział Nauk Technicznych',
  facultyGenitive: 'Wydziału Nauk Technicznych',
  programme: 'Informatyka',
  short: 'wtorek i środa 9:00–14:00, piątek 10:00–15:00',
  hours: [
    ['Poniedziałek', 'nieczynne'],
    ['Wtorek', '9:00–14:00'],
    ['Środa', '9:00–14:00'],
    ['Czwartek', 'nieczynne'],
    ['Piątek', '10:00–15:00'],
    ['Sobota', '7:30–14:30 (w lipcu, sierpniu i wrześniu nieczynne)'],
    ['Wybrane niedziele', '7:30–12:30'],
  ],
  others:
    'Dziekanaty Wydziału Nauk o Zdrowiu (kierunek Pielęgniarstwo) i Wydziału Nauk Społecznych i Humanistycznych (kierunek Zarządzanie): poniedziałek–piątek 9:00–15:00.',
};
