import {sanityClient} from 'sanity:client'
import type {SanityProjectImage} from './portfolio'
import {faq, procesArchitektura, procesWnetrza} from './home'

export interface SimpleItem {
  title: string
  body: string
}

export interface ApproachPillar {
  title: string
  text: string
}

export interface OfferGroup {
  title: string
  lead?: string
  sections: Array<{title: string; text: string}>
}

export interface HomePageData {
  heroTitle: string
  heroLead: string
  heroImage?: SanityProjectImage
  approachTitle: string
  approachBody: string[]
  approachCallout: string
  approachPillars: ApproachPillar[]
  projectsTitle: string
  projectsLinkLabel: string
  offerTitle: string
  offers: OfferGroup[]
  processTitle: string
  architectureProcess: SimpleItem[]
  interiorsProcess: SimpleItem[]
  aboutTitle: string
  aboutParagraphs: string[]
  aboutImage?: SanityProjectImage
  faqTitle: string
  faq: SimpleItem[]
  seoTitle?: string
  seoDescription?: string
}

export interface SiteSettingsData {
  siteTitle: string
  defaultSeoTitle: string
  defaultSeoDescription: string
  logo: string
  logoSuffix: string
  email: string
  phoneLabel: string
  phoneHref: string
  instagram?: string
  facebook?: string
  bookingLabel: string
  footerTitle: string
  footerText: string
  studioAddress: string[]
  businessAddress: string[]
  nip?: string
  regon?: string
}

export const defaultHomePage: HomePageData = {
  heroTitle: 'Architektura zainspirowana miejscem i ludźmi.',
  heroLead: 'Od idei po realizację poprowadzimy Cię przez cały proces projektowy i wykonawczy.',
  approachTitle: 'Nie zaczynamy od gotowej odpowiedzi.',
  approachBody: [
    'Każdy projekt poprzedzamy analizą miejsca, potrzeb użytkowników, możliwości działki i charakteru inwestycji.',
    'Szukamy rozwiązań, które mają swoje uzasadnienie — funkcjonalne, przestrzenne i estetyczne. Dzięki temu projekt nie jest przypadkowym zestawem pomieszczeń i materiałów, ale spójną przestrzenią stworzoną z myślą o jej przyszłych użytkownikach.',
  ],
  approachCallout: 'Dobra architektura zaczyna się od zrozumienia.',
  approachPillars: [
    {title: 'Miejsce', text: 'Wykorzystujemy potencjał działki, otoczenia, światła i widoków.'},
    {title: 'Funkcja', text: 'Projektujemy przestrzeń wokół sposobu życia i rzeczywistych potrzeb użytkowników.'},
    {title: 'Autentyczność', text: 'Łączymy architekturę, wnętrza, materiały i detal w jedną przemyślaną całość.'},
  ],
  projectsTitle: 'Wybrane realizacje',
  projectsLinkLabel: 'Zobacz wszystkie projekty',
  offerTitle: 'Zakres współpracy',
  offers: [
    {title: 'Klienci indywidualni', lead: 'Planujesz budowę domu, przebudowę lub remont?', sections: [
      {title: 'Architektura', text: 'Indywidualne projekty domów i rezydencji — od koncepcji po projekt budowlany, techniczny, koordynację branż i nadzór autorski.'},
      {title: 'Wnętrza', text: 'Kompleksowe projekty wnętrz prywatnych — od układu funkcjonalnego i koncepcji po materiały, wizualizacje oraz dokumentację wykonawczą.'},
    ]},
    {title: 'Biznes', lead: 'Potrzebujesz funkcjonalnej przestrzeni spójnej z charakterem marki?', sections: [
      {title: 'Architektura', text: 'Projekty obiektów usługowych, komercyjnych i mieszkaniowych — od koncepcji po dokumentację, koordynację branż oraz nadzór realizacji.'},
      {title: 'Wnętrza', text: 'Projekty biur, gastronomii, lokali usługowych i innych wnętrz komercyjnych — funkcjonalnych, spójnych i zgodnych z charakterem marki.'},
    ]},
    {title: 'Doradztwo', lead: 'Planujesz zakup działki i chcesz sprawdzić jej potencjał?', sections: [
      {title: 'Analizy', text: 'Analizujemy możliwości zabudowy, zapisy MPZP lub WZ oraz potencjał działki albo nieruchomości przed zakupem i rozpoczęciem inwestycji.'},
      {title: 'Konsultacje', text: 'Doradzamy przed zakupem działki lub nieruchomości, pomagamy ocenić planowane zamierzenie i wspieramy proces uzyskania warunków zabudowy.'},
    ]},
  ],
  processTitle: 'Rozmowa / Realizacja',
  architectureProcess: procesArchitektura,
  interiorsProcess: procesWnetrza,
  aboutTitle: 'Cześć! Tu Tomek.\nTworzę indywidualne projekty architektury i wnętrz.',
  aboutParagraphs: [
    'Posiadam uprawnienia budowlane do projektowania bez ograniczeń w specjalności architektonicznej i jestem członkiem Pomorskiej Izby Architektów RP.',
    'Studiowałem na Wydziale Architektury i Urbanistyki Politechniki Gdańskiej oraz na Faculty of Architecture and Urban Design Politecnico di Milano.',
    'Doświadczenie zdobywałem w pracowniach architektonicznych i wnętrzarskich w Tallinie, Paryżu i Trójmieście.',
  ],
  faqTitle: 'Pytania przed rozpoczęciem współpracy',
  faq,
  seoTitle: 'Tomasz Marek — architektura i wnętrza',
  seoDescription: 'Kompleksowa obsługa inwestycji — od analizy działki, przez projekt i formalności, po wnętrza i nadzór autorski.',
}

export const defaultSiteSettings: SiteSettingsData = {
  siteTitle: 'Tomasz Marek Architekt',
  defaultSeoTitle: 'Tomasz Marek — architektura i wnętrza',
  defaultSeoDescription: 'Kompleksowa obsługa inwestycji — od analizy działki, przez projekt i formalności, po wnętrza i nadzór autorski.',
  logo: 'TMA',
  logoSuffix: 'Tomasz Marek Architekt',
  email: 'biuro@tomaszmarek.com',
  phoneLabel: '+48 696 995 899',
  phoneHref: '+48696995899',
  instagram: 'https://www.instagram.com/studjo.biuro/',
  facebook: 'https://www.facebook.com/people/studjobiuro/100078056002732/',
  bookingLabel: 'Umów spotkanie z architektem',
  footerTitle: 'Porozmawiajmy o Twoim projekcie',
  footerText: 'Planujesz budowę, przebudowę albo nowe wnętrze? Opowiedz nam o swojej inwestycji. Podczas pierwszej rozmowy sprawdzimy, w jakim zakresie możemy Ci pomóc.',
  studioAddress: ['TMA', 'Tomasz Marek Architekt', 'ul. Magellana 2/29', '80-288 Gdańsk'],
  businessAddress: ['Stary Grabiąż 6A', '78-460 Stary Grabiąż'],
  nip: '6731917259',
  regon: '528600458',
}

const imageProjection = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt
}`

const homePageQuery = `*[_id == "homePage"][0] {
  ...,
  "heroImage": heroImage ${imageProjection},
  "aboutImage": aboutImage ${imageProjection}
}`

let homePageCache: Promise<HomePageData> | undefined
let settingsCache: Promise<SiteSettingsData> | undefined

export function getHomePage(): Promise<HomePageData> {
  homePageCache ??= sanityClient.fetch<Partial<HomePageData> | null>(homePageQuery)
    .then((data) => ({...defaultHomePage, ...(data ?? {})}))
  return homePageCache
}

export function getSiteSettings(): Promise<SiteSettingsData> {
  settingsCache ??= sanityClient.fetch<Partial<SiteSettingsData> | null>('*[_id == "siteSettings"][0]')
    .then((data) => ({...defaultSiteSettings, ...(data ?? {})}))
  return settingsCache
}
