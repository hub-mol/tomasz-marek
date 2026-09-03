import {getBlogPosts, getPostHref} from '../data/blogPosts';
import {getProjects} from '../data/projects';

const staticPaths = [
  '/',
  '/projekty',
  '/blog',
  '/kontakt',
  '/polityka-prywatnosci',
];

export const getSitemapUrls = async (site: URL) => {
  const [projects, blogPosts, offerPages] = await Promise.all([
    getProjects(),
    getBlogPosts('blog'),
    getBlogPosts('offer'),
  ]);

  const paths = [
    ...staticPaths,
    ...projects.map((project) => `/projekty/${project.slug}`),
    ...blogPosts.map(getPostHref),
    ...offerPages.map(getPostHref),
  ];

  return [...new Set(paths)].map((path) => new URL(path, site).toString());
};
