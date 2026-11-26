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

if (motionAllowed.matches && 'IntersectionObserver' in window) {
  document.querySelectorAll('[data-stagger]').forEach(group => {
    Array.from(group.children).forEach((item, index) => {
      if (item instanceof HTMLElement) item.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 48}ms`);
    });
  });
  const ready = new WeakSet<Element>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const { target, isIntersecting } = entry;
      if (!isIntersecting) {
        target.classList.add('has-left-view');
        target.classList.remove('is-revealed');
        ready.add(target);
      } else if (ready.delete(target)) {
        target.classList.add('is-revealed');
      }
    }
  }, { rootMargin: '32px 0px', threshold: 0 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}

const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-nav');
mobileMenu?.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.open) {
    mobileMenu.open = false;
    mobileMenu.querySelector('summary')?.focus();
  }
});
