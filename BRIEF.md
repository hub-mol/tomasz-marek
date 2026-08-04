# Brief strony — Tomasz Marek Architekt

**Wersja:** 1.0  
**Data:** 29.07.2026  
**Status:** brief roboczy po analizie korespondencji, obecnej strony Carrd i prototypu Astro  
**Planowany termin publikacji:** do 31.08.2026  
**Budżet deklarowany przez klienta:** 1500–2000 zł brutto

## 1. Kontekst

Tomasz Marek prowadzi jednoosobową pracownię architektoniczną. Obecnie zajmuje się
architekturą i wnętrzami, a w pierwszej kolejności chce pozyskiwać zlecenia na:

- domy prywatne,
- wnętrza mieszkalne,
- mniejsze wnętrza usługowe, np. kawiarnie i salony kosmetyczne.

Aktualna strona w Carrd pełni funkcję prostej wizytówki. Docelowy serwis ma połączyć
minimalistyczny, wizerunkowy charakter portfolio architekta z czytelną prezentacją oferty
i prowadzeniem użytkownika do kontaktu.

Nazwa marki pozostaje do zatwierdzenia. W materiałach występują warianty:
„TMA Tomasz Marek Architekt”, „Tomasz Marek Architekt” oraz „tma* studio”.

## 2. Główny cel strony

Strona ma przede wszystkim pozyskiwać wartościowe zapytania od potencjalnych klientów,
a dopiero w drugiej kolejności być katalogiem wszystkich realizacji.

Główna konwersja:

> Umówienie bezpłatnej konsultacji.

Konwersje pomocnicze:

- przejście do formularza lub kalendarza spotkań,
- kliknięcie w numer telefonu lub adres e-mail,
- obejrzenie realizacji i poznanie zakresu współpracy.

Nie zakładamy gwarancji określonej pozycji w Google ani liczby leadów. W ramach MVP
powstaje solidna baza techniczna i treściowa pod SEO; wzrost ruchu będzie zależeć również
od jakości i regularności publikowanych realizacji, opinii, profilu firmy w Google,
konkurencji i czasu potrzebnego na indeksację.

## 3. Odbiorcy

### Grupa priorytetowa

Klienci indywidualni planujący budowę lub przebudowę domu albo kompleksowy projekt
wnętrza. Zależy im na indywidualnym podejściu, poczuciu kontroli nad procesem i projekcie
możliwym do sprawnego zrealizowania.

### Grupa uzupełniająca

Właściciele niewielkich lokali usługowych, m.in. kawiarni, gabinetów i salonów, którzy
potrzebują spójnego wnętrza odpowiadającego marce i wymaganiom funkcjonalnym.

### Najważniejsze obawy odbiorców

- brak wiedzy, od czego zacząć i jak wygląda współpraca z architektem,
- obawa przed nieprzewidywalnym budżetem i terminami,
- ryzyko projektu efektownego, ale trudnego do wykonania,
- niejasny zakres dokumentacji i odpowiedzialności,
- trudność w ocenie, czy styl architekta pasuje do inwestora.

Strona powinna odpowiadać na te obawy przez pokazanie procesu, zakresu usług, realnych
realizacji, opinii oraz jasnego następnego kroku.

## 4. Pozycjonowanie marki

Rekomendowany kierunek komunikacji:

> Indywidualne projekty architektury i wnętrz, które przekładają potrzeby inwestora na
> spójną, funkcjonalną i gotową do realizacji przestrzeń.

Propozycja nagłówka hero:

> Zmieniam Twoją wizję w projekt gotowy do realizacji.

Propozycja doprecyzowania:

> Projektuję domy, wnętrza i niewielkie przestrzenie usługowe — od pierwszej koncepcji po
> wsparcie na etapie realizacji.

Ton komunikacji:

- spokojny, rzeczowy i partnerski,
- profesjonalny, ale bez korporacyjnego języka,
- zrozumiały dla osoby, która pierwszy raz współpracuje z architektem,
- oszczędny — krótkie, konkretne akapity zamiast ogólnych deklaracji.

Domy i wnętrza można prezentować w jednym serwisie. Spójność zapewni wspólna narracja
o procesie i podejściu, natomiast projekty otrzymają czytelne kategorie. Małe lokale
usługowe pozostają trzecią, uzupełniającą kategorią.

## 5. Kierunek wizualny

Serwis ma być minimalistyczny, oparty na dużych zdjęciach, mocnej typografii, wyraźnej
geometrii i dużej ilości pustej przestrzeni.

Inspiracje i ich rola:

- [Archicon](https://archicon.qodeinteractive.com/) — język wizualny, skala typografii,
  sekcje portfolio i rytm layoutu;
- [IFA Group — Domy i rezydencje](https://www.ifagroup.pl/domy-i-rezydencje) — kolejność
  argumentów, prezentacja procesu, realizacji, FAQ i kontaktu;
- [obecna strona Carrd](https://tomaszmarek.carrd.co/) — punkt wyjścia dla zdjęć,
  nazewnictwa i prostego tonu marki.

Założenia:

- pierwsza sekcja o wysokości około 2/3 ekranu,
- duże wizualizacje zmieniane automatycznie lub przewijane poziomo,
- logo/nazwa po lewej i prosta nawigacja po prawej,
- widoczne CTA „Umów bezpłatną konsultację” już w pierwszym widoku,
- paleta neutralna: biel, czerń, ciepłe szarości; jeden oszczędny akcent kolorystyczny,
- pierwszoplanowa rola zdjęć i wizualizacji,
- pełna wersja mobilna.

Tryb dzień/noc nie wchodzi do MVP. Można do niego wrócić, jeżeli po uzupełnieniu treści
będzie wspierał markę, a nie tylko zwiększał liczbę wariantów interfejsu.

## 6. Architektura informacji — MVP

### Nawigacja

- Home
- Projekty
- Oferta / Proces
- O mnie
- FAQ
- Kontakt
- wyróżnione CTA: „Umów konsultację”

Na stronie głównej pozycje Oferta / Proces, O mnie, FAQ i Kontakt mogą prowadzić do
sekcji na landing page. Pozwala to zachować prostotę i ograniczyć koszt. „Projekty”
prowadzą do osobnego listingu.

### 6.1. Strona główna `/`

1. **Hero**
   - 3–5 najmocniejszych zdjęć lub wizualizacji,
   - główna obietnica,
   - krótkie doprecyzowanie zakresu,
   - CTA „Umów bezpłatną konsultację”,
   - link pomocniczy „Zobacz projekty”.

2. **Wprowadzenie / podejście**
   - krótka odpowiedź na pytanie, dla kogo i w jaki sposób projektuje Tomasz,
   - nacisk na połączenie estetyki, funkcji i możliwości realizacji.

3. **Wybrane realizacje**
   - 3–6 projektów,
   - kategoria, nazwa i lokalizacja lub rok,
   - link do pełnego portfolio.

4. **Oferta**
   - architektura domów,
   - wnętrza mieszkalne,
   - wnętrza usługowe,
   - możliwe elementy zakresu: koncepcja, projekt budowlany, wizualizacje, nadzór,
     konsultacje.

5. **Proces współpracy**
   - konsultacja i rozpoznanie potrzeb,
   - analiza i koncepcja,
   - rozwój projektu i dokumentacja,
   - wsparcie w realizacji / nadzór, jeśli w zakresie.

6. **O mnie**
   - portret,
   - krótka historia i kwalifikacje,
   - sposób pracy i wartości,
   - opcjonalnie członkostwa, publikacje, konkursy lub uprawnienia.

7. **Opinie / dowody zaufania**
   - 2–4 prawdziwe opinie klientów,
   - alternatywnie na start: konkretne liczby lub krótkie fakty, wyłącznie jeśli są
     możliwe do potwierdzenia.

8. **FAQ**
   - 6–8 pytań dotyczących ceny, czasu, zakresu, lokalizacji, zdalnej współpracy,
     dokumentacji, liczby poprawek i pierwszego spotkania.

9. **Kontakt / końcowe CTA**
   - wezwanie do umówienia bezpłatnej konsultacji,
   - telefon, e-mail, obszar działania,
   - Instagram i ewentualnie inne aktywne profile,
   - opcjonalnie krótki formularz.

### 6.2. Lista projektów `/projekty`

- prosty, obrazowy listing,
- filtry: wszystkie / domy / wnętrza / usługowe, dopiero gdy liczba realizacji uzasadnia
  ich użycie,
- każdy kafel prowadzi do osobnej podstrony realizacji,
- możliwość dodawania kolejnych projektów bez ingerencji dewelopera.

### 6.3. Projekt `/projekty/[slug]`

Jeden spójny szablon zamiast wielu wariantów:

- tytuł i mocne zdjęcie otwierające,
- krótki opis problemu i założeń,
- zakres prac Tomasza,
- podstawowe dane: typ, lokalizacja, rok, status, powierzchnia — tylko jeśli można je
  publikować,
- galeria,
- rezultat / najważniejsze rozwiązania,
- CTA do konsultacji,
- przejście do poprzedniego i następnego projektu.

### 6.4. Strona prawna

- polityka prywatności,
- informacja o przetwarzaniu danych przy formularzu, jeśli formularz zostanie wdrożony.

Blog nie wchodzi do MVP. Puste lub nieregularnie aktualizowane wpisy osłabiłyby odbiór
strony. W kolejnym etapie lepsze będą merytoryczne poradniki odpowiadające na realne
pytania klientów.

## 7. Funkcje MVP

- responsywna strona Astro,
- panel Sanity do dodawania i edycji realizacji,
- zarządzanie kolejnością i widocznością projektów,
- jedno narzędzie do umówienia konsultacji: Cal.com albo Calendly,
- klikalny telefon i e-mail,
- lekka animacja hero i subtelne interakcje,
- optymalizacja zdjęć,
- podstawowa dostępność: obsługa klawiaturą, właściwa hierarchia nagłówków, opisy
  alternatywne, odpowiedni kontrast i ograniczenie animacji zgodnie z preferencjami
  użytkownika.

Rekomendacja budżetowa: w MVP kalendarz otwierany jako osobna strona lub lekki popup.
Osadzony widget, formularz wysyłkowy, rozbudowane śledzenie i baner zgód można dodać po
potwierdzeniu faktycznej potrzeby.

## 8. SEO i obecność w Google

Zakres bazowy:

- poprawne tytuły i opisy każdej indeksowanej strony,
- jedna logiczna struktura nagłówków,
- czytelne polskie adresy URL,
- linki kanoniczne,
- mapa strony i `robots.txt`,
- dane Open Graph do udostępniania,
- dane strukturalne dopasowane do pracowni i realizacji,
- opisy alternatywne zdjęć,
- szybkie ładowanie i poprawne działanie mobilne,
- konfiguracja Google Search Console,
- połączenie strony z wizytówką Google,
- spójne dane firmy: nazwa, telefon, e-mail i obszar działania,
- przygotowanie przekierowań na jedną wersję domeny.

Przed redakcją treści trzeba ustalić główny obszar działania. Dopiero wtedy można wybrać
realne frazy lokalne i usługowe, np. połączenia typu „architekt + miasto”,
„projektowanie wnętrz + miasto” i „projekt domu + region”.

Rozbudowa SEO w kolejnym etapie:

- osobne strony dla kluczowych usług,
- strony lokalne tylko tam, gdzie istnieją prawdziwe realizacje lub wiarygodna treść,
- poradniki / baza wiedzy,
- systematyczne pozyskiwanie opinii,
- publikacja nowych zdjęć i aktualności w Profilu Firmy w Google,
- analiza zapytań w Search Console i rozwój treści na podstawie danych.

Samo kupienie lub wiek domeny nie gwarantują wzrostu widoczności. W pozycjonowaniu
lokalnym Google bierze pod uwagę przede wszystkim trafność, odległość i rozpoznawalność
firmy, w tym kompletność profilu, opinie i sygnały z innych stron.

## 9. CMS i model treści

Klient ma samodzielnie dodawać realizacje. Minimalny model projektu w Sanity:

- tytuł,
- slug,
- status publikacji,
- kolejność / wyróżnienie na stronie głównej,
- kategoria,
- rok,
- lokalizacja,
- zakres prac,
- powierzchnia i status realizacji — opcjonalne,
- opis skrócony,
- opis pełny w elastycznych blokach,
- zdjęcie okładkowe,
- galeria z kolejnością zdjęć,
- tekst alternatywny każdego zdjęcia,
- dane SEO: tytuł i opis,
- CTA lub kontakt domyślny.

Stałe teksty strony mogą pozostać w kodzie w MVP. Ogranicza to koszt i upraszcza panel.
Jeżeli Tomasz chce edytować również ofertę, FAQ, sekcję „O mnie” i dane kontaktowe, zakres
CMS trzeba rozszerzyć.

## 10. Materiały potrzebne od klienta

### Niezbędne przed rozpoczęciem finalnego wdrożenia

- zatwierdzona nazwa marki i zapis logo,
- wskazanie głównej usługi, którą strona ma sprzedawać,
- obszar działania i informacja o możliwości współpracy zdalnej,
- dane dostępowe lub zaproszenie do zarządzania domeną,
- dostęp administracyjny do Profilu Firmy w Google,
- wybór Cal.com lub Calendly i konto klienta,
- docelowy e-mail, telefon i linki społecznościowe.

### Treści

- opis pracowni i biogram Tomasza,
- opis każdej usługi i rzeczywisty zakres współpracy,
- faktyczny proces projektowy,
- 6–8 odpowiedzi do FAQ,
- minimum 2 prawdziwe opinie, jeśli mają być publikowane na starcie.

### Projekty

Rekomendowane minimum na start: 3 kompletne realizacje lub koncepcje.

Dla każdej:

- nazwa,
- kategoria,
- rok i lokalizacja,
- zakres wykonanych prac,
- opis założeń, wyzwania i rozwiązania,
- 6–15 zdjęć / wizualizacji w wysokiej jakości,
- zgoda na publikację i informacja, które dane mają pozostać anonimowe,
- autorzy zdjęć i wymagane oznaczenia.

## 11. Obecny stan projektu

### Co już istnieje

- projekt Astro 7 z komponentową strukturą,
- responsywny layout inspirowany Archiconem,
- hero ze zmianą zdjęć,
- sekcje oferty, realizacji, procesu/usług, liczb, bloga i opinii,
- listing portfolio,
- generowane podstrony realizacji,
- osobne prototypy stron „O mnie” i „Kontakt”,
- lokalne fonty i podstawy dostępności ruchu,
- siedem zdjęć używanych również na obecnej stronie Carrd.

To dobra baza wizualna i techniczna, ale nie gotowa strona produkcyjna.

### Co wymaga przebudowy lub usunięcia

- większość treści jest po angielsku, z dema lub ma formę lorem ipsum,
- nazwy projektów, dane, statystyki i opinie są przykładowe,
- strona główna ma za dużo powtarzających się sekcji usługowych,
- CTA do konsultacji nie jest jeszcze wdrożone,
- część linków prowadzi do `#`,
- projekt nie ma Sanity ani innego CMS,
- brak formularza / integracji kalendarza,
- brak kompletnej konfiguracji SEO, mapy strony, kanonicznych adresów, danych
  strukturalnych i podglądu social,
- zdjęcia nie mają docelowych opisów alternatywnych,
- w repozytorium znajduje się dużo materiałów z dema, których nie należy publikować bez
  potwierdzenia licencji,
- blog i dodatkowe warianty portfolio są obecnie demonstracyjne i nie powinny wejść do
  nawigacji MVP,
- domena `tomaszmarek.com` wskazuje na Cloudflare, ale 29.07.2026 nie odpowiada poprawnie
  przez HTTPS i zwraca błąd przy próbie otwarcia; konfigurację DNS/hostingu trzeba
  naprawić przed publikacją.

## 12. Zakres MVP dopasowany do budżetu

Budżet 1500–2000 zł brutto jest możliwy do utrzymania przy następujących ograniczeniach:

- adaptujemy istniejący kierunek wizualny, bez pełnego procesu projektowania marki,
- jedna strona główna + listing + jeden szablon projektu + polityka prywatności,
- CMS służy przede wszystkim do obsługi projektów,
- jedna integracja kontaktowa,
- klient dostarcza kompletne, zredagowane materiały w uzgodnionym terminie,
- jedna tura zbiorczych poprawek po prezentacji wersji roboczej,
- brak bloga, trybu dzień/noc, płatnych kampanii, zaawansowanej analityki i rozbudowanych
  stron usługowych w MVP.

Koszty kont zewnętrznych i płatnych planów, jeśli okażą się potrzebne, nie są częścią
budżetu wykonawczego.

## 13. Kryteria odbioru

MVP można uznać za gotowe, gdy:

- wszystkie uzgodnione sekcje i strony mają docelową polską treść,
- każda publikowana realizacja zawiera prawdziwe dane i materiały,
- CTA do konsultacji działa na komputerze i telefonie,
- klient potrafi dodać, edytować i ukryć projekt w panelu,
- nawigacja, galeria i kontakt działają na typowych szerokościach mobilnych i desktopowych,
- strona ma podstawowe metadane SEO, mapę strony i poprawną indeksowalność,
- domena główna działa przez HTTPS i wszystkie jej warianty prowadzą pod jeden adres,
- Profil Firmy w Google kieruje do nowej strony,
- nie ma treści demonstracyjnych, niedziałających linków ani niepotwierdzonych statystyk,
- klient otrzymuje krótką instrukcję obsługi.

## 14. Otwarte decyzje na kickoff

1. Ostateczna nazwa: „Tomasz Marek Architekt”, „TMA” czy „tma* studio”?
2. Która usługa jest priorytetem sprzedażowym: domy, wnętrza czy oba obszary równorzędnie?
3. Jaki jest faktyczny obszar działania i na jakie miasta/regiony kierujemy SEO?
4. Czy bezpłatna konsultacja ma być umawiana przez Cal.com, Calendly czy formularz?
5. Które realizacje są gotowe do publikacji i czy klient ma prawa do wszystkich zdjęć?
6. Czy istnieją prawdziwe opinie, liczby, nagrody lub publikacje, które można pokazać?
7. Czy klient chce edytować w panelu tylko projekty, czy również wszystkie teksty strony?
8. Kto posiada dostęp do domeny, Cloudflare i Profilu Firmy w Google?

## 15. Rekomendowana kolejność prac

1. Kickoff i zamknięcie otwartych decyzji.
2. Dostarczenie i selekcja materiałów.
3. Redakcja treści i uproszczenie obecnej strony głównej.
4. Ujednolicenie listingu i szablonu realizacji.
5. Podłączenie Sanity oraz narzędzia do konsultacji.
6. SEO techniczne, dane firmy i konfiguracja domeny.
7. Test wersji mobilnej, korekta i jedna zbiorcza tura poprawek.
8. Publikacja, Search Console, Profil Firmy w Google i krótkie szkolenie.

Warunkiem publikacji do końca sierpnia jest szybkie zatwierdzenie kierunku oraz przekazanie
kompletnych materiałów na początku realizacji. Największym ryzykiem harmonogramu nie jest
technologia, lecz brak gotowych opisów, zdjęć i decyzji dotyczących oferty.
