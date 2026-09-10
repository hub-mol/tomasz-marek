import type {PortableTextBlock} from '@portabletext/types'
import {loadQuery, type LoadOptions} from '../lib/sanityLoad'
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

export function getBlogPosts(
  routeType: 'blog' | 'offer' = 'blog',
  options: LoadOptions = {},
): Promise<BlogPost[]> {
  const cached = options.preview ? undefined : postsCache.get(routeType)
  if (cached) return cached

  const routeFilter = routeType === 'blog'
    ? `(!defined(routeType) || routeType == "blog")`
    : `routeType == "offer"`
  const request = loadQuery<BlogPost[]>(`*[
    _type == "blogPost" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    ${routeFilter}
  ] | order(publishedAt desc) ${projection}`, {}, options)
    .then((posts) => posts.map((post) => ({
      ...post,
      routeType: post.routeType ?? routeType,
      categories: post.categories ?? [],
      author: post.author || 'Tomasz Marek',
      readingTime: post.readingTime || 5,
      body: post.body ?? [],
    })))

  if (!options.preview) postsCache.set(routeType, request)
  return request
}

export function getPostHref(post: BlogPost): string {
  return `/${post.routeType === 'offer' ? 'oferta' : 'blog'}/${post.slug}`
}
