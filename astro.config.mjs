// @ts-check
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tomaszmarek.com',
  integrations: [
    sanity({
      projectId: 'o8oniqgy',
      dataset: 'production',
      apiVersion: '2026-08-25',
      useCdn: false,
      studioBasePath: '/admin',
      studioRouterHistory: 'hash',
    }),
    react(),
  ],
  image: {
    domains: ['cdn.sanity.io'],
  },
});
