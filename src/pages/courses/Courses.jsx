import { PageTitle, Tile, Tiles } from '../../components/ui.jsx';
import { CourseCategoryNav } from '../../components/sectionNavs.jsx';
import { COURSE_CATEGORIES } from '../../data/courses.js';

export default function Courses() {
  return (
    <>
      <PageTitle>Kursy wideo</PageTitle>
      <CourseCategoryNav currentTo="/courses" />

      <h1>Kursy wideo</h1>
      <p className="lead">Kursy i szkolenia dla studentów i pracowników. Wybierz kategorię.</p>

      <h2>Kategorie</h2>
      <Tiles>
        {COURSE_CATEGORIES.map((c) => (
          <Tile key={c.slug} to={`/courses/${c.slug}`} title={c.name}>
            <p>{c.description}</p>
          </Tile>
        ))}
      </Tiles>

      <h2>Co ma każda lekcja</h2>
      <ul>
        <li>napisy po polsku,</li>
        <li>transkrypcję tekstową,</li>
        <li>audiodeskrypcję, jeśli obraz pokazuje coś, czego nie słychać,</li>
        <li>odtwarzacz obsługiwany klawiaturą, bez automatycznego odtwarzania.</li>
      </ul>
      <p>
        Lekcja „Liczby zespolone” ma osobną wersję z audiodeskrypcją. W pozostałych lekcjach lektor czyta wszystko, co widać na
        slajdach, więc audiodeskrypcja nie jest potrzebna.
      </p>
    </>
  );
}
