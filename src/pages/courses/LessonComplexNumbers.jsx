import { Breadcrumb, PageTitle, Placeholder } from '../../components/ui.jsx';
import { CourseCategoryNav } from '../../components/sectionNavs.jsx';
import { CHAPTERS, SLIDES } from '../../data/lessonComplexNumbers.js';

// Files live in public/video/ and are served as-is from /video/.
const VIDEO = '/video/liczby-zespolone.mp4';

export default function LessonComplexNumbers() {
  return (
    <>
      <PageTitle>Liczby zespolone</PageTitle>
      <CourseCategoryNav currentTo="/courses/science" />
      <Breadcrumb
        items={[
          { to: '/courses', label: 'Kursy wideo' },
          { to: '/courses/science', label: 'Przedmioty ścisłe' },
          { to: '/courses/science#matematyka', label: 'Matematyka' },
        ]}
        current="Liczby zespolone"
      />

      <h1>Liczby zespolone</h1>
      <p className="meta">Matematyka · kurs „Algebra dla studentów” · lekcja 1 · 2 min 12 s</p>

      {/* Native player: keyboard-operable, no autoplay (1.4.2, 2.2.2), Polish captions on by default (1.2.2). */}
      <video
        className="lesson-video"
        controls
        preload="metadata"
        poster="/video/liczby-zespolone-poster.jpg"
        aria-label="Liczby zespolone – lekcja 1 kursu Algebra dla studentów"
      >
        <source src={VIDEO} type="video/mp4" />
        <track kind="captions" srcLang="pl" label="Polski" src="/video/liczby-zespolone.pl.vtt" default />
        <p>
          Twoja przeglądarka nie odtwarza wideo. <a href={VIDEO}>Pobierz film (MP4)</a>.
        </p>
      </video>
      <p className="action">
        <a href={VIDEO} download>
          Pobierz film (MP4, 3,9 MB)
        </a>
      </p>

      <Placeholder>
        <p>
          Miejsce na wersję z audiodeskrypcją (WCAG 1.2.5): narracja czyta większość wzorów, ale nie czyta m.in. wyniku 25, wartości cos φ i
          sin φ, treści zadania ani opisu wykresu płaszczyzny zespolonej (punkt 3 + 4i, |z| = 5, kąt φ). Tekstowy opis slajdów jest w
          transkrypcji poniżej.
        </p>
      </Placeholder>

      <h2>Rozdziały w wideo</h2>
      <ol>
        {CHAPTERS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>

      {/* Transcript (1.2.3): what is on screen in [Obraz: …], then the narration. */}
      <h2>Transkrypcja</h2>
      <details open>
        <summary>Pokaż lub ukryj transkrypcję</summary>
        {SLIDES.map((slide) => (
          <div key={slide.title}>
            <h3>{slide.title}</h3>
            <p>{slide.image}</p>
            {slide.narration.map((line) => (
              <p key={line}>Lektor: {line}</p>
            ))}
          </div>
        ))}
      </details>

      <h2>Lekcje w tym kursie</h2>
      <ol className="lessons">
        <li aria-current="step">
          <strong>Liczby zespolone</strong> (ta lekcja)
        </li>
      </ol>
      <p>Kolejne lekcje kursu „Algebra dla studentów” pojawią się później.</p>
    </>
  );
}
