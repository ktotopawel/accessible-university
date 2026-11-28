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

      <h2>Co będzie miał każdy kurs</h2>
      <ul>
        <li>napisy po polsku,</li>
        <li>transkrypcję tekstową,</li>
        <li>audiodeskrypcję, jeśli obraz pokazuje coś, czego nie słychać,</li>
        <li>odtwarzacz obsługiwany klawiaturą, bez automatycznego odtwarzania.</li>
      </ul>
      <p>Wszystkie lekcje mają napisy i transkrypcję. Lekcja „Liczby zespolone” czeka jeszcze na wersję z audiodeskrypcją; w pozostałych lektor czyta wszystko, co widać na slajdach.</p>
    </>
  );
}
