import { Placeholder, Tile, Tiles } from '../../components/ui.jsx';
import { findCategory } from '../../data/courses.js';
import CategoryHeader from './CategoryHeader.jsx';

const SUBJECTS = [
  { id: 'matematyka', name: 'Matematyka' },
  { id: 'fizyka', name: 'Fizyka' },
  { id: 'chemia', name: 'Chemia' },
  { id: 'informatyka', name: 'Informatyka' },
];

export default function CoursesScience() {
  return (
    <>
      <CategoryHeader category={findCategory('science')} />

      <h2>Przedmioty</h2>
      <ul className="jumplist" role="list">
        {SUBJECTS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{s.name}</a>
          </li>
        ))}
      </ul>

      <h2 id="matematyka">Matematyka</h2>
      <Tiles>
        <Tile to="/courses/science/complex-numbers" title="Liczby zespolone">
          <p className="meta">Algebra dla studentów · 1 lekcja · 2 min</p>
        </Tile>
      </Tiles>
      <Placeholder>Miejsce na kolejne kursy z matematyki.</Placeholder>

      <h2 id="fizyka">Fizyka</h2>
      <Placeholder>Miejsce na kursy z fizyki.</Placeholder>

      <h2 id="chemia">Chemia</h2>
      <Placeholder>Miejsce na kursy z chemii.</Placeholder>

      <h2 id="informatyka">Informatyka</h2>
      <Placeholder>Miejsce na kursy z informatyki.</Placeholder>
    </>
  );
}
