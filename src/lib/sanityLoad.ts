import {sanityClient} from 'sanity:client'

export interface LoadOptions {
  /** Wersje robocze zamiast opublikowanych, wraz ze znacznikami klik-do-edycji. */
  preview?: boolean
}

/**
 * Token do wersji roboczych bywa w dwóch zupełnie różnych miejscach:
 *
 * - lokalnie w `.env`, skąd Vite wkleja go do `import.meta.env` podczas builda,
 * - na wdrożeniu jako sekret Workera, który istnieje dopiero w czasie działania
 *   i jest widoczny wyłącznie przez moduł `cloudflare:workers`.
 *
 * Sprawdzamy oba. Import jest dynamiczny i w try/catch, bo `cloudflare:workers`
 * nie istnieje podczas prerenderowania stron w Node.
 */
let zapamietanyToken: string | undefined
let sprawdzonoRuntime = false

async function getReadToken(): Promise<string | undefined> {
  if (zapamietanyToken) return zapamietanyToken

  const zBuilda = import.meta.env.SANITY_API_READ_TOKEN
  if (zBuilda) {
    zapamietanyToken = zBuilda
    return zapamietanyToken
  }

  if (sprawdzonoRuntime) return undefined
  sprawdzonoRuntime = true

  try {
    const {env} = await import('cloudflare:workers')
    const zRuntime = (env as Record<string, unknown>)?.SANITY_API_READ_TOKEN
    if (typeof zRuntime === 'string' && zRuntime) {
      zapamietanyToken = zRuntime
      return zapamietanyToken
    }
  } catch {
    // Poza Workerem tego modułu nie ma — to normalne podczas builda.
  }

  return undefined
}

/** Token albo null. Trasy używają go do wczesnej, czytelnej kontroli. */
export async function getReadTokenOrNull(): Promise<string | null> {
  return (await getReadToken()) ?? null
}

/**
 * Jedno wejście do Sanity dla całej strony.
 *
 * Bez `preview` zachowuje się dokładnie jak dotąd: pobiera treść opublikowaną,
 * bez tokenu. Tak działają wszystkie strony prerenderowane podczas builda.
 *
 * Z `preview` dokłada token, przełącza perspektywę na wersje robocze i włącza
 * stega — niewidzialne znaczniki, dzięki którym Presentation wie, z którego pola
 * pochodzi dany fragment tekstu.
 */
export async function loadQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  {preview = false}: LoadOptions = {},
): Promise<T> {
  if (!preview) {
    return sanityClient.fetch<T>(query, params)
  }

  const token = await getReadToken()

  if (!token) {
    throw new Error(
      'Podgląd wersji roboczych wymaga zmiennej SANITY_API_READ_TOKEN (token o uprawnieniach Viewer).',
    )
  }

  return sanityClient
    .withConfig({
      token,
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
