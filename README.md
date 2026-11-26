# Matrox Resources Limited website

This Astro project builds the Matrox website as static files.

## Local development

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
npm run build
```

The dev server prints its local browser address. The production build goes into `dist/`.

## Netlify

Import the `matroxrltd` repository from GitHub and select its `main` branch. The included `netlify.toml` sets the build command to `npm run build` and the publish directory to `dist`. Enable form detection in Netlify before the deploy that should accept enquiries, or enable it and redeploy. Verify a test submission through the deployed website.

Netlify's build URL supplies the default canonical domain. If needed, set `SITE_URL` in Netlify to the final canonical origin and redeploy. The site uses this origin for canonical URLs, the sitemap and crawler metadata.

The company-profile download is `public/downloads/matrox-company-profile.pdf`, a web-optimised copy of the final 25-page profile. See [design.md](design.md) for visual and motion guidance.

Website field photography comes from Bantu Ventures Limited images reproduced in the Matrox company profile. These images illustrate the subject matter and carry their source attribution here.
