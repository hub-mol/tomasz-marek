import type {APIRoute} from 'astro'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'

export const prerender = false

/** Kasuje ciasteczko podglądu i odsyła na stronę publiczną. */
export const GET: APIRoute = ({cookies, redirect}) => {
  cookies.delete(perspectiveCookieName, {path: '/'})
  return redirect('/', 307)
}
