import { Link, useParams } from 'react-router';
import { Breadcrumb, PageTitle } from '../../components/ui.jsx';
import { ProgrammeNav } from '../../components/sectionNavs.jsx';
import { findProgramme } from '../../data/university.js';
import { ROOMS, SAMPLE_WEEK, SEMESTERS, parseSemester, semesterSlug } from '../../data/schedule.js';
import NotFound from '../NotFound.jsx';

// Day-by-day lists, not a weekly grid or table: a grid reads badly with a screen reader
// and does not fit 320 px / 150 % text (1.4.10).
function ClassCard({ entry }) {
  const room = entry.room && ROOMS[entry.room];
  return (
    <li>
      <p className="schedule__time">{entry.time}</p>
      <p className="schedule__title">{entry.title}</p>
      <p>
        <span className="sr-only">Prowadzący: </span>
        {entry.teacher}
      </p>
      {entry.status && <p className="schedule__status">{entry.status}</p>}
      {room && (
        <>
          <p className="schedule__room">
            <Link to={`/campus-map#${room.id}`}>
              {room.name}
              <span className="sr-only"> – opis dostępności sali</span>
            </Link>
          </p>
          <p>
            <span className="sr-only">Dostępność: </span>
            {room.summary}
          </p>
        </>
      )}
    </li>
  );
}

export default function ScheduleSemester() {
  const params = useParams();
  const programme = findProgramme(params.programme);
  const semester = parseSemester(params.semester);
  if (!programme || !semester) return <NotFound />;

  const base = `/schedule/${programme.slug}`;
  const label = `${programme.name}, semestr ${semester}`;

  return (
    <>
      <PageTitle>{`Plan zajęć: ${label}`}</PageTitle>
      <ProgrammeNav currentTo={base} />
      <Breadcrumb
        items={[
          { to: '/studies', label: 'Studia' },
          { to: '/schedule', label: 'Plan zajęć' },
          { to: base, label: programme.name },
        ]}
        current={`Semestr ${semester}`}
      />

      <h1>{label}</h1>
      <p className="lead">Przykładowy plan: {label}. Przy każdej sali jest link do opisu jej dostępności.</p>

      <h2>Semestry tego kierunku</h2>
      <nav aria-label="Semestry">
        <ul className="jumplist" role="list">
          {SEMESTERS.map((n) =>
            n === semester ? (
              <li key={n} aria-current="true">
                Semestr {n} (ten plan)
              </li>
            ) : (
              <li key={n}>
                <Link to={`${base}/${semesterSlug(n)}`}>Semestr {n}</Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <h2>{label} – przykładowy tydzień</h2>
      <p>Przejdź do dnia:</p>
      <nav aria-label="Dni tygodnia">
        <ul className="jumplist" role="list">
          {SAMPLE_WEEK.map((d) => (
            <li key={d.id}>
              <a href={`#${d.id}`}>{d.day}</a>
            </li>
          ))}
        </ul>
      </nav>

      {SAMPLE_WEEK.map((d) => (
        <div key={d.id}>
          <h3 id={d.id}>{d.day}</h3>
          <ol className="schedule" role="list">
            {d.classes.map((entry) => (
              <ClassCard key={entry.time} entry={entry} />
            ))}
          </ol>
        </div>
      ))}

      <p>
        <strong>Uwaga:</strong> prowadzący, sale i godziny są przykładowe. Ten sam plan jest na wszystkich kierunkach i semestrach.
      </p>
    </>
  );
}
