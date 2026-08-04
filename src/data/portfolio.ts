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
  category: string;
  year?: string;
  img: string;
  /** wariant układu podstrony realizacji */
  layout: 'a' | 'b' | 'c';
  lead: string;
  info: ProjectInfo;
  stats: Stat[];
  gallery: string[];
}

const TM = (n: number) => `/img/tm-${n}.jpg`;

const lead =
  'Sem viverra aliquet eget sit amet tellus cras. Nulla aliquet enim tortor at auctor urna nec tincidunt praesent semper.';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus nisl vitae magna pulvinar laoreet. Nullam erat ipsum, mattis nec mollis ac, accumsan a enim. Nunc at euismod arcu.';

const info = (over: Partial<ProjectInfo> = {}): ProjectInfo => ({
  year: 'July 2020',
  client: 'Private residence',
  architects: 'tma* studio',
  location: 'Bali, Indonesia',
  budget: '1 250 000$',
  surface: '550m2',
  theme: 'Sustanbility, Modern, Eco',
  status: 'Realized',
  ...over,
});

const stats = (): Stat[] => [
  { value: 8560, unit: 'm2', label: 'Site area' },
  { value: 6700, unit: 'm2', label: 'Building surface' },
  { value: 100, unit: 'm', label: 'Building height' },
  { value: 12, label: 'Number of Stories' },
];

export const projects: Project[] = [
  {
    slug: 'home-cb32',
    title: 'Home CB32',
    category: 'Dom',
    year: '2020',
    img: TM(1),
    layout: 'a',
    lead,
    info: info(),
    stats: stats(),
    gallery: [TM(2), TM(3), TM(4)],
  },
  {
    slug: 'sea-house',
    title: 'Sea house',
    category: 'Wnętrze',
    year: '2018',
    img: TM(2),
    layout: 'b',
    lead,
    info: info({ client: 'Sea Group', location: 'Gdynia, Polska', year: 'May 2018' }),
    stats: stats(),
    gallery: [TM(3), TM(5), TM(6), TM(7)],
  },
  {
    slug: 'house-erna',
    title: 'House Erna',
    category: 'Dom',
    year: '2020',
    img: TM(3),
    layout: 'c',
    lead,
    info: info({ client: 'Erna Family', location: 'Malmö, Sweden' }),
    stats: stats(),
    gallery: [TM(1), TM(4), TM(6)],
  },
  {
    slug: 'aruu-residence',
    title: 'Aruu residence',
    category: 'Dom',
    year: '2019',
    img: TM(4),
    layout: 'a',
    lead,
    info: info({ year: 'March 2019', surface: '780m2' }),
    stats: stats(),
    gallery: [TM(5), TM(2), TM(7)],
  },
  {
    slug: 'naru-house',
    title: 'Naru house',
    category: 'Wnętrze',
    year: '2018',
    img: TM(5),
    layout: 'b',
    lead,
    info: info({ budget: '860 000$', surface: '320m2' }),
    stats: stats(),
    gallery: [TM(6), TM(1), TM(3), TM(2)],
  },
  {
    slug: 'haaga-residence',
    title: 'Haaga residence',
    category: 'Dom',
    year: '2018',
    img: TM(6),
    layout: 'c',
    lead,
    info: info({ location: 'Helsinki, Finland' }),
    stats: stats(),
    gallery: [TM(7), TM(4), TM(1)],
  },
  {
    slug: 'hizuu-house',
    title: 'Hizuu house',
    category: 'Dom',
    img: TM(7),
    layout: 'a',
    lead,
    info: info({ status: 'In progress' }),
    stats: stats(),
    gallery: [TM(1), TM(5), TM(3)],
  },
  {
    slug: 'naomi-house',
    title: 'Naomi house',
    category: 'Dom',
    year: '2020',
    img: TM(1),
    layout: 'b',
    lead,
    info: info({ client: 'Naomi Ltd.' }),
    stats: stats(),
    gallery: [TM(2), TM(6), TM(4), TM(5)],
  },
  {
    slug: 'azul-house',
    title: 'Azul house',
    category: 'Dom',
    year: '2020',
    img: TM(2),
    layout: 'c',
    lead,
    info: info({ location: 'Lisboa, Portugal', theme: 'Modern, Coastal' }),
    stats: stats(),
    gallery: [TM(3), TM(7), TM(6)],
  },
];

export const projectBody = body;

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
