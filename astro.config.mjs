import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || process.env.URL || undefined,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
