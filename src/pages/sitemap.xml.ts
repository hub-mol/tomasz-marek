import type {APIRoute} from 'astro';
import {getSitemapUrls} from '../lib/sitemap';

export const prerender = true;

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({site}) => {
  const baseUrl = site ?? new URL('https://tomaszmarek.com');
  const urls = await getSitemapUrls(baseUrl);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {'Content-Type': 'application/xml; charset=utf-8'},
  });
};
