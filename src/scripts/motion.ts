const header = document.querySelector<HTMLElement>('[data-header]');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)');
const wideScreen = window.matchMedia('(min-width: 50rem)');

if (hero && header) {
  let frame = 0;
  let heroOnScreen = true;
  const updateHero = () => {
    frame = 0;
    const bounds = hero.getBoundingClientRect();
    header.toggleAttribute('data-overlay', bounds.bottom > header.offsetHeight + 24);
    if (motionAllowed.matches && wideScreen.matches && bounds.bottom > 0) {
      const shift = Math.min(24, Math.max(0, -bounds.top) * 0.05);
      hero.style.setProperty('--hero-shift', `${shift}px`);
    } else {
      hero.style.removeProperty('--hero-shift');
    }
  };
  const scheduleHero = () => { if (!frame) frame = window.requestAnimationFrame(updateHero); };
  updateHero();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroOnScreen = entry.isIntersecting;
      scheduleHero();
    }).observe(hero);
  }
  window.addEventListener('scroll', () => { if (heroOnScreen) scheduleHero(); }, { passive: true });
  window.addEventListener('resize', scheduleHero, { passive: true });
  motionAllowed.addEventListener('change', scheduleHero);
}

const scrollText = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main p, .site-footer p'))
  .filter(element => !element.closest('.enquiry-panel, [hidden]'));
scrollText.forEach(element => element.setAttribute('data-scroll-text', ''));

const nativeScrollMotion = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
if (!nativeScrollMotion && 'IntersectionObserver' in window) {
  const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]'), ...scrollText];
  const nearby = new Set<HTMLElement>();
  const appliedY = new WeakMap<HTMLElement, number>();
  const stagger = new WeakMap<Element, number>();
  document.querySelectorAll('[data-stagger]').forEach(group => {
    Array.from(group.children).forEach((item, index) => stagger.set(item, Math.min(index, 3) * 12));
  });
  let frame = 0;

  const updateSections = () => {
    frame = 0;
    if (!motionAllowed.matches) return;
    const viewport = document.documentElement.clientHeight;
    const updates = Array.from(nearby, element => {
      const bounds = element.getBoundingClientRect();
      const isText = element.hasAttribute('data-scroll-text');
      const layer = isText ? element.parentElement?.closest<HTMLElement>('[data-reveal]') : null;
      const layerOffset = layer && !layer.matches(':focus-within') ? (appliedY.get(layer) ?? 0) : 0;
      const offset = element.matches(':focus-within') ? 0 : (appliedY.get(element) ?? 0);
      const displacement = layerOffset + offset;
      const travel = isText ? Math.max(65, Math.min(110, bounds.height)) : Math.max(68, Math.min(160, bounds.height * .65));
      const distance = Math.min(bounds.bottom - displacement, viewport - bounds.top + displacement);
      const groupOffset = stagger.get(element) ?? (layer ? stagger.get(layer) : undefined) ?? 0;
      const textOffset = isText && element.tagName === 'P' ? 7 : 0;
      const progress = Math.max(0, Math.min(1, (distance - groupOffset - textOffset) / travel));
      const eased = progress * progress * (3 - 2 * progress);
      const remaining = 1 - eased;
      const kind = element.dataset.reveal;
      const side = element.closest('.image-left') ? -1 : 1;
      const amplitude = kind === 'panel' ? -40 : kind === 'photo' ? 48 : 0;
      const horizontal = wideScreen.matches ? amplitude * side : 0;
      const vertical = isText ? (wideScreen.matches ? 34 : 24) : kind === 'photo' ? 31 : kind === 'panel' ? 28 : 0;
      const y = vertical * remaining;
      return { element, eased, x: horizontal * remaining, y };
    });
    for (const { element, eased, x, y } of updates) {
      appliedY.set(element, y);
      element.style.setProperty('--scroll-x', `${x.toFixed(3)}px`);
      element.style.setProperty('--scroll-y', `${y.toFixed(3)}px`);
      element.style.setProperty('--scroll-progress', eased.toFixed(4));
    }
  };
  const scheduleSections = () => {
    if (!frame && nearby.size && motionAllowed.matches) frame = window.requestAnimationFrame(updateSections);
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) nearby.add(element);
      else nearby.delete(element);
    }
    scheduleSections();
  }, { rootMargin: '160px 0px' });

  const setMotion = () => {
    if (motionAllowed.matches) {
      targets.forEach(element => observer.observe(element));
      scheduleSections();
      return;
    }
    observer.disconnect();
    nearby.clear();
    for (const element of targets) {
      appliedY.delete(element);
      ['--scroll-x', '--scroll-y', '--scroll-progress'].forEach(variable => element.style.removeProperty(variable));
    }
  };
  setMotion();
  motionAllowed.addEventListener('change', setMotion);
  window.addEventListener('scroll', scheduleSections, { passive: true });
  window.addEventListener('resize', scheduleSections, { passive: true });
}

const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-nav');
mobileMenu?.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.open) {
    mobileMenu.open = false;
    mobileMenu.querySelector('summary')?.focus();
  }
});
