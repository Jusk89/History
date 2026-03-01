// Dark mode toggle
const themeBtn = document.querySelector('[data-theme-toggle]');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const cur = html.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
}

// Reading progress (article page)
const progress = document.querySelector('.progress');
if (progress) {
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = pct.toFixed(2) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// TOC highlighting (article page)
const tocLinks = document.querySelectorAll('[data-toc] a');
const sections = [...document.querySelectorAll('[data-section]')];

if (tocLinks.length && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 });

  sections.forEach(s => observer.observe(s));
}

// Font size controls (article page)
let fontSize = Number(localStorage.getItem('fontSize') || 19);
const prose = document.querySelector('.prose');
const applyFont = () => {
  if (!prose) return;
  prose.style.fontSize = fontSize + 'px';
  localStorage.setItem('fontSize', String(fontSize));
};
applyFont();

document.querySelector('[data-font-minus]')?.addEventListener('click', () => {
  fontSize = Math.max(16, fontSize - 1);
  applyFont();
});
document.querySelector('[data-font-plus]')?.addEventListener('click', () => {
  fontSize = Math.min(24, fontSize + 1);
  applyFont();
});