import {sanityClient} from 'sanity:client'

export interface LoadOptions {
  /** Wersje robocze zamiast opublikowanych, wraz ze znacznikami klik-do-edycji. */
  preview?: boolean
}

const readToken = import.meta.env.SANITY_API_READ_TOKEN

/**
 * Jedno wejście do Sanity dla całej strony.
 *
 * Bez `preview` zachowuje się dokładnie jak dotąd: pobiera treść opublikowaną,
 * bez tokenu. Tak działają wszystkie strony prerenderowane podczas builda.
 *
 * Z `preview` dokłada token, przełącza perspektywę na wersje robocze i włącza
 * stega — niewidzialne znaczniki, dzięki którym Presentation wie, z którego pola
 * pochodzi dany fragment tekstu. Ta ścieżka działa wyłącznie na trasach
 * renderowanych na żądanie, czyli pod /preview.
 */
export function loadQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  {preview = false}: LoadOptions = {},
): Promise<T> {
  if (!preview) {
    return sanityClient.fetch<T>(query, params)
  }

  if (!readToken) {
    throw new Error(
      'Podgląd wersji roboczych wymaga zmiennej SANITY_API_READ_TOKEN (token o uprawnieniach Viewer).',
    )
  }

  return sanityClient
    .withConfig({
      token: readToken,
      useCdn: false,
      perspective: 'drafts',
      stega: {enabled: true, studioUrl: '/admin'},
    })
    .fetch<T>(query, params)
}

/**
 * Pamięć podręczna na czas builda. Trzyma wyłącznie treść opublikowaną — ta jest
 * publiczna i identyczna dla każdego, więc współdzielenie jest bezpieczne.
 * Wersje robocze nigdy tu nie trafiają.
 */
export function cachedUnlessPreview<T>(
  slot: {value?: Promise<T>},
  options: LoadOptions,
  load: () => Promise<T>,
): Promise<T> {
  if (options.preview) return load()
  slot.value ??= load()
  return slot.value
}
