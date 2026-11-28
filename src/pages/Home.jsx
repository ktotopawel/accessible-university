import { PageTitle, PhoneLink, EmailLink, Tile, Tiles } from '../components/ui.jsx';
import { UNIVERSITY } from '../data/university.js';

export default function Home() {
  return (
    <>
      <PageTitle>Strona główna</PageTitle>
      <h1>{UNIVERSITY.name}</h1>
      <p className="lead">Uczelnia o praktycznym profilu kształcenia. Studia techniczne, medyczne i społeczne w Jasnogrodzie.</p>

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

      <h2>Aktualności</h2>
      <ul>
        <li>
          <h3>Stanowiska z czytnikiem ekranu w bibliotece</h3>
          <time className="date" dateTime="2026-11-04">
            4 listopada 2026
          </time>
          <p>W czytelni działają dwa stanowiska z czytnikiem ekranu i linijką brajlowską.</p>
        </li>
        <li>
          <h3>Rekrutacja na semestr letni</h3>
          <time className="date" dateTime="2026-10-28">
            28 października 2026
          </time>
          <p>Przyjmujemy zgłoszenia na studia, które zaczynają się w lutym 2027.</p>
        </li>
      </ul>

      <h2>Kontakt</h2>
      <dl>
        <dt>Adres</dt>
        <dd>{UNIVERSITY.address}</dd>
        <dt>Telefon</dt>
        <dd className="action">
          <PhoneLink phone={UNIVERSITY.phone} />
        </dd>
        <dt>E-mail</dt>
        <dd className="action">
          <EmailLink email={UNIVERSITY.email} />
        </dd>
      </dl>
    </>
  );
}
