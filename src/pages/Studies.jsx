import { Link } from 'react-router';
import { PageTitle } from '../components/ui.jsx';
import { DEAN_OFFICE, PROGRAMMES } from '../data/university.js';

export default function Studies() {
  return (
    <>
      <PageTitle>Studia</PageTitle>
      <h1>Studia</h1>
      <p className="lead">Plan zajęć, kierunki, rekrutacja i dziekanat.</p>

      {/* The timetable is one of the most needed things, so it is right at the top, highlighted. */}
      <section className="highlight" aria-labelledby="plan-heading">
        <h2 id="plan-heading">Plan zajęć</h2>
        <p>Wybierz swój kierunek. Przy każdej sali jest opis jej dostępności: wind, schodów i pętli indukcyjnej.</p>
        <ul className="link-buttons" role="list">
          {PROGRAMMES.map((p) => (
            <li key={p.slug}>
              <Link to={`/schedule/${p.slug}`}>
                {p.name}
                <span className="sr-only"> – plan zajęć</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="action">
          <Link to="/schedule">Wszystkie plany zajęć</Link>
        </p>
      </section>

      <section className="page-section">
        <h2>Kierunki</h2>
        <p>Uczelnia ma trzy wydziały. Na każdym jest jeden kierunek.</p>
        <ul className="cards" role="list">
          {PROGRAMMES.map((p) => (
            <li key={p.slug} className="card">
              <h3>{p.faculty}</h3>
              <p>Kierunek: {p.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section">
        <h2>Rekrutacja</h2>
        <ol>
          <li>Wybierz kierunek.</li>
          <li>Załóż konto w systemie rekrutacji i wypełnij formularz.</li>
          <li>Wnieś opłatę rekrutacyjną.</li>
          <li>Dostarcz dokumenty.</li>
        </ol>
        <div className="card">
          <p>
            Potrzebujesz dostosowania rekrutacji, np. dłuższego czasu na egzamin albo tłumacza polskiego języka migowego?{' '}
            <Link to="/accessibility#disability-office">Skontaktuj się z Biurem ds. Osób z Niepełnosprawnościami</Link>.
          </p>
        </div>
      </section>

      <section className="page-section">
        <h2 id="dean-office">Dziekanat</h2>
        <div className="card">
          <table className="hours">
            <caption>
              Godziny otwarcia dziekanatu – {DEAN_OFFICE.faculty} (kierunek {DEAN_OFFICE.programme})
            </caption>
            <tbody>
              {DEAN_OFFICE.hours.map(([day, hours]) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  <td>{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>{DEAN_OFFICE.others}</p>
      </section>
    </>
  );
}
