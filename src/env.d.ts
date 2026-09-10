/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string
  readonly PUBLIC_SANITY_DATASET: string
  readonly SANITY_API_READ_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    /** Ustawiane przez middleware dla tras /preview — włącza wersje robocze i stega. */
    preview?: boolean
  }
}

// Moduł istnieje tylko w środowisku Workera. Deklaracja pozwala czytać sekrety
// wdrożenia bez wciągania pełnych typów Cloudflare.
declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>
}
