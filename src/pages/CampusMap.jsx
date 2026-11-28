import { Fragment } from 'react';
import { Link } from 'react-router';
import { PageTitle, Placeholder } from '../components/ui.jsx';
import { ROOMS } from '../data/schedule.js';

const NO_LOOP = 'Nie. Pętla jest w auli i w dziekanacie.';

// Same fields for every room. Timetable entries link here as /campus-map#<room id>.
const ROOM_DETAILS = [
  {
    room: ROOMS.aula,
    floor: 'Budynek A, parter',
    access: (
      <>
        Od wejścia głównego prosto korytarzem, bez schodów i progów. <a href="#trasa-do-auli">Opis trasy do auli</a>.
      </>
    ),
    wheelchair: 'Tak',
    loop: 'Tak',
  },
  { room: ROOMS['sala-a-101'], floor: 'Budynek A, piętro 1', access: 'Windą obok portierni, bez schodów.', wheelchair: 'Tak', loop: NO_LOOP },
  { room: ROOMS['sala-b-5'], floor: 'Budynek B, parter', access: 'Przez pochylnię od strony parkingu, bez schodów.', wheelchair: 'Tak', loop: NO_LOOP },
  {
    room: ROOMS['sala-b-112'],
    floor: 'Budynek B, piętro 1',
    access: 'Tylko po schodach. W budynku B nie ma windy.',
    wheelchair: (
      <>
        Nie. Sala jest niedostępna dla osób poruszających się na wózku. Jeśli to Ciebie dotyczy,{' '}
        <Link to="/accessibility#disability-office">skontaktuj się z Biurem ds. Osób z Niepełnosprawnościami</Link>, żeby przenieść
        zajęcia do sali na parterze.
      </>
    ),
    loop: NO_LOOP,
  },
];

export default function CampusMap() {
  return (
    <>
      <PageTitle>Mapa kampusu</PageTitle>
      <h1>Mapa kampusu</h1>
      <p className="lead">Kampus w Jasnogrodzie, ul. Słoneczna 12. Każdą informację z planu opisujemy też tekstem.</p>

      <Placeholder>Miejsce na plan kampusu. Plan jest dodatkiem – nie jedynym źródłem informacji.</Placeholder>

      <h2>Budynek A</h2>
      <ul>
        <li>Wejście główne bez progu, drzwi automatyczne.</li>
        <li>Winda obok portierni, na wszystkie piętra, z komunikatami głosowymi.</li>
        <li>Toaleta dostosowana na każdym piętrze.</li>
        <li>Pętla indukcyjna w auli i w dziekanacie.</li>
      </ul>

      <h2>Budynek B</h2>
      <ul>
        <li>Wejście przez pochylnię od strony parkingu.</li>
        <li>Brak windy – pierwsze piętro dostępne tylko po schodach.</li>
      </ul>

      <h2>Sale</h2>
      <p>
        Opisy sal, do których prowadzą linki z <Link to="/schedule">planu zajęć</Link>.
      </p>

      {ROOM_DETAILS.map(({ room, floor, access, wheelchair, loop }) => (
        <Fragment key={room.id}>
          <h3 id={room.id}>{room.name}</h3>
          <dl>
            <dt>Budynek i piętro</dt>
            <dd>{floor}</dd>
            <dt>Dojście</dt>
            <dd>{access}</dd>
            <dt>Miejsca dla osób na wózkach</dt>
            <dd>{wheelchair}</dd>
            <dt>Pętla indukcyjna</dt>
            <dd>{loop}</dd>
          </dl>
          <p className="action">
            <Link to="/schedule">Wróć do planu zajęć</Link>
          </p>
        </Fragment>
      ))}

      <h2 id="trasa-do-auli">Przykładowa trasa: od wejścia głównego do auli</h2>
      <ol>
        <li>Po wejściu idź prosto korytarzem. Ścieżka dotykowa prowadzi do windy.</li>
        <li>Miń windę po lewej stronie.</li>
        <li>Aula jest na końcu korytarza. Drzwi otwierasz przyciskiem po prawej stronie.</li>
      </ol>

      <p>
        <strong>Uwaga:</strong> dane o budynkach i trasie są przykładowe.
      </p>
    </>
  );
}
