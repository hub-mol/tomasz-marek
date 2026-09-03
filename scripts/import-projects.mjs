import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-25'})
const root = process.cwd()
const projectImages = (names) => names.map((name) => `src/assets/images/projects/${name}`)

const projects = [
  {
    slug: 'dom-drz', title: 'Dom DRZ', shortTitle: 'Dom DRZ', category: 'Dom prywatny',
    location: 'Pomorskie', surface: '230 m²', status: 'Koncepcja',
    images: projectImages(['dom-drz-1.png', 'dom-drz-2.png']),
  },
  {
    slug: 'dom-kw', title: 'Dom KR', shortTitle: 'Dom KR', category: 'Dom prywatny',
    location: 'Pomorskie', surface: '370 m²', status: 'Koncepcja',
    images: projectImages(['dom-kw-1.png', 'dom-kw-2.png', 'dom-kw-3.png', 'dom-kw-4.png', 'dom-kw-5.png']),
  },
  {
    slug: 'dom-poznan', title: 'Dom POZ', shortTitle: 'Dom POZ', category: 'Dom prywatny',
    location: 'Wielkopolskie', surface: '220 m²', status: 'W trakcie realizacji',
    images: projectImages(['dom-poznan-1.png', 'dom-poznan-2.png', 'dom-poznan-3.png', 'dom-poznan-4.png']),
  },
  {
    slug: 'osrodek-radacz',
    title: 'Koncepcja ośrodka wypoczynkowo-rehabilitacyjnego w Radaczu', shortTitle: 'Ośrodek Radacz',
    category: 'Ruralistyka', location: 'Zachodniopomorskie', status: 'Koncepcja',
    description: 'W projekcie ważne było zachowanie spójnej stylistyki wszystkich budynków tworzących zespół. Proste podejście do kształtowania architektury nawiązuje do pragmatycznego, funkcjonalnego i skromnego w formie budownictwa wiejskiego, powstającego w zgodzie z naturalnymi uwarunkowaniami. Budynki zaprojektowano w technologii drewnianej, a ich struktura konstrukcyjna stała się architektonicznym środkiem wyrazu, widocznym w rytmie podziałów elewacji. Przestrzenie pomiędzy słupami wypełniają ściany pełne lub przeszklenia, zależnie od funkcji pomieszczeń.',
    images: projectImages(['radacz-1.png', 'radacz-akso.jpg', 'radacz-2.png']),
  },
  {
    slug: 'estetica', title: 'Estetica', shortTitle: 'Estetica', category: 'Wnętrza komercyjne',
    location: 'Zachodniopomorskie', surface: '90 m²', status: 'Zrealizowane',
    description: 'Miękkie formy wynikające z układu funkcjonalnego dopełniają delikatne odcienie beżu i brązu. Faktura małoformatowych płytek nadaje wnętrzu wyrazistość, a przeszklenie ze szkła ryflowanego doświetla wydzieloną strefę gabinetu i tworzy charakterystyczny akcent przy wejściu do salonu.',
    images: projectImages(['estetica-1.png', 'estetica-2.png', 'estetica-3.png', 'estetica-4.png', 'estetica-5.png']),
  },
  {
    slug: 'wnetrze-neonatolin', title: 'NeoNatolin', shortTitle: 'NeoNatolin', category: 'Wnętrze prywatne',
    location: 'Warszawa', surface: '240 m²', status: 'Zrealizowane',
    images: projectImages(['neonatolin-1.png', 'neonatolin-2.png', 'neonatolin-3.png', 'neonatolin-4.png', 'neonatolin-5.png', 'neonatolin-6.png', 'neonatolin-7.png', 'neonatolin-8.png']),
  },
  {
    slug: 'mieszkanie-narutowicza', title: 'Narutowicza', shortTitle: 'Narutowicza', category: 'Wnętrze prywatne',
    location: 'Zachodniopomorskie', surface: '90 m²', status: 'Zrealizowane',
    description: 'Inspiracje mid-century, książki, malarstwo i las wyznaczyły główne założenia projektu. Zielone, wyciszające tło zestawiono z naturalnymi materiałami. Oświetlenie i rośliny dopełniają wnętrze, a bordowe schody tworzą jego charakterystyczny akcent.',
    images: projectImages(['narutowicza-1.png', 'narutowicza-2.png', 'narutowicza-3.png', 'narutowicza-4.png', 'narutowicza-5.png', 'narutowicza-6.png', 'narutowicza-7.png']),
  },
  {
    slug: 'zwyciestwa-gliwice',
    title: 'Koncepcja zagospodarowania terenu wzdłuż ul. Zwycięstwa w Gliwicach', shortTitle: 'Ulica Zwycięstwa',
    category: 'Urbanistyka', location: 'Gliwice', status: 'Koncepcja',
    images: projectImages(['zwyciestwa-1.png', 'zwyciestwa-2.png', 'zwyciestwa-3.png', 'zwyciestwa-4.png', 'zwyciestwa-5.png', 'zwyciestwa-akso-1.png', 'zwyciestwa-akso-2.png', 'zwyciestwa-analiza.png', 'zwyciestwa-pzt.png']),
  },
  {
    slug: 'hotel-podwale-przedmiejskie',
    title: 'Koncepcja hotelu przy ul. Podwale Przedmiejskie w Gdańsku', shortTitle: 'Hotel Podwale',
    category: 'Architektura', location: 'Gdańsk', status: 'Koncepcja',
    images: ['src/assets/images/hero-1.png'], featured: false,
  },
]

async function uploadImage(path, alt) {
  const filename = basename(path)
  let assetId = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )

  if (!assetId) {
    const asset = await client.assets.upload('image', createReadStream(resolve(root, path)), {filename})
    assetId = asset._id
  }

  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: assetId},
    alt,
  }
}

for (const [order, project] of projects.entries()) {
  const images = []
  for (const [index, path] of project.images.entries()) {
    images.push(await uploadImage(path, `${project.title} — widok ${index + 1}`))
  }

  const {images: unused, ...fields} = project
  await client.createOrReplace({
    _id: `project-${project.slug}`,
    _type: 'project',
    ...fields,
    slug: {_type: 'slug', current: project.slug},
    cover: images[0],
    gallery: images.slice(1).map((image, index) => ({...image, _key: `image-${index + 2}`})),
    order,
    featured: project.featured ?? true,
  })
  console.log(`✓ ${project.shortTitle}`)
}

console.log(`Zaimportowano ${projects.length} projektów.`)
