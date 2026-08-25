import {sanityClient} from 'sanity:client'
import type {PortableTextBlock} from '@portabletext/types'
import type {Project, ProjectContentBlock, SanityProjectImage} from './portfolio'

interface SanityProject extends Omit<Project, 'img' | 'gallery' | 'alt'> {
  img: SanityProjectImage
  gallery?: SanityProjectImage[]
  content?: Array<
    | {_key: string; _type: 'projectTextBlock'; body: PortableTextBlock[]}
    | {_key: string; _type: 'projectImageBlock'; images?: SanityProjectImage[]}
  >
}

const projectsQuery = `*[
  _type == "project" &&
  defined(slug.current) &&
  defined(cover.asset)
] | order(order asc) {
  "slug": slug.current,
  title,
  shortTitle,
  category,
  location,
  surface,
  status,
  description,
  "content": content[] {
    _key,
    _type,
    body,
    "images": images[] {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt
    }
  },
  award,
  layout,
  cardTone,
  featured,
  "img": cover {
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    alt
  },
  "gallery": gallery[] {
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    alt
  }
}`

let cache: Promise<Project[]> | undefined

export function getProjects(): Promise<Project[]> {
  cache ??= sanityClient
    .fetch<SanityProject[]>(projectsQuery)
    .then((items) => {
      if (items.length === 0) {
        throw new Error('Brak opublikowanych projektów w Sanity.')
      }

      return items.map((item) => {
        const content = item.content?.map((block) => block._type === 'projectImageBlock'
          ? {...block, images: block.images ?? []}
          : block) as ProjectContentBlock[] | undefined

        return {
          ...item,
          content,
          gallery: item.gallery ?? [],
          alt: item.img.alt ?? item.title,
        }
      })
    })

  return cache
}
