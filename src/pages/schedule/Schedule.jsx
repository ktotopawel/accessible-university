import { Breadcrumb, PageTitle, Tile, Tiles } from '../../components/ui.jsx';
import { ProgrammeNav } from '../../components/sectionNavs.jsx';
import { PROGRAMMES } from '../../data/university.js';
import { SEMESTERS } from '../../data/schedule.js';

const semestersText = `Semestr ${SEMESTERS.join(' i semestr ')}.`;

export default function Schedule() {
  return (
    <>
      <PageTitle>Plan zajęć</PageTitle>
      <ProgrammeNav currentTo="/schedule" />
      <Breadcrumb items={[{ to: '/studies', label: 'Studia' }]} current="Plan zajęć" />

      <h1>Plan zajęć</h1>
      <p className="lead">Wybierz kierunek i semestr. Są plany dla trzech kierunków, na semestry 1 i 3.</p>

      <h2>Jak wybrać plan</h2>
      <ol>
        <li>Wybierz kierunek.</li>
        <li>Wybierz semestr.</li>
        <li>Zobacz plan na tydzień. Przy każdej sali jest link do opisu jej dostępności.</li>
      </ol>

      <h2>Kierunki</h2>
      <Tiles>
        {PROGRAMMES.map((p) => (
          <Tile key={p.slug} to={`/schedule/${p.slug}`} title={p.name}>
            <p>{semestersText}</p>
          </Tile>
        ))}
      </Tiles>
      <p>Plany pozostałych semestrów dodamy później.</p>
    </>
  );
}
