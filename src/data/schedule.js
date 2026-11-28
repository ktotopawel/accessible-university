// Timetable data. Every programme and semester shows the same sample week for now.

export const SEMESTERS = [1, 3];
export const semesterSlug = (n) => `semestr-${n}`;
export const parseSemester = (slug) => {
  const m = /^semestr-(\d+)$/.exec(slug ?? '');
  const n = m ? Number(m[1]) : NaN;
  return SEMESTERS.includes(n) ? n : null;
};

// Rooms referenced by the timetable. `summary` is the short barrier info shown next to
// each class; the full description lives on the campus map (/campus-map#<id>).
export const ROOMS = {
  aula: { id: 'aula', name: 'Aula', summary: 'Budynek A, parter, pętla indukcyjna' },
  'sala-a-101': { id: 'sala-a-101', name: 'Sala A 101', summary: 'Budynek A, piętro 1, winda' },
  'sala-b-5': { id: 'sala-b-5', name: 'Sala B 5', summary: 'Budynek B, parter, pochylnia' },
  'sala-b-112': { id: 'sala-b-112', name: 'Sala B 112', summary: 'Budynek B, piętro 1, tylko schody, brak windy' },
};

// `status`: text shown for cancelled classes / room changes (never colour alone, 1.4.1).
// A cancelled class has no `room`.
export const SAMPLE_WEEK = [
  {
    id: 'poniedzialek',
    day: 'Poniedziałek',
    classes: [
      { time: '9:00–10:30', title: 'Programowanie (wykład)', teacher: 'dr Jan Przykładowy', room: 'aula' },
      { time: '10:45–12:15', title: 'Matematyka dyskretna (ćwiczenia)', teacher: 'dr Ewa Przykładowa', room: 'sala-b-112' },
    ],
  },
  {
    id: 'wtorek',
    day: 'Wtorek',
    classes: [
      { time: '8:00–9:30', title: 'Algorytmy i struktury danych (wykład)', teacher: 'prof. Piotr Przykładowy', room: 'aula' },
      { time: '9:45–11:15', title: 'Programowanie (laboratorium)', teacher: 'dr Jan Przykładowy', room: 'sala-a-101' },
      { time: '12:00–13:30', title: 'Język angielski (lektorat)', teacher: 'mgr Anna Przykładowa', status: 'Odwołane – zajęcia nie odbędą się.' },
    ],
  },
  {
    id: 'sroda',
    day: 'Środa',
    classes: [
      { time: '10:00–11:30', title: 'Matematyka dyskretna (wykład)', teacher: 'dr Ewa Przykładowa', room: 'aula' },
      {
        time: '11:45–13:15',
        title: 'Algorytmy i struktury danych (ćwiczenia)',
        teacher: 'prof. Piotr Przykładowy',
        status: 'Zmiana sali – zajęcia odbywają się w sali A 101 zamiast B 112.',
        room: 'sala-a-101',
      },
    ],
  },
  {
    id: 'czwartek',
    day: 'Czwartek',
    classes: [
      { time: '9:00–10:30', title: 'Język angielski (lektorat)', teacher: 'mgr Anna Przykładowa', room: 'sala-b-5' },
    ],
  },
  {
    id: 'piatek',
    day: 'Piątek',
    classes: [
      { time: '8:00–9:30', title: 'Programowanie (laboratorium)', teacher: 'dr Jan Przykładowy', room: 'sala-a-101' },
      { time: '9:45–11:15', title: 'Algorytmy i struktury danych (laboratorium)', teacher: 'prof. Piotr Przykładowy', room: 'sala-a-101' },
    ],
  },
];
