import type { APIRoute } from 'astro';
import profile from '../../llms.txt?raw';

export const GET: APIRoute = ({ site }) => {
  const content = site ? profile.replace(/\]\((\/[^)]*)\)/g, (_, path) => `](${new URL(path, site)})`) : profile;
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
