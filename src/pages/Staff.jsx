import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { EmailLink, PageTitle, PhoneLink } from '../components/ui.jsx';
import { IT_HELPDESK } from '../data/university.js';

const FIELDS = [
  { id: 'login', missing: 'Wpisz login albo e-mail uczelniany.' },
  { id: 'password', missing: 'Wpisz hasło.' },
];

// Mock login: accessible authentication (3.3.8) – no CAPTCHA, no puzzle, paste and password
// managers work (autocomplete), errors in text next to the field and in a summary, no time limit.
// It never logs in: there is nothing behind it, and it sends nothing anywhere.
function LoginForm() {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [refused, setRefused] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef(null);
  const resultRef = useRef(null);
  const passwordRef = useRef(null);

  // After each submit: focus the error summary or the result, so a screen reader reads it.
  useEffect(() => {
    if (attempt) (summaryRef.current ?? resultRef.current)?.focus();
  }, [attempt]);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {};
    for (const f of FIELDS) if (!String(data.get(f.id) ?? '').trim()) next[f.id] = f.missing;
    setErrors(next);
    setAttempt((n) => n + 1);
    if (Object.keys(next).length) {
      setRefused(false);
      return;
    }
    // Demo: always refuse. Clear the password (never keep it), keep the login.
    passwordRef.current.value = '';
    setRefused(true);
  }

  function checkCapsLock(event) {
    if (event.getModifierState) setCapsLock(event.getModifierState('CapsLock'));
  }

  const errorIds = FIELDS.filter((f) => errors[f.id]);

  return (
    <form className="login-form" onSubmit={submit} noValidate>
      {errorIds.length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex={-1} aria-labelledby="error-summary-title">
          <h3 id="error-summary-title">
            {errorIds.length === 1 ? 'Popraw 1 błąd w formularzu' : `Popraw ${errorIds.length} błędy w formularzu`}
          </h3>
          <ul>
            {errorIds.map((f) => (
              <li key={f.id}>
                <a href={`#${f.id}`}>{errors[f.id]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {refused && (
        <div className="login-result" ref={resultRef} tabIndex={-1} aria-labelledby="login-result-title">
          <h3 id="login-result-title">Nie zalogowano</h3>
          <p>
            To wersja demonstracyjna strony – logowanie celowo nie działa. Login i hasło nie zostały nigdzie wysłane ani zapisane, a pole
            hasła wyczyściliśmy.
          </p>
        </div>
      )}

      <div className="field">
        <label htmlFor="login">Login lub e-mail uczelniany</label>
        <p className="hint" id="login-hint">
          Na przykład: jan.kowalski albo jan.kowalski@jasnogrodzka.edu.pl
        </p>
        {errors.login && (
          <p className="field-error" id="login-error">
            Błąd: {errors.login}
          </p>
        )}
        <input
          id="login"
          name="login"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={errors.login ? 'true' : undefined}
          aria-describedby={errors.login ? 'login-hint login-error' : 'login-hint'}
        />
      </div>

      <div className="field">
        <label htmlFor="password">Hasło</label>
        {errors.password && (
          <p className="field-error" id="password-error">
            Błąd: {errors.password}
          </p>
        )}
        <input
          id="password"
          name="password"
          ref={passwordRef}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={errors.password ? 'true' : undefined}
          aria-describedby={errors.password ? 'password-error caps-lock' : 'caps-lock'}
          onKeyUp={checkCapsLock}
          onKeyDown={checkCapsLock}
          onBlur={() => setCapsLock(false)}
        />
        {/* Always in the DOM, so screen readers announce the warning when it appears. */}
        <p className="hint caps-lock" id="caps-lock" aria-live="polite">
          {capsLock ? 'Uwaga: włączony Caps Lock.' : ''}
        </p>
        <label className="checkbox">
          <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
          <span>Pokaż hasło</span>
        </label>
      </div>

      <button type="submit" className="button">
        Zaloguj się
      </button>
    </form>
  );
}

export default function Staff() {
  return (
    <>
      <PageTitle>Strefa pracownika</PageTitle>
      <h1>Strefa pracownika</h1>
      <p className="lead">Poczta uczelniana, EduPortal (panel prowadzącego) oraz wnioski i urlopy – po zalogowaniu kontem uczelnianym.</p>

      <section className="page-section" aria-labelledby="logowanie">
        <h2 id="logowanie">Logowanie</h2>
        <div className="demo-note">
          <p>
            <strong>Uwaga:</strong> to wersja demonstracyjna. Formularz niczego nie wysyła i nikogo nie zaloguje. Nie wpisuj prawdziwego hasła.
          </p>
        </div>
        <div className="card login-card">
          <LoginForm />
        </div>

        <h3>Problem z logowaniem?</h3>
        <p>
          Hasło możesz wkleić albo wpisać menedżerem haseł. Nie ma CAPTCHA ani limitu czasu. Jeśli nie pamiętasz hasła albo konto jest
          zablokowane, skontaktuj się z działem IT – ustawimy nowe hasło.
        </p>
        <dl>
          <dt>{IT_HELPDESK.name}</dt>
          <dd>{IT_HELPDESK.hours}</dd>
          <dt>Telefon</dt>
          <dd className="action">
            <PhoneLink phone={IT_HELPDESK.phone} />
          </dd>
          <dt>E-mail</dt>
          <dd className="action">
            <EmailLink email={IT_HELPDESK.email} />
          </dd>
        </dl>
      </section>

      <section className="page-section" aria-labelledby="materialy">
        <h2 id="materialy">Dostępne materiały dla studentów</h2>
        <ul>
          <li>Używaj stylów nagłówków w dokumentach.</li>
          <li>Dodawaj opisy do zdjęć i wykresów.</li>
          <li>Filmy publikuj z napisami.</li>
          <li>Udostępniaj pliki, które da się odczytać czytnikiem ekranu.</li>
        </ul>
        <p>
          Więcej w kursie <Link to="/courses/training/accessible-materials">„Dostępne materiały dydaktyczne”</Link>.
        </p>
      </section>
    </>
  );
}
