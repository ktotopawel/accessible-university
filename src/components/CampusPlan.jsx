import { AREAS, EDGES, FEATURES, NODES, PLAN_SIZE, edgePoints } from '../data/campus.js';

const pointsAttr = (pts) => pts.map(([x, y]) => `${x},${y}`).join(' ');

/** Symbol of a marker type, drawn around (0, 0). Also used in the legend and the text lists. */
export function MarkerSymbol({ type, label }) {
  if (type === 'barrier') {
    return (
      <g className="sym sym--barrier">
        <polygon className="sym__shape" points="0,-18 19,14 -19,14" />
        <path className="sym__line" d="M-8 10H-4V6H0V2H4V-2H8" />
      </g>
    );
  }
  if (type === 'place') {
    const w = Math.max(40, label.length * 8 + 18);
    return (
      <g className="sym sym--place">
        <rect className="sym__shape" x={-w / 2} y="-13" width={w} height="26" rx="5" />
        <text className="sym__text" y="5" fontSize="13">
          {label}
        </text>
      </g>
    );
  }
  const glyph = {
    entrance: (
      <>
        <rect className="sym__line" x="-6" y="-9" width="12" height="18" />
        <circle className="sym__fill" cx="3" cy="1" r="1.6" />
      </>
    ),
    ramp: <polygon className="sym__fill" points="-9,7 9,7 9,-7" />,
    lift: (
      <>
        <rect className="sym__line" x="-7" y="-10" width="14" height="20" />
        <polygon className="sym__fill" points="-3.5,-2 3.5,-2 0,-6.5" />
        <polygon className="sym__fill" points="-3.5,2 3.5,2 0,6.5" />
      </>
    ),
    wc: (
      <text className="sym__text" y="4" fontSize="11">
        WC
      </text>
    ),
    loop: (
      <>
        <circle className="sym__fill" cx="-6" cy="0" r="2" />
        <path className="sym__line" d="M-2.5 -3.5A5 5 0 0 1 -2.5 3.5M0.4 -6.4A9 9 0 0 1 0.4 6.4M3.2 -9.2A13 13 0 0 1 3.2 9.2" />
      </>
    ),
    quiet: (
      <>
        <circle className="sym__fill" cx="-1" cy="0" r="8" />
        <circle className="sym__cut" cx="3" cy="-2.5" r="6.5" />
      </>
    ),
    info: (
      <text className="sym__text" y="6" fontSize="17">
        i
      </text>
    ),
    parking: (
      <text className="sym__text" y="6" fontSize="17">
        P
      </text>
    ),
    bus: (
      <text className="sym__text" y="3.5" fontSize="9">
        BUS
      </text>
    ),
  }[type];
  return (
    <g className="sym">
      <circle className="sym__shape" r="15" />
      {glyph}
    </g>
  );
}

/** Small standalone symbol (legend, filter, text lists). Decorative: the text next to it says the same. */
export function SymbolIcon({ type, label = 'Sala' }) {
  const wide = type === 'place';
  return (
    <svg className="sym-icon" viewBox={wide ? '-30 -16 60 32' : '-20 -20 40 40'} width={wide ? 48 : 32} height="32" aria-hidden="true" focusable="false">
      <MarkerSymbol type={type} label={label} />
    </svg>
  );
}

function Edge({ edge }) {
  const a = NODES[edge.a];
  const b = NODES[edge.b];
  if (edge.kind === 'lift') return null;
  const pts = pointsAttr(edgePoints(edge));
  const upper = a.floor > 0 && b.floor > 0;
  const cls = edge.kind === 'stairs' ? 'plan-path plan-path--stairs' : `plan-path plan-path--${edge.kind}${upper ? ' plan-path--upper' : ''}`;
  if (edge.kind === 'stairs' && edge.metres != null) return null; // stairs between floors: shown by the marker
  return (
    <g>
      <polyline className={cls} points={pts} />
      {edge.kind === 'stairs' && <polyline className="plan-path__treads" points={pts} />}
      {edge.tactile && (
        <>
          <polyline className="plan-path__tactile-band" points={pts} />
          <polyline className="plan-path__tactile" points={pts} />
        </>
      )}
    </g>
  );
}

function Route({ route }) {
  const segments = route.legs.map(({ edge, from }) => ({ edge, pts: pointsAttr(edgePoints(edge, from)) }));
  const start = NODES[route.legs[0].from];
  const end = NODES[route.legs.at(-1).to];
  return (
    <g className="plan-route">
      {segments.map(({ edge, pts }) => (
        <polyline key={`c-${edge.a}-${edge.b}`} className="plan-route__casing" points={pts} />
      ))}
      {segments.map(({ edge, pts }) => (
        <polyline
          key={`r-${edge.a}-${edge.b}`}
          className={`plan-route__line${NODES[edge.a].floor > 0 && NODES[edge.b].floor > 0 ? ' plan-route__line--upper' : ''}`}
          points={pts}
        />
      ))}
      <Flag node={start} text="Start" />
      <Flag node={end} text="Cel" />
    </g>
  );
}

function Flag({ node, text }) {
  const w = text.length * 9 + 16;
  const y = node.y - 36 < 4 ? node.y + 22 : node.y - 36;
  return (
    <g className="plan-flag" transform={`translate(${node.x - w / 2} ${y})`}>
      <rect width={w} height="20" rx="3" />
      <text x={w / 2} y="15">
        {text}
      </text>
    </g>
  );
}

function Ring({ feature, className }) {
  if (feature.type !== 'place') return <circle className={className} r={feature.type === 'barrier' ? 25 : 21} />;
  const w = Math.max(40, feature.short.length * 8 + 18) + 12;
  return <rect className={className} x={-w / 2} y="-19" width={w} height="38" rx="8" />;
}

function Marker({ feature }) {
  const name = `${feature.name}${feature.floor ? ' (1. piętro)' : ''}`;
  return (
    <a
      id={`map-${feature.id}`}
      className={`plan-marker${feature.floor ? ' plan-marker--upper' : ''}`}
      href={`#${feature.id}`}
      aria-label={`${name} – opis`}
      transform={`translate(${feature.x} ${feature.y})`}
    >
      <title>{name}</title>
      {/* Focus / :target ring: a dark ring inside a yellow one, visible on any background. */}
      <g className="plan-marker__ring">
        <Ring feature={feature} className="plan-marker__ring-outer" />
        <Ring feature={feature} className="plan-marker__ring-inner" />
      </g>
      <MarkerSymbol type={feature.type} label={feature.short} />
    </a>
  );
}

/**
 * Drawn campus plan. Every marker is a link to its text description (#id), so the plan works
 * with keyboard and screen reader, and all of it is also described in text on the page.
 * `hidden`: marker types switched off in the filter; `route`: result of findRoute() to draw.
 */
export default function CampusPlan({ hidden, route, labelledBy, describedBy }) {
  const features = FEATURES.filter((f) => !hidden.has(f.type));
  return (
    <svg
      className="plan"
      viewBox={`0 0 ${PLAN_SIZE.width} ${PLAN_SIZE.height}`}
      role="group"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <g aria-hidden="true">
        <rect className="plan-ground" width={PLAN_SIZE.width} height={PLAN_SIZE.height} />
        <rect className="plan-street" y="430" width={PLAN_SIZE.width} height="40" />
        <rect className="plan-sidewalk" y="412" width={PLAN_SIZE.width} height="18" />
        <text className="plan-label" x="470" y="456">
          ul. Słoneczna
        </text>
        <polyline className="plan-fence" points="0,410 300,410" />
        <polyline className="plan-fence" points="340,410 640,410" />

        <rect className="plan-parking" x="470" y="300" width="150" height="95" />
        {[490, 515, 570, 595].map((x) => (
          <line key={x} className="plan-parking__bay" x1={x} y1="365" x2={x} y2="395" />
        ))}
        <text className="plan-label plan-label--small" x="478" y="318">
          Parking
        </text>

        {AREAS.filter((a) => a.rect).map(({ id, name, rect: [x, y, w, h] }) => (
          <g key={id}>
            <rect className="plan-building" x={x} y={y} width={w} height={h} />
            <text className="plan-label" x={x + 8} y={y + 18}>
              {name}
            </text>
          </g>
        ))}

        {EDGES.map((e) => (
          <Edge key={`${e.a}-${e.b}`} edge={e} />
        ))}

        <g className="plan-north" transform="translate(624 24)">
          <polygon points="0,-14 6,4 0,0 -6,4" />
          <text y="18">N</text>
        </g>

        {route?.legs && <Route route={route} />}
      </g>

      {features.map((f) => (
        <Marker key={f.id} feature={f} />
      ))}
    </svg>
  );
}
