import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-25'})

const layouts = {
  'dom-drz': [{count: 1, columns: 1}],
  'dom-kw': [{count: 4, columns: 2}],
  'dom-poznan': [{count: 1, columns: 1}, {count: 2, columns: 2}],
  'osrodek-radacz': [{count: 2, columns: 2}],
  estetica: [{count: 4, columns: 4}],
  'wnetrze-neonatolin': [{count: 3, columns: 3}, {count: 2, columns: 2}, {count: 2, columns: 2}],
  'mieszkanie-narutowicza': [{count: 3, columns: 3}, {count: 2, columns: 2}, {count: 1, columns: 1}],
  'zwyciestwa-gliwice': [{count: 2, columns: 2}, {count: 2, columns: 2}, {count: 3, columns: 3}, {count: 1, columns: 1}],
  'hotel-podwale-przedmiejskie': [],
}

const projects = await client.fetch(`*[_type == "project" && defined(slug.current)] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  content
}`)

const preparedProjects = projects.map((project) => {
  const plan = layouts[project.slug]
  if (!plan) throw new Error(`Brak planu układu dla projektu: ${project.slug}`)

  const content = project.content ?? []
  const textBlocks = content.filter((block) => block._type === 'projectTextBlock')
  const images = content
    .filter((block) => block._type === 'projectImageBlock')
    .flatMap((block) => block.images ?? [])
  const plannedCount = plan.reduce((sum, block) => sum + block.count, 0)

  if (images.length !== plannedCount) {
    throw new Error(`${project.title}: plan obejmuje ${plannedCount} zdjęć, a dokument zawiera ${images.length}`)
  }

  let offset = 0
  const imageBlocks = plan.map(({count, columns}, index) => {
    const blockImages = images.slice(offset, offset + count)
    offset += count
    return {
      _key: `editorial-images-${index + 1}`,
      _type: 'projectImageBlock',
      columns,
      images: blockImages,
    }
  })

  return {project, content: [...textBlocks, ...imageBlocks], imageBlocks}
})

for (const {project, content, imageBlocks} of preparedProjects) {
  await client.patch(project._id).set({content}).commit()
  console.log(`✓ ${project.title}: ${imageBlocks.map((block) => `${block.images.length}×${block.columns}`).join(' · ') || 'bez bloków zdjęciowych'}`)
}

console.log('✓ Przebudowa treści projektów zakończona')
