/* ==========================================================================
   AHMED PORTFOLIO — RENDER ENGINE
   Reads AhmedStore.getContent() and fills in every page. Runs before
   main.js and any page-specific script, so by the time those attach their
   scroll/hover/observer logic, the real (possibly edited) content and
   dynamic lists already exist in the DOM.
   ========================================================================== */

(function (global) {

  function getPath(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  /* Generic attribute binder — works identically on every page.
     data-bind="path"       -> textContent
     data-bind-src="path"   -> img src
     data-bind-href="path"  -> a href
  */
  function bindGlobal(content, root) {
    root = root || document;

    root.querySelectorAll('[data-bind]').forEach(function (el) {
      var val = getPath(content, el.getAttribute('data-bind'));
      if (val !== undefined) el.textContent = val;
    });

    root.querySelectorAll('[data-bind-src]').forEach(function (el) {
      var val = getPath(content, el.getAttribute('data-bind-src'));
      if (val !== undefined) el.src = val;
    });

    root.querySelectorAll('[data-bind-href]').forEach(function (el) {
      var val = getPath(content, el.getAttribute('data-bind-href'));
      if (val !== undefined) el.href = val;
    });

    root.querySelectorAll('[data-bind-mailto]').forEach(function (el) {
      var val = getPath(content, el.getAttribute('data-bind-mailto'));
      if (val !== undefined) {
        el.href = 'mailto:' + val;
        el.textContent = val;
      }
    });
  }

  var PLAY_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5l12 7-12 7z"/></svg>';

  function workItemHTML(p) {
    return (
      '<a href="portfolio.html" class="work-item">' +
        '<div class="work-thumb">' +
          '<img src="' + p.img + '" alt="' + escapeAttr(p.title) + ' project thumbnail" loading="lazy">' +
          '<span class="work-play">' + PLAY_ICON + '</span>' +
        '</div>' +
        '<div class="work-meta"><span>' + escapeHtml(p.title) + '</span><em>' + categoryLabel(p.cat) + '</em></div>' +
      '</a>'
    );
  }

  function categoryLabel(cat) {
    return cat === 'youtube' ? 'YouTube Long-Form'
      : cat === 'shortform' ? 'Short-Form Reels'
      : cat === 'colorsound' ? 'Color Grading & Sound Design'
      : 'Project';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : str;
    return div.innerHTML;
  }
  function escapeAttr(str) { return escapeHtml(str).replace(/"/g, '&quot;'); }

  /* ---------- Home page ---------- */
  function renderHome(content) {
    bindGlobal(content);

    var name = document.getElementById('heroNameText');
    if (name) name.textContent = content.home.name;

    var eyebrow = document.getElementById('heroEyebrowText');
    if (eyebrow) eyebrow.textContent = content.home.eyebrow;

    var tagPrefix = document.getElementById('heroTaglinePrefix');
    if (tagPrefix) tagPrefix.textContent = content.home.taglinePrefix + ' ';

    var tagHighlight = document.getElementById('heroTaglineHighlight');
    if (tagHighlight) tagHighlight.textContent = content.home.taglineHighlight;

    var sub = document.getElementById('heroSubText');
    if (sub) sub.textContent = content.home.sub;

    var statMap = {
      statVideos: { val: content.home.stats.videos, suffix: '+' },
      statClients: { val: content.home.stats.clients, suffix: '+' },
      statYears: { val: content.home.stats.years, suffix: '+' },
      statRating: { val: content.home.stats.rating, decimal: 1 }
    };
    Object.keys(statMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('data-count-to', statMap[id].val);
      if (statMap[id].suffix) el.setAttribute('data-suffix', statMap[id].suffix);
      if (statMap[id].decimal) el.setAttribute('data-decimal', statMap[id].decimal);
    });

    var grid = document.getElementById('featuredWorkGrid');
    if (grid) {
      var featured = content.portfolio.projects.slice(0, 6);
      grid.innerHTML = featured.map(workItemHTML).join('');
    }

    var badgeRating = document.getElementById('heroBadgeRatingText');
    if (badgeRating) badgeRating.textContent = content.home.stats.rating + ' average rating';
  }

  /* ---------- Portfolio page ---------- */
  function projectCardHTML(p) {
    return (
      '<button class="project-card" data-cat="' + p.cat + '" ' +
        'data-title="' + escapeAttr(p.title) + '" ' +
        'data-desc="' + escapeAttr(p.desc) + '" ' +
        'data-img="' + escapeAttr(p.img) + '" ' +
        'data-tag="' + escapeAttr(categoryLabel(p.cat)) + '">' +
        '<div class="card-thumb"><img src="' + escapeAttr(p.img) + '" alt="' + escapeAttr(p.title) + ' thumbnail" loading="lazy"></div>' +
        '<div class="card-body"><h3>' + escapeHtml(p.title) + '</h3><p>' + escapeHtml(p.desc) + '</p></div>' +
      '</button>'
    );
  }

  function renderPortfolioPage(content) {
    bindGlobal(content);
    var grid = document.getElementById('portfolioGrid');
    if (grid) {
      grid.innerHTML = content.portfolio.projects.map(projectCardHTML).join('');
    }
  }

  /* ---------- Services page ---------- */
  function serviceCardHTML(s) {
    return (
      '<div class="service-detail-card">' +
        '<div class="frame-corner tl mini" aria-hidden="true"></div>' +
        '<div class="frame-corner br mini" aria-hidden="true"></div>' +
        '<span class="service-icon lg">' + AhmedIcons.serviceIcon(s.icon, 30) + '</span>' +
        '<h3>' + escapeHtml(s.title) + '</h3>' +
        '<p>' + escapeHtml(s.desc) + '</p>' +
        '<div class="service-price">' +
          '<span class="price-from">Starting at</span>' +
          '<span class="price-amount">$' + escapeHtml(s.price) + '</span>' +
          '<span class="price-unit">' + escapeHtml(s.unit) + '</span>' +
        '</div>' +
        '<a href="contact.html" class="service-link">Get Started' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</a>' +
      '</div>'
    );
  }

  function renderServicesPage(content) {
    bindGlobal(content);
    var grid = document.getElementById('servicesDetailGrid');
    if (grid) {
      grid.innerHTML = content.servicesPage.list.map(serviceCardHTML).join('');
    }
  }

  /* ---------- Awards page ---------- */
  function awardItemHTML(a) {
    return (
      '<div class="award-item">' +
        '<div class="award-connector" aria-hidden="true"></div>' +
        '<div class="award-icon-wrap" aria-hidden="true">' +
          '<div class="frame-corner tl mini" aria-hidden="true"></div>' +
          '<div class="frame-corner br mini" aria-hidden="true"></div>' +
          AhmedIcons.awardIcon(a.icon, 26) +
        '</div>' +
        '<div class="award-card">' +
          '<span class="award-year">' + escapeHtml(a.year) + '</span>' +
          '<h3>' + escapeHtml(a.title) + '</h3>' +
          '<span class="award-giver">' + escapeHtml(a.giver) + '</span>' +
          '<p>' + escapeHtml(a.desc) + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAwardsPage(content) {
    bindGlobal(content);
    var wrap = document.getElementById('awardsTimeline');
    if (wrap) {
      wrap.innerHTML = content.awardsPage.list.map(awardItemHTML).join('');
    }
  }

  /* ---------- About page ---------- */
  function renderAboutPage(content) {
    bindGlobal(content);
  }

  /* ---------- Contact page ---------- */
  function renderContactPage(content) {
    bindGlobal(content);
  }

  /* ---------- Footer / nav (every page) ---------- */
  function renderChrome(content) {
    bindGlobal(content);
  }

  global.AhmedRender = {
    bindGlobal: bindGlobal,
    renderHome: renderHome,
    renderPortfolioPage: renderPortfolioPage,
    renderServicesPage: renderServicesPage,
    renderAwardsPage: renderAwardsPage,
    renderAboutPage: renderAboutPage,
    renderContactPage: renderContactPage,
    renderChrome: renderChrome
  };

})(window);
