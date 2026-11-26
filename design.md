# Matrox website design system

Use this reference for the Matrox Resources Limited website. Carry the company profile’s navy editorial panels, orange-coral rules, warm paper backgrounds and field photography into modern, responsive Astro layouts.

## Profile references

- Pages 2, 3, 5, 6 and 7 are the primary visual references. Page 2 pairs a tall photograph with an overlapping navy panel. Page 3 uses off-white space and a navy edge accent to establish hierarchy. Pages 5–7 combine service descriptions with offset photographs and switch the composition between left and right. Apply those relationships to a responsive grid with room for real website copy. [Final company profile](../Company_Profile/Company-Profile-Matrox-Resources-Limited-final.pdf)
- [Editable company profile](../Company_Profile/data/Matrox-Resources-Limited-Company-Profile-Revised.pptx). Use it to check authored colour and type values. Use the final PDF for page sequence and visual reference.
- [Logo exports](../Company_Profile/Logo-assets/). The foreground colours of the transparent horizontal logos match the profile’s navy, coral and white.
- Use the AM-Team homepage as a secondary reference for a full-screen photographic hero, readable gradient overlays, adaptive sticky navigation, generous spacing and smooth interactions. Use the Matrox profile to guide the identity and layouts across the site. [AM-Team homepage](https://www.am-team.com/)

## Brand tokens

The website uses the profile palette with `#F4F1EC` as the approved off-white. The profile’s original paper colour is `#F5F2ED`.

| CSS token | Value | Website use |
| --- | --- | --- |
| `--matrox-navy` | `#123253` | Page headings, primary buttons, hero and footer |
| `--matrox-coral` | `#F26B43` | Short rules, small graphic accents and logo detail |
| `--matrox-paper` | `#F4F1EC` | Off-white background for alternating sections |
| `--matrox-white` | `#FFFFFF` | Pure white for the main reading surface and text on navy |
| `--matrox-ink` | `#203348` | Body copy on light surfaces |
| `--matrox-slate` | `#506076` | Captions and secondary copy on light surfaces |
| `--matrox-line` | `#D7DFE6` | Decorative dividers and card borders |
| `--matrox-steel` | `#7D9CBD` | Secondary graphics and lines on navy |
| `--matrox-mist` | `#A7BDD0` | Secondary text or icons on navy |
| `--matrox-font-heading` | `Montserrat, Arial, sans-serif` | Montserrat for website headings and navigation. Use 600 for navigation and 700 for headings. |
| `--matrox-font-sans` | `Arial, "Helvetica Neue", Helvetica, sans-serif` | Arial for body copy, captions and form fields. |

## Website tokens and behaviour

These values adapt the profile to screens. Put the shared custom properties in `assets/css/tokens.css` when implementing the site. Use the role tokens in component styles so the colours can be adjusted in one place.

```css
:root {
  --matrox-navy: #123253;
  --matrox-coral: #F26B43;
  --matrox-paper: #F4F1EC;
  --matrox-white: #FFFFFF;
  --matrox-ink: #203348;
  --matrox-slate: #506076;
  --matrox-line: #D7DFE6;
  --matrox-steel: #7D9CBD;
  --matrox-mist: #A7BDD0;
  --matrox-font-heading: Montserrat, Arial, sans-serif;
  --matrox-font-sans: Arial, "Helvetica Neue", Helvetica, sans-serif;

  --surface: var(--matrox-white);
  --surface-alt: var(--matrox-paper);
  --surface-inverse: var(--matrox-navy);
  --text: var(--matrox-ink);
  --text-muted: var(--matrox-slate);
  --heading: var(--matrox-navy);
  --text-inverse: var(--matrox-white);
  --accent: var(--matrox-coral);
  --link: var(--matrox-navy);
  --link-hover: #B54222;
  --action: var(--matrox-navy);
  --action-hover: #0C263F;
  --action-text: var(--matrox-white);
  --border-subtle: var(--matrox-line);
  --border-control: #718399;
  --focus: var(--matrox-navy);
  --focus-inverse: var(--matrox-white);

  --font-h1: clamp(2.25rem, 1.6rem + 2.8vw, 4.25rem);
  --font-h2: clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem);
  --font-h3: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --font-lead: clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem);
  --font-body: 1rem;
  --font-small: 0.875rem;
  --leading-heading: 1.12;
  --leading-body: 1.6;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --section-space: clamp(3.5rem, 6vw, 6rem);
  --container-gutter: clamp(1rem, 4vw, 3rem);
  --container-max: 75rem;
  --prose-max: 65ch;
  --radius-control: 0;
  --radius-panel: 0;
  --editorial-overlap: clamp(2rem, 5vw, 6rem);
  --editorial-offset: clamp(1rem, 4vw, 4rem);
  --rule-width: 2.5rem;
  --rule-height: 0.1875rem;
  --control-min-size: 2.75rem;
  --focus-width: 0.125rem;
  --focus-offset: 0.1875rem;
}
```

- Use bold sentence-case headings. Self-host Montserrat as WOFF2 with `font-display: swap`, and keep Arial as the fallback. Use the small size for captions and metadata. Body copy starts at 16 px at the default browser size.
- Begin with one column. Introduce staggered two-column layouts around `48rem` where the content fits. Use a three-column project listing from `64rem` if titles and images have enough room. Let layouts stack or wrap naturally at higher zoom levels.
- White on navy has 13.07:1 contrast. Slate on off-white has 5.69:1. The dark coral hover colour has 5.57:1 on white and 4.95:1 on off-white. Use brand coral for decorative rules on light surfaces. White on brand coral measures 3.02:1 and navy on brand coral measures 4.33:1, so give buttons a navy fill with a white label.
- Underline inline links. Use a visible offset focus ring in navy on light backgrounds and white on navy. Use the stronger control border for form fields. Keep primary controls at least 44 px high at the default browser size and respect `prefers-reduced-motion`.

## Website patterns

| Pattern | Treatment |
| --- | --- |
| Header and navigation | Keep a sticky header with a consistent height. Start transparent over the Overview hero with the reversed logo and white links. Switch to a solid white background with the navy logo and navy links as the hero leaves the header. Use the solid state on light introductions and for the open mobile menu. Mark the current page and label the menu control. |
| Homepage hero | Use an edge-to-edge field photograph with a navy gradient behind the copy and navigation. Set a prominent white heading, supporting text and a clear primary action. Use `min-height` with a `100svh` target so the hero can grow with its content. |
| Services | Lead with a staggered photo and navy content panel. Alternate alignment for featured services and use sharp, bordered sections for compact summaries. On detail pages, describe the scope and typical deliverable. |
| Projects | Use a landscape thumbnail, descriptive title and verified client or location. Structure detail pages around the assignment purpose, what Matrox assessed and what the findings informed. Track source attribution in the README and identify any Bantu assignment explicitly in the project copy. |
| Credentials | Present verified credentials as a compact list or grid with the issuer name and scope. Verify current status and permission before publishing marks. |
| Contact and footer | Place the contact details on white and put the enquiry form in a bordered navy panel with white labels and light fields. Give the form fields and coral submit button matching `0.375rem` corners. Use deep navy for the submit label. Use a `tel:` link for Call and a `wa.me` link for WhatsApp. Use the reversed logo and white type in the navy footer. |

### Layered editorial sections

- Build one reusable Astro component for Overview, Services, Our Experience and About Us. Give it slots for the heading, copy, action and image or caption. Support left and right image placement and two vertical offsets. Keep the semantic reading order consistent when the visual placement changes.
- On wide screens, let a large navy rectangle overlap the edge of the photo using shared CSS Grid tracks. Stagger the top edges and vary which element leads the section. Use white type inside the panel and reserve full-width copy for descriptions that need more room.
- Alternate white and off-white section backgrounds. Use short orange-coral rules, fine diagonal lines and simple geometry drawn from the profile. Keep decorative graphics outside reading areas. Use sharp corners and let overlap, scale and negative space create depth.
- On narrow screens, stack the copy and photograph in reading order. Use a small inset or short offset between them where space allows. Keep captions with their images and protect comfortable panel padding at narrow widths and high zoom.

### Page introductions

| Page | Composition and entrance |
| --- | --- |
| Overview | Full-screen photographic hero. Ease the image into view and reveal the heading, supporting copy and primary action in that order. |
| Services | Medium-height introduction with a left-aligned navy panel overlapping a right-hand field photograph. Reveal the panel and photo independently. |
| Our Experience | Medium-height introduction with the photograph leading on the left and a right-positioned panel. Reveal the image early, then introduce the title and project context. |
| About Us | Medium-height off-white introduction with a navy content panel and a vertically offset photograph. Reveal the heading and orange-coral rule with a short delay before the image. |
| Contact Us | Compact introduction with a short fade and minimal movement. Place contact details and the enquiry form immediately after it, with neither dependent on a reveal. |

## Motion and interactions

Use motion to show the relationship between the photograph, panel and text. Tie scroll reveals to the section's position within the viewport. The elements ease into place as they move into view and rewind as they approach either edge, in either scroll direction.

| Motion | Starting values and behaviour |
| --- | --- |
| Hero entrance | `550–750ms` for the photograph to settle from about `scale(1.035)`. Fade and raise copy by `12–16px` over about `400ms`, with `60–90ms` between the heading, support and action. Keep the hero readable from the first paint. |
| Hero scroll | Use image-only parallax, capped at about `24px` on wide screens. Clip the moving image within its own frame and stop updates when the hero is out of view. Keep mobile movement small or omit it where space is tight. |
| Navigation | Transition background and link colours over `180–240ms`. Crossfade the logo versions in a shared, fixed-size slot. Use a hero boundary observer to switch state and preserve readable contrast throughout. |
| Section reveal | Derive reveal progress from how far the section has travelled into the viewport. Ease the motion near both ends and use distinct, small offsets for the panel and photo. Use vertical movement in stacked layouts. Stagger related items by a small amount of scroll distance. |
| Text reveal | Reveal each heading and paragraph as a whole with a short upward movement and fade tied to its own distance from the viewport edge. Reverse the reveal when it moves away. Keep list dividers, navigation and form controls steady. |
| Accent rule | Grow the rule from its leading edge using the parent section’s reveal progress. |
| Page navigation | Use a `160–220ms` same-origin crossfade with subtle movement if it suits the page. Keep branding and navigation visually stable. Enable native cross-document transitions for supported browsers and allow ordinary link navigation everywhere. [Astro view transitions](https://docs.astro.build/en/guides/view-transitions/) |

- Use one shared `IntersectionObserver` to track nearby reveal targets. Use a passive scroll listener and `requestAnimationFrame` to update their transforms and opacity. Keep content visible in the generated HTML and keep focused elements visible during keyboard and deep-link navigation.
- Keep natural scrolling, link behaviour and browser history. Use transform and opacity for moving layers and reserve image dimensions and header space in advance. If parallax needs a script, schedule its updates with `requestAnimationFrame` while the image is in view.
- Under `prefers-reduced-motion: reduce`, show content in its final position, switch navigation states immediately and disable parallax, staggered reveals and page transitions. Keep scripts optional for reading the content and accessing navigation and contact details.
- Use shared Astro layouts and static generation. Keep the motion code small and framework-free, and preserve compatibility with GitHub-based Netlify continuous deployment. Before launch, check desktop and mobile, keyboard navigation, reduced motion, JavaScript disabled, direct links and Back/Forward navigation. Verify that the image movement causes no horizontal overflow or clipped content. [Astro’s Netlify deployment guide](https://docs.astro.build/en/guides/deploy/netlify/)

## Logo and photography

- Use `Matrox-Full-Logo-Horizontal.png` on light surfaces and `Matrox-Full-Logo-Horizontal-for-Navy.png` on navy. Use the stacked export where the available area is compact. Reserve the navy or white M emblem for small brand placements such as the favicon. Preserve the supplied artwork and aspect ratio.
- Use approved field imagery showing water infrastructure, fieldwork and community settings. Plan for a `3:2` crop on listing cards and preserve useful context in project galleries. Record Bantu photography attribution in the README. Follow [AGENTS.md](AGENTS.md) for the WebP workflow, intrinsic dimensions, responsive variants and loading behaviour.

## Component library

Use **Web Awesome Core** for interactive components when needed. Its framework-independent web components can be used in Astro’s statically generated pages. Start with the free Default theme and apply the Matrox tokens through the library’s CSS custom properties and component parts. Load only the modules the page needs.

Use `wa-drawer` for a mobile menu if the site needs an off-canvas panel, and `wa-input` and `wa-textarea` if the site uses a contact form. Keep navigation links, headings, project cards and other editorial content in semantic HTML. Verify keyboard operation, focus return and contrast after theming.

- [Web Awesome installation and individual imports](https://webawesome.com/docs/)
- [Web Awesome theming and customisation](https://webawesome.com/docs/customizing/)
