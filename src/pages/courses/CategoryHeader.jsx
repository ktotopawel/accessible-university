import { Breadcrumb, PageTitle } from '../../components/ui.jsx';
import { CourseCategoryNav } from '../../components/sectionNavs.jsx';

/** Title, category bar, breadcrumb, h1 and lead shared by every course-category page. */
export default function CategoryHeader({ category }) {
  return (
    <>
      <PageTitle>{category.name}</PageTitle>
      <CourseCategoryNav currentTo={`/courses/${category.slug}`} />
      <Breadcrumb items={[{ to: '/courses', label: 'Kursy wideo' }]} current={category.name} />
      <h1>{category.name}</h1>
      <p className="lead">{category.lead}</p>
    </>
  );
}
