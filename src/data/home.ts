import type { AccordionItem } from '../components/sections/Accordion.astro';

export const procesArchitektura: AccordionItem[] = [
  {
    title: 'Spotkanie zapoznawcze i ankieta funkcjonalno-stylistyczna',
    body: 'Rozmawiamy o inwestycji, sposobie życia, oczekiwaniach, budżecie i harmonogramie. Zbieram materiały oraz informacje potrzebne do rozpoczęcia pracy.',
  },
  {
    title: 'Koncepcja warsztatowa',
    body: 'Wspólnie sprawdzamy pierwsze kierunki, układy i warianty. To etap swobodnej pracy, na którym można porównywać rozwiązania bez kosztownych konsekwencji dla dokumentacji.',
  },
  {
    title: 'Koncepcja zaawansowana',
    body: 'Rozwijam wybrany wariant, dopracowując funkcję, bryłę, relacje z otoczeniem oraz najważniejsze rozwiązania materiałowe i techniczne.',
  },
  {
    title: 'Koncepcja finalna',
    body: 'Zamykamy kluczowe decyzje i przygotowujemy spójną podstawę do opracowania dokumentacji formalnej oraz technicznej.',
  },
  {
    title: 'Projekt budowlany (PB) i projekt zagospodarowania terenu (PZT)',
    body: 'Przygotowuję dokumentację wymaganą do uzyskania pozwolenia na budowę i prowadzę proces formalny związany ze złożeniem projektu.',
  },
  {
    title: 'Projekt techniczny (PT) i koordynacja międzybranżowa',
    body: 'Koordynuję rozwiązania architektoniczne z konstrukcją i instalacjami, aby dokumentacja tworzyła jedną możliwą do realizacji całość.',
  },
  {
    title: 'Nadzór autorski',
    body: 'Na etapie budowy wyjaśniam rozwiązania projektowe i w uzgodnionym zakresie kontroluję zgodność realizacji z projektem.',
  },
];

export const procesWnetrza: AccordionItem[] = [
  {
    title: 'Spotkanie zapoznawcze i ankieta funkcjonalno-stylistyczna',
    body: 'Poznaję potrzeby użytkowników, charakter wnętrza, inspiracje, budżet i oczekiwany zakres opracowania.',
  },
  {
    title: 'Układy funkcjonalne i moodboard',
    body: 'Porównujemy warianty układu oraz określamy kierunek estetyczny za pomocą materiałów, kolorów, światła i referencji.',
  },
  {
    title: 'Koncepcja wnętrz głównych pomieszczeń',
    body: 'Dopracowuję najważniejsze strefy, pokazując ich układ, wyposażenie, materiały i atmosferę na wizualizacjach.',
  },
  {
    title: 'Koncepcja wnętrz pozostałych pomieszczeń',
    body: 'Rozwijam przyjęty język projektu w pozostałych wnętrzach, dbając o funkcjonalną i wizualną spójność całej przestrzeni.',
  },
  {
    title: 'Dokumentacja techniczna i zestawienie produktowe',
    body: 'Przygotowuję rysunki dla wykonawców oraz zestawienie materiałów, elementów wyposażenia i produktów potrzebnych do realizacji.',
  },
  {
    title: 'Nadzór autorski',
    body: 'Pomagam rozwiązywać pytania wykonawcze i w ustalonym zakresie czuwam nad zgodnością realizacji z założeniami projektu.',
  },
];

// Odpowiedzi są robocze i wymagają potwierdzenia przez klienta.
export const faq: AccordionItem[] = [
  {
    title: 'Co, jeśli projekt mi się nie spodoba albo wizja architekta będzie inna niż moja?',
    body: 'Projekt powstaje warsztatowo, a nie jako jedna zamknięta propozycja. Zaczynamy od poznania Twoich potrzeb, porównujemy warianty i podejmujemy decyzje wspólnie, zanim przejdziemy do dokumentacji.',
  },
  {
    title: 'Ile trwa proces od rozpoczęcia współpracy do budowy?',
    body: 'Termin zależy od skali inwestycji, zakresu projektu, tempa podejmowania decyzji i procedur urzędowych. Po zapoznaniu się z inwestycją przygotowuję harmonogram obejmujący pracę projektową oraz przewidywany czas formalności.',
  },
  {
    title: 'Ile poprawek mogę wprowadzić?',
    body: 'Na etapie koncepcji zmiany są naturalną częścią procesu warsztatowego. Dokładny sposób zgłaszania uwag i liczbę tur zmian na późniejszych etapach ustalamy przed rozpoczęciem współpracy.',
  },
  {
    title: 'Na jakim etapie możliwe są zmiany w projekcie?',
    body: 'Największą swobodę mamy podczas pracy nad koncepcją. Późniejsze zmiany również są możliwe, ale mogą wpływać na dokumentację, uzgodnienia, koszt oraz harmonogram inwestycji.',
  },
  {
    title: 'Czy mogę skonsultować działkę lub nieruchomość przed zakupem?',
    body: 'Tak. Analiza przedprojektowa pozwala wstępnie sprawdzić potencjał nieruchomości, najważniejsze ograniczenia i możliwość realizacji planowanej inwestycji.',
  },
  {
    title: 'Czy mogę zlecić razem projekt budynku i wnętrz?',
    body: 'Tak. Połączenie architektury i wnętrz pozwala prowadzić projekt jako jedną spójną całość — od usytuowania budynku i układu funkcjonalnego po materiały, wyposażenie i detal.',
  },
];
