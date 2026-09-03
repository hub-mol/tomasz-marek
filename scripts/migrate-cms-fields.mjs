import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-25'})

const settings = await client.fetch(`*[_id == "siteSettings"][0]{_id, navigationLinks}`)
if (settings?._id && !settings.navigationLinks?.length) {
  await client.patch(settings._id).set({
    navigationLinks: [
      {_key: 'portfolio', _type: 'navigationLink', label: 'Portfolio', href: '/#projekty', openInNewTab: false},
      {_key: 'offer', _type: 'navigationLink', label: 'Oferta', href: '/#oferta', openInNewTab: false},
      {_key: 'process', _type: 'navigationLink', label: 'Proces', href: '/#proces', openInNewTab: false},
      {_key: 'blog', _type: 'navigationLink', label: 'Blog', href: '/blog', openInNewTab: false},
      {_key: 'contact', _type: 'navigationLink', label: 'Kontakt', href: '/#kontakt', openInNewTab: false},
      {_key: 'booking', _type: 'navigationLink', label: 'Umów spotkanie', href: 'mailto:biuro@tomaszmarek.com?subject=Spotkanie z architektem', openInNewTab: false},
    ],
  }).commit()
  console.log('✓ Ustawienia: linki nawigacji')
}

const publications = await client.fetch(`*[_type == "blogPost"]{
  _id,
  slug,
  routeType,
  author,
  readingTime,
  seoTitle,
  seoDescription,
  socialImage,
  cover,
  body
}`)

for (const publication of publications) {
  const fields = {}
  if (!publication.routeType) fields.routeType = 'blog'
  if (!publication.author) fields.author = 'Tomasz Marek'
  if (!publication.readingTime) {
    const words = (publication.body ?? [])
      .flatMap((block) => block.children ?? [])
      .flatMap((child) => String(child.text ?? '').trim().split(/\s+/))
      .filter(Boolean).length
    fields.readingTime = Math.max(1, Math.ceil(words / 200))
  }

  if (publication.slug?.current === 'jak-przygotowac-sie-do-pierwszej-rozmowy-z-architektem') {
    if (!publication.seoTitle) fields.seoTitle = 'Jak przygotować się do pierwszej rozmowy z architektem?'
    if (!publication.seoDescription) fields.seoDescription = 'Sprawdź, jakie informacje o działce, potrzebach, budżecie i inspiracjach warto przygotować przed pierwszą rozmową z architektem.'
    if (!publication.socialImage && publication.cover) fields.socialImage = publication.cover
  }

  if (Object.keys(fields).length > 0) {
    await client.patch(publication._id).set(fields).commit()
    console.log(`✓ Publikacja: ${publication.slug?.current ?? publication._id}`)
  }
}

const projects = await client.fetch(`*[_type == "project" && defined(content)]{_id, title, content}`)
for (const project of projects) {
  let changed = false
  const content = project.content.map((block) => {
    if (block._type === 'projectTextBlock' && !block.textSize) {
      changed = true
      return {...block, textSize: 'h3'}
    }
    if (block._type === 'projectImageBlock' && !block.columns) {
      changed = true
      return {...block, columns: 1}
    }
    return block
  })

  if (changed) {
    await client.patch(project._id).set({content}).commit()
    console.log(`✓ Projekt: ${project.title}`)
  }
}

console.log('✓ Migracja pól CMS zakończona')
