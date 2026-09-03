import {sanityClient} from 'sanity:client'
import type {PortableTextBlock} from '@portabletext/types'
import type {SanityProjectImage} from './portfolio'

export interface BlogPost {
  slug: string
  routeType: 'blog' | 'offer'
  title: string
  excerpt: string
  publishedAt: string
  categories: string[]
  author: string
  readingTime: number
  seoTitle?: string
  seoDescription?: string
  cover?: SanityProjectImage
  socialImage?: SanityProjectImage
  body: PortableTextBlock[]
}

const demoBlock = (key: string, text: string): PortableTextBlock => ({
  _key: key,
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: [{_key: `${key}-span`, _type: 'span', text, marks: []}],
})

const demoBlogPosts: BlogPost[] = [
  {
    slug: 'ile-kosztuje-projekt-domu',
    routeType: 'blog',
    title: 'Ile kosztuje projekt domu i co obejmuje wycena?',
    excerpt: 'Zakres projektu, stopień skomplikowania działki i oczekiwane wsparcie wpływają na sposób przygotowania wyceny.',
    publishedAt: '2026-01-20T09:00:00.000Z',
    categories: ['Koszty'],
    author: 'Tomasz Marek',
    readingTime: 6,
    cover: {
      url: 'https://cdn.sanity.io/images/o8oniqgy/production/c199aefb1204cc3852004263add64a8d3cf2a8ef-2882x1280.png',
      width: 2882,
      height: 1280,
      alt: 'Wizualizacja domu jednorodzinnego',
    },
    body: [demoBlock('demo-cost', 'To demonstracyjny wpis pokazujący wygląd listy blogowej z większą liczbą artykułów.')],
  },
  {
    slug: 'projekt-wnetrza-krok-po-kroku',
    routeType: 'blog',
    title: 'Projekt wnętrza krok po kroku — od układu do realizacji',
    excerpt: 'Jak przebiega współpraca nad wnętrzem i jakie decyzje podejmujemy na kolejnych etapach projektu.',
    publishedAt: '2026-01-10T09:00:00.000Z',
    categories: ['Proces'],
    author: 'Tomasz Marek',
    readingTime: 5,
    cover: {
      url: 'https://cdn.sanity.io/images/o8oniqgy/production/86f9af20449b064912c07be9bde2cf09c7578449-2240x1872.png',
      width: 2240,
      height: 1872,
      alt: 'Projekt wnętrza mieszkania',
    },
    body: [demoBlock('demo-interior', 'To demonstracyjny wpis pokazujący wygląd listy blogowej z większą liczbą artykułów.')],
  },
]

const projection = `{
  "slug": slug.current,
  "routeType": coalesce(routeType, "blog"),
  title,
  excerpt,
  publishedAt,
  categories,
  author,
  readingTime,
  seoTitle,
  seoDescription,
  "cover": cover {
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    alt
  },
  "socialImage": socialImage {
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  "body": body[] {
    ...,
    _type == "image" => {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt
    }
  }
}`

const postsCache = new Map<'blog' | 'offer', Promise<BlogPost[]>>()

export function getBlogPosts(routeType: 'blog' | 'offer' = 'blog'): Promise<BlogPost[]> {
  const cached = postsCache.get(routeType)
  if (cached) return cached

  const routeFilter = routeType === 'blog'
    ? `(!defined(routeType) || routeType == "blog")`
    : `routeType == "offer"`
  const request = sanityClient.fetch<BlogPost[]>(`*[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    ${routeFilter}
  ] | order(publishedAt desc) ${projection}`)
    .then((posts) => posts.map((post) => ({
      ...post,
      routeType: post.routeType ?? routeType,
      categories: post.categories ?? [],
      author: post.author || 'Tomasz Marek',
      readingTime: post.readingTime || 5,
      body: post.body ?? [],
    })))
    .then((posts) => routeType === 'blog'
      ? [...posts, ...demoBlogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      : posts)

  postsCache.set(routeType, request)
  return request
}

export function getPostHref(post: BlogPost): string {
  return `/${post.routeType === 'offer' ? 'oferta' : 'blog'}/${post.slug}`
}
