// @ts-check
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tomaszmarek.com',

  // Strony publiczne są nadal prerenderowane do statycznych plików. Adapter
  // obsługuje wyłącznie trasy oznaczone `prerender = false`, czyli podgląd
  // wersji roboczych i przełączanie trybu podglądu.
  adapter: cloudflare({
    // Prerender ma dalej działać w Node, bo build korzysta z sharp i node:fs
    // przy wyliczaniu palety zdjęć oraz optymalizacji obrazów.
    prerenderEnvironment: 'node',
    // Zdjęcia optymalizujemy jak dotąd podczas builda; w podglądzie renderowanym
    // na żądanie idą bez przetwarzania, żeby nie wciągać sharp do Workera.
    imageService: { build: 'compile', runtime: 'passthrough' },
  }),

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

  vite: {
    // sharp jest natywny i używany wyłącznie podczas builda (paleta kolorów kart
    // i optymalizacja zdjęć). Trzymamy go poza bundlem Workera, bo runner
    // Cloudflare nie potrafi rozwiązać jego binariów.
    ssr: { external: ['sharp'] },
    optimizeDeps: { exclude: ['sharp'] },
  },
});
