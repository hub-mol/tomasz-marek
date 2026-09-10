import {defineMiddleware} from 'astro:middleware'

/**
 * Tryb podglądu włącza się wyłącznie na trasach /preview, które są renderowane
 * na żądanie. Strony publiczne są prerenderowane podczas builda — przechodzą
 * tędy z `preview = false` i nigdy nie dotykają tokenu ani wersji roboczych.
 */
export const onRequest = defineMiddleware(({url, locals}, next) => {
  locals.preview = url.pathname === '/preview' || url.pathname.startsWith('/preview/')
  return next()
})
