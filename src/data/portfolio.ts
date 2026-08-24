import type { ImageMetadata } from 'astro';

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

// Typy pozostawione dla starszych, obecnie nieużywanych wariantów podstron.
export interface ProjectInfo {
  year: string;
  client: string;
  architects: string;
  location: string;
  budget: string;
  surface: string;
  theme: string;
  status: string;
}

export interface Stat {
  value: number;
  unit?: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  location: string;
  surface?: string;
  status: string;
  img: ImageMetadata;
  gallery: ImageMetadata[];
  alt: string;
}

export const projects: Project[] = [
  {
    slug: 'wnetrze-neonatolin',
    title: 'Wnętrze Neonatolin',
    shortTitle: 'Neonatolin',
    category: 'Wnętrza',
    location: 'Warszawa',
    surface: '240 m²',
    status: 'Opis projektu w przygotowaniu',
    img: neonatolin1,
    gallery: [neonatolin2, neonatolin3, neonatolin4, neonatolin5, neonatolin6, neonatolin7, neonatolin8],
    alt: 'Projekt wnętrza mieszkania na warszawskim Neonatolinie',
  },
  {
    slug: 'mieszkanie-narutowicza',
    title: 'Mieszkanie Narutowicza',
    shortTitle: 'Narutowicza',
    category: 'Wnętrza',
    location: 'Do uzupełnienia',
    surface: '90 m²',
    status: 'Opis projektu w przygotowaniu',
    img: narutowicza1,
    gallery: [narutowicza2, narutowicza3, narutowicza4, narutowicza5, narutowicza6, narutowicza7],
    alt: 'Projekt mieszkania przy ulicy Narutowicza',
  },
  {
    slug: 'zwyciestwa-gliwice',
    title: 'Przestrzeń wzdłuż ulicy Zwycięstwa',
    shortTitle: 'Zwycięstwa',
    category: 'Urbanistyka',
    location: 'Gliwice',
    status: 'Koncepcja zagospodarowania terenu',
    img: zwyciestwa1,
    gallery: [zwyciestwa2, zwyciestwa3, zwyciestwa4, zwyciestwa5, zwyciestwaAkso1, zwyciestwaAkso2, zwyciestwaAnaliza, zwyciestwaPzt],
    alt: 'Koncepcja zagospodarowania terenu wzdłuż ulicy Zwycięstwa w Gliwicach',
  },
  {
    slug: 'osrodek-radacz',
    title: 'Ośrodek wypoczynkowo-rehabilitacyjny',
    shortTitle: 'Radacz',
    category: 'Architektura',
    location: 'Radacz',
    status: 'Koncepcja',
    img: radacz1,
    gallery: [radaczAkso, radacz2],
    alt: 'Koncepcja ośrodka wypoczynkowo-rehabilitacyjnego w Radaczu',
  },
  {
    slug: 'estetica',
    title: 'Estetica',
    shortTitle: 'Estetica',
    category: 'Wnętrza komercyjne',
    location: 'Do uzupełnienia',
    surface: '90 m²',
    status: 'Opis projektu w przygotowaniu',
    img: estetica1,
    gallery: [estetica2, estetica3, estetica4, estetica5],
    alt: 'Projekt wnętrza Estetica',
  },
];

export const bySlug = (slug: string) => projects.find((project) => project.slug === slug);
