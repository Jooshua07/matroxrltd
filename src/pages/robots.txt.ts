import type { APIRoute } from 'astro';
import previewRules from '../../robots.txt?raw';

export const GET: APIRoute = ({ site }) => {
  const body = site
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site)}\n`
    : previewRules;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
