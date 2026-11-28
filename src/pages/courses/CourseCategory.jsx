import { Link, useParams } from 'react-router';
import { Placeholder } from '../../components/ui.jsx';
import { findCategory } from '../../data/courses.js';
import CategoryHeader from './CategoryHeader.jsx';
import NotFound from '../NotFound.jsx';

// Categories without content yet (humanities, medical). Science and training have own pages.
export default function CourseCategory() {
  const category = findCategory(useParams().category);
  if (!category) return <NotFound />;

  return (
    <>
      <CategoryHeader category={category} />
      <Placeholder>
        Miejsce na przedmioty i kursy z tej kategorii. Układ jak w kategorii <Link to="/courses/science">Przedmioty ścisłe</Link>:
        lista przedmiotów, a pod nią kursy z napisami, transkrypcją i audiodeskrypcją.
      </Placeholder>
    </>
  );
}
