import { useState } from 'react';

// Text size + high contrast. The classes on <html> are first set by the inline script in
// index.html (before first paint); this component reads them as its initial state and keeps
// them in sync. localStorage keys must match that script.
const html = document.documentElement;

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode / blocked storage: the setting just isn't remembered.
  }
}

const initialSize = () => (html.classList.contains('text-size-3') ? '3' : html.classList.contains('text-size-2') ? '2' : '1');

const SIZES = [
  { level: '1', label: 'A', percent: '100%' },
  { level: '2', label: 'A+', percent: '125%' },
  { level: '3', label: 'A++', percent: '150%' },
];

export default function A11yToolbar() {
  const [size, setSize] = useState(initialSize);
  const [contrast, setContrast] = useState(() => html.classList.contains('high-contrast'));

  const chooseSize = (level) => {
    html.classList.remove('text-size-2', 'text-size-3');
    if (level !== '1') html.classList.add(`text-size-${level}`);
    save('as-text-size', level);
    setSize(level);
  };

  const toggleContrast = () => {
    const enabled = !contrast;
    html.classList.toggle('high-contrast', enabled);
    save('as-high-contrast', enabled ? '1' : '0');
    setContrast(enabled);
  };

  return (
    <div className="toolbar">
      <div className="container">
        <div role="group" aria-labelledby="text-size-label">
          <span id="text-size-label">Rozmiar tekstu</span>
          {SIZES.map((s) => (
            <button key={s.level} type="button" aria-pressed={size === s.level} onClick={() => chooseSize(s.level)}>
              {s.label}
              <span className="sr-only"> – {s.percent}</span>
            </button>
          ))}
        </div>
        <button type="button" className="contrast-toggle" aria-pressed={contrast} onClick={toggleContrast}>
          Wysoki kontrast
        </button>
      </div>
    </div>
  );
}
