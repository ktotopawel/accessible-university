# Decyzje dotyczące dostępności

Cel: **WCAG 2.2 AA**, a kontrast tekstu na poziomie AAA. W nawiasach podajemy kryterium WCAG.

## Struktura

- `lang="pl"`, regiony `header` / `nav` / `main` / `footer`, jeden `h1` i nagłówki po kolei – czytnik ekranu czyta po polsku, a użytkownik przeskakuje po regionach i nagłówkach (1.3.1, 3.1.1).
- Link „Przejdź do treści głównej” na początku strony – nie trzeba za każdym razem przechodzić przez menu (2.4.1).
- Każda strona ma własny tytuł „Strona – Akademia Śląska” (2.4.2).

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
- Czcionka Poppins, jak na akademiaslaska.pl: tekst 18 px, interlinia 1,6, wiersz do ok. 70 znaków (1.4.8, 1.4.12). Jej wadą jest podobne „I” i „l”. Jeśli przeszkodzi to w testach, zamienimy ją na Atkinson Hyperlegible.
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
- wersja angielska.

## Jak sprawdzamy

axe lub Lighthouse, obsługa samą klawiaturą, czytniki ekranu (NVDA, VoiceOver, TalkBack), powiększenie 200–400% i szerokość 320 px, a przede wszystkim testy z osobami z niepełnosprawnościami.
