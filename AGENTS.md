# Matrox Resources Limited website

## Content and scope

- Use [design.md](design.md) for the website’s brand tokens, layered editorial layouts, page introductions, motion and component patterns.
- This is the website for Matrox Resources Limited, a Lusaka consultancy and research firm serving water utilities, public institutions and development partners. Cover water and sanitation assessments, utility performance, groundwater advisory and community research using the Matrox company profile in `../Company_Profile/` as the starting source.
- Verify client names, assignment roles, results, credentials and contact details before publishing. Keep photo source attribution in the README and identify Bantu Ventures Limited projects accurately wherever described. Describe Matrox's contribution to each assignment only to the extent supported by the source.
- Keep website work in this folder. Before moving any existing workspace files, ask the workspace owner for the exact Bantu website repository path and the paths of any loose image folders. Preserve original media and existing Git metadata.

## SEO

- Give every indexable page a distinct, descriptive title and meta description. Use one main H1 and a logical heading order.
- Use semantic HTML, descriptive internal links, and meaningful alt text for informative images. Use empty alt text for decorative images.
- Add an absolute canonical URL and social sharing metadata using the confirmed production domain. Use structured data only for verified company and page information.
- Before launch, update robots.txt to permit crawling of public pages. Publish a sitemap containing the canonical public URLs and reference it in robots.txt. Replace all llms.txt placeholders with verified content and working links.

## Images

- Use `../../00_Media_Vault/Matrox_Raw/` as the source of truth for original Matrox photos and logos. Put generated website images in `assets/images/` and leave originals untouched.
- Generate WebP from JPEG and PNG sources at quality 82 and a maximum width of 1600 px. Use lowercase, hyphen-separated filenames, preserve aspect ratio, and avoid upscaling. Run the converter from this website folder after installing Pillow with `python -m pip install Pillow`.

  ```powershell
  python "../../00_Media_Vault/convert_to_webp.py" "../../00_Media_Vault/Matrox_Raw" "assets/images"
  ```

- The converter skips existing outputs. For a full refresh, convert into an empty output folder and review differences before replacing website assets.
- Set intrinsic width and height on image elements. Supply responsive image variants when a single size would be unnecessarily heavy on smaller screens.
- Lazy-load below-the-fold images. Load the main above-the-fold image eagerly.

## Performance

- Build with Astro static generation for GitHub-based Netlify continuous deployment. Keep essential content and navigation usable without animation scripts. Respect reduced-motion preferences and use small progressive enhancements for navigation and scroll effects.
- Keep shared styles in `assets/css/` and scripts in `assets/js/`. Defer noncritical scripts and minimize third-party requests.
- Before launch, check navigation, contact links, keyboard access and layout on a narrow viewport. Run Lighthouse on representative pages and review image payloads, Largest Contentful Paint and layout shifts.
