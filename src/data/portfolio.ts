import type { ImageMetadata } from 'astro';

import hotelPodwale from '../assets/images/hero-1.png';
import domDrz1 from '../assets/images/projects/dom-drz-1.png';
import domDrz2 from '../assets/images/projects/dom-drz-2.png';
import domKw1 from '../assets/images/projects/dom-kw-1.png';
import domKw2 from '../assets/images/projects/dom-kw-2.png';
import domKw3 from '../assets/images/projects/dom-kw-3.png';
import domKw4 from '../assets/images/projects/dom-kw-4.png';
import domKw5 from '../assets/images/projects/dom-kw-5.png';
import domPoznan1 from '../assets/images/projects/dom-poznan-1.png';
import domPoznan2 from '../assets/images/projects/dom-poznan-2.png';
import domPoznan3 from '../assets/images/projects/dom-poznan-3.png';
import domPoznan4 from '../assets/images/projects/dom-poznan-4.png';
import estetica1 from '../assets/images/projects/estetica-1.png';
import estetica2 from '../assets/images/projects/estetica-2.png';
import estetica3 from '../assets/images/projects/estetica-3.png';
import estetica4 from '../assets/images/projects/estetica-4.png';
import estetica5 from '../assets/images/projects/estetica-5.png';
import narutowicza1 from '../assets/images/projects/narutowicza-1.png';
import narutowicza2 from '../assets/images/projects/narutowicza-2.png';
import narutowicza3 from '../assets/images/projects/narutowicza-3.png';
import narutowicza4 from '../assets/images/projects/narutowicza-4.png';
import narutowicza5 from '../assets/images/projects/narutowicza-5.png';
import narutowicza6 from '../assets/images/projects/narutowicza-6.png';
import narutowicza7 from '../assets/images/projects/narutowicza-7.png';
import neonatolin1 from '../assets/images/projects/neonatolin-1.png';
import neonatolin2 from '../assets/images/projects/neonatolin-2.png';
import neonatolin3 from '../assets/images/projects/neonatolin-3.png';
import neonatolin4 from '../assets/images/projects/neonatolin-4.png';
import neonatolin5 from '../assets/images/projects/neonatolin-5.png';
import neonatolin6 from '../assets/images/projects/neonatolin-6.png';
import neonatolin7 from '../assets/images/projects/neonatolin-7.png';
import neonatolin8 from '../assets/images/projects/neonatolin-8.png';
import radacz1 from '../assets/images/projects/radacz-1.png';
import radacz2 from '../assets/images/projects/radacz-2.png';
import radaczAkso from '../assets/images/projects/radacz-akso.jpg';
import zwyciestwa1 from '../assets/images/projects/zwyciestwa-1.png';
import zwyciestwa2 from '../assets/images/projects/zwyciestwa-2.png';
import zwyciestwa3 from '../assets/images/projects/zwyciestwa-3.png';
import zwyciestwa4 from '../assets/images/projects/zwyciestwa-4.png';
import zwyciestwa5 from '../assets/images/projects/zwyciestwa-5.png';
import zwyciestwaAkso1 from '../assets/images/projects/zwyciestwa-akso-1.png';
import zwyciestwaAkso2 from '../assets/images/projects/zwyciestwa-akso-2.png';
import zwyciestwaAnaliza from '../assets/images/projects/zwyciestwa-analiza.png';
import zwyciestwaPzt from '../assets/images/projects/zwyciestwa-pzt.png';

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  location: string;
  surface?: string;
  status: string;
  description?: string;
  award?: string;
  img: ProjectImage;
  gallery: ProjectImage[];
  alt: string;
  layout: 'editorial' | 'immersive' | 'mosaic';
  cardTone: 'light' | 'dark';
  featured?: boolean;
}

export interface SanityProjectImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export type ProjectImage = ImageMetadata | SanityProjectImage;

export const projects: Project[] = [
  {
    slug: 'dom-drz',
    title: 'Dom DRZ',
    shortTitle: 'Dom DRZ',
    category: 'Dom prywatny',
    location: 'Pomorskie',
    surface: '230 m²',
    status: 'Koncepcja',
    img: domDrz1,
    gallery: [domDrz2],
    alt: 'Projekt architektoniczny Dom DRZ',
    layout: 'editorial',
    cardTone: 'dark',
  },
  {
    slug: 'dom-kw',
    title: 'Dom KR',
    shortTitle: 'Dom KR',
    category: 'Dom prywatny',
    location: 'Pomorskie',
    surface: '370 m²',
    status: 'Koncepcja',
    img: domKw1,
    gallery: [domKw2, domKw3, domKw4, domKw5],
    alt: 'Koncepcja domu prywatnego Dom KR na Pomorzu',
    layout: 'mosaic',
    cardTone: 'dark',
  },
  {
    slug: 'dom-poznan',
    title: 'Dom POZ',
    shortTitle: 'Dom POZ',
    category: 'Dom prywatny',
    location: 'Wielkopolskie',
    surface: '220 m²',
    status: 'W trakcie realizacji',
    img: domPoznan1,
    gallery: [domPoznan2, domPoznan3, domPoznan4],
    alt: 'Projekt domu prywatnego Dom POZ w Wielkopolsce',
    layout: 'immersive',
    cardTone: 'light',
  },
  {
    slug: 'osrodek-radacz',
    title: 'Koncepcja ośrodka wypoczynkowo-rehabilitacyjnego w Radaczu',
    shortTitle: 'Ośrodek Radacz',
    category: 'Ruralistyka',
    location: 'Zachodniopomorskie',
    status: 'Koncepcja',
    description: 'W projekcie ważne było zachowanie spójnej stylistyki wszystkich budynków tworzących zespół. Proste podejście do kształtowania architektury nawiązuje do pragmatycznego, funkcjonalnego i skromnego w formie budownictwa wiejskiego, powstającego w zgodzie z naturalnymi uwarunkowaniami. Budynki zaprojektowano w technologii drewnianej, a ich struktura konstrukcyjna stała się architektonicznym środkiem wyrazu, widocznym w rytmie podziałów elewacji. Przestrzenie pomiędzy słupami wypełniają ściany pełne lub przeszklenia, zależnie od funkcji pomieszczeń.',
    img: radacz1,
    gallery: [radaczAkso, radacz2],
    alt: 'Koncepcja ośrodka wypoczynkowo-rehabilitacyjnego w Radaczu',
    layout: 'immersive',
    cardTone: 'dark',
  },
  {
    slug: 'estetica',
    title: 'Estetica',
    shortTitle: 'Estetica',
    category: 'Wnętrza komercyjne',
    location: 'Zachodniopomorskie',
    surface: '90 m²',
    status: 'Zrealizowane',
    description: 'Miękkie formy wynikające z układu funkcjonalnego dopełniają delikatne odcienie beżu i brązu. Faktura małoformatowych płytek nadaje wnętrzu wyrazistość, a przeszklenie ze szkła ryflowanego doświetla wydzieloną strefę gabinetu i tworzy charakterystyczny akcent przy wejściu do salonu.',
    img: estetica1,
    gallery: [estetica2, estetica3, estetica4, estetica5],
    alt: 'Projekt wnętrza Estetica',
    layout: 'editorial',
    cardTone: 'light',
  },
  {
    slug: 'wnetrze-neonatolin',
    title: 'NeoNatolin',
    shortTitle: 'NeoNatolin',
    category: 'Wnętrze prywatne',
    location: 'Warszawa',
    surface: '240 m²',
    status: 'Zrealizowane',
    img: neonatolin1,
    gallery: [neonatolin2, neonatolin3, neonatolin4, neonatolin5, neonatolin6, neonatolin7, neonatolin8],
    alt: 'Projekt wnętrza mieszkania na warszawskim Neonatolinie',
    layout: 'editorial',
    cardTone: 'light',
  },
  {
    slug: 'mieszkanie-narutowicza',
    title: 'Narutowicza',
    shortTitle: 'Narutowicza',
    category: 'Wnętrze prywatne',
    location: 'Zachodniopomorskie',
    surface: '90 m²',
    status: 'Zrealizowane',
    description: 'Inspiracje mid-century, książki, malarstwo i las wyznaczyły główne założenia projektu. Zielone, wyciszające tło zestawiono z naturalnymi materiałami. Oświetlenie i rośliny dopełniają wnętrze, a bordowe schody tworzą jego charakterystyczny akcent.',
    img: narutowicza1,
    gallery: [narutowicza2, narutowicza3, narutowicza4, narutowicza5, narutowicza6, narutowicza7],
    alt: 'Projekt mieszkania przy ulicy Narutowicza',
    layout: 'immersive',
    cardTone: 'dark',
  },
  {
    slug: 'zwyciestwa-gliwice',
    title: 'Koncepcja zagospodarowania terenu wzdłuż ul. Zwycięstwa w Gliwicach',
    shortTitle: 'Ulica Zwycięstwa',
    category: 'Urbanistyka',
    location: 'Gliwice',
    status: 'Koncepcja',
    award: 'Wyróżnienie w konkursie organizowanym przez Urząd Miasta w Gliwicach',
    img: zwyciestwa1,
    gallery: [zwyciestwa2, zwyciestwa3, zwyciestwa4, zwyciestwa5, zwyciestwaAkso1, zwyciestwaAkso2, zwyciestwaAnaliza, zwyciestwaPzt],
    alt: 'Koncepcja zagospodarowania terenu wzdłuż ulicy Zwycięstwa w Gliwicach',
    layout: 'mosaic',
    cardTone: 'light',
  },
  {
    slug: 'hotel-podwale-przedmiejskie',
    title: 'Koncepcja hotelu przy ul. Podwale Przedmiejskie w Gdańsku',
    shortTitle: 'Hotel Podwale',
    category: 'Architektura',
    location: 'Gdańsk',
    status: 'Koncepcja',
    img: hotelPodwale,
    gallery: [],
    alt: 'Koncepcja hotelu przy ulicy Podwale Przedmiejskie w Gdańsku',
    layout: 'editorial',
    cardTone: 'dark',
  },
];

export const bySlug = (slug: string) => projects.find((project) => project.slug === slug);
