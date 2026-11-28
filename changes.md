# Zmiany – 28 listopada 2026

## Mapa kampusu: interaktywny plan i trasy bez barier

- Prawdziwy plan kampusu (budynki A i B, biblioteka, parking, przystanek, ul. Słoneczna) zamiast różowego pola. Zaznacza udogodnienia (wejścia bez progów, pochylnię, windę, toalety dostępne, pętle indukcyjne, pokój cichej nauki, portiernię, parking z kopertą, przystanek) i bariery (schody, brak windy w budynku B). Każdy rodzaj ma własny znak, nie tylko kolor; bariery to żółte trójkąty.
- Każdy znak na planie to link do opisu miejsca, obsługiwany klawiaturą i czytnikiem ekranu. Pod planem jest ten sam opis tekstem („Udogodnienia i bariery”), a przy każdym miejscu link „Pokaż na planie”.
- Filtr „Co pokazać na planie” (pola wyboru) ukrywa i pokazuje rodzaje znaków. Legenda jest w filtrze, linie (chodnik, ścieżka dotykowa, schody, trasa) opisane pod planem.
- „Wyznacz trasę”: skąd, dokąd i rodzaj trasy (bez schodów i progów albo najkrótsza). Wynik to linia na planie z podsumowaniem tuż nad planem (po kliknięciu „Wyznacz trasę” strona przewija się właśnie tam) i opis krok po kroku pod planem (odległość, czas, schody, ścieżka dotykowa, winda). Gdy trasy bez schodów nie ma (sala B 112), strona mówi to wprost i kieruje do Biura ds. Osób z Niepełnosprawnościami. Trasa ma własny adres, więc można ją wysłać komuś albo dać do niej link – np. „Trasa od bramy głównej” przy każdej sali.
- Plan działa w wysokim kontraście (żółte znaki na czarnym) i w trybie wymuszonych kolorów. Rośnie razem z A+ / A++. Na telefonie przesuwa się w bok w swojej ramce, a strona nie przewija się w poziomie.
- Na telefonie mniejsze nagłówki `h2`, żeby długie słowa nie łamały się w środku przy tekście A++.

## Strona główna i Studia: wyraźniejsze sekcje

- Studia: sekcje „Kierunki”, „Rekrutacja” i „Dziekanat” oddzielone tak samo jak na stronie głównej (wspólna klasa `.page-section`). Wydziały jako karty, informacja o dostosowaniu rekrutacji i tabela godzin dziekanatu w ramkach.

- Baner z nazwą uczelni (tło w kolorze akcentu, w wysokim kontraście żółte z czarnym tekstem).
- Sekcje „Na skróty”, „Aktualności” i „Kontakt” oddzielone odstępem i linią.
- Aktualności jako karty obok siebie (na telefonie jedna pod drugą), kontakt w ramce, na szerokim ekranie w trzech kolumnach.
- Na wąskim ekranie baner sięga krawędzi i ma mniejszy nagłówek, żeby nazwa uczelni nie łamała się w środku słowa przy tekście A++.

## Wygenerowane filmy do lekcji

- Lekcje „Higiena rąk”, „Drogi ewakuacyjne” i „Dostępne materiały dydaktyczne” mają krótkie filmy (34–41 s): pokaz slajdów w stylu „Liczb zespolonych” z polskim lektorem (syntezator Piper, głos `pl_PL-gosia-medium`), napisami i obrazkiem podglądu.
- Narzędzie `tools/lesson-videos/` (Dockerfile, `generate.py`, `lessons.json`): z jednego pliku powstają film, napisy, podgląd i transkrypcja (`src/data/transcripts/*.json`), więc zawsze się zgadzają. Czasy napisów są dokładne, bo każde zdanie jest syntezowane osobno.
- Lektor czyta wszystko, co jest na slajdach, więc te lekcje nie potrzebują osobnej audiodeskrypcji. Transkrypcje i rozdziały zastąpiono tymi z filmów (są krótsze niż poprzednie szkice).
- Do sprawdzenia przez człowieka: jak brzmi lektor (wymowa, tempo).

## Kursy wideo: mniej, ale porządnie

- 3 kategorie zamiast 4: Przedmioty ścisłe (Informatyka), Przedmioty medyczne (Pielęgniarstwo) i Szkolenia (dla wszystkich). Kategoria „Przedmioty humanistyczne” usunięta; stare adresy przekierowują na stronę główną kursów.
- 4 lekcje: „Liczby zespolone” (prawdziwe wideo), „Higiena rąk – technika w 6 krokach”, „Drogi ewakuacyjne” i „Dostępne materiały dydaktyczne”. Nowe lekcje mają rozdziały i transkrypcję z opisem slajdów; zamiast odtwarzacza jest pole „Miejsce na film”.
- Strony kategorii to kafelki lekcji (przedmiot, kurs, czas, udogodnienia tekstem), bez pustych sekcji i różowych pól.
- Jeden komponent lekcji (`Lesson.jsx`) i dane w `src/data/lessons.js`; adresy `/courses/<kategoria>/<lekcja>`.
- Link w Strefie pracownika prowadzi prosto do lekcji „Dostępne materiały dydaktyczne”.

## Przejście na React + Vite

- Projekt jest teraz aplikacją React (Vite, React Router). Wspólne elementy (nagłówek, menu, pasek dostępności, stopka, okruszki, paski kategorii i kierunków) są komponentami w `src/components/`, więc zmienia się je w jednym miejscu, a nie w 22 plikach.
- Treść jako dane w `src/data/`: nazwa i kontakty uczelni, kierunki, dziekanat, sale, przykładowy tydzień planu, kategorie kursów, transkrypcja lekcji. Wszystkie plany zajęć i strony kategorii powstają z tych danych.
- Nowe adresy: `/studies`, `/schedule/informatyka/semestr-1`, `/courses/science/complex-numbers` itd. Stare adresy `*.html` przekierowują na nowe.
- Po zmianie podstrony fokus przechodzi na `h1` (albo na `#kotwicę`), a każda strona ustawia własny `<title>`.
- Pasek dostępności to komponent `A11yToolbar` (zamiast `js/a11y.js`); skrypt przed pierwszym renderem został w `index.html`.
- Bez JavaScriptu wyświetla się komunikat z telefonem do uczelni.
- Docker: budowanie w obrazie Node, serwowanie `dist/` przez nginx z przekierowaniem nieznanych adresów na `index.html`.
- Link w Strefie pracownika do kursu „Dostępne materiały dydaktyczne” prowadzi teraz do kategorii Szkolenia, gdzie ten kurs jest, a nie do strony głównej kursów.
- `axe-core` jako zależność deweloperska do audytów w przeglądarce.

## Plan zajęć łatwiej znaleźć

- Strona Studia: zaraz pod nagłówkiem jest wyróżniony blok „Plan zajęć” (ramka, tło, przyciski Informatyka / Pielęgniarstwo / Zarządzanie i link „Wszystkie plany zajęć”). Starą sekcję ze środka strony usunięto.
- Strona główna: pierwszy kafelek „Na skróty” to „Plan zajęć”.
- `css/style.css`: klasy `.highlight` (wyróżniony blok z pełną ramką, widoczną też w trybie `forced-colors`) i `.link-buttons` (linki wyglądające jak przyciski paska kategorii).

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
- Dane przykładowe: nazwiska prowadzących, sale, tytuły kursów.
- Nie sprawdzono czytnikami ekranu, samą klawiaturą na wszystkich stronach, powiększeniem 200–400% ani trybami `forced-colors` i `prefers-contrast`.
- Nadal placeholdery: plan kampusu, odtwarzacz wideo z napisami i audiodeskrypcją, deklaracja dostępności, logowanie pracownika.
