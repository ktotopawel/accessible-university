import { Link, useParams, useSearchParams } from 'react-router';
import { Breadcrumb, PageTitle, Placeholder, SubNav } from '../../components/ui.jsx';
import { CourseCategoryNav } from '../../components/sectionNavs.jsx';
import { findCategory } from '../../data/courses.js';
import { LESSONS, findLesson, lessonMeta, lessonPath } from '../../data/lessons.js';
import NotFound from '../NotFound.jsx';

const AD_PARAM = 'audiodeskrypcja';

// Native player: keyboard-operable, no autoplay (1.4.2, 2.2.2), Polish captions on by default (1.2.2).
// A lesson with `video.described` offers a second version with audio description (1.2.5): two links
// with their own URL (?wersja=audiodeskrypcja), so the choice is shareable and "back" works.
function Player({ lesson }) {
  const [params] = useSearchParams();
  const base = lesson.video;
  if (!base) {
    return (
      <Placeholder className="player">
        <p>Miejsce na film z napisami po polsku i, jeśli obraz pokazuje coś, czego nie słychać, z audiodeskrypcją. Treść filmu jest już w transkrypcji poniżej.</p>
      </Placeholder>
    );
  }
  const described = base.described && params.get('wersja') === AD_PARAM;
  const video = described ? { ...base, ...base.described, poster: base.poster } : base;
  const path = lessonPath(lesson);
  return (
    <>
      {base.described && (
        <>
          <SubNav
            label="Wersja filmu"
            currentTo={described ? `${path}?wersja=${AD_PARAM}` : path}
            items={[
              { to: path, label: `Zwykła wersja (${lesson.duration})` },
              { to: `${path}?wersja=${AD_PARAM}`, label: `Z audiodeskrypcją (${base.described.duration})` },
            ]}
          />
          {described && (
            <p>
              W tej wersji film zatrzymuje się, gdy na ekranie jest coś, czego nie słychać w nagraniu, a drugi głos opisuje obraz. Napisy
              obejmują też opis.
            </p>
          )}
        </>
      )}
      {/* key: a new <video> per version – changing <source> on an existing element does not reload it. */}
      <video
        key={video.src}
        className="lesson-video"
        controls
        preload="metadata"
        poster={video.poster}
        aria-label={`${lesson.title} – lekcja ${lesson.number} kursu ${lesson.course}${described ? ', wersja z audiodeskrypcją' : ''}`}
      >
        <source src={video.src} type="video/mp4" />
        <track kind="captions" srcLang="pl" label="Polski" src={video.captions} default />
        <p>
          Twoja przeglądarka nie odtwarza wideo. <a href={video.src}>Pobierz film (MP4)</a>.
        </p>
      </video>
      <p className="action">
        <a href={video.src} download>
          Pobierz film{described ? ' z audiodeskrypcją' : ''} (MP4, {video.size})
        </a>
      </p>
    </>
  );
}

export default function Lesson() {
  const params = useParams();
  const category = findCategory(params.category);
  const lesson = category && findLesson(category.slug, params.lesson);
  if (!lesson) return <NotFound />;

  const courseLessons = LESSONS.filter((l) => l.course === lesson.course);

  return (
    <>
      <PageTitle>{lesson.title}</PageTitle>
      <CourseCategoryNav currentTo={`/courses/${category.slug}`} />
      <Breadcrumb
        items={[
          { to: '/courses', label: 'Kursy wideo' },
          { to: `/courses/${category.slug}`, label: category.name },
        ]}
        current={lesson.title}
      />

      <h1>{lesson.title}</h1>
      <p className="meta">{lessonMeta(lesson, { withNumber: true })}</p>
      <p>Udogodnienia: {lesson.features}.</p>

      <Player lesson={lesson} />

      <h2>Rozdziały w wideo</h2>
      <ol>
        {lesson.chapters.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>

      {/* Transcript (1.2.3): what is on screen in [Obraz: …], then the narration. */}
      <h2>Transkrypcja</h2>
      <details open>
        <summary>Pokaż lub ukryj transkrypcję</summary>
        {lesson.slides.map((slide) => (
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
        {courseLessons.map((l) =>
          l.slug === lesson.slug ? (
            <li key={l.slug} aria-current="step">
              <strong>{l.title}</strong> (ta lekcja)
            </li>
          ) : (
            <li key={l.slug}>
              <Link to={lessonPath(l)}>{l.title}</Link>
            </li>
          ),
        )}
      </ol>
      <p>Kolejne lekcje kursu „{lesson.course}” pojawią się później.</p>
    </>
  );
}
