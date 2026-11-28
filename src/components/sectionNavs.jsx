import { SubNav } from './ui.jsx';
import { COURSE_CATEGORIES } from '../data/courses.js';
import { PROGRAMMES } from '../data/university.js';

/** Category bar shown on every video-course page, always in the same order (3.2.3). */
export function CourseCategoryNav({ currentTo }) {
  const items = [
    { to: '/courses', label: 'Wszystkie kursy' },
    ...COURSE_CATEGORIES.map((c) => ({ to: `/courses/${c.slug}`, label: c.name })),
  ];
  return <SubNav label="Kategorie kursów" items={items} currentTo={currentTo} />;
}

/** Programme bar shown on every timetable page. */
export function ProgrammeNav({ currentTo }) {
  const items = [
    { to: '/schedule', label: 'Wszystkie plany' },
    ...PROGRAMMES.map((p) => ({ to: `/schedule/${p.slug}`, label: p.name })),
  ];
  return <SubNav label="Kierunki" items={items} currentTo={currentTo} />;
}
