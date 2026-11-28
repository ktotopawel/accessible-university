# Decyzje dotyczące dostępności

Cel: **WCAG 2.2 AA**, a kontrast tekstu na poziomie AAA. W nawiasach podajemy kryterium WCAG.

## Struktura

- `lang="pl"`, regiony `header` / `nav` / `main` / `footer`, jeden `h1` i nagłówki po kolei – czytnik ekranu czyta po polsku, a użytkownik przeskakuje po regionach i nagłówkach (1.3.1, 3.1.1).
- Link „Przejdź do treści głównej” na początku strony – nie trzeba za każdym razem przechodzić przez menu (2.4.1).
- Każda strona ma własny tytuł „Strona – Akademia Jasnogrodzka” (2.4.2).

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

- Układ: strona główna kursów (kafelki kategorii) → strona kategorii (przedmioty jako nagłówki `h2`, pod nimi kafelki kursów) → strona lekcji.
- Kategorie to zwykłe linki w `nav` („Kategorie kursów”), a nie zakładki ARIA: każda kategoria to osobna strona, więc działają przycisk „wstecz”, linki bezpośrednie i brak JavaScriptu. Pasek jest zawsze widoczny, w tej samej kolejności na każdej stronie kursów (3.2.3). Bieżąca kategoria ma `aria-current` i podkreślenie (1.4.1).
- Bez drugiego „hamburgera” na przedmioty: ukrywałby główną treść strony, wymagał JavaScriptu i dokładał drugi zwijany poziom menu. Zamiast tego lista przedmiotów z linkami do sekcji na stronie. Gdyby przedmiotów było bardzo dużo, użyjemy natywnego `<details>`.
- `aria-current="page"` jest na stronie tylko raz, żeby czytnik ekranu nie mówił „bieżąca strona” dwa razy: na ostatnim elemencie okruszków, a na stronie głównej kursów (bez okruszków) na „Kursy wideo” w menu głównym. Pozostałe oznaczenia bieżącego miejsca (menu główne jako sekcja, pasek kategorii) mają `aria-current="true"`, a bieżąca lekcja na liście lekcji `aria-current="step"`.
- Znany kompromis: na telefonie (320 px) pasek kategorii zajmuje ok. 310 px wysokości, więc `h1` zaczyna się nisko (przy tekście 150% jeszcze niżej). Siatka 2 kolumn łamała wyrazy w środku („humanisty-czne”), więc z niej zrezygnowaliśmy. Do rozważenia: krótsze nazwy kategorii.
- Transkrypcja zawsze tak samo: nagłówek „Transkrypcja”, pod nim `<details open>` z podpisem „Pokaż lub ukryj transkrypcję”.
- Okruszki (ścieżka nawigacji) na każdej podstronie kursów – orientacja w trzech poziomach (2.4.8, dodatkowo).
- Udogodnienia kursu (napisy, transkrypcja, audiodeskrypcja) są podane tekstem, nie samymi ikonami.
- Pliki wideo i obrazki podglądu leżą w `video/` (np. `video/liczby-zespolone.mp4`), pod ścieżką względną od katalogu głównego. Pierwsza prawdziwa lekcja: `lesson-math-complex-numbers.html`. Napisy (`video/liczby-zespolone.pl.vtt`, włączone domyślnie przez `<track kind="captions" default>`) i transkrypcja z opisem slajdów powstały ze skryptu lektora; czasy napisów dopasowano automatycznie do przerw w nagraniu, więc warto je sprawdzić na kilku fragmentach. Wersja z audiodeskrypcją (WCAG 1.2.5) nadal jest placeholderem: narracja czyta większość wzorów, ale nie opisuje wykresu płaszczyzny zespolonej.
- Lekcja: natywny `<video controls>`, napisy po polsku włączone domyślnie, bez autoodtwarzania (1.2.2, 1.4.2, 2.2.2). Transkrypcja pod odtwarzaczem (1.2.3). Wersja z audiodeskrypcją jako osobny film, bo przeglądarki nie odtwarzają ścieżki `kind="descriptions"` (1.2.5).

## Plan zajęć

- Układ jak w kursach wideo: `schedule.html` (hub z kafelkami kierunków) → `schedule-<kierunek>.html` (wybór semestru) → `schedule-<kierunek>-sem<N>.html` (plan). 3 kierunki (Informatyka, Pielęgniarstwo, Zarządzanie – po jednym na każdy z trzech wydziałów) i semestry 1 i 3, razem 6 planów. Bez podziału na wydziały w nawigacji. Plan zajęć jest jedną z najczęściej potrzebnych rzeczy, więc go nie chowamy. Na stronie Studia zaraz pod `h1` jest wyróżniony blok „Plan zajęć” (ramka, przyciski do planu każdego kierunku i link do hubu). Na stronie głównej pierwszy kafelek „Na skróty” prowadzi do hubu planów. Blok to region (`section` z `aria-labelledby`), więc czytnik ekranu pokaże go też na liście punktów orientacyjnych.
- Pasek „Kierunki” (zwykłe linki w `nav`, jak pasek kategorii w kursach) jest na każdej stronie planu, w tej samej kolejności. Okruszki: „Studia › Plan zajęć › Kierunek › Semestr”. „Studia” w menu głównym ma `aria-current="true"`, a `aria-current="page"` jest tylko na ostatnim elemencie okruszków. Na planie lista „Semestry tego kierunku” oznacza bieżący semestr `aria-current="true"`.
- Strony planów są zwykłymi kopiami przykładowego tygodnia (bez generatora): zmianę w przykładowym planie trzeba wprowadzić we wszystkich 6 plikach `schedule-*-sem*.html`. Linki „Wróć do planu zajęć” z `campus-map.html` prowadzą do hubu.
- Plan to listy dzień po dniu (nagłówek `h3` na dzień, `ol` z zajęciami, każde w osobnej „karcie” z liniami jedna pod drugą), a nie siatka tygodniowa ani tabela: siatka źle się czyta czytnikiem i nie mieści się na 320 px / przy tekście 150% (1.4.10). Pasek „Przejdź do dnia” skacze do dni (2.4.1).
- Odwołanie zajęć i zmiana sali są podane tekstem („Odwołane”, „Zmiana sali”), nie kolorem (1.4.1).
- Przy każdej sali link „Sala A 101” z ukrytym dopiskiem „– opis dostępności sali” (2.4.4) i krótka informacja o barierach obok: budynek, piętro, winda lub „tylko schody, brak windy”.
- Opisy sal są w `campus-map.html` (nagłówek `h3` z `id` na salę, `dl` z tymi samymi polami przy każdej sali: budynek i piętro, dojście, miejsca dla osób na wózkach, pętla indukcyjna) i mają link powrotny do planu. Sala niedostępna (B 112) podaje, do kogo napisać o przeniesieniu zajęć.
- Wybór planu to nawigacja linkami, nie formularz: wyboru nie trzeba obsługiwać polami `select`, działa bez JavaScriptu i z przyciskiem „wstecz”.
- Prowadzący i sale w przykładzie są zmyślone („dr Jan Przykładowy”).

## Treść i multimedia

- Prosty język, zwracanie się na „Ty”, linki mówią, dokąd prowadzą (2.4.4, 3.1.5).
- Telefony i e-maile jako linki `tel:` i `mailto:`.
- Zdjęcia mają tekst alternatywny (1.1.1).
- Filmy: napisy, transkrypcja, w razie potrzeby audiodeskrypcja, bez autoodtwarzania (1.2.x, 1.4.2).
- Mapa kampusu opiera się na tekście, a plan graficzny jest dodatkiem. Podajemy też bariery („brak windy”), nie tylko udogodnienia.
- Logowanie bez CAPTCHA, z możliwością wklejenia hasła (3.3.8).

## Czego nie robimy

- Nakładek dostępności (widgetów z ikoną ludzika) – nie naprawiają kodu i psują działanie czytników ekranu.
- Ikon bez podpisu, treści tylko w PDF, okienek zasłaniających treść.

## Mock

- Puste miejsca to różowe pola z opisem: od razu widać, co jest do zrobienia. Czarny tekst na różowym ma kontrast 7,9:1.
- Wygląd jest celowo niedopracowany. Mock pokazuje strukturę, a nie projekt graficzny.

## Do ustalenia

- tryb ciemny,
- które materiały tłumaczymy na polski język migowy,
- czy robimy wyznaczanie trasy po budynkach,
- treść deklaracji dostępności,
- wersja angielska,
- eksport planu zajęć do kalendarza (iCal); HTML zostaje głównym źródłem, nie tylko PDF,
- oznaczenie zajęć z tłumaczem polskiego języka migowego,
- przechodzenie między tygodniami w planie zajęć,
- plany pozostałych semestrów.

## Jak sprawdzamy

axe lub Lighthouse, obsługa samą klawiaturą, czytniki ekranu (NVDA, VoiceOver, TalkBack), powiększenie 200–400% i szerokość 320 px, a przede wszystkim testy z osobami z niepełnosprawnościami.
