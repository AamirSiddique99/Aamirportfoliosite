/* ==========================================================================
   AHMED — VIDEO EDITOR PORTFOLIO — MAIN JS
   Handles: nav state, scroll reveals, counters, testimonial slider, marquee
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.classList.toggle('active', open);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ---------- Scroll reveal (sections + hero) ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll('.reveal-section, .reveal-photo');
  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('in-view'));
    document.querySelector('.hero')?.classList.add('in-view');
    document.querySelector('.page-hero')?.classList.add('in-view');
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));

    // Hero / page-hero animate in immediately on load rather than on scroll
    window.requestAnimationFrame(() => {
      document.querySelector('.hero')?.classList.add('in-view');
      document.querySelector('.page-hero')?.classList.add('in-view');
    });
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  if (reduceMotion) {
    counters.forEach(el => {
      const target = parseFloat(el.dataset.countTo);
      const decimals = parseInt(el.dataset.decimal || '0', 10);
      el.textContent = target.toFixed(decimals) + (el.dataset.suffix || '');
    });
  } else {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  if (track) {
    const slides = track.children;
    const count = slides.length;
    let index = 0;
    let autoTimer;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.querySelectorAll('.testi-dot');

    function goTo(i) {
      index = (i + count) % count;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
      resetAuto();
    }

    function resetAuto() {
      clearInterval(autoTimer);
      if (!reduceMotion) autoTimer = setInterval(() => goTo(index + 1), 6000);
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    resetAuto();
  }

});
