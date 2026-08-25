import {sanityClient} from 'sanity:client'
import type {PortableTextBlock} from '@portabletext/types'
import type {SanityProjectImage} from './portfolio'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  categories: string[]
  cover?: SanityProjectImage
  body: PortableTextBlock[]
}

const projection = `{
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  categories,
  "cover": cover {
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    alt
  },
  body
}`

let postsCache: Promise<BlogPost[]> | undefined

export function getBlogPosts(): Promise<BlogPost[]> {
  postsCache ??= sanityClient.fetch<BlogPost[]>(`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) ${projection}`)
    .then((posts) => posts.map((post) => ({...post, categories: post.categories ?? [], body: post.body ?? []})))
  return postsCache
}
