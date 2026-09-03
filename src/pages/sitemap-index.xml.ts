import type {APIRoute} from 'astro';

export const prerender = true;

export const GET: APIRoute = ({site}) => {
  const sitemapUrl = new URL('/sitemap.xml', site ?? 'https://tomaszmarek.com').toString();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${sitemapUrl}</loc></sitemap>`,
    '</sitemapindex>',
  ].join('\n');

  return new Response(body, {
    headers: {'Content-Type': 'application/xml; charset=utf-8'},
  });
};
