/* ==========================================================================
   AHMED — AWARDS PAGE JS
   Handles: individual staggered reveal of each achievement on scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.award-item');

  if (reduceMotion) {
    items.forEach(item => item.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -70px 0px' });

  items.forEach(item => observer.observe(item));

});
