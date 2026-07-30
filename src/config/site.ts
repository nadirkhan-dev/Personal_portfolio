/**
 * Single source of truth for every SEO-relevant value on the site.
 *
 * Anything that appears in <title>, meta tags, canonical URLs, robots.txt,
 * sitemap.xml, the web manifest or JSON-LD structured data is defined here and
 * only here — that is what guarantees requirement "no duplicate / conflicting
 * metadata". Change a value once and it propagates everywhere.
 */

/** Canonical production origin. Must match `site` in astro.config.mjs. No trailing slash. */
export const SITE_URL = 'https://nadirkhan-dev.vercel.app';

export const PERSON = {
  /** Stable @id for the Person entity, so every graph node can reference it. */
  id: `${SITE_URL}/#person`,
  name: 'Nadir Khan',
  givenName: 'Nadir',
  familyName: 'Khan',
  /** Alternate spellings people actually type into Google. */
  alternateName: ['Nadir Khan Developer', 'Nadir Khan Full Stack Developer'],
  jobTitle: 'Full Stack Developer',
  email: 'noahkhan47@gmail.com',
  image: `${SITE_URL}/nadir-hero.png`,
  /** Used verbatim as the Person.description in JSON-LD. */
  description:
    'Nadir Khan is a Full Stack JavaScript Developer based in Bahawalpur, Pakistan, building production web applications, e-commerce platforms and shipping systems with Vue 3, Nuxt 4, React.js, Next.js, Node.js and TypeScript.',
  address: {
    locality: 'Bahawalpur',
    region: 'Punjab',
    country: 'PK',
  },
  worksFor: {
    name: 'Algotix.ai',
    url: 'https://algotix.ai',
  },
  knowsAbout: [
    'Full Stack Development',
    'JavaScript',
    'TypeScript',
    'Vue.js',
    'Nuxt',
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'Tailwind CSS',
    'REST API Development',
    'Headless CMS',
    'Web Performance Optimization',
  ],
} as const;

/**
 * Profiles emitted as schema.org `sameAs`. Google uses these to tie this site to
 * the same real-world person behind the linked profiles — the main lever for
 * ranking on a bare name query like "Nadir Khan".
 *
 * Every URL here MUST resolve to a live profile. A 404 in `sameAs` does not help
 * entity resolution and can dilute it.
 */
export const SOCIALS = {
  github: 'https://github.com/nadirkhan-dev',
  // Vanity URL. Header, footer and JSON-LD all read from this one line — if the
  // vanity slug is not live yet, put the numeric profile URL back here.
  linkedin: 'https://www.linkedin.com/in/nadirkhan-dev/',
  instagram: 'https://www.instagram.com/nadirkhan.dev',
  facebook: 'https://www.facebook.com/nadirkhan.dev',
  stackoverflow: 'https://stackoverflow.com/users/6900808/sami',
} as const;

/** Named separately because the header and footer link to it by itself. */
export const STACKOVERFLOW_URL = SOCIALS.stackoverflow;

/** X / Twitter handle used for Twitter Card attribution. */
export const TWITTER_HANDLE = '@noahkhan47';

/** Ordered list handed to schema.org `sameAs`. */
export const SAME_AS: string[] = [
  SOCIALS.github,
  SOCIALS.linkedin,
  SOCIALS.instagram,
  SOCIALS.facebook,
  SOCIALS.stackoverflow,
  `https://x.com/${TWITTER_HANDLE.replace('@', '')}`,
];

export const SITE = {
  /** og:site_name and schema.org WebSite.name */
  name: `${PERSON.name} — Portfolio`,
  shortName: PERSON.name,
  url: SITE_URL,
  locale: 'en_US',
  lang: 'en',
  /** Brand colours reused by the manifest and theme-color meta. */
  themeColor: '#0D0D0D',
  accentColor: '#D5FF3F',
  googleAnalyticsId: 'G-ZQC1XS2QWG',
  /** Default social share image. Absolute URL, 1200x630. */
  ogImage: `${SITE_URL}/og-image.jpg`,
  ogImageAlt: `${PERSON.name} — ${PERSON.jobTitle}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

/** Resume file, referenced from the header, footer and JSON-LD. */
export const RESUME_PATH = '/Nadir_Khan_CV.pdf';

/**
 * Per-page metadata. Every route registered here gets its own unique title and
 * description — no page inherits another page's copy.
 */
export const PAGES = {
  home: {
    path: '/',
    title: 'Nadir Khan — Full Stack Developer | Vue, React & Node.js',
    description:
      'Nadir Khan is a Full Stack JavaScript Developer in Bahawalpur, Pakistan, building production web apps, e-commerce platforms and shipping systems with Vue 3, Nuxt 4, React, Next.js and Node.js.',
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found — Nadir Khan',
    description:
      'This page does not exist on the portfolio of Nadir Khan, Full Stack Developer. Head back to the homepage to browse projects, experience and skills.',
  },
} as const;

/** Builds an absolute URL from a site-relative path. Used for canonical + OG tags. */
export const absoluteUrl = (path = '/'): string => new URL(path, SITE_URL).href;
