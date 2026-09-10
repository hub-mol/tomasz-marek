import type {APIRoute} from 'astro'
import {sanityClient} from 'sanity:client'
import {validatePreviewUrl} from '@sanity/preview-url-secret'
import {perspectiveCookieName} from '@sanity/preview-url-secret/constants'
import {getReadTokenOrNull} from '../../../lib/sanityLoad'

export const prerender = false

/**
 * Presentation otwiera ten adres z jednorazowym sekretem w query. Sprawdzamy go
 * w Sanity i dopiero wtedy ustawiamy ciasteczko, które przełącza trasy /preview
 * na wersje robocze.
 *
 * Studio i strona stoją na tej samej domenie (tomaszmarek.com/admin oraz
 * tomaszmarek.com), więc ramka podglądu jest first-party i wystarczy SameSite=Lax.
 * Gdyby podgląd trafił kiedyś na osobną domenę, trzeba tu wrócić po
 * SameSite=None; Secure; Partitioned.
 */
export const GET: APIRoute = async ({request, cookies, redirect}) => {
  const token = await getReadTokenOrNull()

  if (!token) {
    return new Response(
      'Brak tokenu SANITY_API_READ_TOKEN w środowisku Workera.\n'
      + 'Ustaw go przez: npx wrangler secret put SANITY_API_READ_TOKEN',
      {status: 500, headers: {'content-type': 'text/plain; charset=utf-8'}},
    )
  }

  const {isValid, redirectTo = '/', studioPreviewPerspective} = await validatePreviewUrl(
    sanityClient.withConfig({token}),
    request.url,
  )

  if (!isValid) {
    return new Response('Nieprawidłowy sekret podglądu.', {status: 401})
  }

  cookies.set(perspectiveCookieName, studioPreviewPerspective ?? 'drafts', {
    httpOnly: false,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: '/',
  })

  // Podgląd żyje pod /preview, więc adres z Presentation przepisujemy na tę gałąź.
  const target = redirectTo.startsWith('/preview')
    ? redirectTo
    : `/preview${redirectTo === '/' ? '' : redirectTo}`

  return redirect(target, 307)
}
