import { Link } from 'react-router';
import { EmailLink, PageTitle, PhoneLink, Placeholder } from '../components/ui.jsx';
import { ACCESSIBILITY_CONTACT, DISABILITY_OFFICE, STATEMENT_DATES } from '../data/university.js';

// Sections separated like Home and Studia (.page-section); the full statement has its own page.
export default function Accessibility() {
  return (
    <>
      <PageTitle>Dostępność</PageTitle>
      <h1>Dostępność</h1>
      <p className="lead">Jak korzystać z tej strony, jak uzyskać wsparcie w czasie studiów i jak zgłosić problem z dostępnością.</p>

      <section className="page-section" aria-labelledby="jak-korzystac">
        <h2 id="jak-korzystac">Jak korzystać z tej strony</h2>
        <p>
          Stronę możesz powiększyć w przeglądarce (<kbd>Ctrl</kbd> + <kbd>+</kbd>, na Macu <kbd>Cmd</kbd> + <kbd>+</kbd>) albo
          rozsunięciem palców na telefonie. Całą stronę obsłużysz klawiszem <kbd>Tab</kbd>.
        </p>
        <p>Na górze każdej strony możesz powiększyć tekst (A, A+, A++) i włączyć wysoki kontrast. Zapamiętamy wybór na tym urządzeniu.</p>
      </section>

      <section className="page-section" aria-labelledby="informacje-pjm-etr">
        <h2 id="informacje-pjm-etr">Informacje o uczelni w PJM i w tekście łatwym do czytania</h2>
        <h3 id="pjm">Polski język migowy (PJM)</h3>
        <Placeholder>
          <p>
            Miejsce na film w polskim języku migowym (z napisami): czym zajmuje się uczelnia, jak się z nami skontaktować i jak
            zamówić tłumacza PJM. Film przygotujemy z tłumaczem i osobą głuchą.
          </p>
        </Placeholder>
        <h3 id="etr">Tekst łatwy do czytania (ETR)</h3>
        <Placeholder>
          <p>
            Miejsce na krótki tekst łatwy do czytania z ilustracjami: czym jest uczelnia, gdzie jest, jak się z nami skontaktować i
            jak dostać pomoc. Tekst sprawdzą osoby z niepełnosprawnością intelektualną.
          </p>
        </Placeholder>
      </section>

      <section className="page-section" aria-labelledby="disability-office">
        <h2 id="disability-office">{DISABILITY_OFFICE.name}</h2>
        <p>Biuro pomaga kandydatom i studentom z niepełnosprawnościami lub chorobami przewlekłymi.</p>
        <ul>
          <li>dostosowanie zajęć i egzaminów,</li>
          <li>tłumacz polskiego języka migowego (zamów co najmniej 3 dni robocze wcześniej),</li>
          <li>sprzęt i oprogramowanie wspomagające,</li>
          <li>materiały w formie elektronicznej.</li>
        </ul>
        <dl className="card contact">
          <div>
            <dt>Dyżury</dt>
            <dd>{DISABILITY_OFFICE.hours}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd className="action">
              <PhoneLink phone={DISABILITY_OFFICE.phone} />
            </dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd className="action">
              <EmailLink email={DISABILITY_OFFICE.email} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="page-section" aria-labelledby="budynki">
        <h2 id="budynki">Dostęp do budynków</h2>
        <p>
          Wejścia bez progów, windy, pętle indukcyjne, toalety dostępne i bariery (np. brak windy w budynku B) są zaznaczone na planie i
          opisane tekstem na stronie <Link to="/campus-map">Mapa kampusu</Link>. Tam też wyznaczysz trasę bez schodów.
        </p>
      </section>

      <section className="page-section" aria-labelledby="deklaracja">
        <h2 id="deklaracja">Deklaracja dostępności</h2>
        <div className="card">
          <p>
            <strong>Strona jest zgodna</strong> z ustawą o dostępności cyfrowej (WCAG 2.2 AA) – na podstawie samooceny. Deklarację
            zaktualizowaliśmy{' '}
            <time dateTime={STATEMENT_DATES.updated.iso}>{STATEMENT_DATES.updated.label}</time>.
          </p>
          <p className="action">
            <Link to="/accessibility/statement">Przeczytaj całą deklarację dostępności</Link>
          </p>
        </div>
        <h3>Zgłoś problem z dostępnością</h3>
        <p>
          Coś nie działa albo jest trudne w obsłudze? Napisz na <EmailLink email={ACCESSIBILITY_CONTACT.email} /> albo zadzwoń:{' '}
          <PhoneLink phone={ACCESSIBILITY_CONTACT.phone} />. Odpowiemy w ciągu 7 dni.
        </p>
      </section>
    </>
  );
}
