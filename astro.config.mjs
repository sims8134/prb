import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const SITE = 'https://peoplesrepublicofbulgaria.com';
const CWB = 'https://coldwarbulgaria.com';
const LANGS = ['en', 'fr', 'es', 'bg'];

const moved = (destination) => ({ status: 301, destination });

// Old multilingual site -> new single page or Cold War Bulgaria (validated 18.11.2026).
// The Cloudflare Pages equivalent (_redirects file) is documented in docs/journal.md.
const redirects = {};
for (const l of LANGS) {
  redirects[`/${l}`] = moved('/');
  redirects[`/${l}/about`] = moved(`${CWB}/${l}/about`);
  redirects[`/${l}/history`] = moved(`${CWB}/${l}#timeline`);
  redirects[`/${l}/collection`] = moved(`${CWB}/${l}#museum`);
  redirects[`/${l}/tourism`] = moved(`${CWB}/${l}#map`);
  redirects[`/${l}/videos`] = moved('/');
  redirects[`/${l}/contact`] = moved('/');
  redirects[`/${l}/legal`] = moved('/privacy');
  redirects[`/${l}/privacy`] = moved('/privacy');
}
// Addresses without a language, used before May 2026.
Object.assign(redirects, {
  '/about': moved(`${CWB}/en/about`),
  '/history': moved(`${CWB}/en#timeline`),
  '/collection': moved(`${CWB}/en#museum`),
  '/tourism': moved(`${CWB}/en#map`),
  '/video': moved('/'),
  '/videos': moved('/'),
  '/contact': moved('/'),
  '/legal': moved('/privacy'),
});

// The old sitemap listed addresses with a trailing slash (/en/about/). Astro writes
// Vercel redirect rules as ^/en/about$ only, so after the build we make the final
// slash optional in each 301 rule. One hop, still a 301.
const trailingSlashRedirects = {
  name: 'prb-trailing-slash-redirects',
  hooks: {
    'astro:build:done': async ({ logger }) => {
      const { readFile, writeFile } = await import('node:fs/promises');
      const file = new URL('./.vercel/output/config.json', import.meta.url);
      let config;
      try {
        config = JSON.parse(await readFile(file, 'utf8'));
      } catch {
        return; // not a Vercel build
      }
      let patched = 0;
      for (const route of config.routes ?? []) {
        if (route.status === 301 && typeof route.src === 'string' && /[^/?]\$$/.test(route.src)) {
          route.src = route.src.replace(/\$$/, '/?$');
          patched++;
        }
      }
      await writeFile(file, JSON.stringify(config, null, 2));
      logger.info(`${patched} redirect rules now accept a trailing slash`);
    },
  },
};

export default defineConfig({
  site: SITE,
  adapter: vercel(),
  redirects,
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // The home page is rendered on the server, so it must be listed by hand.
      customPages: [`${SITE}/`],
      filter: (page) => !Object.keys(redirects).some((from) => page === `${SITE}${from}` || page === `${SITE}${from}/`),
    }),
    trailingSlashRedirects,
  ],
});
