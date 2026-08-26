/* ==========================================================================
   AHMED — SERVICES PAGE JS
   Handles: staggered reveal of service cards on scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.service-detail-card');

  if (reduceMotion) {
    cards.forEach(card => card.classList.add('in-view'));
    return;
  }

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = Array.from(cards).indexOf(card);
        card.style.animationDelay = `${(index % 2) * 0.12}s`;
        card.classList.add('in-view');
        cardObserver.unobserve(card);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(card => cardObserver.observe(card));

});
