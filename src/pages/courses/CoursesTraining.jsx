import { Placeholder } from '../../components/ui.jsx';
import { findCategory } from '../../data/courses.js';
import CategoryHeader from './CategoryHeader.jsx';

export default function CoursesTraining() {
  return (
    <>
      <CategoryHeader category={findCategory('training')} />

      <h2>Kursy</h2>
      <ul>
        <li>BHP w laboratorium i pracowni</li>
        <li>Pierwsza pomoc – kurs podstawowy</li>
        <li>EduPortal krok po kroku</li>
        <li>Dostępne materiały dydaktyczne (dla prowadzących)</li>
      </ul>

      <h2>Przykładowa lekcja: drogi ewakuacyjne</h2>
      <Placeholder className="player">
        <p>Miejsce na odtwarzacz wideo z napisami i audiodeskrypcją.</p>
      </Placeholder>

      <h3>Transkrypcja</h3>
      <details open>
        <summary>Pokaż lub ukryj transkrypcję</summary>
        <p>[Obraz: korytarz, na ścianie zielony znak wyjścia ewakuacyjnego.]</p>
        <p>Lektor: Drogi ewakuacyjne oznaczamy zielonymi znakami. W czasie alarmu nie korzystaj z windy.</p>
      </details>
    </>
  );
}
