import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import partytown from '@astrojs/partytown';
import sanity from '@sanity/astro';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ''
);

const hasSanityEnv = Boolean(PUBLIC_SANITY_PROJECT_ID) && Boolean(PUBLIC_SANITY_DATASET);

/*
 * Canonical production origin. MUST stay identical to SITE_URL in
 * src/config/site.ts — it is what @astrojs/sitemap writes into the sitemap and
 * what every canonical / og:url is resolved against.
 *
 * This used to be derived from process.env.VERCEL_URL. That is wrong for SEO:
 * VERCEL_URL is the per-deployment hostname (…-git-branch-user.vercel.app), so
 * every preview build emitted canonical tags pointing at itself, inviting Google
 * to index preview deployments as duplicates of production.
 */
const SITE_URL = 'https://nadirkhan-dev.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: '/',

  // Clean URLs — /page, not /page.html.
  build: { format: 'directory' },
  trailingSlash: 'never',

  // Strip inter-tag whitespace from emitted HTML: smaller payload, faster parse.
  compressHTML: true,

  integrations: [
    tailwind(),

    sitemap({
      // A noindex page must never be submitted in a sitemap — Search Console
      // reports that as a "Submitted URL marked 'noindex'" error.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date(),
      // Note: the sitemap lists the homepage as "<origin>" while the canonical
      // tag emits "<origin>/". These are the same URL under RFC 3986 §6.2.3
      // (an empty path normalises to "/") and Google treats them as one.
    }),

    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),

    ...(hasSanityEnv
      ? [
          sanity({
            projectId: PUBLIC_SANITY_PROJECT_ID,
            dataset: PUBLIC_SANITY_DATASET,
            useCdn: true,
          }),
        ]
      : []),
  ],
});
