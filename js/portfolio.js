/* ==========================================================================
   AHMED — PORTFOLIO PAGE JS
   Handles: filter tabs, staggered card reveal, lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tabs = document.querySelectorAll('.filter-tab');
  const highlight = document.getElementById('tabHighlight');
  const grid = document.getElementById('portfolioGrid');
  const cards = Array.from(document.querySelectorAll('.project-card'));

  let currentFilter = tabs[0]?.dataset.filter;

  /* ---------- Move the pill highlight under a tab ---------- */
  function positionHighlight(tab) {
    if (!tab || !highlight) return;
    highlight.style.width = tab.offsetWidth + 'px';
    highlight.style.transform = `translateX(${tab.offsetLeft - 6}px)`;
  }

  /* ---------- Show cards for a category with stagger ---------- */
  function applyFilter(filter, animate = true) {
    currentFilter = filter;
    let visibleIndex = 0;

    cards.forEach(card => {
      const matches = card.dataset.cat === filter;

      if (matches) {
        card.classList.remove('card-hide');
        card.classList.remove('card-in');
        // force reflow so the animation can replay
        void card.offsetWidth;

        if (reduceMotion || !animate) {
          card.style.opacity = '1';
          card.style.transform = 'none';
        } else {
          card.style.animationDelay = `${visibleIndex * 0.07}s`;
          card.classList.add('card-in');
        }
        visibleIndex++;
      } else {
        card.classList.add('card-hide');
        card.classList.remove('card-in');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      positionHighlight(tab);
      applyFilter(tab.dataset.filter);
    });
  });

  // Initial state
  window.requestAnimationFrame(() => {
    positionHighlight(document.querySelector('.filter-tab.active'));
    applyFilter(currentFilter);
  });
  window.addEventListener('resize', () => positionHighlight(document.querySelector('.filter-tab.active')));

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  let lastFocused = null;

  function openLightbox(card) {
    lightboxImg.src = card.dataset.img;
    lightboxImg.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightboxDesc.textContent = card.dataset.desc;
    lightboxTag.textContent = card.dataset.tag;
    lastFocused = document.activeElement;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

});
