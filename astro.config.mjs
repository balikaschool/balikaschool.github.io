// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pure static output — no adapter. The site deploys to Cloudflare Pages as
// static files (approved deviation from brief §8.1: the adapter is SSR-only).
export default defineConfig({
  // Absolute-URL base for canonical links, Open Graph images, and the sitemap
  // (brief §11 DOMAIN). The pages.dev address still serves as an alias;
  // canonicals point every crawler and share here.
  site: 'https://balikaz.edu.np',
  integrations: [sitemap()],
  redirects: {
    '/admin': '/admin/index.html',
  },
});
