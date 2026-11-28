import { Link } from 'react-router';
import { PageTitle, Placeholder } from '../components/ui.jsx';

export default function Staff() {
  return (
    <>
      <PageTitle>Strefa pracownika</PageTitle>
      <h1>Strefa pracownika</h1>
      <p className="lead">Systemy, logowanie i materiały dla pracowników uczelni.</p>

      <h2>Systemy</h2>
      <ul>
        <li>Poczta uczelniana</li>
        <li>EduPortal – panel prowadzącego</li>
        <li>Wnioski i urlopy</li>
      </ul>

      <h2>Logowanie</h2>
      <Placeholder>
        Miejsce na logowanie kontem uczelnianym. Bez CAPTCHA, z możliwością wklejenia hasła i użycia menedżera haseł.
      </Placeholder>

      <h2>Dostępne materiały dla studentów</h2>
      <ul>
        <li>Używaj stylów nagłówków w dokumentach.</li>
        <li>Dodawaj opisy do zdjęć i wykresów.</li>
        <li>Filmy publikuj z napisami.</li>
        <li>Udostępniaj pliki, które da się odczytać czytnikiem ekranu.</li>
      </ul>
      <p>
        Więcej w kursie <Link to="/courses/training">„Dostępne materiały dydaktyczne”</Link>.
      </p>
    </>
  );
}
