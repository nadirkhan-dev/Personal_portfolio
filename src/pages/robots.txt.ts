import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/site';

/**
 * robots.txt is generated rather than hand-written so the Sitemap directive can
 * never drift from the canonical origin in src/config/site.ts.
 *
 * Policy: allow everything. A personal portfolio has nothing to hide from
 * crawlers, and blocking assets (CSS/JS/images) would stop Google rendering the
 * page correctly — a common and costly mistake.
 */
export const GET: APIRoute = () => {
  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Block nothing: Googlebot needs CSS, JS, fonts and images to render this page.

# AI crawlers are allowed — visibility in AI answers is desirable for a portfolio.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Host: ${SITE_URL.replace(/^https?:\/\//, '')}
Sitemap: ${SITE_URL}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
