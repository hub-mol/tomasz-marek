import type {PortableTextBlock} from '@portabletext/types'
import {bezZnacznikow, cachedUnlessPreview, loadQuery, type LoadOptions} from '../lib/sanityLoad'
import type {SanityProjectImage} from './portfolio'
import {faq, procesArchitektura, procesWnetrza} from './home'
import {normalizePortableText, paragraphsToPortableText, toPortableText} from '../utils/portableText'
import {isValidSanityImage} from '../lib/sanityImage'

export interface SimpleItem {
  title: string
  body: PortableTextBlock[]
}

export interface ApproachPillar {
  title: string
  text: string
}

export interface OfferGroup {
  title: string
  lead?: string
  sections: Array<{title: string; text: PortableTextBlock[]}>
}

export interface HomePageData {
  showHero: boolean
  heroType: 'images' | 'video'
  heroLead: string
  heroImage?: SanityProjectImage
  heroImages: SanityProjectImage[]
  heroVideoUrl?: string
  showApproach: boolean
  approachTitle: string
  approachBody: PortableTextBlock[]
  approachCallout: string
  approachPillars: ApproachPillar[]
  projectsTitle: string
  projectsLinkLabel: string
  showProjects: boolean
  offerTitle: string
  offers: OfferGroup[]
  showOffer: boolean
  processTitle: string
  showProcess: boolean
  showArchitectureProcess: boolean
  architectureProcess: SimpleItem[]
  showInteriorsProcess: boolean
  interiorsProcess: SimpleItem[]
  aboutTitle: string
  showAbout: boolean
  aboutParagraphs: PortableTextBlock[]
  aboutImage?: SanityProjectImage
  faqTitle: string
  showFaq: boolean
  faq: SimpleItem[]
  seoTitle?: string
  seoDescription?: string
}

export interface SiteSettingsData {
  siteTitle: string
  defaultSeoTitle: string
  defaultSeoDescription: string
  logoSuffix: string
  navigationLinks: NavigationLink[]
  email: string
  phoneLabel: string
  phoneHref: string
  instagram?: string
  facebook?: string
  bookingLabel: string
  bookingHref: string
  footerTitle: string
  footerText: string
  studioAddress: string[]
  businessAddress: string[]
  nip?: string
  regon?: string
  founderName?: string
  studioStreet?: string
  studioPostalCode?: string
  studioCity?: string
  studioRegion?: string
  studioCountry?: string
  areaServed?: string[]
  iarpNumber?: string
  iarpUrl?: string
}

export interface NavigationLink {
  _key?: string
  label: string
  href: string
  openInNewTab?: boolean
}

const rawOfferGroups: Array<{title: string; lead?: string; sections: Array<{title: string; text: string}>}> = [
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
  ]

const itemsToPortableText = (items: Array<{title: string; body: string}>, keyPrefix: string): SimpleItem[] =>
  items.map((item, index) => ({
    title: item.title,
    body: toPortableText(item.body, [], `${keyPrefix}-${index}`),
  }))

export const defaultHomePage: HomePageData = {
  showHero: true,
  heroType: 'images',
  heroLead: 'Od idei po realizację poprowadzimy Cię przez cały proces projektowy i wykonawczy.',
  heroImages: [],
  showApproach: true,
  approachTitle: 'Nie zaczynamy od gotowej odpowiedzi.',
  approachBody: paragraphsToPortableText([
    'Każdy projekt poprzedzamy analizą miejsca, potrzeb użytkowników, możliwości działki i charakteru inwestycji.',
    'Szukamy rozwiązań, które mają swoje uzasadnienie — funkcjonalne, przestrzenne i estetyczne. Dzięki temu projekt nie jest przypadkowym zestawem pomieszczeń i materiałów, ale spójną przestrzenią stworzoną z myślą o jej przyszłych użytkownikach.',
  ], 'approach'),
  approachCallout: 'Dobra architektura zaczyna się od zrozumienia.',
  approachPillars: [
    {title: 'Miejsce', text: 'Wykorzystujemy potencjał działki, otoczenia, światła i widoków.'},
    {title: 'Funkcja', text: 'Projektujemy przestrzeń wokół sposobu życia i rzeczywistych potrzeb użytkowników.'},
    {title: 'Autentyczność', text: 'Łączymy architekturę, wnętrza, materiały i detal w jedną przemyślaną całość.'},
  ],
  projectsTitle: 'Wybrane realizacje',
  projectsLinkLabel: 'Zobacz wszystkie projekty',
  showProjects: true,
  offerTitle: 'Zakres współpracy',
  offers: rawOfferGroups.map((group, index) => ({
    ...group,
    sections: group.sections.map((section, sectionIndex) => ({
      title: section.title,
      text: toPortableText(section.text, [], `oferta-${index}-${sectionIndex}`),
    })),
  })),
  showOffer: true,
  processTitle: 'Rozmowa / Realizacja',
  showProcess: true,
  showArchitectureProcess: true,
  architectureProcess: itemsToPortableText(procesArchitektura, 'proces-architektura'),
  showInteriorsProcess: true,
  interiorsProcess: itemsToPortableText(procesWnetrza, 'proces-wnetrza'),
  aboutTitle: 'Cześć! Tu Tomek.\nTworzę indywidualne projekty architektury i wnętrz.',
  showAbout: true,
  aboutParagraphs: paragraphsToPortableText([
    'Posiadam uprawnienia budowlane do projektowania bez ograniczeń w specjalności architektonicznej i jestem członkiem Pomorskiej Izby Architektów RP.',
    'Studiowałem na Wydziale Architektury i Urbanistyki Politechniki Gdańskiej oraz na Faculty of Architecture and Urban Design Politecnico di Milano.',
    'Doświadczenie zdobywałem w pracowniach architektonicznych i wnętrzarskich w Tallinie, Paryżu i Trójmieście.',
  ], 'about'),
  faqTitle: 'Pytania przed rozpoczęciem współpracy',
  showFaq: true,
  faq: itemsToPortableText(faq, 'faq'),
  seoTitle: 'Tomasz Marek — architektura i wnętrza',
  seoDescription: 'Kompleksowa obsługa inwestycji — od analizy działki, przez projekt i formalności, po wnętrza i nadzór autorski.',
}

export const defaultSiteSettings: SiteSettingsData = {
  siteTitle: 'Tomasz Marek Architekt',
  defaultSeoTitle: 'Tomasz Marek — architektura i wnętrza',
  defaultSeoDescription: 'Kompleksowa obsługa inwestycji — od analizy działki, przez projekt i formalności, po wnętrza i nadzór autorski.',
  logoSuffix: 'Tomasz Marek Architekt',
  navigationLinks: [
    {label: 'Portfolio', href: '/projekty'},
    {label: 'Oferta', href: '/#oferta'},
    {label: 'Proces', href: '/#proces'},
    {label: 'Blog', href: '/blog'},
    {label: 'Kontakt', href: '/#kontakt'},
    {_key: 'booking', label: 'Umów spotkanie', href: 'mailto:biuro@tomaszmarek.com?subject=Spotkanie z architektem'},
  ],
  email: 'biuro@tomaszmarek.com',
  phoneLabel: '+48 696 995 899',
  phoneHref: '+48696995899',
  instagram: 'https://www.instagram.com/studjo.biuro/',
  facebook: 'https://www.facebook.com/people/studjobiuro/100078056002732/',
  bookingLabel: 'Umów spotkanie z architektem',
  bookingHref: 'mailto:biuro@tomaszmarek.com?subject=Spotkanie z architektem',
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
  "heroImages": heroImages[] ${imageProjection},
  "heroVideoUrl": heroVideo.asset->url,
  "aboutImage": aboutImage ${imageProjection}
}`

const siteSettingsQuery = `*[_id == "siteSettings"][0]`

const normalizeItems = (value: unknown, fallback: SimpleItem[], keyPrefix: string): SimpleItem[] => {
  if (!Array.isArray(value) || value.length === 0) return fallback

  return value.map((item, index) => {
    const entry = item as {title?: string; body?: unknown}
    return {
      title: entry?.title ?? '',
      body: toPortableText(entry?.body, [], `${keyPrefix}-${index}`),
    }
  })
}

const normalizeOffers = (value: unknown, fallback: OfferGroup[]): OfferGroup[] => {
  if (!Array.isArray(value) || value.length === 0) return fallback

  return value.map((group, index) => {
    const entry = group as {title?: string; lead?: string; sections?: unknown}
    const sections = Array.isArray(entry?.sections) ? entry.sections : []
    return {
      title: entry?.title ?? '',
      lead: entry?.lead,
      sections: sections.map((section, sectionIndex) => {
        const item = section as {title?: string; text?: unknown}
        return {
          title: item?.title ?? '',
          text: toPortableText(item?.text, [], `oferta-${index}-${sectionIndex}`),
        }
      }),
    }
  })
}

const homePageCache: {value?: Promise<HomePageData>} = {}
const settingsCache: {value?: Promise<SiteSettingsData>} = {}

export function getHomePage(options: LoadOptions = {}): Promise<HomePageData> {
  return cachedUnlessPreview(homePageCache, options, () => loadQuery<Partial<HomePageData> | null>(homePageQuery, {}, options)
    .then((data) => {
      const merged = {...defaultHomePage, ...(data ?? {})}
      const heroImage = isValidSanityImage(data?.heroImage) ? data.heroImage : undefined
      const heroImages = (data?.heroImages ?? []).filter(isValidSanityImage)
      const aboutImage = isValidSanityImage(data?.aboutImage) ? data.aboutImage : undefined
      return {
        ...merged,
        showHero: data?.showHero ?? true,
        // heroType przełącza wideo/slideshow, więc porównanie musi działać.
        heroType: bezZnacznikow(data?.heroType) === 'video' && data?.heroVideoUrl ? 'video' : 'images',
        heroVideoUrl: bezZnacznikow(data?.heroVideoUrl),
        seoTitle: bezZnacznikow(data?.seoTitle) ?? defaultHomePage.seoTitle,
        seoDescription: bezZnacznikow(data?.seoDescription) ?? defaultHomePage.seoDescription,
        showApproach: data?.showApproach ?? true,
        showProjects: data?.showProjects ?? true,
        showOffer: data?.showOffer ?? true,
        showProcess: data?.showProcess ?? true,
        showAbout: data?.showAbout ?? true,
        showFaq: data?.showFaq ?? true,
        heroImage,
        aboutImage,
        showArchitectureProcess: data?.showArchitectureProcess ?? true,
        showInteriorsProcess: data?.showInteriorsProcess ?? true,
        approachBody: normalizePortableText(data?.approachBody, defaultHomePage.approachBody, 'approach'),
        aboutParagraphs: normalizePortableText(data?.aboutParagraphs, defaultHomePage.aboutParagraphs, 'about'),
        // Pola poniżej były wcześniej zwykłym tekstem. `toPortableText` przyjmuje obie
        // postacie, więc strona działa niezależnie od tego, czy migracja już przeszła.
        faq: normalizeItems(data?.faq, defaultHomePage.faq, 'faq'),
        architectureProcess: normalizeItems(data?.architectureProcess, defaultHomePage.architectureProcess, 'proces-architektura'),
        interiorsProcess: normalizeItems(data?.interiorsProcess, defaultHomePage.interiorsProcess, 'proces-wnetrza'),
        offers: normalizeOffers(data?.offers, defaultHomePage.offers),
        heroImages: heroImages.length
          ? heroImages.slice(0, 3)
          : heroImage ? [heroImage] : [],
      }
    }))
}

export function getSiteSettings(options: LoadOptions = {}): Promise<SiteSettingsData> {
  return cachedUnlessPreview(settingsCache, options, () => loadQuery<Partial<SiteSettingsData> | null>(siteSettingsQuery, {}, options)
    .then((data) => ({
      ...defaultSiteSettings,
      ...(data ?? {}),
      // Adresy, dane kontaktowe i dane strukturalne trafiają do atrybutów i
      // JSON-LD, więc idą bez znaczników stega.
      navigationLinks: (data?.navigationLinks?.length ? data.navigationLinks : defaultSiteSettings.navigationLinks)
        .map((item) => ({
          ...item,
          // Kotwica bez wiodącego „/” działa tylko na stronie głównej, więc ją uzupełniamy.
          href: bezZnacznikow(item.href)
            .replace(/^\/portfolio(?=\/|$)/, '/projekty')
            .replace(/^#/, '/#'),
        })),
      siteTitle: bezZnacznikow(data?.siteTitle) || defaultSiteSettings.siteTitle,
      defaultSeoTitle: bezZnacznikow(data?.defaultSeoTitle) || defaultSiteSettings.defaultSeoTitle,
      defaultSeoDescription: bezZnacznikow(data?.defaultSeoDescription) || defaultSiteSettings.defaultSeoDescription,
      email: bezZnacznikow(data?.email) || defaultSiteSettings.email,
      phoneHref: bezZnacznikow(data?.phoneHref) || defaultSiteSettings.phoneHref,
      instagram: bezZnacznikow(data?.instagram) ?? defaultSiteSettings.instagram,
      facebook: bezZnacznikow(data?.facebook) ?? defaultSiteSettings.facebook,
      iarpUrl: bezZnacznikow(data?.iarpUrl) ?? defaultSiteSettings.iarpUrl,
      iarpNumber: bezZnacznikow(data?.iarpNumber) ?? defaultSiteSettings.iarpNumber,
      nip: bezZnacznikow(data?.nip) ?? defaultSiteSettings.nip,
      regon: bezZnacznikow(data?.regon) ?? defaultSiteSettings.regon,
      founderName: bezZnacznikow(data?.founderName) ?? defaultSiteSettings.founderName,
      studioStreet: bezZnacznikow(data?.studioStreet) ?? defaultSiteSettings.studioStreet,
      studioPostalCode: bezZnacznikow(data?.studioPostalCode) ?? defaultSiteSettings.studioPostalCode,
      studioCity: bezZnacznikow(data?.studioCity) ?? defaultSiteSettings.studioCity,
      studioRegion: bezZnacznikow(data?.studioRegion) ?? defaultSiteSettings.studioRegion,
      studioCountry: bezZnacznikow(data?.studioCountry) ?? defaultSiteSettings.studioCountry,
      areaServed: data?.areaServed?.length ? data.areaServed : defaultSiteSettings.areaServed,
      bookingHref: bezZnacznikow(data?.bookingHref) || defaultSiteSettings.bookingHref,
    })))
}
