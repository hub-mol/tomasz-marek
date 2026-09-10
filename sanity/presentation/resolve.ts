import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

/**
 * Mapa „dokument → adresy na stronie”. Presentation używa jej, żeby pokazać
 * edytorowi, które podstrony zbudowane są z otwartego dokumentu.
 *
 * Ta konfiguracja jest niezależna od tego, czy podgląd działa na wersji
 * opublikowanej, czy na roboczej — przy przejściu na podgląd wersji roboczych
 * zmienia się tylko `previewUrl` w sanity.config.ts.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homePage: defineLocations({
      message: 'Strona główna',
      locations: [{title: 'Strona główna', href: '/'}],
    }),

    siteSettings: defineLocations({
      message: 'Ustawienia widoczne na każdej podstronie.',
      locations: [
        {title: 'Strona główna', href: '/'},
        {title: 'Projekty', href: '/projekty'},
        {title: 'Blog', href: '/blog'},
        {title: 'Kontakt', href: '/kontakt'},
      ],
    }),

    project: defineLocations({
      select: {title: 'shortTitle', slug: 'slug.current'},
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Projekt',
            href: `/projekty/${doc?.slug}`,
          },
          {title: 'Lista projektów', href: '/projekty'},
          {title: 'Strona główna', href: '/'},
        ],
      }),
    }),

    blogPost: defineLocations({
      select: {title: 'title', slug: 'slug.current', routeType: 'routeType'},
      resolve: (doc) => {
        const isOffer = doc?.routeType === 'offer'
        return {
          locations: [
            {
              title: doc?.title || (isOffer ? 'Strona oferty' : 'Wpis'),
              href: `/${isOffer ? 'oferta' : 'blog'}/${doc?.slug}`,
            },
            ...(isOffer ? [] : [{title: 'Lista wpisów', href: '/blog'}]),
          ],
        }
      },
    }),
  },
}
