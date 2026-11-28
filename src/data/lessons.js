// Video lessons. Every lesson page is rendered by src/pages/courses/Lesson.jsx from an entry here.
// URL: /courses/<category>/<slug>.
//
// `video`: file in public/video/, or null → the player is a placeholder ("Miejsce na film").
// `features`: only what really exists for this lesson, as text (no icon-only badges).
// `slides`: transcript per slide – `image` describes what is on screen, `narration` the narrator's lines.
//
// "Liczby zespolone" is a hand-made video. The other three are generated slide shows:
// their video, captions, poster and transcript (src/data/transcripts/*.json) all come from
// tools/lesson-videos/lessons.json – edit that file and re-run the generator, not the JSON.
import { CHAPTERS as COMPLEX_CHAPTERS, SLIDES as COMPLEX_SLIDES } from './lessonComplexNumbers.js';
import handHygiene from './transcripts/hand-hygiene.json';
import evacuationRoutes from './transcripts/evacuation-routes.json';
import accessibleMaterials from './transcripts/accessible-materials.json';

// Everything on the generated slides is read by the narrator, so no separate audio description is needed (1.2.5).
const GENERATED_FEATURES = 'napisy po polsku, transkrypcja, lektor czyta wszystko, co widać na slajdach';

/** Fields shared by the generated slide-show lessons. */
function generated(file, transcript) {
  return {
    features: GENERATED_FEATURES,
    duration: transcript.duration,
    chapters: transcript.chapters,
    slides: transcript.slides,
    video: {
      src: `/video/${file}.mp4`,
      poster: `/video/${file}-poster.jpg`,
      captions: `/video/${file}.pl.vtt`,
      size: transcript.size,
    },
  };
}

export const LESSONS = [
  {
    slug: 'complex-numbers',
    category: 'science',
    title: 'Liczby zespolone',
    subject: 'Matematyka',
    course: 'Algebra dla studentów',
    number: 1,
    duration: '2 min 12 s',
    features: 'napisy po polsku, transkrypcja',
    video: {
      src: '/video/liczby-zespolone.mp4',
      poster: '/video/liczby-zespolone-poster.jpg',
      captions: '/video/liczby-zespolone.pl.vtt',
      size: '3,9 MB',
    },
    audioDescriptionTodo:
      'Miejsce na wersję z audiodeskrypcją (WCAG 1.2.5): narracja czyta większość wzorów, ale nie czyta m.in. wyniku 25, wartości cos φ i sin φ, treści zadania ani opisu wykresu płaszczyzny zespolonej (punkt 3 + 4i, |z| = 5, kąt φ). Tekstowy opis slajdów jest w transkrypcji poniżej.',
    chapters: COMPLEX_CHAPTERS,
    slides: COMPLEX_SLIDES,
  },
  {
    slug: 'hand-hygiene',
    category: 'medical',
    title: 'Higiena rąk – technika w 6 krokach',
    subject: 'Pielęgniarstwo',
    course: 'Podstawy pielęgniarstwa',
    number: 1,
    ...generated('higiena-rak', handHygiene),
  },
  {
    slug: 'evacuation-routes',
    category: 'training',
    title: 'Drogi ewakuacyjne',
    subject: 'BHP',
    course: 'Bezpieczeństwo na uczelni',
    number: 1,
    ...generated('drogi-ewakuacyjne', evacuationRoutes),
  },
  {
    slug: 'accessible-materials',
    category: 'training',
    title: 'Dostępne materiały dydaktyczne',
    subject: 'Dla prowadzących',
    course: 'Dostępne materiały dydaktyczne',
    number: 1,
    ...generated('dostepne-materialy', accessibleMaterials),
  },
];

export const lessonsInCategory = (category) => LESSONS.filter((l) => l.category === category);
export const findLesson = (category, slug) => LESSONS.find((l) => l.category === category && l.slug === slug);
export const lessonPath = (lesson) => `/courses/${lesson.category}/${lesson.slug}`;

/** "Przedmiot · kurs „…” · lekcja n · czas" without repeating the course when it equals the lesson title. */
export function lessonMeta(lesson, { withNumber = false } = {}) {
  return [
    lesson.subject,
    lesson.course !== lesson.title && `kurs „${lesson.course}”`,
    withNumber && `lekcja ${lesson.number}`,
    lesson.duration,
  ]
    .filter(Boolean)
    .join(' · ');
}
