// Campus plan and accessible routing (fictional campus, ul. Słoneczna 12).
// One source for the drawn plan (src/components/CampusPlan.jsx), the text descriptions and the
// route finder on /campus-map. Coordinates are plan units (viewBox 640 × 470); 1 unit = 0.5 m.

import { DISABILITY_OFFICE } from './university.js';

export const PLAN_SIZE = { width: 640, height: 470 };
const METRES_PER_UNIT = 0.5;

// Marker types = the plan's legend and the "Co pokazać na planie" filter.
// Every type has its own symbol, so nothing relies on colour alone (1.4.1).
export const MARKER_TYPES = [
  { id: 'entrance', label: 'Wejście bez progów' },
  { id: 'ramp', label: 'Pochylnia' },
  { id: 'lift', label: 'Winda' },
  { id: 'wc', label: 'Toaleta dostępna' },
  { id: 'loop', label: 'Pętla indukcyjna' },
  { id: 'quiet', label: 'Pokój cichej nauki' },
  { id: 'info', label: 'Portiernia (pomoc, wózek do wypożyczenia)' },
  { id: 'parking', label: 'Parking: miejsca z kopertą' },
  { id: 'bus', label: 'Przystanek autobusowy' },
  { id: 'barrier', label: 'Bariera: schody, brak windy' },
  { id: 'place', label: 'Sale i biura (ramka przerywana: 1. piętro)' },
];

// Buildings and other areas drawn on the plan; also the groups of the text description.
export const AREAS = [
  { id: 'outside', name: 'Na zewnątrz' },
  { id: 'a', name: 'Budynek A', rect: [180, 40, 280, 175] },
  { id: 'b', name: 'Budynek B', rect: [480, 60, 135, 195] },
  { id: 'c', name: 'Biblioteka', rect: [25, 60, 140, 170] },
];

// Graph nodes. `label` is used in route steps ("Idź do: …"), `name` in the route selects.
// `junction` nodes are only crossings: route steps through them are merged.
const N = (id, x, y, label, extra = {}) => ({ id, x, y, label, floor: 0, ...extra });
export const NODES = Object.fromEntries(
  [
    // Outside
    N('przystanek', 60, 421, 'przystanek autobusowy „Słoneczna – Akademia”', { area: 'outside', name: 'Przystanek autobusowy' }),
    N('brama', 320, 405, 'brama główna', { area: 'outside', name: 'Brama główna' }),
    N('parking', 530, 345, 'miejsca parkingowe z kopertą', { area: 'outside', name: 'Parking: miejsca z kopertą' }),
    N('plac', 320, 300, 'dziedziniec', { junction: true }),
    N('j-zach', 95, 300, 'ścieżka przy bibliotece', { junction: true }),
    N('j-wsch', 450, 300, 'ścieżka przy parkingu', { junction: true }),
    N('j-b', 450, 150, 'ścieżka przy budynku B', { junction: true }),
    // Building A
    N('wej-a', 320, 215, 'wejście główne do budynku A'),
    N('hol-a', 320, 188, 'hol z portiernią w budynku A', { area: 'a', name: 'Portiernia – budynek A, parter' }),
    N('korytarz-a', 320, 150, 'korytarz budynku A', { junction: true }),
    N('winda-a', 295, 150, 'winda w budynku A'),
    N('winda-a-1', 295, 150, 'winda, 1. piętro budynku A', { floor: 1 }),
    N('aula', 300, 75, 'aula', {
      area: 'a',
      name: 'Aula – budynek A, parter',
      arrive: 'Drzwi do auli otwierasz przyciskiem po prawej stronie.',
    }),
    N('wc-a', 250, 188, 'toaleta dostępna w budynku A', { area: 'a', name: 'Toaleta dostępna – budynek A, parter' }),
    N('dziekanat', 410, 115, 'dziekanat', { area: 'a', name: 'Dziekanat – budynek A, parter' }),
    N('bon', 410, 190, DISABILITY_OFFICE.name, { area: 'a', name: `${DISABILITY_OFFICE.name} – budynek A, parter` }),
    N('sala-a-101', 235, 120, 'sala A 101', { floor: 1, area: 'a', name: 'Sala A 101 – budynek A, 1. piętro' }),
    // Building B
    N('wej-b-zach', 480, 150, 'wejście zachodnie do budynku B'),
    N('wej-b-pd', 545, 255, 'wejście południowe do budynku B'),
    N('korytarz-b', 540, 175, 'korytarz budynku B', { junction: true }),
    N('sala-b-5', 520, 100, 'sala B 5', { area: 'b', name: 'Sala B 5 – budynek B, parter' }),
    N('schody-b', 585, 190, 'schody w budynku B'),
    N('b-1', 585, 190, '1. piętro budynku B', { floor: 1, junction: true }),
    N('sala-b-112', 565, 135, 'sala B 112', {
      floor: 1,
      area: 'b',
      name: 'Sala B 112 – budynek B, 1. piętro',
      noStepFree: 'Sala B 112 jest na 1. piętrze budynku B, a w budynku B nie ma windy.',
    }),
    // Library
    N('wej-c', 95, 230, 'wejście do biblioteki'),
    N('hol-c', 95, 185, 'lada wypożyczeń w bibliotece', { junction: true }),
    N('czytelnia', 95, 105, 'czytelnia', { area: 'c', name: 'Czytelnia (stanowiska z czytnikiem ekranu) – biblioteka' }),
    N('cisza', 55, 150, 'pokój cichej nauki', { area: 'c', name: 'Pokój cichej nauki – biblioteka' }),
    N('wc-c', 135, 150, 'toaleta dostępna w bibliotece', { area: 'c', name: 'Toaleta dostępna – biblioteka' }),
  ].map((n) => [n.id, n]),
);

// Paths. kind: walk (outside), indoor, ramp, stairs, lift. `via` = bend points for drawing.
// Stairs and ramps go *up* from `a` to `b`. `steps` > 0 = not step-free.
// `note` is added to the route step in both directions, `noteTo` only when going from a to b;
// `tactile` = tactile paving along the path (mentioned when a whole step follows it).
const E = (a, b, kind, extra = {}) => ({ a, b, kind, ...extra });
export const EDGES = [
  E('przystanek', 'brama', 'walk', { via: [[320, 421]], note: 'Chodnikiem wzdłuż ul. Słonecznej, bez krawężników.' }),
  E('przystanek', 'j-zach', 'stairs', { via: [[60, 390], [95, 360]], steps: 12, note: 'Schody terenowe z poręczami po obu stronach.' }),
  E('brama', 'plac', 'walk', { tactile: true }),
  E('plac', 'wej-a', 'walk', { tactile: true }),
  E('plac', 'j-zach', 'walk'),
  E('plac', 'j-wsch', 'walk'),
  E('j-zach', 'wej-c', 'walk'),
  E('j-wsch', 'j-b', 'walk'),
  E('j-b', 'wej-b-zach', 'stairs', { steps: 3, note: 'Przy tym wejściu nie ma pochylni.' }),
  E('j-wsch', 'parking', 'walk', { via: [[450, 345]] }),
  E('parking', 'wej-b-pd', 'ramp', { note: 'Pochylnia o nachyleniu 6%, z poręczami. Drzwi otwierasz przyciskiem.' }),
  E('wej-a', 'hol-a', 'indoor', { tactile: true, note: 'Drzwi otwierają się automatycznie, bez progu.' }),
  E('hol-a', 'korytarz-a', 'indoor', { tactile: true }),
  E('korytarz-a', 'winda-a', 'indoor', { tactile: true, noteTo: 'Winda jest po lewej stronie korytarza.' }),
  E('korytarz-a', 'aula', 'indoor', { tactile: true, via: [[320, 75]], noteTo: 'Aula jest na końcu korytarza.' }),
  E('hol-a', 'wc-a', 'indoor'),
  E('hol-a', 'bon', 'indoor', { noteTo: 'Pokój 0.12, po prawej stronie holu.' }),
  E('korytarz-a', 'dziekanat', 'indoor', { via: [[320, 115]] }),
  E('winda-a', 'winda-a-1', 'lift'),
  E('winda-a-1', 'sala-a-101', 'indoor', { via: [[235, 150]] }),
  E('wej-b-zach', 'korytarz-b', 'indoor', { via: [[540, 150]] }),
  E('wej-b-pd', 'korytarz-b', 'indoor'),
  E('korytarz-b', 'sala-b-5', 'indoor', { via: [[520, 175]] }),
  E('korytarz-b', 'schody-b', 'indoor', { via: [[585, 175]] }),
  E('schody-b', 'b-1', 'stairs', { steps: 20, metres: 8 }),
  E('b-1', 'sala-b-112', 'indoor', { via: [[565, 190]] }),
  E('wej-c', 'hol-c', 'indoor', { note: 'Drzwi otwierają się automatycznie, bez progu.' }),
  E('hol-c', 'czytelnia', 'indoor'),
  E('hol-c', 'cisza', 'indoor', { via: [[55, 185]] }),
  E('hol-c', 'wc-c', 'indoor', { via: [[135, 185]] }),
];

// What the plan marks and the text describes. `id` is the anchor of the description
// (rooms use the timetable's room ids, so /campus-map#aula keeps working); the marker is #map-<id>.
// `x`/`y` default to the node's position. `room: true` = described in the "Sale" section.
const F = (id, type, area, name, text, extra = {}) => ({ id, type, area, name, text, ...extra });
export const FEATURES = [
  F('przystanek', 'bus', 'outside', 'Przystanek autobusowy „Słoneczna – Akademia”', 'Linie 4 i 12. Peron na wysokości podłogi autobusu. Do bramy głównej ok. 140 m chodnikiem bez krawężników.', { node: 'przystanek' }),
  F('schody-terenowe', 'barrier', 'outside', 'Schody terenowe od przystanku', 'Skrót od przystanku do biblioteki: 12 stopni z poręczami, bez pochylni. Bez schodów dojdziesz chodnikiem przez bramę główną.', { x: 95, y: 368 }),
  F('brama', 'entrance', 'outside', 'Brama główna', 'Bez progu i krawężnika. Od bramy do wejścia głównego budynku A prowadzi ścieżka dotykowa.', { node: 'brama' }),
  F('parking', 'parking', 'outside', 'Parking: miejsca z kopertą', 'Dwa miejsca dla osób z niepełnosprawnościami, szersze (3,6 m), tuż przy pochylni do budynku B. Wjazd od ul. Słonecznej.', { node: 'parking' }),

  F('wejscie-a', 'entrance', 'a', 'Wejście główne', 'Bez progu, drzwi otwierają się automatycznie. Od wejścia ścieżka dotykowa prowadzi do windy i do auli.', { node: 'wej-a' }),
  F('portiernia', 'info', 'a', 'Portiernia', 'Tu zapytasz o drogę i wypożyczysz wózek na czas pobytu. Przy okienku jest pętla indukcyjna.', { node: 'hol-a', x: 345, y: 188 }),
  F('winda-a', 'lift', 'a', 'Winda', 'Obok portierni, na wszystkie piętra. Komunikaty głosowe, przyciski z opisem brajlem, drzwi szerokości 90 cm.', { node: 'winda-a' }),
  F('wc-a', 'wc', 'a', 'Toaleta dostępna', 'Na każdym piętrze, przy holu. Przycisk wzywania pomocy.', { node: 'wc-a' }),
  F('aula', 'place', 'a', 'Aula', 'Parter. Opis w części „Sale”.', { node: 'aula', room: true, short: 'Aula' }),
  F('petla-aula', 'loop', 'a', 'Pętla indukcyjna w auli', 'Działa na całej sali. Przełącz aparat słuchowy na tryb T.', { x: 350, y: 75 }),
  F('sala-a-101', 'place', 'a', 'Sala A 101', '1. piętro. Opis w części „Sale”.', { node: 'sala-a-101', room: true, short: 'A 101', floor: 1 }),
  F('dziekanat', 'place', 'a', 'Dziekanat', 'Parter, wejście bez progu, okienko obniżone do 80 cm.', { node: 'dziekanat', short: 'Dziekanat' }),
  F('petla-dziekanat', 'loop', 'a', 'Pętla indukcyjna w dziekanacie', 'Przy okienku obsługi.', { x: 410, y: 152 }),
  F('bon', 'place', 'a', DISABILITY_OFFICE.name, `Parter, pokój 0.12, po prawej stronie holu. Dyżury: ${DISABILITY_OFFICE.hours.toLowerCase()}.`, { node: 'bon', short: 'Biuro OzN' }),

  F('wejscie-b-pd', 'ramp', 'b', 'Wejście południowe z pochylnią', 'Od strony parkingu. Pochylnia o nachyleniu 6%, z poręczami, drzwi otwierane przyciskiem.', { node: 'wej-b-pd' }),
  F('wejscie-b-zach', 'barrier', 'b', 'Wejście zachodnie: 3 schody', 'Bez pochylni. Bez schodów wejdziesz do budynku B od strony parkingu.', { node: 'wej-b-zach' }),
  F('sala-b-5', 'place', 'b', 'Sala B 5', 'Parter. Opis w części „Sale”.', { node: 'sala-b-5', room: true, short: 'B 5' }),
  F('schody-b', 'barrier', 'b', 'Brak windy', 'Na 1. piętro (m.in. sala B 112) prowadzą tylko schody: 20 stopni. Toalety w budynku B nie są dostosowane.', { node: 'schody-b' }),
  F('sala-b-112', 'place', 'b', 'Sala B 112', '1. piętro, tylko po schodach. Opis w części „Sale”.', { node: 'sala-b-112', room: true, short: 'B 112', floor: 1 }),

  F('wejscie-c', 'entrance', 'c', 'Wejście do biblioteki', 'Bez progu, drzwi otwierają się automatycznie.', { node: 'wej-c' }),
  F('lada-c', 'loop', 'c', 'Lada wypożyczeń z pętlą indukcyjną', 'Przy ladzie poprosisz też o pomoc w znalezieniu książki.', { node: 'hol-c' }),
  F('czytelnia', 'place', 'c', 'Czytelnia', 'Dwa stanowiska z czytnikiem ekranu i linijką brajlowską, stoły z regulacją wysokości.', { node: 'czytelnia', short: 'Czytelnia' }),
  F('cisza', 'quiet', 'c', 'Pokój cichej nauki', 'Bez hałasu, z przygaszonym światłem – gdy potrzebujesz odpocząć od bodźców. Bez rezerwacji.', { node: 'cisza' }),
  F('wc-c', 'wc', 'c', 'Toaleta dostępna', 'Obok holu biblioteki.', { node: 'wc-c' }),
].map((f) => {
  const node = f.node && NODES[f.node];
  return { ...f, x: f.x ?? node.x, y: f.y ?? node.y, floor: f.floor ?? 0 };
});

// Places offered in the route finder, grouped by area (rendered as <optgroup>s).
export const ROUTE_PLACES = AREAS.map((area) => ({
  ...area,
  nodes: Object.values(NODES).filter((n) => n.name && n.area === area.id),
}));
export const DEFAULT_START = 'brama';

export const ROUTE_MODES = [
  { id: 'bez-schodow', label: 'Bez schodów i progów', hint: 'np. na wózku, o kulach, z wózkiem dziecięcym lub walizką' },
  { id: 'najkrotsza', label: 'Najkrótsza', hint: 'trasa może prowadzić po schodach' },
];

// --- Routing -------------------------------------------------------------------------

const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);

/** Points of an edge, oriented from `from` to the other end. */
export function edgePoints(edge, from = edge.a) {
  const a = NODES[edge.a];
  const b = NODES[edge.b];
  const pts = [[a.x, a.y], ...(edge.via ?? []), [b.x, b.y]];
  return from === edge.a ? pts : pts.reverse();
}

function edgeMetres(edge) {
  if (edge.metres != null) return edge.metres;
  if (edge.kind === 'lift') return 0;
  const pts = edgePoints(edge);
  let units = 0;
  for (let i = 1; i < pts.length; i++) units += dist(pts[i - 1], pts[i]);
  return units * METRES_PER_UNIT;
}

const LIFT_COST = 20; // metres-equivalent for waiting for and riding the lift

const ADJ = {};
for (const edge of EDGES) {
  edge.length = edgeMetres(edge);
  (ADJ[edge.a] ??= []).push({ edge, to: edge.b });
  (ADJ[edge.b] ??= []).push({ edge, to: edge.a });
}

function shortestPath(from, to, stepFree) {
  const cost = { [from]: 0 };
  const prev = {};
  const done = new Set();
  while (true) {
    let cur = null;
    for (const id of Object.keys(cost)) if (!done.has(id) && (cur === null || cost[id] < cost[cur])) cur = id;
    if (cur === null) return null;
    if (cur === to) break;
    done.add(cur);
    for (const { edge, to: next } of ADJ[cur] ?? []) {
      if (stepFree && edge.steps) continue;
      const c = cost[cur] + edge.length + (edge.kind === 'lift' ? LIFT_COST : 0);
      if (cost[next] === undefined || c < cost[next]) {
        cost[next] = c;
        prev[next] = { from: cur, edge };
      }
    }
  }
  const legs = [];
  for (let id = to; id !== from; id = prev[id].from) legs.unshift({ ...prev[id], to: id });
  return legs;
}

const FLOOR_NAMES = { 0: 'parter', 1: '1. piętro' };

/** "3 stopnie", "12 stopni", "22 stopnie" */
export function stepsLabel(n) {
  const last = n % 10;
  const teen = n % 100 >= 12 && n % 100 <= 14;
  return `${n} ${last >= 2 && last <= 4 && !teen ? 'stopnie' : 'stopni'}`;
}

const roundMetres = (m) => Math.max(5, Math.round(m / 5) * 5);

function describe(leg) {
  const { edge, from, to } = leg;
  const target = NODES[to];
  const up = edge.a === from;
  const metres = `ok. ${roundMetres(leg.metres)} m`;
  switch (edge.kind) {
    case 'lift':
      return `${NODES[to].floor > NODES[from].floor ? 'Wjedź' : 'Zjedź'} windą na ${FLOOR_NAMES[target.floor]}.`;
    case 'stairs':
      return `${up ? 'Wejdź' : 'Zejdź'} po schodach (${stepsLabel(edge.steps)}) do: ${target.label}.`;
    case 'ramp':
      return `Pochylnią ${up ? 'w górę' : 'w dół'} do: ${target.label} (${metres}).`;
    default:
      return `Idź do: ${target.label} (${metres}).`;
  }
}

/**
 * Route between two nodes. mode: 'bez-schodow' | 'najkrotsza'.
 * Returns { legs, steps, metres, minutes, stairs, extraMetres? } or { blocked: reason } when
 * there is no step-free route.
 */
export function findRoute(from, to, mode) {
  const stepFree = mode === 'bez-schodow';
  const legs = shortestPath(from, to, stepFree);
  if (!legs) {
    return { blocked: NODES[to].noStepFree ?? NODES[from].noStepFree ?? 'Między tymi miejscami nie ma trasy bez schodów.' };
  }

  // Merge walking legs through junctions into one step ("Idź do: …").
  const merged = [];
  for (const leg of legs) {
    const { edge } = leg;
    const notes = [edge.note, edge.a === leg.from ? edge.noteTo : null].filter(Boolean);
    const m = { ...leg, metres: edge.length, notes, tactile: !!edge.tactile };
    const last = merged.at(-1);
    const walking = (k) => k === 'walk' || k === 'indoor';
    if (last && NODES[last.to].junction && walking(last.edge.kind) && walking(m.edge.kind)) {
      last.to = m.to;
      last.metres += m.metres;
      last.tactile &&= m.tactile;
      for (const n of m.notes) if (!last.notes.includes(n)) last.notes.push(n);
    } else {
      merged.push(m);
    }
  }

  const steps = merged.map((m) => [describe(m), m.tactile && 'Wzdłuż ścieżki dotykowej.', ...m.notes].filter(Boolean).join(' '));
  const arrive = NODES[to].arrive;
  steps.push(`Jesteś na miejscu: ${NODES[to].label}.${arrive ? ` ${arrive}` : ''}`);

  const metres = legs.reduce((s, l) => s + l.edge.length, 0);
  const lifts = legs.filter((l) => l.edge.kind === 'lift').length;
  const stairs = legs.reduce((s, l) => s + (l.edge.steps ?? 0), 0);
  const result = {
    legs,
    steps,
    metres: roundMetres(metres),
    minutes: Math.max(1, Math.ceil((metres / 1.0 + lifts * 30) / 60)), // ~1 m/s, 30 s per lift ride
    stairs,
  };
  if (!stepFree && stairs) {
    const alt = shortestPath(from, to, true);
    if (alt) result.extraMetres = roundMetres(alt.reduce((s, l) => s + l.edge.length, 0) - metres);
    else result.noAlternative = true;
  }
  return result;
}
