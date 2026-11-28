import { Fragment, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, useLocation, useSearchParams } from 'react-router';
import { PageTitle } from '../components/ui.jsx';
import CampusPlan, { SymbolIcon } from '../components/CampusPlan.jsx';
import { AREAS, DEFAULT_START, FEATURES, MARKER_TYPES, NODES, ROUTE_MODES, ROUTE_PLACES, findRoute, stepsLabel } from '../data/campus.js';
import { DISABILITY_OFFICE } from '../data/university.js';
import { ROOMS } from '../data/schedule.js';

const NO_LOOP = 'Nie. Pętla jest w auli, w dziekanacie, na portierni i w bibliotece.';

/** Link to the route finder with a route already chosen (own URL: shareable, "back" works). */
const routeLink = (to, from = DEFAULT_START, mode = 'bez-schodow') =>
  `/campus-map?skad=${from}&dokad=${to}&trasa=${mode}#wynik-trasy`;

// Same fields for every room. Timetable entries link here as /campus-map#<room id>.
const ROOM_DETAILS = [
  {
    room: ROOMS.aula,
    floor: 'Budynek A, parter',
    access: 'Od wejścia głównego prosto korytarzem, wzdłuż ścieżki dotykowej, bez schodów i progów. Drzwi otwierasz przyciskiem.',
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

const LINE_LEGEND = [
  { cls: 'walk', label: 'Chodnik, ścieżka bez schodów' },
  { cls: 'tactile', label: 'Ścieżka dotykowa (żółty pas z wypukłymi punktami)' },
  { cls: 'stairs', label: 'Schody' },
  { cls: 'route', label: 'Wyznaczona trasa' },
];

function LineSample({ cls }) {
  return (
    <svg className="line-sample" viewBox="0 0 48 16" width="48" height="16" aria-hidden="true" focusable="false">
      {cls === 'route' && <line className="plan-route__casing" x1="4" y1="8" x2="44" y2="8" />}
      <line className={cls === 'route' ? 'plan-route__line' : cls === 'tactile' ? 'plan-path plan-path--indoor' : `plan-path plan-path--${cls}`} x1="4" y1="8" x2="44" y2="8" />
      {cls === 'stairs' && <line className="plan-path__treads" x1="4" y1="8" x2="44" y2="8" />}
      {cls === 'tactile' && (
        <>
          <line className="plan-path__tactile-band" x1="4" y1="8" x2="44" y2="8" />
          <line className="plan-path__tactile" x1="4" y1="8" x2="44" y2="8" />
        </>
      )}
    </svg>
  );
}

function PlaceSelect({ name, label, defaultValue, error, placeholder }) {
  const id = `route-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          Błąd: {error}
        </p>
      )}
      <select id={id} name={name} defaultValue={defaultValue} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-error` : undefined}>
        {placeholder && <option value="">{placeholder}</option>}
        {ROUTE_PLACES.map((area) => (
          <optgroup key={area.id} label={area.name}>
            {area.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

// Route result, right above the plan: after "Wyznacz trasę" the page scrolls here, so the route
// on the plan is in view; the steps are right below the plan (RouteSteps).
function RouteSummary({ from, to, mode, route }) {
  const modeLabel = ROUTE_MODES.find((m) => m.id === mode).label;
  return (
    <section className="card route-result" aria-labelledby="wynik-trasy">
      <h3 id="wynik-trasy" tabIndex={-1}>
        Wyznaczona trasa
      </h3>
      <p>
        Z: {NODES[from].name}
        <br />
        Do: {NODES[to].name}
      </p>
      {route.blocked ? (
        <>
          <p>
            <strong>Nie ma trasy bez schodów.</strong> {route.blocked}
          </p>
          <p>
            Jeśli masz tu zajęcia,{' '}
            <Link to="/accessibility#disability-office">napisz do {DISABILITY_OFFICE.name.replace('Biuro', 'Biura')}</Link> – pomożemy
            przenieść je do sali bez barier.
          </p>
          <p className="feature-list__links">
            <Link to={routeLink(to, from, 'najkrotsza')}>Pokaż trasę ze schodami</Link>
            <a href="#wyznacz-trase">Zmień trasę</a>
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>{route.stairs ? `Na trasie są schody: razem ${stepsLabel(route.stairs)}.` : `${modeLabel}.`}</strong> Około{' '}
            {route.metres} m, ok. {route.minutes} min.
            {route.extraMetres != null && ` Trasa bez schodów jest dłuższa o ok. ${route.extraMetres} m.`}
            {route.noAlternative && ' Trasy bez schodów tu nie ma.'} Trasa jest zaznaczona na planie poniżej grubą linią.
          </p>
          <p className="feature-list__links">
            <a href="#kroki-trasy">Opis trasy krok po kroku</a>
            <a href="#wyznacz-trase">Zmień trasę</a>
          </p>
        </>
      )}
    </section>
  );
}

function RouteSteps({ route }) {
  return (
    <section className="route-steps-section" aria-labelledby="kroki-trasy">
      <h3 id="kroki-trasy">Trasa krok po kroku</h3>
      <ol className="route-steps">
        {route.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}

function useRoute() {
  const [params] = useSearchParams();
  const from = params.get('skad');
  const to = params.get('dokad');
  const mode = ROUTE_MODES.some((m) => m.id === params.get('trasa')) ? params.get('trasa') : 'bez-schodow';
  const valid = NODES[from]?.name && NODES[to]?.name && from !== to;
  return { from, to, mode, route: valid ? findRoute(from, to, mode) : null };
}

export default function CampusMap() {
  const [hidden, setHidden] = useState(() => new Set());
  const [errors, setErrors] = useState({});
  const [, setParams] = useSearchParams();
  const { search } = useLocation();
  const { from, to, mode, route } = useRoute();
  const firstRender = useRef(true);

  // A new route (form or a "Trasa" link on this page): focus its heading, so a screen reader reads it.
  // On the first render Layout's route focus handles #wynik-trasy.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setErrors({});
    const heading = document.getElementById('wynik-trasy');
    if (heading) {
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: 'start' });
    }
    // Narrow screen: the plan scrolls sideways in its frame, so bring the drawn route into view.
    const frame = document.querySelector('.plan-frame');
    const drawn = document.querySelector('.plan-route');
    if (frame && drawn && frame.scrollWidth > frame.clientWidth) {
      const r = drawn.getBoundingClientRect();
      const f = frame.getBoundingClientRect();
      frame.scrollLeft += r.left + r.width / 2 - (f.left + frame.clientWidth / 2);
    }
  }, [search]);

  function toggleType(type) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  // "Pokaż na planie" for a type that is filtered out: show it first, so the #map-… target exists.
  function revealOnPlan(type) {
    if (hidden.has(type)) flushSync(() => toggleType(type));
  }

  function submitRoute(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const skad = data.get('skad');
    const dokad = data.get('dokad');
    const next = {};
    if (!dokad) next.dokad = 'wybierz, dokąd chcesz dojść.';
    else if (dokad === skad) next.dokad = 'cel jest taki sam jak start. Wybierz inne miejsce.';
    setErrors(next);
    if (next.dokad) {
      // Focus the field with the error (3.3.1); its message is read via aria-describedby.
      requestAnimationFrame(() => document.getElementById('route-dokad')?.focus());
      return;
    }
    setParams({ skad, dokad, trasa: data.get('trasa') }, { preventScrollReset: true });
  }

  const listedFeatures = FEATURES.filter((f) => !f.room);

  return (
    <>
      <PageTitle>Mapa kampusu</PageTitle>
      <h1>Mapa kampusu</h1>
      <p className="lead">
        Kampus w Jasnogrodzie, ul. Słoneczna 12: budynki A i B oraz biblioteka. Na planie zaznaczyliśmy udogodnienia i bariery. Wszystko,
        co jest na planie, opisujemy też tekstem.
      </p>
      <ul className="jumplist" role="list">
        <li>
          <a href="#wyznacz-trase">Wyznacz trasę</a>
        </li>
        <li>
          <a href="#udogodnienia">Udogodnienia i bariery (tekst)</a>
        </li>
        <li>
          <a href="#sale">Sale</a>
        </li>
      </ul>

      <section className="page-section" aria-labelledby="plan-kampusu">
        <h2 id="plan-kampusu" tabIndex={-1}>
          Plan kampusu
        </h2>
        <p id="plan-opis">
          Północ jest u góry, ulica Słoneczna na dole. Każdy znak na planie to link do opisu miejsca. Na telefonie przesuń plan palcem w
          bok albo go powiększ.
        </p>
        <p className="action">
          <a href="#wyznacz-trase">Pomiń plan</a>
        </p>

        <fieldset className="plan-filters">
          <legend>Co pokazać na planie</legend>
          <ul role="list">
            {MARKER_TYPES.map((t) => (
              <li key={t.id}>
                <label>
                  <input type="checkbox" checked={!hidden.has(t.id)} onChange={() => toggleType(t.id)} />
                  <SymbolIcon type={t.id} />
                  <span>{t.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        {route && <RouteSummary from={from} to={to} mode={mode} route={route} />}

        <div className="plan-frame">
          <CampusPlan hidden={hidden} route={route?.legs ? route : null} labelledBy="plan-kampusu" describedBy="plan-opis" />
        </div>

        {route?.steps && <RouteSteps route={route} />}

        <h3>Linie na planie</h3>
        <ul className="line-legend" role="list">
          {LINE_LEGEND.map((l) => (
            <li key={l.cls}>
              <LineSample cls={l.cls} />
              {l.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section" aria-labelledby="wyznacz-trase">
        <h2 id="wyznacz-trase">Wyznacz trasę</h2>
        <p>Wybierz, skąd i dokąd idziesz. Trasę pokażemy na planie wyżej i opiszemy krok po kroku pod planem.</p>
        <form className="route-form" onSubmit={submitRoute} noValidate key={search}>
          <PlaceSelect name="skad" label="Skąd" defaultValue={NODES[from]?.name ? from : DEFAULT_START} />
          <PlaceSelect name="dokad" label="Dokąd" defaultValue={NODES[to]?.name ? to : ''} placeholder="Wybierz miejsce" error={errors.dokad} />
          <fieldset className="field">
            <legend>Rodzaj trasy</legend>
            {ROUTE_MODES.map((m) => (
              <label key={m.id} className="radio">
                <input type="radio" name="trasa" value={m.id} defaultChecked={m.id === mode} />
                <span>
                  {m.label} <span className="hint">({m.hint})</span>
                </span>
              </label>
            ))}
          </fieldset>
          <button type="submit" className="button">
            Wyznacz trasę
          </button>
        </form>

      </section>

      <section className="page-section" aria-labelledby="udogodnienia">
        <h2 id="udogodnienia">Udogodnienia i bariery</h2>
        <p>Ten sam opis co na planie, miejsce po miejscu.</p>
        {AREAS.map((area) => (
          <Fragment key={area.id}>
            <h3>{area.name}</h3>
            <ul className="feature-list" role="list">
              {listedFeatures
                .filter((f) => f.area === area.id)
                .map((f) => {
                  const routeTarget = f.node && NODES[f.node].name ? f.node : null;
                  return (
                    <li key={f.id} id={f.id} tabIndex={-1}>
                      <SymbolIcon type={f.type} label="" />
                      <div>
                        <p>
                          <strong>
                            {f.type === 'barrier' && 'Bariera: '}
                            {f.name}
                          </strong>
                        </p>
                        <p>{f.text}</p>
                        <p className="feature-list__links">
                          <a href={`#map-${f.id}`} onClick={() => revealOnPlan(f.type)}>
                            Pokaż na planie<span className="sr-only">: {f.name}</span>
                          </a>
                          {routeTarget && (
                            <Link to={routeLink(routeTarget)}>
                              Trasa bez schodów<span className="sr-only"> do: {f.name}</span>
                            </Link>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Fragment>
        ))}
      </section>

      <section className="page-section" aria-labelledby="sale">
        <h2 id="sale">Sale</h2>
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
            <p className="feature-list__links">
              <Link to={routeLink(room.id)}>
                Trasa od bramy głównej<span className="sr-only"> do: {room.name}</span>
              </Link>
              <a href={`#map-${room.id}`} onClick={() => revealOnPlan('place')}>
                Pokaż na planie<span className="sr-only">: {room.name}</span>
              </a>
              <Link to="/schedule">Wróć do planu zajęć</Link>
            </p>
          </Fragment>
        ))}

        <p>
          <strong>Uwaga:</strong> budynki, sale i trasy są przykładowe (uczelnia jest fikcyjna).
        </p>
      </section>
    </>
  );
}
