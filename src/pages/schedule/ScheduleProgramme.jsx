import { Link, useParams } from 'react-router';
import { Breadcrumb, PageTitle, Tiles } from '../../components/ui.jsx';
import { ProgrammeNav } from '../../components/sectionNavs.jsx';
import { findProgramme } from '../../data/university.js';
import { SEMESTERS, semesterSlug } from '../../data/schedule.js';
import NotFound from '../NotFound.jsx';

export default function ScheduleProgramme() {
  const programme = findProgramme(useParams().programme);
  if (!programme) return <NotFound />;
  const base = `/schedule/${programme.slug}`;

  return (
    <>
      <PageTitle>{`Plan zajęć: ${programme.name}`}</PageTitle>
      <ProgrammeNav currentTo={base} />
      <Breadcrumb
        items={[
          { to: '/studies', label: 'Studia' },
          { to: '/schedule', label: 'Plan zajęć' },
        ]}
        current={programme.name}
      />

      <h1>{programme.name}</h1>
      <p className="lead">Plany zajęć dla kierunku {programme.name}. Wybierz semestr.</p>

      <h2>Semestry</h2>
      <Tiles>
        {SEMESTERS.map((n) => (
          <li key={n} className="tile">
            <h3>
              <Link to={`${base}/${semesterSlug(n)}`}>
                Semestr {n}
                <span className="sr-only"> – {programme.name}</span>
              </Link>
            </h3>
            <p>Przykładowy plan zajęć na tydzień.</p>
          </li>
        ))}
      </Tiles>
    </>
  );
}
