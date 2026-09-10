import {defineMiddleware} from 'astro:middleware'

const jestPodgladem = (pathname: string) =>
  pathname === '/preview'
  || pathname.startsWith('/preview/')
  || pathname.startsWith('/api/draft-mode/')

/**
 * Tryb podglądu włącza się wyłącznie na trasach /preview, które są renderowane
 * na żądanie. Strony publiczne są prerenderowane podczas builda — przechodzą
 * tędy z `preview = false` i nigdy nie dotykają tokenu ani wersji roboczych.
 */
export const onRequest = defineMiddleware(async ({url, locals}, next) => {
  const podglad = jestPodgladem(url.pathname)
  locals.preview = url.pathname === '/preview' || url.pathname.startsWith('/preview/')

  const response = await next()

  if (!podglad) return response

  // Bez tego przeglądarka stosuje własne heurystyki i potrafi podać ramce
  // Presentation wersję z pamięci — edytor zapisuje zmianę i jej nie widzi.
  try {
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
  } catch {
    // Nagłówki bywają niemodyfikowalne — wtedy przepisujemy odpowiedź.
    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'no-store, must-revalidate')
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }

  return response
})
