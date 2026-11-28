# Decyzje dotyczące dostępności

Cel: **WCAG 2.2 AA**, a kontrast tekstu na poziomie AAA. W nawiasach podajemy kryterium WCAG.

## Struktura

- `lang="pl"`, regiony `header` / `nav` / `main` / `footer`, jeden `h1` i nagłówki po kolei – czytnik ekranu czyta po polsku, a użytkownik przeskakuje po regionach i nagłówkach (1.3.1, 3.1.1).
- Link „Przejdź do treści głównej” na początku strony – nie trzeba za każdym razem przechodzić przez menu (2.4.1).
- Każda strona ma własny tytuł „Strona – Akademia Jasnogrodzka” (2.4.2).

## Aplikacja React (SPA)

- Strona jest aplikacją React z jednym `index.html`, a podstrony przełącza React Router. Przeglądarka nie ogłasza wtedy nowej strony, więc robimy to sami: po każdej zmianie adresu fokus przechodzi na `h1` nowej strony (albo na element z `#kotwicy`, np. salę na mapie kampusu), a strona przewija się do niego. Czytnik ekranu od razu czyta nagłówek, a Tab idzie dalej od treści (2.4.3).
- Każda strona ustawia własny `<title>` (2.4.2). Przycisk „wstecz” i linki bezpośrednie działają, bo każda podstrona ma swój adres.
- Wspólne elementy (nagłówek, menu, pasek dostępności, stopka, okruszki, paski kategorii i kierunków) są komponentami, więc są identyczne na każdej stronie (3.2.3, 3.2.4, 3.2.6). Dane kontaktowe, kierunki, sale i plan są w `src/data/`.
- Bez JavaScriptu strona się nie wyświetli. Pokazujemy wtedy komunikat z telefonem do uczelni (`<noscript>`). Dla makiety to wystarczy; w prawdziwym wdrożeniu warto generować HTML na serwerze lub przy budowaniu.
- Stare adresy (`studies.html`, `schedule-informatyka-sem1.html` itd.) przekierowują na nowe.

## Nawigacja

- To samo menu na każdej stronie: 6 pozycji, bez podmenu i bez „hamburgera” (3.2.3).
- Bieżąca strona ma `aria-current` i podkreślenie, nie tylko inny kolor (1.4.1).
- Nagłówek nie jest przyklejony, więc nie zasłania elementu z fokusem (2.4.11).
- Blok „Potrzebujesz pomocy?” jest zawsze w stopce, w tym samym miejscu (3.2.6).

## Klawiatura

- Wszystko działa z klawiatury, a kolejność Tab jest taka jak na ekranie (2.1.1, 2.4.3).
- Fokus to ciemna ramka z żółtą obwódką, widoczna na każdym tle (2.4.7).

## Kolor i tekst

- Kontrast tekstu co najmniej 7:1, ramek co najmniej 3:1 (1.4.6, 1.4.11).
- Linki w tekście są podkreślone (1.4.1).
- Czcionka Poppins: tekst 18 px, interlinia 1,6, wiersz do ok. 70 znaków (1.4.8, 1.4.12). Jej wadą jest podobne „I” i „l”. Jeśli przeszkodzi to w testach, zamienimy ją na Atkinson Hyperlegible.
- Rozmiary w `rem` i brak blokady powiększania na telefonie (1.4.4).
- Strona reaguje na `prefers-contrast` i tryb dużego kontrastu w Windows.

## Pasek dostępności

- A / A+ / A++ (100–150%) i „Wysoki kontrast” na górze strony, jak na gov.pl (1.4.4, 1.4.6).
- Przycisk kontrastu jest zawsze czarno-żółty, więc widać go, zanim się go włączy.
- Tryb kontrastu: czarne tło, biały tekst, żółte linki.
- Przyciski mają `aria-pressed`, a wybór jest zapamiętany (4.1.2).
- Bez JavaScriptu pasek jest ukryty, żeby nie było przycisków, które nic nie robią.

## Mobile first

- Style najpierw dla telefonu. Od 320 px w górę nic nie przewija się w poziomie (1.4.10).
- Menu, logo i przyciski mają co najmniej 44 px wysokości (2.5.8).
- Kafelki układają się w siatce: jedna kolumna na telefonie, kilka na komputerze. Cały kafelek jest klikalny, a w środku jest jeden link (2.4.4).
- Bez karuzel, animacji i automatycznie zmieniających się treści (2.2.2).

## Kursy wideo

- Układ: strona główna kursów (kafelki kategorii) → strona kategorii (kafelki lekcji) → strona lekcji.
- Makieta ma celowo mało kursów: 3 kategorie i 4 lekcje. Przedmioty ścisłe (Informatyka) i Przedmioty medyczne (Pielęgniarstwo) mają po jednej lekcji, a Szkolenia dla wszystkich dwie. Kategorii humanistycznej nie ma, bo dla Zarządzania lekcje wideo nie są potrzebne. Na stronach kategorii nie ma pustych sekcji ani różowych pól.
- Kategorie to zwykłe linki w `nav` („Kategorie kursów”), a nie zakładki ARIA: każda kategoria ma osobny adres, więc działają przycisk „wstecz” i linki bezpośrednie. Pasek jest zawsze widoczny, w tej samej kolejności na każdej stronie kursów (3.2.3). Bieżąca kategoria ma `aria-current` i podkreślenie (1.4.1).
- Bez drugiego „hamburgera” na przedmioty: ukrywałby główną treść strony i dokładał drugi zwijany poziom menu. Przy kilku lekcjach wystarczą kafelki; gdyby w kategorii było wiele przedmiotów, podzielimy kafelki nagłówkami `h2` z listą linków do sekcji.
- `aria-current="page"` jest na stronie tylko raz, żeby czytnik ekranu nie mówił „bieżąca strona” dwa razy: na ostatnim elemencie okruszków, a na stronie głównej kursów (bez okruszków) na „Kursy wideo” w menu głównym. Pozostałe oznaczenia bieżącego miejsca (menu główne jako sekcja, pasek kategorii) mają `aria-current="true"`, a bieżąca lekcja na liście lekcji `aria-current="step"`.
- Znany kompromis: na telefonie (320 px) pasek kategorii zajmuje ok. 310 px wysokości, więc `h1` zaczyna się nisko (przy tekście 150% jeszcze niżej). Siatka 2 kolumn łamała wyrazy w środku, więc z niej zrezygnowaliśmy. Po usunięciu kategorii humanistycznej pasek jest krótszy.
- Transkrypcja zawsze tak samo: nagłówek „Transkrypcja”, pod nim `<details open>` z podpisem „Pokaż lub ukryj transkrypcję”.
- Okruszki (ścieżka nawigacji) na każdej podstronie kursów – orientacja w trzech poziomach (2.4.8, dodatkowo).
- Udogodnienia kursu (napisy, transkrypcja, audiodeskrypcja) są podane tekstem, nie samymi ikonami.
- Pliki wideo i obrazki podglądu leżą w `public/video/` i są dostępne pod `/video/…` (np. `/video/liczby-zespolone.mp4`). Wszystkie lekcje rysuje jeden komponent `src/pages/courses/Lesson.jsx` z danych w `src/data/lessons.js`. Lekcja `/courses/science/complex-numbers` ma wideo zrobione ręcznie (transkrypcja w `src/data/lessonComplexNumbers.js`). Pozostałe trzy lekcje to krótkie (34–41 s) pokazy slajdów generowane narzędziem `tools/lesson-videos/` (Docker, syntezator mowy Piper z polskim głosem): z jednego pliku `lessons.json` powstają film, napisy, obrazek podglądu i transkrypcja, więc zawsze się zgadzają. Lektor czyta wszystko, co jest na slajdach, dlatego te lekcje nie potrzebują osobnej audiodeskrypcji (1.2.5). Opisy „[Obraz: …]” w transkrypcji też są generowane z tych samych danych co slajd. Napisy (`public/video/liczby-zespolone.pl.vtt`, włączone domyślnie przez `<track kind="captions" default>`) i transkrypcja z opisem slajdów powstały ze skryptu lektora; czasy napisów dopasowano automatycznie do przerw w nagraniu, więc warto je sprawdzić na kilku fragmentach. Wersja z audiodeskrypcją (WCAG 1.2.5) nadal jest placeholderem: narracja czyta większość wzorów, ale nie opisuje wykresu płaszczyzny zespolonej.
- Lekcja: natywny `<video controls>`, napisy po polsku włączone domyślnie, bez autoodtwarzania (1.2.2, 1.4.2, 2.2.2). Transkrypcja pod odtwarzaczem (1.2.3). Wersja z audiodeskrypcją jako osobny film, bo przeglądarki nie odtwarzają ścieżki `kind="descriptions"` (1.2.5).

## Plan zajęć

- Układ jak w kursach wideo: `/schedule` (hub z kafelkami kierunków) → `/schedule/<kierunek>` (wybór semestru) → `/schedule/<kierunek>/semestr-<N>` (plan). 3 kierunki (Informatyka, Pielęgniarstwo, Zarządzanie – po jednym na każdy z trzech wydziałów) i semestry 1 i 3, razem 6 planów. Bez podziału na wydziały w nawigacji. Plan zajęć jest jedną z najczęściej potrzebnych rzeczy, więc go nie chowamy. Na stronie Studia zaraz pod `h1` jest wyróżniony blok „Plan zajęć” (ramka, przyciski do planu każdego kierunku i link do hubu). Na stronie głównej pierwszy kafelek „Na skróty” prowadzi do hubu planów. Blok to region (`section` z `aria-labelledby`), więc czytnik ekranu pokaże go też na liście punktów orientacyjnych.
- Pasek „Kierunki” (zwykłe linki w `nav`, jak pasek kategorii w kursach) jest na każdej stronie planu, w tej samej kolejności. Okruszki: „Studia › Plan zajęć › Kierunek › Semestr”. „Studia” w menu głównym ma `aria-current="true"`, a `aria-current="page"` jest tylko na ostatnim elemencie okruszków. Na planie lista „Semestry tego kierunku” oznacza bieżący semestr `aria-current="true"`.
- Wszystkie plany powstają z jednego przykładowego tygodnia w `src/data/schedule.js` (tam też sale i krótki opis ich barier), więc zmianę robi się w jednym miejscu. Linki „Wróć do planu zajęć” z mapy kampusu prowadzą do hubu.
- Plan to listy dzień po dniu (nagłówek `h3` na dzień, `ol` z zajęciami, każde w osobnej „karcie” z liniami jedna pod drugą), a nie siatka tygodniowa ani tabela: siatka źle się czyta czytnikiem i nie mieści się na 320 px / przy tekście 150% (1.4.10). Pasek „Przejdź do dnia” skacze do dni (2.4.1).
- Odwołanie zajęć i zmiana sali są podane tekstem („Odwołane”, „Zmiana sali”), nie kolorem (1.4.1).
- Przy każdej sali link „Sala A 101” z ukrytym dopiskiem „– opis dostępności sali” (2.4.4) i krótka informacja o barierach obok: budynek, piętro, winda lub „tylko schody, brak windy”.
- Opisy sal są na mapie kampusu, `/campus-map#<sala>` (nagłówek `h3` z `id` na salę, `dl` z tymi samymi polami przy każdej sali: budynek i piętro, dojście, miejsca dla osób na wózkach, pętla indukcyjna) i mają link powrotny do planu. Sala niedostępna (B 112) podaje, do kogo napisać o przeniesieniu zajęć.
- Wybór planu to nawigacja linkami, nie formularz: wyboru nie trzeba obsługiwać polami `select`, każdy plan ma własny adres i działa przycisk „wstecz”.
- Prowadzący i sale w przykładzie są zmyślone („dr Jan Przykładowy”).

## Treść i multimedia

- Prosty język, zwracanie się na „Ty”, linki mówią, dokąd prowadzą (2.4.4, 3.1.5).
- Telefony i e-maile jako linki `tel:` i `mailto:`.
- Zdjęcia mają tekst alternatywny (1.1.1).
- Filmy: napisy, transkrypcja, w razie potrzeby audiodeskrypcja, bez autoodtwarzania (1.2.x, 1.4.2).
- Mapa kampusu opiera się na tekście, a plan graficzny jest dodatkiem. Podajemy też bariery („brak windy”), nie tylko udogodnienia.

## Mapa kampusu

- Plan, opis tekstem i wyznaczanie trasy powstają z jednych danych (`src/data/campus.js`: miejsca, ścieżki, udogodnienia), więc plan i tekst zawsze mówią to samo.
- Plan to SVG. Każdy znak to link (`<a href="#miejsce">` z `aria-label`) do opisu miejsca pod planem – działa klawiszem Tab i Enter, a czytnik ekranu czyta nazwę miejsca. Rysunek (budynki, ścieżki, trasa) jest ukryty przed czytnikiem (`aria-hidden`), bo to samo jest w tekście. Przed planem jest link „Pomiń plan” (2.4.1).
- Każdy rodzaj udogodnienia ma własny znak (drzwi, winda, „WC”, „P”, fale pętli, księżyc pokoju cichej nauki…), a bariery inny kształt: żółty trójkąt ze schodami. Nic nie zależy od samego koloru (1.4.1). Sale na piętrze mają przerywaną ramkę i dopisek „(1. piętro)”.
- Fokus na znaku: ciemna obwódka w żółtej, widoczna na każdym tle. Ta sama obwódka zaznacza miejsce po kliknięciu „Pokaż na planie” (`:target`).
- Plan jest mapą, więc na wąskim ekranie przesuwa się w bok w swojej ramce (wyjątek w 1.4.10). Ma szerokość w `rem`, więc rośnie z A+ / A++, a reszta strony nie przewija się w poziomie.
- Kolory planu to zmienne CSS (`--map-…`) z wersją dla wysokiego kontrastu i dla trybu wymuszonych kolorów.
- Filtr „Co pokazać na planie” to zwykłe pola wyboru w `fieldset` z legendą, a ikony przy nich są też legendą planu. Ukryte znaki znikają z planu (i z kolejności Tab). „Pokaż na planie” przy ukrytym rodzaju najpierw go włącza.
- Wyznaczanie trasy: dwa pola `select` (miejsca pogrupowane w `optgroup` według budynków) i wybór rodzaju trasy („Bez schodów i progów” – domyślnie – albo „Najkrótsza”). Zwykły formularz z przyciskiem: nic się nie zmienia samo przy wyborze (3.2.2). Błąd (brak celu, cel = start) jest opisany tekstem przy polu i fokus wraca na to pole (3.3.1).
- Wynik: opis krok po kroku (lista numerowana: dokąd iść, ile metrów, schody, winda, ścieżka dotykowa) i linia na planie. Podsumowanie trasy („Wyznaczona trasa”: skąd, dokąd, długość, czas, schody) jest tuż nad planem, a kroki tuż pod nim. Po wyznaczeniu strona przewija się do podsumowania, więc od razu widać trasę na planie (na telefonie ramka planu przesuwa się do trasy), a fokus przechodzi na nagłówek „Wyznaczona trasa”, żeby czytnik ekranu go przeczytał. Formularz zostaje pod planem. Trasa ma własny adres (`?skad=…&dokad=…&trasa=…`), działa przycisk „wstecz” i można dać do niej link.
- Gdy trasy bez schodów nie ma, piszemy to wprost, podajemy powód (np. brak windy w budynku B) i kierujemy do Biura ds. Osób z Niepełnosprawnościami. Trasa najkrótsza ze schodami mówi, ile jest stopni i o ile dłuższa jest trasa bez schodów.
- Opisy sal (`/campus-map#<sala>`) zostały, z linkami „Trasa od bramy głównej” i „Pokaż na planie”.
- Logowanie bez CAPTCHA, z możliwością wklejenia hasła (3.3.8).

## Strefa pracownika – logowanie

- Za logowaniem nic nie ma (mock), więc formularz zawsze odmawia. Nad nim jest ramka „Uwaga: to wersja demonstracyjna… Nie wpisuj prawdziwego hasła”, a po wysłaniu komunikat „Nie zalogowano” mówi, że nic nie zostało wysłane. Hasło nie trafia nigdzie poza pole, a po próbie jest czyszczone.
- Uwierzytelnianie bez testu poznawczego (3.3.8): bez CAPTCHA i zagadek, wklejanie działa, pola mają `autocomplete="username"` i `"current-password"`, więc menedżer haseł je wypełni. Bez limitu czasu (2.2.1).
- Etykiety nad polami, przykład loginu pod etykietą (`aria-describedby`), „Pokaż hasło” jako zwykłe pole wyboru, ostrzeżenie o Caps Locku w obszarze `aria-live`.
- Błędy (3.3.1, 3.3.3): lista „Popraw N błędy w formularzu” nad formularzem z linkami do pól oraz tekst „Błąd: …” przy polu (połączony z polem przez `aria-describedby`, pole ma `aria-invalid`). Po wysłaniu fokus przechodzi na listę błędów albo na komunikat, żeby czytnik ekranu go przeczytał. Błąd ma czerwoną ramkę i słowo „Błąd”, nie tylko kolor.
- Pod formularzem „Problem z logowaniem?” z telefonem i e-mailem działu IT (pomoc dostępna, 3.2.6).

## Czego nie robimy

- Nakładek dostępności (widgetów z ikoną ludzika) – nie naprawiają kodu i psują działanie czytników ekranu.
- Ikon bez podpisu, treści tylko w PDF, okienek zasłaniających treść.

## Mock

- Puste miejsca to różowe pola z opisem: od razu widać, co jest do zrobienia. Czarny tekst na różowym ma kontrast 7,9:1.
- Wygląd jest celowo niedopracowany. Mock pokazuje strukturę, a nie projekt graficzny.

## Do ustalenia

- tryb ciemny,
- które materiały tłumaczymy na polski język migowy,
- plany pięter (teraz plan pokazuje parter, a sale na piętrze są zaznaczone ramką przerywaną),
- treść deklaracji dostępności,
- wersja angielska,
- eksport planu zajęć do kalendarza (iCal); HTML zostaje głównym źródłem, nie tylko PDF,
- oznaczenie zajęć z tłumaczem polskiego języka migowego,
- przechodzenie między tygodniami w planie zajęć,
- plany pozostałych semestrów.

## Jak sprawdzamy

axe lub Lighthouse, obsługa samą klawiaturą, czytniki ekranu (NVDA, VoiceOver, TalkBack), powiększenie 200–400% i szerokość 320 px, a przede wszystkim testy z osobami z niepełnosprawnościami.
