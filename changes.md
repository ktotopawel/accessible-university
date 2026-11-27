# Zmiany – 27 listopada 2026

Krótki spis prac nad makietą „Akademii Śląskiej”.

## Kursy wideo

- Nowy podział kursów jak w planie: strona główna kursów (`courses.html`, kafelki kategorii) → strony kategorii → strona lekcji.
- Kategorie: przedmioty ścisłe, humanistyczne, artystyczne, medyczne i szkolenia (`courses-*.html`). Kategoria ścisłe ma przykładowe przedmioty i kurs, pozostałe są szkicami z placeholderem. Szkolenia zachowały dotychczasową listę kursów i przykładową lekcję o drogach ewakuacyjnych.
- Przykładowa lekcja `lesson-math-derivatives.html`: miejsce na odtwarzacz, transkrypcja, lista lekcji.
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
- Długi adres `niepelnosprawni@wst.com.pl` łamie się przed „pl” przy 320 px.
- Pliki planów i kursów są kopiami, bez generatora: zmianę trzeba wprowadzić ręcznie w każdym pliku.
- Dane przykładowe: nazwiska prowadzących, sale, tytuły kursów.
- Nie sprawdzono czytnikami ekranu, samą klawiaturą na wszystkich stronach, powiększeniem 200–400% ani trybami `forced-colors` i `prefers-contrast`.
- Nadal placeholdery: plan kampusu, odtwarzacz wideo z napisami i audiodeskrypcją, deklaracja dostępności, logowanie pracownika.
