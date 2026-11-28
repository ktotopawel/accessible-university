import { Link } from 'react-router';
import { Breadcrumb, EmailLink, PageTitle, PhoneLink } from '../components/ui.jsx';
import { DISABILITY_OFFICE, PROGRAMMES, UNIVERSITY } from '../data/university.js';

// Information about the university in easy-to-read text (tekst łatwy do czytania, ETR), required
// by the act on accessibility for persons with special needs (art. 6). ETR rules used here:
// short sentences, one thought per line, common words, hard words in bold and explained right away,
// no abbreviations, numbers as digits, "Ty" form. Contacts come from src/data/.
const WHAT_IT_IS = {
  informatyka: 'praca z komputerami i programami',
  pielegniarstwo: 'opieka nad chorymi ludźmi',
  zarzadzanie: 'jak prowadzić firmę i pracować z ludźmi',
};

export default function EasyToRead() {
  return (
    <>
      <PageTitle>Tekst łatwy do czytania</PageTitle>
      <Breadcrumb items={[{ to: '/accessibility', label: 'Dostępność' }]} current="Tekst łatwy do czytania" />
      <h1>Akademia Jasnogrodzka – tekst łatwy do czytania</h1>
      <div className="etr">
        <p>Tu piszemy prostymi słowami o naszej uczelni.</p>
        <p>Piszemy, czego uczymy, gdzie jesteśmy i jak się z nami skontaktować.</p>

        <section className="page-section" aria-labelledby="etr-kim-jestesmy">
          <h2 id="etr-kim-jestesmy">Kim jesteśmy</h2>
          <p>
            {UNIVERSITY.name} to <strong>uczelnia</strong>.
          </p>
          <p>Uczelnia to szkoła dla dorosłych.</p>
          <p>Na uczelnię idziesz po szkole średniej.</p>
          <p>
            Ludzie, którzy uczą się na uczelni, to <strong>studenci</strong>.
          </p>
          <p>
            Nauka na uczelni to <strong>studia</strong>.
          </p>
        </section>

        <section className="page-section" aria-labelledby="etr-czego-uczymy">
          <h2 id="etr-czego-uczymy">Czego uczymy</h2>
          <p>U nas możesz studiować:</p>
          <ul>
            {PROGRAMMES.map((p) => (
              <li key={p.slug}>
                <strong>{p.name}</strong> – to {WHAT_IT_IS[p.slug]}.
              </li>
            ))}
          </ul>
        </section>

        <section className="page-section" aria-labelledby="etr-gdzie">
          <h2 id="etr-gdzie">Gdzie jesteśmy</h2>
          <p>Uczelnia jest w mieście Jasnogród.</p>
          <p>Adres uczelni: {UNIVERSITY.address}.</p>
          <p>Blisko uczelni jest przystanek autobusowy „Słoneczna – Akademia”.</p>
          <p>Uczelnia ma 3 budynki: budynek A, budynek B i bibliotekę.</p>
          <p>Do każdego budynku wejdziesz bez schodów.</p>
          <p>W budynku A jest winda.</p>
          <p>W budynku B nie ma windy.</p>
          <p>
            Wszystkie budynki są na stronie <Link to="/campus-map">Mapa kampusu</Link>.
          </p>
          <p>
            <strong>Kampus</strong> to teren uczelni ze wszystkimi budynkami.
          </p>
        </section>

        <section className="page-section" aria-labelledby="etr-kontakt">
          <h2 id="etr-kontakt">Jak się z nami skontaktować</h2>
          <p>Możesz do nas zadzwonić.</p>
          <p className="action">
            Numer telefonu: <PhoneLink phone={UNIVERSITY.phone} />
          </p>
          <p>Możesz do nas napisać e-mail.</p>
          <p className="action">
            Adres e-mail: <EmailLink email={UNIVERSITY.email} />
          </p>
          <p>Możesz też do nas przyjść.</p>
          <p>Wejdź do budynku A.</p>
          <p>
            Przy wejściu jest <strong>portiernia</strong>.
          </p>
          <p>W portierni pracownik powie Ci, dokąd iść.</p>
        </section>

        <section className="page-section" aria-labelledby="etr-pomoc">
          <h2 id="etr-pomoc">Pomoc dla osób z niepełnosprawnościami</h2>
          <p>
            Na uczelni jest <strong>{DISABILITY_OFFICE.name}</strong>.
          </p>
          <p>Pracownicy biura pomagają studentom z niepełnosprawnościami.</p>
          <p>Pomagają też osobom, które chcą u nas studiować.</p>
          <p>Biuro może na przykład:</p>
          <ul>
            <li>dać Ci więcej czasu na egzamin,</li>
            <li>zamówić tłumacza języka migowego,</li>
            <li>pożyczyć Ci sprzęt, który pomaga w nauce.</li>
          </ul>
          <p>Biuro jest w budynku A, na parterze.</p>
          <p>Biuro jest otwarte: {DISABILITY_OFFICE.hours.toLowerCase()}.</p>
          <p className="action">
            Numer telefonu do biura: <PhoneLink phone={DISABILITY_OFFICE.phone} />
          </p>
          <p className="action">
            Adres e-mail biura: <EmailLink email={DISABILITY_OFFICE.email} />
          </p>
        </section>

        <section className="page-section" aria-labelledby="etr-strona">
          <h2 id="etr-strona">Jak korzystać z tej strony</h2>
          <p>Na górze strony są przyciski: A, A+ i A++.</p>
          <p>Te przyciski powiększają tekst.</p>
          <p>Obok jest przycisk „Wysoki kontrast”.</p>
          <p>Ten przycisk zmienia kolory strony na czarny, biały i żółty.</p>
          <p>Wtedy tekst jest lepiej widoczny.</p>
        </section>
      </div>
    </>
  );
}
