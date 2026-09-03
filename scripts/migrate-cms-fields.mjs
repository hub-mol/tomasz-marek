import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-25'})

const textArrayToPortableText = (value, keyPrefix) => {
  if (!Array.isArray(value) || !value.some((item) => typeof item === 'string')) return undefined

  return value.flatMap((item, index) => {
    if (typeof item !== 'string') return item

    const key = `${keyPrefix}-${index}`
    return {
      _key: key,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{_key: `${key}-span`, _type: 'span', marks: [], text: item}],
    }
  })
}

const settings = await client.fetch(`*[_id == "siteSettings"][0]{_id, navigationLinks, logo, logoImage}`)
if (settings?._id && !settings.navigationLinks?.length) {
  await client.patch(settings._id).set({
    navigationLinks: [
      {_key: 'portfolio', _type: 'navigationLink', label: 'Portfolio', href: '/projekty', openInNewTab: false},
      {_key: 'offer', _type: 'navigationLink', label: 'Oferta', href: '/#oferta', openInNewTab: false},
      {_key: 'process', _type: 'navigationLink', label: 'Proces', href: '/#proces', openInNewTab: false},
      {_key: 'blog', _type: 'navigationLink', label: 'Blog', href: '/blog', openInNewTab: false},
      {_key: 'contact', _type: 'navigationLink', label: 'Kontakt', href: '/#kontakt', openInNewTab: false},
      {_key: 'booking', _type: 'navigationLink', label: 'Umów spotkanie', href: 'mailto:biuro@tomaszmarek.com?subject=Spotkanie z architektem', openInNewTab: false},
    ],
  }).commit()
  console.log('✓ Ustawienia: linki nawigacji')
}

if (settings?._id && settings.navigationLinks?.length) {
  const navigationLinks = settings.navigationLinks.map((item) =>
    item._key === 'portfolio' && item.href === '/#projekty'
      ? {...item, href: '/projekty'}
      : item
  )
  if (navigationLinks.some((item, index) => item.href !== settings.navigationLinks[index]?.href)) {
    await client.patch(settings._id).set({navigationLinks}).commit()
    console.log('✓ Ustawienia: link Portfolio prowadzi do /projekty')
  }
}

if (settings?._id && (settings.logo !== undefined || settings.logoImage !== undefined)) {
  await client.patch(settings._id).unset(['logo', 'logoImage']).commit()
  console.log('✓ Ustawienia: usunięte nieużywane pola logo')
}

const homePage = await client.fetch(`*[_id == "homePage"][0]{_id, heroTitle, showHeroTitle, showArchitectureProcess, showInteriorsProcess, heroImage, heroImages, approachBody, aboutParagraphs}`)
if (homePage?._id) {
  const fields = {}
  if (homePage.showArchitectureProcess === undefined) fields.showArchitectureProcess = true
  if (homePage.showInteriorsProcess === undefined) fields.showInteriorsProcess = true
  if (!homePage.heroImages?.length && homePage.heroImage) {
    fields.heroImages = [{...homePage.heroImage, _key: 'hero-1'}]
  }
  const approachBody = textArrayToPortableText(homePage.approachBody, 'approach')
  const aboutParagraphs = textArrayToPortableText(homePage.aboutParagraphs, 'about')
  if (approachBody) fields.approachBody = approachBody
  if (aboutParagraphs) fields.aboutParagraphs = aboutParagraphs
  const obsoleteFields = ['heroTitle', 'showHeroTitle'].filter((field) => homePage[field] !== undefined)
  if (Object.keys(fields).length > 0 || obsoleteFields.length > 0) {
    let patch = client.patch(homePage._id)
    if (Object.keys(fields).length > 0) patch = patch.set(fields)
    if (obsoleteFields.length > 0) patch = patch.unset(obsoleteFields)
    await patch.commit()
    console.log('✓ Strona główna: pola hero i treści rich text')
  }
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

const projects = await client.fetch(`*[_type == "project" && defined(content)]{_id, title, layout, cardTone, content}`)
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

  const obsoleteFields = ['layout', 'cardTone'].filter((field) => project[field] !== undefined)
  if (changed || obsoleteFields.length > 0) {
    let patch = client.patch(project._id)
    if (changed) patch = patch.set({content})
    if (obsoleteFields.length > 0) patch = patch.unset(obsoleteFields)
    await patch.commit()
    console.log(`✓ Projekt: ${project.title}`)
  }
}

console.log('✓ Migracja pól CMS zakończona')
