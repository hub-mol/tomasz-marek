export interface Post {
  title: string;
  day: string;
  month: string;
  categories: string[];
  img: string;
}

export const excerpt =
  'Lorem ipsum dolor sit amet, consetetur sadipscing ielitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';

// Wpisy z podstrony No Sidebar (duża lista).
export const featured: Post[] = [
  {
    title: 'Wrapping up a new modern residence in Chicago, IL',
    day: '15',
    month: 'APR',
    categories: ['Architecture', 'Books'],
    img: '/img/tm-1.jpg',
  },
  {
    title: 'A residence in Malmo with with wooden structure',
    day: '16',
    month: 'APR',
    categories: ['Architecture', 'Print'],
    img: '/img/tm-4.jpg',
  },
  {
    title: 'Young new architects and their projects',
    day: '18',
    month: 'APR',
    categories: ['Architecture', 'Print'],
    img: '/img/tm-2.jpg',
  },
  {
    title: 'Futuristic design – how it helps us achieve our goals',
    day: '20',
    month: 'APR',
    categories: ['Architecture', 'Furniture'],
    img: '/img/tm-3.jpg',
  },
];

// Wpisy z podstrony Blog Compact (siatka 3 kolumn).
export const compact: Post[] = [
  ['Futuristic design – how it helps us achieve our goals', '20', 'APR', 'tm-1'],
  ['Using different shapes in architecture and beyond', '21', 'APR', 'tm-2'],
  ['Open spaces and how to make the best use of them', '22', 'APR', 'tm-3'],
  ['Architecture and applying better, higher standards', '23', 'APR', 'tm-4'],
  ['Cost effective materials to achieve greater balance', '24', 'APR', 'tm-5'],
  ['People spearheading the new design revolution', '25', 'APR', 'tm-6'],
  ['Best use of natural material to get more sunlight', '26', 'APR', 'tm-7'],
  ['Great vintage looking furniture for modern times', '27', 'APR', 'tm-1'],
  ['Innovative use of marble and concrete today', '28', 'APR', 'tm-2'],
  ['The beast team around and how we make it work', '30', 'APR', 'tm-3'],
  ['Choosing a location for your future projects', '1', 'MAY', 'tm-4'],
  ['Achieving great results in architecture', '2', 'MAY', 'tm-5'],
].map(([title, day, month, img]) => ({
  title,
  day,
  month,
  categories: ['Architecture', 'Furniture'],
  img: `/img/${img}.jpg`,
}));
