// Transcript of video/liczby-zespolone.mp4: per slide, the description of what is on screen
// ("[Obraz: …]") and the narrator's lines. Generated from the narration script.

export const CHAPTERS = [
  "Wprowadzenie",
  "Jednostka urojona",
  "Postać algebraiczna",
  "Działania",
  "Sprzężenie i moduł",
  "Interpretacja geometryczna",
  "Podsumowanie"
];

export const SLIDES = [
  {
    "title": "Slajd 1: Slajd tytułowy (0:00)",
    "image": "[Obraz: Slajd tytułowy. Nagłówek „Matematyka dla studentów · Lekcja 1”, duży tytuł „Liczby zespolone” i podtytuł „Definicja, działania i interpretacja geometryczna”. Po lewej spis treści kursu „Algebra dla studentów”.]",
    "narration": [
      "Dzień dobry. Witam w pierwszej lekcji o liczbach zespolonych."
    ]
  },
  {
    "title": "Slajd 2: Czego się nauczysz (0:04)",
    "image": "[Obraz: Slajd „Czego się nauczysz” z czterema punktami: 1. Czym jest jednostka urojona. 2. Postać algebraiczna i działania. 3. Sprzężenie i moduł. 4. Płaszczyzna zespolona i postać trygonometryczna.]",
    "narration": [
      "Poznamy jednostkę urojoną, podstawowe działania, sprzężenie i moduł oraz interpretację geometryczną."
    ]
  },
  {
    "title": "Slajd 3: Skąd biorą się liczby zespolone? (0:12)",
    "image": "[Obraz: Slajd „Skąd biorą się liczby zespolone?”. Kolejno pojawiają się: równanie x² + 1 = 0, w ramce definicja i² = −1, a na końcu rozwiązania x = i lub x = −i.]",
    "narration": [
      "Zacznijmy od równania: iks kwadrat plus jeden równa się zero. Nie ma ono rozwiązań rzeczywistych, bo kwadrat liczby rzeczywistej nie jest ujemny.",
      "Wprowadzamy więc jednostkę urojoną i. Z definicji, i kwadrat równa się minus jeden.",
      "Dzięki temu nasze równanie ma dwa rozwiązania: i oraz minus i."
    ]
  },
  {
    "title": "Slajd 4: Postać algebraiczna (0:33)",
    "image": "[Obraz: Slajd „Postać algebraiczna”. W ramce z = a + bi, gdzie a i b są liczbami rzeczywistymi. Niżej: a = Re z (część rzeczywista), b = Im z (część urojona). Na końcu przykład: z = 3 + 4i, Re z = 3, Im z = 4.]",
    "narration": [
      "Liczbę zespoloną zapisujemy jako zet równa się a plus be i, gdzie a oraz be są liczbami rzeczywistymi. Liczba a to część rzeczywista, a be to część urojona.",
      "Na przykład, dla liczby trzy plus cztery i, część rzeczywista wynosi trzy, a część urojona cztery. Samo cztery, bez i."
    ]
  },
  {
    "title": "Slajd 5: Dodawanie i mnożenie (0:52)",
    "image": "[Obraz: Slajd „Dodawanie i mnożenie”. Dodawanie: (3 + 4i) + (1 − 2i) = 4 + 2i. Mnożenie: (3 + 4i)(1 − 2i) = 3 − 6i + 4i − 8i². Po podstawieniu i² = −1, w ramce: 3 − 2i + 8 = 11 − 2i.]",
    "narration": [
      "Dodając, sumujemy osobno części rzeczywiste i urojone. Otrzymujemy cztery plus dwa i.",
      "Mnożymy tak, jak zwykłe wyrażenia algebraiczne, czyli każdy składnik przez każdy.",
      "Następnie zastępujemy i kwadrat liczbą minus jeden. Wynik to jedenaście, minus dwa i."
    ]
  },
  {
    "title": "Slajd 6: Sprzężenie, moduł i dzielenie (1:12)",
    "image": "[Obraz: Slajd „Sprzężenie, moduł i dzielenie”. Dla z = 3 + 4i sprzężenie, zapisane jako z z poziomą kreską nad literą (dalej „z z kreską”), wynosi 3 − 4i, a moduł |z| = √(3² + 4²) = 5. W ramce: z · (z z kreską) = |z|² = 25. Dzielenie: (3 + 4i)/(1 − 2i) pomnożone przez (1 + 2i)/(1 + 2i) daje (−5 + 10i)/5, czyli −1 + 2i.]",
    "narration": [
      "Sprzężenie powstaje przez zmianę znaku części urojonej. Moduł to pierwiastek z sumy kwadratów obu części, tutaj pięć.",
      "Iloczyn liczby i jej sprzężenia to zawsze kwadrat modułu.",
      "Przy dzieleniu mnożymy licznik i mianownik przez sprzężenie mianownika. Wynik to minus jeden, plus dwa i."
    ]
  },
  {
    "title": "Slajd 7: Płaszczyzna zespolona (1:31)",
    "image": "[Obraz: Slajd „Płaszczyzna zespolona”. Po prawej wykres: pozioma oś Re i pionowa oś Im, obie od 0 do 5. Punkt z = 3 + 4i z przerywanymi liniami do osi, odcinek od początku układu do punktu opisany |z| = 5 i zielony łuk kąta φ przy osi Re. Po lewej: z = a + bi to punkt (a, b); moduł to odległość od zera; argument φ to kąt z osią Re. W ramce postać trygonometryczna z = |z|(cos φ + i sin φ), przy czym cos φ = 3/5 i sin φ = 4/5.]",
    "narration": [
      "Liczba zespolona to punkt na płaszczyźnie. Oś pozioma jest rzeczywista, a pionowa urojona.",
      "Moduł jest odległością tego punktu od początku układu. Kąt fi, mierzony od dodatniej części osi rzeczywistej, nazywamy argumentem.",
      "Stąd otrzymujemy postać trygonometryczną: moduł razy, w nawiasie, kosinus fi plus i sinus fi."
    ]
  },
  {
    "title": "Slajd 8: Podsumowanie (1:54)",
    "image": "[Obraz: Slajd „Podsumowanie” z trzema odhaczonymi punktami: i² = −1 oraz z = a + bi; sprzężenie (z z kreską) = a − bi oraz |z| = √(a² + b²); z = |z|(cos φ + i sin φ). W ramce „Zadanie do samodzielnego rozwiązania”: dla w = (2 + 3i)(1 − i) oblicz w oraz |w|.]",
    "narration": [
      "Podsumujmy: znamy jednostkę urojoną, działania, moduł i postać trygonometryczną.",
      "Na koniec zadanie do samodzielnego rozwiązania. Zatrzymaj nagranie i spróbuj je wykonać. Dziękuję za uwagę i do zobaczenia w następnej lekcji."
    ]
  }
];
