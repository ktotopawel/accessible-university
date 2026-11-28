import { Link } from 'react-router';
import { EmailLink, PageTitle, PhoneLink, Placeholder } from '../components/ui.jsx';
import { DISABILITY_OFFICE } from '../data/university.js';

export default function Accessibility() {
  return (
    <>
      <PageTitle>Dostępność</PageTitle>
      <h1>Dostępność</h1>
      <p className="lead">Jak korzystać z tej strony i jak uzyskać wsparcie w czasie studiów.</p>

      <h2>Jak korzystać z tej strony</h2>
      <p>
        Stronę możesz powiększyć w przeglądarce (<kbd>Ctrl</kbd> + <kbd>+</kbd>, na Macu <kbd>Cmd</kbd> + <kbd>+</kbd>) albo
        rozsunięciem palców na telefonie. Całą stronę obsłużysz klawiszem <kbd>Tab</kbd>.
      </p>
      <p>Na górze każdej strony możesz powiększyć tekst (A, A+, A++) i włączyć wysoki kontrast. Zapamiętamy wybór na tym urządzeniu.</p>

      <h2 id="disability-office">{DISABILITY_OFFICE.name}</h2>
      <p>Biuro pomaga kandydatom i studentom z niepełnosprawnościami lub chorobami przewlekłymi.</p>
      <ul>
        <li>dostosowanie zajęć i egzaminów,</li>
        <li>tłumacz polskiego języka migowego,</li>
        <li>sprzęt i oprogramowanie wspomagające,</li>
        <li>materiały w formie elektronicznej.</li>
      </ul>
      <dl>
        <dt>Dyżury</dt>
        <dd>{DISABILITY_OFFICE.hours}</dd>
        <dt>Telefon</dt>
        <dd className="action">
          <PhoneLink phone={DISABILITY_OFFICE.phone} />
        </dd>
        <dt>E-mail</dt>
        <dd className="action">
          <EmailLink email={DISABILITY_OFFICE.email} />
        </dd>
      </dl>

      <h2>Dostęp do budynków</h2>
      <p>
        Windy, wejścia bez progów, pętle indukcyjne i trasy bez schodów opisujemy na stronie <Link to="/campus-map">Mapa kampusu</Link>.
      </p>

      <h2>Deklaracja dostępności</h2>
      <Placeholder>Miejsce na deklarację dostępności (wymaganą przez ustawę o dostępności cyfrowej).</Placeholder>
    </>
  );
}
