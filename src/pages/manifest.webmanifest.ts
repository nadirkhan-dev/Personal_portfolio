import type { APIRoute } from 'astro';
import { SITE, PERSON, SITE_URL } from '../config/site';

/**
 * Web app manifest, generated so name/colours/icons stay in sync with the rest
 * of the SEO config. Lighthouse's "Best Practices" and PWA installability checks
 * both read this file; a missing or malformed manifest is a guaranteed warning.
 */
export const GET: APIRoute = () => {
  const manifest = {
    name: `${PERSON.name} — ${PERSON.jobTitle}`,
    short_name: SITE.shortName,
    description: PERSON.description,
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    lang: 'en-US',
    dir: 'ltr',
    categories: ['portfolio', 'business', 'productivity'],
    icons: [
      { src: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { src: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/og-image.png',
        sizes: `${SITE.ogImageWidth}x${SITE.ogImageHeight}`,
        type: 'image/png',
        form_factor: 'wide',
        label: `${PERSON.name} portfolio`,
      },
    ],
    shortcuts: [
      {
        name: 'View projects',
        url: '/#projects',
        description: `Projects built by ${PERSON.name}`,
      },
      {
        name: 'Download CV',
        url: '/Nadir_Khan_CV.pdf',
        description: `Resume of ${PERSON.name}`,
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
