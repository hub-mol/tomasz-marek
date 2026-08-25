import {sanityClient} from 'sanity:client'
import type {Project, SanityProjectImage} from './portfolio'

interface SanityProject extends Omit<Project, 'img' | 'gallery' | 'alt'> {
  img: SanityProjectImage
  gallery?: SanityProjectImage[]
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

      return items.map((item) => ({
        ...item,
        gallery: item.gallery ?? [],
        alt: item.img.alt ?? item.title,
      }))
    })

  return cache
}
