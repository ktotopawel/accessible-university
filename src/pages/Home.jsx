import { PageTitle, PhoneLink, EmailLink, Tile, Tiles } from '../components/ui.jsx';
import { UNIVERSITY } from '../data/university.js';

const NEWS = [
  {
    date: '2026-11-04',
    label: '4 listopada 2026',
    title: 'Stanowiska z czytnikiem ekranu w bibliotece',
    text: 'W czytelni działają dwa stanowiska z czytnikiem ekranu i linijką brajlowską.',
  },
  {
    date: '2026-10-28',
    label: '28 października 2026',
    title: 'Rekrutacja na semestr letni',
    text: 'Przyjmujemy zgłoszenia na studia, które zaczynają się w lutym 2027.',
  },
];

// Home page: a banner, then sections separated by space and a rule (.page-section),
// so "Na skróty", "Aktualności" and "Kontakt" read as separate blocks.
export default function Home() {
  return (
    <>
      <PageTitle>Strona główna</PageTitle>
      <div className="hero">
        <h1>{UNIVERSITY.name}</h1>
        <p className="lead">Uczelnia o praktycznym profilu kształcenia. Studia techniczne, medyczne i społeczne w Jasnogrodzie.</p>
      </div>

      <section className="page-section">
        <h2>Na skróty</h2>
        <Tiles>
          <Tile to="/schedule" title="Plan zajęć">
            <p>Zajęcia na ten tydzień i opis dostępności sal.</p>
          </Tile>
          <Tile to="/studies" title="Studia">
            <p>Kierunki, rekrutacja, plan zajęć i dziekanat.</p>
          </Tile>
          <Tile to="/accessibility" title="Dostępność">
            <p>Wsparcie dla osób z niepełnosprawnościami i deklaracja dostępności.</p>
          </Tile>
          <Tile to="/campus-map" title="Mapa kampusu">
            <p>Budynki, windy, sale i trasy bez schodów.</p>
          </Tile>
          <Tile to="/courses" title="Kursy wideo">
            <p>Kursy i szkolenia wideo.</p>
          </Tile>
          <Tile to="/staff" title="Strefa pracownika">
            <p>Systemy, logowanie i materiały dla pracowników.</p>
          </Tile>
        </Tiles>
      </section>

      <section className="page-section">
        <h2>Aktualności</h2>
        <ul className="cards" role="list">
          {NEWS.map((n) => (
            <li key={n.date} className="card">
              <h3>{n.title}</h3>
              <time className="date" dateTime={n.date}>
                {n.label}
              </time>
              <p>{n.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section">
        <h2>Kontakt</h2>
        <dl className="card contact">
          <div>
            <dt>Adres</dt>
            <dd>{UNIVERSITY.address}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd className="action">
              <PhoneLink phone={UNIVERSITY.phone} />
            </dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd className="action">
              <EmailLink email={UNIVERSITY.email} />
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
