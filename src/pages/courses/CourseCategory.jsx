import { useParams } from 'react-router';
import { Tile, Tiles } from '../../components/ui.jsx';
import { findCategory } from '../../data/courses.js';
import { lessonMeta, lessonPath, lessonsInCategory } from '../../data/lessons.js';
import CategoryHeader from './CategoryHeader.jsx';
import NotFound from '../NotFound.jsx';

export default function CourseCategory() {
  const category = findCategory(useParams().category);
  if (!category) return <NotFound />;
  const lessons = lessonsInCategory(category.slug);

  return (
    <>
      <CategoryHeader category={category} />

      <h2>Lekcje</h2>
      <Tiles>
        {lessons.map((lesson) => (
          <Tile key={lesson.slug} to={lessonPath(lesson)} title={lesson.title}>
            <p className="meta">{lessonMeta(lesson)}</p>
            <p>Udogodnienia: {lesson.features}.</p>
          </Tile>
        ))}
      </Tiles>
    </>
  );
}
