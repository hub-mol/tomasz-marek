import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-25'})
const root = process.cwd()

const span = (text, key = 'span') => ({_key: key, _type: 'span', marks: [], text})
const block = (text, key, style = 'normal', extra = {}) => ({
  _key: key,
  _type: 'block',
  style,
  markDefs: [],
  children: [span(text, `${key}-span`)],
  ...extra,
})

async function uploadImage(path, alt) {
  const filename = basename(path)
  let assetId = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`, {filename})
  if (!assetId) {
    const asset = await client.assets.upload('image', createReadStream(resolve(root, path)), {filename})
    assetId = asset._id
  }
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}, alt}
}

const homeHero = await uploadImage('src/assets/images/hero-0.jpg', 'Wizualizacja projektu architektonicznego autorstwa Tomasza Marka')
const aboutImage = await uploadImage('public/img/tm-7.jpg', 'Tomasz Marek, architekt')
const blogCover = await uploadImage('public/img/blog-img-1.jpg', 'Materiały i notatki przygotowane do rozmowy z architektem')

const architectureProcess = [
  ['Spotkanie zapoznawcze', 'Rozmawiamy o inwestycji, sposobie życia, oczekiwaniach, budżecie i harmonogramie. Zbieramy materiały oraz informacje potrzebne do rozpoczęcia pracy.'],
  ['Koncepcja architektoniczna', 'Analizujemy działkę i jej otoczenie, a następnie porównujemy warianty funkcjonalne oraz przestrzenne. Wybrany kierunek rozwijamy w spójną koncepcję budynku.'],
  ['Projekt budowlany', 'Na podstawie zaakceptowanej koncepcji przygotowujemy projekt zagospodarowania terenu i projekt architektoniczno-budowlany wymagany do uzyskania pozwolenia na budowę.'],
  ['Projekty techniczne', 'Rozwijamy rozwiązania architektoniczne, konstrukcyjne i instalacyjne. Koordynujemy dokumentację branżową, aby tworzyła jedną możliwą do realizacji całość.'],
  ['Nadzór autorski', 'Na etapie budowy wyjaśniamy rozwiązania projektowe i w uzgodnionym zakresie kontrolujemy zgodność realizacji z dokumentacją.'],
].map(([title, body], index) => ({_key: `architecture-${index}`, title, body}))

const interiorsProcess = [
  ['Spotkanie zapoznawcze', 'Poznajemy potrzeby użytkowników, charakter wnętrza, inspiracje, budżet i oczekiwany zakres opracowania.'],
  ['Układy funkcjonalne', 'Przygotowujemy i porównujemy warianty rozmieszczenia pomieszczeń, wyposażenia oraz najważniejszych stref funkcjonalnych.'],
  ['Koncepcja', 'Określamy charakter wnętrza, materiały, kolorystykę, oświetlenie i wyposażenie. Najważniejsze rozwiązania przedstawiamy na wizualizacjach.'],
  ['Dokumentacja techniczna', 'Przygotowujemy rysunki dla wykonawców oraz zestawienie materiałów, elementów wyposażenia i produktów potrzebnych do realizacji.'],
  ['Nadzór autorski', 'Pomagamy rozwiązywać pytania wykonawcze i w ustalonym zakresie czuwamy nad zgodnością realizacji z założeniami projektu.'],
].map(([title, body], index) => ({_key: `interiors-${index}`, title, body}))

const faq = [
  ['Ile kosztuje indywidualny projekt domu?', 'Cena zależy przede wszystkim od powierzchni, stopnia skomplikowania budynku, uwarunkowań działki oraz zakresu opracowania. Po poznaniu podstawowych założeń inwestycji przygotowujemy indywidualną wycenę.'],
  ['Co obejmuje kompleksowy projekt domu?', 'Kompleksowy projekt domu obejmuje projekt koncepcyjny, projekt zagospodarowania terenu, projekt architektoniczno-budowlany, projekt techniczny, zastępstwo w procesie uzyskiwania pozwolenia na budowę oraz koordynację opracowań konstrukcyjnych i instalacyjnych.'],
  ['Ile trwa zaprojektowanie domu?', 'Projekt indywidualny obejmuje kilka etapów — od koncepcji po dokumentację techniczną. Czas zależy między innymi od skali inwestycji, sprawności podejmowania decyzji, wymaganych uzgodnień i procedur administracyjnych.'],
  ['Jak wygląda współpraca z architektem?', 'Rozpoczynamy od rozmowy i poznania potrzeb inwestora. Następnie analizujemy działkę i przygotowujemy koncepcję. Na bazie zaakceptowanego kierunku przechodzimy do kolejnych opracowań i koordynacji branżowej.'],
  ['Czy zajmujecie się formalnościami i pozwoleniem na budowę?', 'W ramach kompleksowej współpracy możemy przygotować wymaganą dokumentację oraz prowadzić proces formalny związany z uzyskaniem pozwolenia na budowę.'],
  ['Czy podczas projektowania można wprowadzać zmiany?', 'Tak. Projekt koncepcyjny powstaje we współpracy z inwestorem i na tym etapie wspólnie dopracowujemy najważniejsze rozwiązania funkcjonalne i architektoniczne.'],
  ['Czy przed zakupem działki warto skonsultować się z architektem?', 'Tak. Analiza przed zakupem pozwala sprawdzić możliwości zabudowy, najważniejsze ograniczenia oraz potencjał nieruchomości jeszcze przed podjęciem decyzji inwestycyjnej.'],
].map(([title, body], index) => ({_key: `faq-${index}`, title, body}))

await client.createOrReplace({
  _id: 'homePage',
  _type: 'homePage',
  heroTitle: 'Architektura zainspirowana miejscem i ludźmi.',
  showHeroTitle: false,
  heroLead: 'Od idei po realizację poprowadzimy Cię przez cały proces projektowy i wykonawczy.',
  heroImage: homeHero,
  heroImages: [{...homeHero, _key: 'hero-1'}],
  approachTitle: 'Nie zaczynamy od gotowej odpowiedzi.',
  approachBody: [
    'Każdy projekt poprzedzamy analizą miejsca, potrzeb użytkowników, możliwości działki i charakteru inwestycji.',
    'Szukamy rozwiązań, które mają swoje uzasadnienie — funkcjonalne, przestrzenne i estetyczne. Dzięki temu projekt jest spójną przestrzenią stworzoną z myślą o przyszłych użytkownikach.',
  ],
  approachCallout: 'Dobra architektura zaczyna się od zrozumienia.',
  approachPillars: [
    {_key: 'place', title: 'Miejsce', text: 'Wykorzystujemy potencjał działki, otoczenia, światła i widoków.'},
    {_key: 'function', title: 'Funkcja', text: 'Projektujemy przestrzeń wokół sposobu życia i rzeczywistych potrzeb użytkowników.'},
    {_key: 'authenticity', title: 'Autentyczność', text: 'Łączymy architekturę, wnętrza, materiały i detal w jedną przemyślaną całość.'},
  ],
  projectsTitle: 'Wybrane realizacje',
  projectsLinkLabel: 'Zobacz wszystkie projekty',
  offerTitle: 'Zakres współpracy',
  offers: [
    {_key: 'individual', title: 'Klienci indywidualni', lead: 'Planujesz budowę domu, przebudowę lub remont?', sections: [
      {_key: 'architecture', title: 'Architektura', text: 'Indywidualne projekty domów i rezydencji — od koncepcji po projekt budowlany, techniczny, koordynację branż i nadzór autorski.'},
      {_key: 'interiors', title: 'Wnętrza', text: 'Kompleksowe projekty wnętrz prywatnych — od układu funkcjonalnego i koncepcji po materiały, wizualizacje oraz dokumentację wykonawczą.'},
    ]},
    {_key: 'business', title: 'Biznes', lead: 'Potrzebujesz funkcjonalnej przestrzeni spójnej z charakterem marki?', sections: [
      {_key: 'architecture', title: 'Architektura', text: 'Projekty obiektów usługowych, komercyjnych i mieszkaniowych — od koncepcji po dokumentację, koordynację branż oraz nadzór realizacji.'},
      {_key: 'interiors', title: 'Wnętrza', text: 'Projekty biur, gastronomii, lokali usługowych i innych wnętrz komercyjnych — funkcjonalnych, spójnych i zgodnych z charakterem marki.'},
    ]},
    {_key: 'consulting', title: 'Doradztwo', lead: 'Planujesz zakup działki i chcesz sprawdzić jej potencjał?', sections: [
      {_key: 'analysis', title: 'Analizy', text: 'Analizujemy możliwości zabudowy, zapisy MPZP lub WZ oraz potencjał działki albo nieruchomości przed zakupem i rozpoczęciem inwestycji.'},
      {_key: 'consultations', title: 'Konsultacje', text: 'Doradzamy przed zakupem działki lub nieruchomości, pomagamy ocenić planowane zamierzenie i wspieramy proces uzyskania warunków zabudowy.'},
    ]},
  ],
  processTitle: 'Rozmowa / Realizacja',
  architectureProcess,
  interiorsProcess,
  aboutTitle: 'Cześć! Tu Tomek.\nTworzę indywidualne projekty architektury i wnętrz.',
  aboutParagraphs: [
    'Posiadam uprawnienia budowlane do projektowania bez ograniczeń w specjalności architektonicznej i jestem członkiem Pomorskiej Izby Architektów RP.',
    'Studiowałem na Wydziale Architektury i Urbanistyki Politechniki Gdańskiej oraz na Faculty of Architecture and Urban Design Politecnico di Milano.',
    'Doświadczenie zdobywałem w pracowniach architektonicznych i wnętrzarskich w Tallinie, Paryżu i Trójmieście.',
  ],
  aboutImage,
  faqTitle: 'Pytania przed rozpoczęciem współpracy',
  faq,
  seoTitle: 'Tomasz Marek — architektura i wnętrza',
  seoDescription: 'Kompleksowa obsługa inwestycji — od analizy działki, przez projekt i formalności, po wnętrza i nadzór autorski.',
})

await client.createOrReplace({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteTitle: 'Tomasz Marek Architekt',
  defaultSeoTitle: 'Tomasz Marek — architektura i wnętrza',
  defaultSeoDescription: 'Kompleksowa obsługa inwestycji — od analizy działki, przez projekt i formalności, po wnętrza i nadzór autorski.',
  logo: 'TMA',
  logoSuffix: 'Tomasz Marek Architekt',
  navigationLinks: [
    {_key: 'portfolio', _type: 'navigationLink', label: 'Portfolio', href: '/portfolio', openInNewTab: false},
    {_key: 'offer', _type: 'navigationLink', label: 'Oferta', href: '/#oferta', openInNewTab: false},
    {_key: 'process', _type: 'navigationLink', label: 'Proces', href: '/#proces', openInNewTab: false},
    {_key: 'blog', _type: 'navigationLink', label: 'Blog', href: '/blog', openInNewTab: false},
    {_key: 'contact', _type: 'navigationLink', label: 'Kontakt', href: '/#kontakt', openInNewTab: false},
    {_key: 'booking', _type: 'navigationLink', label: 'Umów spotkanie', href: 'mailto:biuro@tomaszmarek.com?subject=Spotkanie z architektem', openInNewTab: false},
  ],
  email: 'biuro@tomaszmarek.com',
  phoneLabel: '+48 696 995 899',
  phoneHref: '+48696995899',
  instagram: 'https://www.instagram.com/studjo.biuro/',
  facebook: 'https://www.facebook.com/people/studjobiuro/100078056002732/',
  bookingLabel: 'Umów spotkanie',
  footerTitle: 'Porozmawiajmy o Twoim projekcie',
  footerText: 'Planujesz budowę, przebudowę albo nowe wnętrze? Opowiedz nam o swojej inwestycji. Podczas pierwszej rozmowy sprawdzimy, w jakim zakresie możemy Ci pomóc.',
  studioAddress: ['TMA', 'Tomasz Marek Architekt', 'ul. Magellana 2/29', '80-288 Gdańsk'],
  businessAddress: ['Stary Grabiąż 6A', '78-460 Stary Grabiąż'],
  nip: '6731917259',
  regon: '528600458',
  founderName: 'Tomasz Marek',
  studioStreet: 'ul. Magellana 2/29',
  studioPostalCode: '80-288',
  studioCity: 'Gdańsk',
  studioRegion: 'Pomorskie',
  studioCountry: 'PL',
  areaServed: ['Gdańsk', 'województwo pomorskie', 'województwo zachodniopomorskie', 'Polska'],
  iarpNumber: 'PO-1963',
})

await client.createOrReplace({
  _id: 'blog-first-conversation',
  _type: 'blogPost',
  title: 'Jak przygotować się do pierwszej rozmowy z architektem?',
  slug: {_type: 'slug', current: 'jak-przygotowac-sie-do-pierwszej-rozmowy-z-architektem'},
  routeType: 'blog',
  excerpt: 'Kilka informacji wystarczy, aby pierwsze spotkanie było konkretne i pozwoliło dobrze określić zakres projektu.',
  categories: ['Poradnik'],
  publishedAt: '2026-08-25T10:00:00.000Z',
  author: 'Tomasz Marek',
  readingTime: 4,
  seoTitle: 'Jak przygotować się do pierwszej rozmowy z architektem?',
  seoDescription: 'Sprawdź, jakie informacje o działce, potrzebach, budżecie i inspiracjach warto przygotować przed pierwszą rozmową z architektem.',
  cover: blogCover,
  socialImage: blogCover,
  body: [
    block('Pierwsza rozmowa nie wymaga kompletnej dokumentacji ani gotowych odpowiedzi. Jej celem jest poznanie inwestycji, potrzeb i ograniczeń, które będą miały wpływ na dalszą pracę.', 'intro'),
    block('Co warto przygotować?', 'heading-prep', 'h2'),
    block('Podstawowe informacje o działce lub lokalu: adres, numer działki, przybliżoną powierzchnię oraz materiały, które już posiadasz.', 'item-place', 'normal', {listItem: 'bullet', level: 1}),
    block('Krótki opis potrzeb — kto będzie korzystać z przestrzeni, jakie pomieszczenia są ważne i czego brakuje w obecnym miejscu.', 'item-needs', 'normal', {listItem: 'bullet', level: 1}),
    block('Orientacyjny budżet i termin. Nie muszą być ostateczne, ale pomagają dobrać realny zakres projektu.', 'item-budget', 'normal', {listItem: 'bullet', level: 1}),
    block('Inspiracje i priorytety', 'heading-inspiration', 'h2'),
    block('Zdjęcia zapisanych realizacji są pomocne, jeśli potraktujemy je jako punkt do rozmowy. Warto powiedzieć nie tylko, co się podoba, ale również dlaczego: światło, proporcje, materiały, sposób połączenia wnętrza z ogrodem czy atmosfera miejsca.', 'inspiration'),
    block('Najważniejsza jest szczera rozmowa', 'heading-talk', 'h2'),
    block('Dobra współpraca zaczyna się od jasnego określenia oczekiwań i sposobu podejmowania decyzji. Im lepiej poznamy codzienne potrzeby inwestora, tym trafniej możemy zaprojektować przestrzeń, która nie będzie wyłącznie efektowna, ale przede wszystkim wygodna i trwała.', 'talk'),
  ],
})

const projects = await client.fetch(`*[_type == "project"]{_id, title, description, gallery, content}`)
for (const project of projects) {
  if (project.content?.length) continue
  const content = []
  if (project.description) {
    content.push({_key: 'intro-text', _type: 'projectTextBlock', textSize: 'h3', body: [block(project.description, 'intro-paragraph')]})
  }
  for (const [index, image] of (project.gallery ?? []).entries()) {
    content.push({_key: `image-block-${index}`, _type: 'projectImageBlock', columns: 1, images: [{...image, _key: `image-${index}`}]})
  }
  if (content.length === 0) {
    content.push({_key: 'intro-text', _type: 'projectTextBlock', textSize: 'h3', body: [block('Opis projektu zostanie uzupełniony.', 'intro-paragraph')]})
  }
  await client.patch(project._id).set({content}).commit()
  console.log(`✓ Bloki: ${project.title}`)
}

console.log('✓ Strona główna, ustawienia i przykładowy blog')
