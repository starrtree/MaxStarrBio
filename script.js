const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const progressBar = document.getElementById('progressBar');
const year = document.getElementById('year');
const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');
const seedModel = document.getElementById('seedModel');

year.textContent = new Date().getFullYear();

function setMenu(open) {
  menuPanel.classList.toggle('open', open);
  menuPanel.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => setMenu(!menuPanel.classList.contains('open')));
menuPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setMenu(false);
});

if (seedModel) {
  seedModel.addEventListener('load', () => seedModel.parentElement.classList.add('model-loaded'));
  seedModel.addEventListener('error', () => seedModel.parentElement.classList.remove('model-loaded'));
}

const reveals = [...document.querySelectorAll('.reveal')];
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
reveals.forEach(el => io.observe(el));

const parallaxItems = [...document.querySelectorAll('.parallax')];
const chapters = [...document.querySelectorAll('.chapter')];

function updateScroll() {
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  const y = scrollY;
  progressBar.style.width = `${maxScroll > 0 ? (y / maxScroll) * 100 : 0}%`;

  if (!reduceMotion) {
    parallaxItems.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = innerHeight / 2;
      const norm = Math.max(-1.2, Math.min(1.2, (center - viewportCenter) / innerHeight));
      const shift = Number(el.dataset.shift || 36);
      el.style.setProperty('--scroll-shift', `${-norm * shift}px`);
      el.style.translate = `0 ${-norm * shift}px`;
    });
  }

  chapters.forEach(ch => {
    const r = ch.getBoundingClientRect();
    if (r.top < innerHeight * .55 && r.bottom > innerHeight * .35) {
      document.body.dataset.chapter = ch.dataset.chapter || '';
    }
  });
}

let raf = 0;
addEventListener('scroll', () => {
  if (raf) return;
  raf = requestAnimationFrame(() => { updateScroll(); raf = 0; });
}, { passive: true });
addEventListener('resize', updateScroll);
updateScroll();

const heroCard = document.querySelector('.hero-card');
const heroMax = document.querySelector('.hero-max');
const heroOrb = document.querySelector('.hero-orb');
if (heroCard && !reduceMotion && matchMedia('(pointer:fine)').matches) {
  heroCard.addEventListener('pointermove', e => {
    const r = heroCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    heroOrb.style.transform = `translate(${x * -18}px, ${y * -12}px)`;
    heroMax.style.marginRight = `${x * 8}px`;
  });
  heroCard.addEventListener('pointerleave', () => {
    heroOrb.style.transform = '';
    heroMax.style.marginRight = '';
  });
}
