# Zmiany – 28 listopada 2026

## Fikcyjna uczelnia i mniej kierunków

- Nowa nazwa: „Akademia Jasnogrodzka” (fikcyjne miasto Jasnogród, znak logo „AJ”) zamiast „Akademii Śląskiej”. Zmienione tytuły stron, logo, `h1` na stronie głównej i dokumentacja.
- Zmyślone dane kontaktowe zamiast prawdziwych: adres ul. Słoneczna 12, 12-345 Jasnogród, e-maile `aj@jasnogrodzka.edu.pl` i `bon@jasnogrodzka.edu.pl` (krótszy adres Biura ds. Osób z Niepełnosprawnościami nie łamie się już przy 320 px), telefony `+48 12 000 10 00` i `+48 12 000 10 20`.
- Trzy wydziały, na każdym jeden kierunek: Wydział Nauk Technicznych (Informatyka), Wydział Nauk o Zdrowiu (Pielęgniarstwo), Wydział Nauk Społecznych i Humanistycznych (Zarządzanie). Lista kierunków na stronie Studia to teraz lista definicji (wydział → kierunek).
- Usunięte plany zajęć Architektury i Fizjoterapii (6 plików) i kategoria kursów „Przedmioty artystyczne” (`courses-arts.html`); paski nawigacji i kafelki zaktualizowane na wszystkich stronach.
- Stopka i dziekanat podają godziny Wydziału Nauk Technicznych; pozostałe dwa dziekanaty mają wspólne godziny.

## Kurs „Liczby zespolone”

- Prawdziwe wideo `video/liczby-zespolone.mp4` (lekcja 1 kursu „Algebra dla studentów”, 2 min 12 s, 3,9 MB) z obrazkiem podglądu zamiast placeholdera odtwarzacza.
- Strona lekcji `lesson-math-complex-numbers.html` zastąpiła przykładową lekcję „Pochodne: wstęp”. Zawiera natywny odtwarzacz, link do pobrania, spis rozdziałów z wideo, nagłówek „Transkrypcja” i listę lekcji. Kafelek w `courses-science.html` wskazuje na nową lekcję.
- Z kafelka i lekcji usunięto znaczniki „Napisy / Transkrypcja / Audiodeskrypcja”, bo dla tego wideo jeszcze ich nie ma. Zdanie o napisach znikło też z opisu kategorii „Przedmioty ścisłe”.
- Hub `courses.html`: „Co ma każdy kurs” zmienione na „Co będzie miał każdy kurs” z uwagą o stanie lekcji „Liczby zespolone” (napisy i transkrypcja są, audiodeskrypcji jeszcze nie). Kafelek „Kursy wideo” na stronie głównej nie obiecuje już napisów.
- Odtwarzacz ma nazwę dostępną (`aria-label`).
- `Dockerfile` kopiuje też katalog `video/`.
- Napisy po polsku `video/liczby-zespolone.pl.vtt` (40 napisów, `<track kind="captions" default>`) i transkrypcja z opisem każdego z 8 slajdów (wzory, wykres płaszczyzny zespolonej). Powstały ze skryptu lektora; czasy napisów dopasowano automatycznie do przerw w nagraniu i warto je sprawdzić na kilku fragmentach.
- Do sprawdzenia przez człowieka: całe nagranie z włączonymi napisami (czy tekst zgadza się z tym, co słychać), napisy przy widocznych kontrolkach (w Chrome natywne napisy zasłaniają wtedy część slajdu) oraz Firefox i Safari.
- `nginx/default.conf` (kopiowany w `Dockerfile`): pliki `.vtt` są serwowane jako `text/vtt`, bo Firefox i Safari odrzucają napisy z innym typem.
- Do zrobienia: wersja z audiodeskrypcją (WCAG 1.2.5). Narracja czyta większość wzorów, ale nie opisuje wykresu płaszczyzny zespolonej.

# Zmiany – 27 listopada 2026

Krótki spis prac nad makietą „Akademii Jasnogrodzkiej” (wtedy jeszcze „Akademii Śląskiej”).

## Kursy wideo

- Nowy podział kursów jak w planie: strona główna kursów (`courses.html`, kafelki kategorii) → strony kategorii → strona lekcji.
- Kategorie: przedmioty ścisłe, humanistyczne, artystyczne, medyczne i szkolenia (`courses-*.html`). Kategoria ścisłe ma przykładowe przedmioty i kurs, pozostałe są szkicami z placeholderem. Szkolenia zachowały dotychczasową listę kursów i przykładową lekcję o drogach ewakuacyjnych.
- Lekcja `lesson-math-complex-numbers.html` (wcześniej przykładowa „Pochodne: wstęp”): zob. zmiany z 28 listopada.
- Pasek kategorii (zwykłe linki, nie zakładki ARIA), okruszki, lista przedmiotów z linkami do sekcji. Bez drugiego „hamburgera”.

## Plan zajęć

- Układ jak w wideo: `schedule.html` (kierunki) → `schedule-<kierunek>.html` → `schedule-<kierunek>-sem<N>.html`.
- 5 kierunków (Informatyka, Architektura, Pielęgniarstwo, Fizjoterapia, Zarządzanie), semestry 1 i 3, razem 10 planów. Każdy plan to kopia tego samego przykładowego tygodnia.
- Plan to listy dzień po dniu, nie siatka. Odwołane zajęcia i zmiany sal są opisane tekstem.
- Opisy sal w `campus-map.html` (aula, A 101, B 5, B 112), do których prowadzą linki z planu. Strona Studia ma tylko krótki opis i link do planu.

## Dostępność i poprawki po audytach

- Dokładnie jedno `aria-current="page"` na stronie, pozostałe oznaczenia to `true` lub `step`. Jednolite tytuły stron.
- `role="list"` na listach bez punktorów, separator okruszków za elementem, spójna transkrypcja, tekst z `<code>` w polu odtwarzacza nie rozpada się.
- Cele dotykowe co najmniej 44 px: linki sal, linki powrotne, linki kontaktowe, linki w stopce.
- Stopka „Potrzebujesz pomocy?” przepisana na wszystkich 28 stronach (każdy link w osobnej linii) i podaje, którego wydziału dotyczą godziny dziekanatu.
- Audyty WCAG 2.2 wykonał subagent `wcag-auditor` po każdej większej zmianie. Ostatni audyt całej strony: brak błędów.

## Dokumentacja i narzędzia

- `CLAUDE.md`: opis projektu, komend i architektury dla Claude Code.
- `ACCESSIBILITY-DECISIONS.md`: nowe sekcje „Kursy wideo” i „Plan zajęć”, nowe punkty „Do ustalenia”.
- Subagent `wcag-auditor` (tylko odczyt) do audytów dostępności. Leży w `.claude/agents/wcag-auditor.md`, ale `.claude/` jest w `.gitignore`, więc jest tylko lokalnie i nie ma go w repo.
- `Dockerfile` (nginx) i `.dockerignore`: obraz kopiuje wszystkie `*.html` z katalogu głównego oraz `css/` i `js/`, więc nowe strony nie wymagają zmian w pliku. Oba pliki są śledzone w repo.

## Znane ograniczenia

- Pasek kategorii i okruszki zajmują dużo miejsca na telefonie, więc `h1` zaczyna się nisko.
- Pliki planów i kursów są kopiami, bez generatora: zmianę trzeba wprowadzić ręcznie w każdym pliku.
- Dane przykładowe: nazwiska prowadzących, sale, tytuły kursów.
- Nie sprawdzono czytnikami ekranu, samą klawiaturą na wszystkich stronach, powiększeniem 200–400% ani trybami `forced-colors` i `prefers-contrast`.
- Nadal placeholdery: plan kampusu, odtwarzacz wideo z napisami i audiodeskrypcją, deklaracja dostępności, logowanie pracownika.
