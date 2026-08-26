/* ==========================================================================
   AHMED — ABOUT PAGE JS
   Handles: staggered timeline reveal, animated skill meters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Timeline stagger reveal ---------- */
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (reduceMotion) {
    timelineItems.forEach(item => item.classList.add('in-view'));
  } else {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -80px 0px' });

    timelineItems.forEach(item => timelineObserver.observe(item));
  }

  /* ---------- Skill meters ---------- */
  const skillRows = document.querySelectorAll('.skill-row');

  function animateSkill(row) {
    const fill = row.querySelector('.skill-fill');
    const percentLabel = row.querySelector('.skill-percent');
    const target = parseInt(fill.dataset.fill, 10);

    fill.style.width = target + '%';

    if (reduceMotion) {
      percentLabel.textContent = target + '%';
      return;
    }

    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      percentLabel.textContent = value + '%';
      if (progress < 1) requestAnimationFrame(tick);
      else percentLabel.textContent = target + '%';
    };
    requestAnimationFrame(tick);
  }

  if (reduceMotion) {
    skillRows.forEach(animateSkill);
  } else {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillRows.forEach(row => skillObserver.observe(row));
  }

});
