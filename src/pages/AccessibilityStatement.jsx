import { Link } from 'react-router';
import { Breadcrumb, EmailLink, PageTitle, PhoneLink } from '../components/ui.jsx';
import { ACCESSIBILITY_CONTACT, DISABILITY_OFFICE, STATEMENT_DATES, UNIVERSITY } from '../data/university.js';

// Accessibility statement, following the structure of the Polish template for public bodies
// (ustawa z 4 kwietnia 2019 r. o dostępności cyfrowej). Plain language, "Ty" form.
// The university, people, dates and contacts are fictional (course project).
const D = ({ date }) => <time dateTime={date.iso}>{date.label}</time>;

export default function AccessibilityStatement() {
  const c = ACCESSIBILITY_CONTACT;
  return (
    <>
      <PageTitle>Deklaracja dostępności</PageTitle>
      <Breadcrumb items={[{ to: '/accessibility', label: 'Dostępność' }]} current="Deklaracja dostępności" />
      <h1>Deklaracja dostępności</h1>
      <p className="lead">
        {UNIVERSITY.name} chce, żeby z tej strony mógł korzystać każdy. Tu piszemy, co już działa, czego jeszcze brakuje i jak zgłosić
        problem.
      </p>

      <section className="page-section" aria-labelledby="wstep">
        <h2 id="wstep">Której strony dotyczy deklaracja</h2>
        <p>
          {UNIVERSITY.name} zobowiązuje się zapewnić dostępność swojej strony internetowej zgodnie z ustawą z dnia 4 kwietnia 2019 r.
          o dostępności cyfrowej stron internetowych i aplikacji mobilnych podmiotów publicznych.
        </p>
        <p>Deklaracja dotyczy strony internetowej {UNIVERSITY.name} (wszystkich podstron w tym serwisie).</p>
        <dl className="card contact">
          <div>
            <dt>Data publikacji strony</dt>
            <dd>
              <D date={STATEMENT_DATES.published} />
            </dd>
          </div>
          <div>
            <dt>Ostatnia istotna aktualizacja</dt>
            <dd>
              <D date={STATEMENT_DATES.updated} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="page-section" aria-labelledby="stan">
        <h2 id="stan">Stan dostępności</h2>
        <p>
          <strong>Strona jest zgodna</strong> z ustawą o dostępności cyfrowej i ze standardem WCAG 2.2 na poziomie AA (na podstawie
          samooceny opisanej niżej). Kontrast tekstu spełnia wyższy poziom AAA (co najmniej 7:1).
        </p>

        <h3>Uwagi</h3>
        <ul>
          <li>
            Lekcja <Link to="/courses/science/complex-numbers">„Liczby zespolone”</Link> ma osobną wersję z audiodeskrypcją: film
            zatrzymuje się, a drugi głos (syntezator mowy) opisuje wzory i wykres, których nie czyta lektor. Pozostałe lekcje jej nie
            potrzebują – lektor czyta wszystko, co widać na slajdach.
          </li>
          <li>
            Napisy do lekcji „Liczby zespolone” dopasowaliśmy do nagrania automatycznie. W niektórych miejscach mogą pojawiać się chwilę za
            wcześnie albo za późno. Pełny tekst jest w transkrypcji.
          </li>
        </ul>

        <h3>Czego jeszcze brakuje</h3>
        <ul>
          <li>
            Filmu w polskim języku migowym z informacjami o uczelni. Wymaga go ustawa o zapewnianiu dostępności osobom ze szczególnymi
            potrzebami. Nagramy go z tłumaczem polskiego języka migowego.
          </li>
          <li>
            Tekst łatwy do czytania o uczelni już jest:{' '}
            <Link to="/accessibility/easy-to-read">Akademia Jasnogrodzka – tekst łatwy do czytania</Link>. Nie sprawdziły go jeszcze
            osoby z niepełnosprawnością intelektualną i nie ma jeszcze ilustracji.
          </li>
        </ul>

        <h3>Co jest wyłączone</h3>
        <ul>
          <li>
            <Link to="/campus-map">Plan kampusu</Link> jest mapą, a mapy są wyłączone z obowiązku dostępności. Mimo to plan obsłużysz
            klawiaturą i czytnikiem ekranu, a wszystko, co na nim jest – także trasy – opisujemy tekstem. Plan pokazuje na razie tylko
            parter; sale na piętrze są zaznaczone ramką przerywaną.
          </li>
        </ul>

        <h3>Co ułatwia korzystanie ze strony</h3>
        <ul>
          <li>Przycisk „Przejdź do treści głównej”, to samo menu na każdej stronie, nagłówki i regiony strony.</li>
          <li>Powiększanie tekstu (A, A+, A++) i tryb wysokiego kontrastu na górze każdej strony.</li>
          <li>Obsługa całej strony klawiaturą, z wyraźnie widocznym fokusem.</li>
          <li>Strona działa od szerokości 320 px, bez przewijania w poziomie (poza planem kampusu, który przesuwa się w swojej ramce).</li>
          <li>Filmy mają napisy po polsku i transkrypcję, nic nie odtwarza się samo.</li>
          <li>Prosty język, linki opisujące, dokąd prowadzą, telefony i adresy e-mail jako klikalne linki.</li>
          <li>Informacje o uczelni w tekście łatwym do czytania (link w stopce każdej strony).</li>
          <li>Logowanie bez CAPTCHA i bez limitu czasu, z możliwością wklejenia hasła.</li>
        </ul>
      </section>

      <section className="page-section" aria-labelledby="przygotowanie">
        <h2 id="przygotowanie">Przygotowanie deklaracji</h2>
        <p>
          Deklarację sporządziliśmy <D date={STATEMENT_DATES.prepared} /> na podstawie samooceny. Sprawdziliśmy stronę:
        </p>
        <ul>
          <li>automatycznym testem axe (WCAG 2.2 AA i kontrast AAA), także w trybie wysokiego kontrastu,</li>
          <li>samą klawiaturą,</li>
          <li>przy powiększeniu tekstu do 150% i na ekranie szerokim na 320 px.</li>
        </ul>
        <p>
          Testy z czytnikami ekranu (NVDA, VoiceOver, TalkBack) i z udziałem użytkowników z niepełnosprawnościami są zaplanowane. Po nich
          zaktualizujemy deklarację. Deklarację przeglądamy co najmniej raz w roku.
        </p>
      </section>

      <section className="page-section" aria-labelledby="skroty">
        <h2 id="skroty">Skróty klawiaturowe</h2>
        <p>
          Strona nie ma własnych skrótów klawiaturowych, więc nie koliduje ze skrótami czytników ekranu. Działają standardowe skróty
          przeglądarki, np. <kbd>Tab</kbd> i <kbd>Shift</kbd> + <kbd>Tab</kbd> do przechodzenia między linkami oraz <kbd>Ctrl</kbd> +{' '}
          <kbd>+</kbd> do powiększania.
        </p>
      </section>

      <section className="page-section" aria-labelledby="kontakt-dostepnosc">
        <h2 id="kontakt-dostepnosc">Informacje zwrotne i kontakt</h2>
        <p>
          Jeśli coś na stronie jest dla Ciebie niedostępne albo trudne w obsłudze, napisz lub zadzwoń. Odpowiadamy też na pytania o
          dostępność uczelni.
        </p>
        <dl className="card contact">
          <div>
            <dt>Osoba do kontaktu</dt>
            <dd>
              {c.person}, {c.role}
            </dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd className="action">
              <EmailLink email={c.email} />
            </dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd className="action">
              <PhoneLink phone={c.phone} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="page-section" aria-labelledby="procedura">
        <h2 id="procedura">Żądanie zapewnienia dostępności i skarga</h2>
        <h3>Żądanie</h3>
        <p>
          Masz prawo zażądać, żebyśmy udostępnili Ci stronę, jej część albo informację w dostępny sposób – na przykład opisali film,
          przygotowali dokument w innym formacie albo podali treść tekstem. Możesz też poprosić o inny sposób dostępu do informacji.
        </p>
        <p>W żądaniu podaj:</p>
        <ul>
          <li>swoje imię, nazwisko i dane kontaktowe,</li>
          <li>stronę albo element strony, o który chodzi,</li>
          <li>jaki sposób udostępnienia Ci odpowiada (jeśli chcesz dostać informację w innej formie).</li>
        </ul>
        <p>
          Żądanie wyślij e-mailem na adres <EmailLink email={c.email} /> albo pocztą: {c.postal}.
        </p>
        <h3>Terminy</h3>
        <ul>
          <li>Zrealizujemy żądanie niezwłocznie, najpóźniej w ciągu 7 dni.</li>
          <li>Jeśli nie zdążymy, w ciągu tych 7 dni napiszemy, kiedy to zrobimy – nie później niż w ciągu 2 miesięcy od żądania.</li>
          <li>Jeśli nie możemy zapewnić dostępności, zaproponujemy inny sposób dostępu do informacji.</li>
        </ul>
        <h3>Skarga</h3>
        <p>
          Jeśli odmówimy, nie dotrzymamy terminu albo nie zgadzasz się na inny sposób dostępu, możesz złożyć do nas skargę na brak
          dostępności – tak samo jak żądanie. Po rozpatrzeniu skargi możesz złożyć wniosek do{' '}
          <a href="https://bip.brpo.gov.pl/">Rzecznika Praw Obywatelskich</a>.
        </p>
      </section>

      <section className="page-section" aria-labelledby="architektura">
        <h2 id="architektura">Dostępność architektoniczna</h2>
        <p>
          Kampus jest przy ul. Słonecznej 12 w Jasnogrodzie. Szczegóły, plan i trasy bez schodów są na stronie{' '}
          <Link to="/campus-map">Mapa kampusu</Link>.
        </p>
        <h3>Budynek A</h3>
        <ul>
          <li>Wejście główne bez progu, drzwi otwierają się automatycznie. Od bramy do wejścia, windy i auli prowadzi ścieżka dotykowa.</li>
          <li>Winda na wszystkie piętra, z komunikatami głosowymi i przyciskami opisanymi brajlem.</li>
          <li>Toaleta dostępna na każdym piętrze.</li>
          <li>Pętla indukcyjna w auli, w dziekanacie i na portierni.</li>
          <li>Na portierni zapytasz o drogę i wypożyczysz wózek.</li>
        </ul>
        <h3>Budynek B</h3>
        <ul>
          <li>Wejście bez schodów od strony parkingu, po pochylni (nachylenie 6%, poręcze). Wejście zachodnie ma 3 schody i nie ma pochylni.</li>
          <li>
            <strong>W budynku B nie ma windy</strong> – 1. piętro (m.in. sala B 112) jest dostępne tylko po schodach. Toalety nie są
            dostosowane. Jeśli masz zajęcia na piętrze, napisz do {DISABILITY_OFFICE.name.replace('Biuro', 'Biura')} – przeniesiemy je do
            sali na parterze.
          </li>
        </ul>
        <h3>Biblioteka</h3>
        <ul>
          <li>Wejście bez progu, drzwi automatyczne, toaleta dostępna.</li>
          <li>Pętla indukcyjna przy ladzie wypożyczeń.</li>
          <li>Dwa stanowiska z czytnikiem ekranu i linijką brajlowską oraz pokój cichej nauki.</li>
        </ul>
        <h3>Dojazd i inne</h3>
        <ul>
          <li>Dwa miejsca parkingowe dla osób z niepełnosprawnościami przy budynku B.</li>
          <li>Przystanek autobusowy „Słoneczna – Akademia” jest ok. 140 m od bramy głównej; dojdziesz chodnikiem bez krawężników.</li>
          <li>Do wszystkich budynków możesz wejść z psem asystującym.</li>
          <li>
            Tłumacza polskiego języka migowego zamówisz w <Link to="/accessibility#disability-office">{DISABILITY_OFFICE.name}</Link> – najlepiej
            co najmniej 3 dni robocze wcześniej.
          </li>
        </ul>
      </section>

      <section className="page-section" aria-labelledby="aplikacje">
        <h2 id="aplikacje">Aplikacje mobilne</h2>
        <p>Uczelnia nie ma aplikacji mobilnej. Strona działa na telefonie w przeglądarce.</p>
      </section>

      <p className="meta">
        Uczelnia, osoby, daty i dane kontaktowe na tej stronie są fikcyjne – to makieta przygotowana na zajęcia.
      </p>
    </>
  );
}
