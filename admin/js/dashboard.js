/* ==========================================================================
   AHMED PORTFOLIO — ADMIN DASHBOARD CONTROLLER
   Reads/writes AhmedStore. Every "Save" button here calls
   AhmedStore.saveContent(...) which writes straight to localStorage —
   the same storage every public page reads from, so changes are live
   the moment you save.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var content = AhmedStore.getContent();

  // Working copies for the CRUD lists (arrays are saved wholesale on "Save All")
  var portfolioProjects = JSON.parse(JSON.stringify(content.portfolio.projects));
  var servicesList = JSON.parse(JSON.stringify(content.servicesPage.list));
  var awardsList = JSON.parse(JSON.stringify(content.awardsPage.list));

  /* ---------------------------------------------------------------------
     TOAST
  --------------------------------------------------------------------- */
  var toast = document.getElementById('adminToast');
  var toastText = document.getElementById('adminToastText');
  var toastTimer;
  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  /* ---------------------------------------------------------------------
     NAVIGATION
  --------------------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.side-nav a[data-target]');
  var panels = document.querySelectorAll('.admin-panel');
  var sidebar = document.getElementById('adminSidebar');

  function showPanel(id) {
    panels.forEach(function (p) { p.classList.toggle('active', p.id === id); });
    navLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-target') === id); });
    sidebar.classList.remove('open');
    document.getElementById('sidebarBackdrop').classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { showPanel(link.getAttribute('data-target')); });
  });
  document.querySelectorAll('[data-jump]').forEach(function (btn) {
    btn.addEventListener('click', function () { showPanel(btn.getAttribute('data-jump')); });
  });

  var mobileToggle = document.getElementById('mobileSidebarToggle');
  var sidebarBackdrop = document.getElementById('sidebarBackdrop');
  function toggleSidebar(open) {
    var isOpen = open !== undefined ? open : !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', isOpen);
    sidebarBackdrop.classList.toggle('show', isOpen);
  }
  if (mobileToggle) mobileToggle.addEventListener('click', function () { toggleSidebar(); });
  sidebarBackdrop.addEventListener('click', function () { toggleSidebar(false); });

  document.getElementById('logoutBtn').addEventListener('click', function () {
    AhmedStore.logout();
    window.location.href = 'index.html';
  });

  /* ---------------------------------------------------------------------
     IMAGE UPLOAD HELPER
  --------------------------------------------------------------------- */
  function readImageAsDataURL(file, callback) {
    if (!file) return;
    if (file.size > 1.8 * 1024 * 1024) {
      alert('That image is quite large (' + Math.round(file.size / 1024) + 'KB). For best results and to avoid running out of browser storage, use an image under ~800KB. Continuing anyway...');
    }
    var reader = new FileReader();
    reader.onload = function (e) { callback(e.target.result); };
    reader.readAsDataURL(file);
  }

  /* =======================================================================
     HOME PAGE
  ======================================================================= */
  document.getElementById('homeEyebrow').value = content.home.eyebrow;
  document.getElementById('homeName').value = content.home.name;
  document.getElementById('homeTaglinePrefix').value = content.home.taglinePrefix;
  document.getElementById('homeTaglineHighlight').value = content.home.taglineHighlight;
  document.getElementById('homeSub').value = content.home.sub;
  document.getElementById('homePhotoPreview').src = content.site.headshot;

  var pendingHeadshot = null;
  document.getElementById('homePhotoInput').addEventListener('change', function (e) {
    readImageAsDataURL(e.target.files[0], function (dataUrl) {
      pendingHeadshot = dataUrl;
      document.getElementById('homePhotoPreview').src = dataUrl;
    });
  });

  document.getElementById('saveHomeBtn').addEventListener('click', function () {
    var patch = {
      home: {
        eyebrow: document.getElementById('homeEyebrow').value.trim(),
        name: document.getElementById('homeName').value.trim(),
        taglinePrefix: document.getElementById('homeTaglinePrefix').value.trim(),
        taglineHighlight: document.getElementById('homeTaglineHighlight').value.trim(),
        sub: document.getElementById('homeSub').value.trim()
      }
    };
    if (pendingHeadshot) patch.site = { headshot: pendingHeadshot };
    if (AhmedStore.saveContent(patch)) showToast('Hero section saved — live now.');
    else showToast('Save failed — see console.');
  });

  document.getElementById('statVideosInput').value = content.home.stats.videos;
  document.getElementById('statClientsInput').value = content.home.stats.clients;
  document.getElementById('statYearsInput').value = content.home.stats.years;
  document.getElementById('statRatingInput').value = content.home.stats.rating;

  document.getElementById('saveStatsBtn').addEventListener('click', function () {
    var patch = {
      home: {
        stats: {
          videos: Number(document.getElementById('statVideosInput').value) || 0,
          clients: Number(document.getElementById('statClientsInput').value) || 0,
          years: Number(document.getElementById('statYearsInput').value) || 0,
          rating: Number(document.getElementById('statRatingInput').value) || 0
        }
      }
    };
    if (AhmedStore.saveContent(patch)) showToast('Stats saved — live now.');
  });

  /* =======================================================================
     PORTFOLIO PROJECTS
  ======================================================================= */
  var portfolioListEl = document.getElementById('portfolioList');
  var CATEGORY_LABELS = { youtube: 'YouTube Long-Form', shortform: 'Short-Form Reels', colorsound: 'Color Grading & Sound Design' };

  function renderPortfolioList() {
    portfolioListEl.innerHTML = portfolioProjects.map(function (p, i) {
      return (
        '<div class="repeat-item" data-index="' + i + '">' +
          '<div class="repeat-item-head">' +
            '<span class="repeat-item-title">Project ' + (i + 1) + '</span>' +
            '<button type="button" class="repeat-remove-btn" data-remove-project="' + i + '">' +
              '<svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Remove' +
            '</button>' +
          '</div>' +
          '<div class="admin-form-row">' +
            '<div class="admin-form-group"><label>Category</label>' +
              '<select data-field="cat" data-index="' + i + '">' +
                Object.keys(CATEGORY_LABELS).map(function (key) {
                  return '<option value="' + key + '"' + (p.cat === key ? ' selected' : '') + '>' + CATEGORY_LABELS[key] + '</option>';
                }).join('') +
              '</select>' +
            '</div>' +
            '<div class="admin-form-group"><label>Title</label>' +
              '<input type="text" data-field="title" data-index="' + i + '" value="' + escapeAttr(p.title) + '" maxlength="60">' +
            '</div>' +
          '</div>' +
          '<div class="admin-form-group"><label>One-line description</label>' +
            '<textarea data-field="desc" data-index="' + i + '" maxlength="220">' + escapeHtml(p.desc) + '</textarea>' +
          '</div>' +
          '<div class="admin-form-group"><label>Thumbnail</label>' +
            '<div class="image-uploader">' +
              '<div class="image-preview"><img data-preview="' + i + '" src="' + escapeAttr(p.img) + '" alt=""></div>' +
              '<div class="upload-controls">' +
                '<label class="upload-btn">' +
                  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>' +
                  'Upload thumbnail' +
                  '<input type="file" accept="image/*" data-upload="' + i + '">' +
                '</label>' +
                '<span class="upload-hint">16:9 works best.</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }
  renderPortfolioList();

  portfolioListEl.addEventListener('input', function (e) {
    var field = e.target.getAttribute('data-field');
    var idx = e.target.getAttribute('data-index');
    if (field !== null && idx !== null) portfolioProjects[idx][field] = e.target.value;
  });
  portfolioListEl.addEventListener('change', function (e) {
    var field = e.target.getAttribute('data-field');
    var idx = e.target.getAttribute('data-index');
    if (field !== null && idx !== null) portfolioProjects[idx][field] = e.target.value;

    var uploadIdx = e.target.getAttribute('data-upload');
    if (uploadIdx !== null) {
      readImageAsDataURL(e.target.files[0], function (dataUrl) {
        portfolioProjects[uploadIdx].img = dataUrl;
        portfolioListEl.querySelector('[data-preview="' + uploadIdx + '"]').src = dataUrl;
      });
    }
  });
  portfolioListEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-remove-project]');
    if (!btn) return;
    if (!confirm('Remove this project? This can\'t be undone once you save.')) return;
    var idx = Number(btn.getAttribute('data-remove-project'));
    portfolioProjects.splice(idx, 1);
    renderPortfolioList();
  });

  document.getElementById('addProjectBtn').addEventListener('click', function () {
    portfolioProjects.push({
      id: 'proj-' + Date.now(),
      cat: 'youtube',
      title: 'New Project',
      desc: 'Describe what you did on this project in one line.',
      img: 'assets/img/thumb-brand-campaign.svg'
    });
    renderPortfolioList();
    showPanel('panel-portfolio');
  });

  document.getElementById('savePortfolioBtn').addEventListener('click', function () {
    if (AhmedStore.saveContent({ portfolio: { projects: portfolioProjects } })) {
      showToast('Projects saved — live on Portfolio & Home now.');
    }
  });

  document.getElementById('portfolioPageTitle').value = content.portfolio.pageTitle;
  document.getElementById('portfolioPageSub').value = content.portfolio.pageSub;
  document.getElementById('savePortfolioIntroBtn').addEventListener('click', function () {
    var patch = {
      portfolio: {
        pageTitle: document.getElementById('portfolioPageTitle').value.trim(),
        pageSub: document.getElementById('portfolioPageSub').value.trim()
      }
    };
    if (AhmedStore.saveContent(patch)) showToast('Portfolio page intro saved.');
  });

  /* =======================================================================
     ABOUT PAGE
  ======================================================================= */
  document.getElementById('aboutTitleLine1').value = content.about.pageTitleLine1;
  document.getElementById('aboutTitleLine2').value = content.about.pageTitleLine2;
  document.getElementById('aboutPageSub').value = content.about.pageSub;
  document.getElementById('aboutStoryHeading').value = content.about.storyHeading;
  document.getElementById('aboutP1').value = content.about.storyParagraph1;
  document.getElementById('aboutP2').value = content.about.storyParagraph2;
  document.getElementById('aboutQuote').value = content.about.missionQuote;
  document.getElementById('aboutP3').value = content.about.storyParagraph3;

  document.getElementById('saveAboutBtn').addEventListener('click', function () {
    var patch = {
      about: {
        pageTitleLine1: document.getElementById('aboutTitleLine1').value.trim(),
        pageTitleLine2: document.getElementById('aboutTitleLine2').value.trim(),
        pageSub: document.getElementById('aboutPageSub').value.trim(),
        storyHeading: document.getElementById('aboutStoryHeading').value.trim(),
        storyParagraph1: document.getElementById('aboutP1').value.trim(),
        storyParagraph2: document.getElementById('aboutP2').value.trim(),
        missionQuote: document.getElementById('aboutQuote').value.trim(),
        storyParagraph3: document.getElementById('aboutP3').value.trim()
      }
    };
    if (AhmedStore.saveContent(patch)) showToast('About page saved — live now.');
  });

  /* =======================================================================
     SERVICES
  ======================================================================= */
  var servicesListEl = document.getElementById('servicesList');
  var SERVICE_ICON_KEYS = Object.keys(AhmedIcons.SERVICE_ICONS);

  function renderServicesList() {
    servicesListEl.innerHTML = servicesList.map(function (s, i) {
      return (
        '<div class="repeat-item" data-index="' + i + '">' +
          '<div class="repeat-item-head">' +
            '<span class="repeat-item-title">' + AhmedIcons.serviceIcon(s.icon, 18) + ' Service ' + (i + 1) + '</span>' +
            '<button type="button" class="repeat-remove-btn" data-remove-service="' + i + '">' +
              '<svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Remove' +
            '</button>' +
          '</div>' +
          '<div class="admin-form-row">' +
            '<div class="admin-form-group"><label>Icon</label>' +
              '<select data-field="icon" data-index="' + i + '">' +
                SERVICE_ICON_KEYS.map(function (key) {
                  return '<option value="' + key + '"' + (s.icon === key ? ' selected' : '') + '>' + key.charAt(0).toUpperCase() + key.slice(1) + '</option>';
                }).join('') +
              '</select>' +
            '</div>' +
            '<div class="admin-form-group"><label>Title</label>' +
              '<input type="text" data-field="title" data-index="' + i + '" value="' + escapeAttr(s.title) + '" maxlength="60">' +
            '</div>' +
          '</div>' +
          '<div class="admin-form-group"><label>Description</label>' +
            '<textarea data-field="desc" data-index="' + i + '" maxlength="220">' + escapeHtml(s.desc) + '</textarea>' +
          '</div>' +
          '<div class="admin-form-row">' +
            '<div class="admin-form-group"><label>Starting price ($)</label>' +
              '<input type="text" data-field="price" data-index="' + i + '" value="' + escapeAttr(s.price) + '" placeholder="e.g. 150">' +
            '</div>' +
            '<div class="admin-form-group"><label>Unit</label>' +
              '<input type="text" data-field="unit" data-index="' + i + '" value="' + escapeAttr(s.unit) + '" placeholder="e.g. / video, / month">' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }
  renderServicesList();

  servicesListEl.addEventListener('input', function (e) {
    var field = e.target.getAttribute('data-field');
    var idx = e.target.getAttribute('data-index');
    if (field !== null && idx !== null) servicesList[idx][field] = e.target.value;
  });
  servicesListEl.addEventListener('change', function (e) {
    var field = e.target.getAttribute('data-field');
    var idx = e.target.getAttribute('data-index');
    if (field !== null && idx !== null) {
      servicesList[idx][field] = e.target.value;
      if (field === 'icon') renderServicesList();
    }
  });
  servicesListEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-remove-service]');
    if (!btn) return;
    if (!confirm('Remove this service? This can\'t be undone once you save.')) return;
    servicesList.splice(Number(btn.getAttribute('data-remove-service')), 1);
    renderServicesList();
  });

  document.getElementById('addServiceBtn').addEventListener('click', function () {
    servicesList.push({ id: 'svc-' + Date.now(), icon: 'scissors', title: 'New Service', desc: 'Describe this service in one sentence.', price: '0', unit: '/ project' });
    renderServicesList();
  });

  document.getElementById('saveServicesBtn').addEventListener('click', function () {
    if (AhmedStore.saveContent({ servicesPage: { list: servicesList } })) showToast('Services saved — live now.');
  });

  document.getElementById('servicesPageTitle').value = content.servicesPage.pageTitle;
  document.getElementById('servicesPageSub').value = content.servicesPage.pageSub;
  document.getElementById('servicesNote').value = content.servicesPage.note;
  document.getElementById('saveServicesIntroBtn').addEventListener('click', function () {
    var patch = {
      servicesPage: {
        pageTitle: document.getElementById('servicesPageTitle').value.trim(),
        pageSub: document.getElementById('servicesPageSub').value.trim(),
        note: document.getElementById('servicesNote').value.trim()
      }
    };
    if (AhmedStore.saveContent(patch)) showToast('Services page intro saved.');
  });

  /* =======================================================================
     AWARDS
  ======================================================================= */
  var awardsListEl = document.getElementById('awardsList');
  var AWARD_ICON_KEYS = Object.keys(AhmedIcons.AWARD_ICONS);

  function renderAwardsList() {
    awardsListEl.innerHTML = awardsList.map(function (a, i) {
      return (
        '<div class="repeat-item" data-index="' + i + '">' +
          '<div class="repeat-item-head">' +
            '<span class="repeat-item-title">' + AhmedIcons.awardIcon(a.icon, 18) + ' Achievement ' + (i + 1) + '</span>' +
            '<button type="button" class="repeat-remove-btn" data-remove-award="' + i + '">' +
              '<svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Remove' +
            '</button>' +
          '</div>' +
          '<div class="admin-form-row">' +
            '<div class="admin-form-group"><label>Year</label>' +
              '<input type="text" data-field="year" data-index="' + i + '" value="' + escapeAttr(a.year) + '" maxlength="12">' +
            '</div>' +
            '<div class="admin-form-group"><label>Icon</label>' +
              '<select data-field="icon" data-index="' + i + '">' +
                AWARD_ICON_KEYS.map(function (key) {
                  return '<option value="' + key + '"' + (a.icon === key ? ' selected' : '') + '>' + key.charAt(0).toUpperCase() + key.slice(1) + '</option>';
                }).join('') +
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="admin-form-group"><label>Award name</label>' +
            '<input type="text" data-field="title" data-index="' + i + '" value="' + escapeAttr(a.title) + '" maxlength="80">' +
          '</div>' +
          '<div class="admin-form-group"><label>Given by</label>' +
            '<input type="text" data-field="giver" data-index="' + i + '" value="' + escapeAttr(a.giver) + '" maxlength="100">' +
          '</div>' +
          '<div class="admin-form-group"><label>Why it matters</label>' +
            '<textarea data-field="desc" data-index="' + i + '" maxlength="240">' + escapeHtml(a.desc) + '</textarea>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }
  renderAwardsList();

  awardsListEl.addEventListener('input', function (e) {
    var field = e.target.getAttribute('data-field');
    var idx = e.target.getAttribute('data-index');
    if (field !== null && idx !== null) awardsList[idx][field] = e.target.value;
  });
  awardsListEl.addEventListener('change', function (e) {
    var field = e.target.getAttribute('data-field');
    var idx = e.target.getAttribute('data-index');
    if (field !== null && idx !== null) {
      awardsList[idx][field] = e.target.value;
      if (field === 'icon') renderAwardsList();
    }
  });
  awardsListEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-remove-award]');
    if (!btn) return;
    if (!confirm('Remove this achievement? This can\'t be undone once you save.')) return;
    awardsList.splice(Number(btn.getAttribute('data-remove-award')), 1);
    renderAwardsList();
  });

  document.getElementById('addAwardBtn').addEventListener('click', function () {
    awardsList.push({ id: 'award-' + Date.now(), year: String(new Date().getFullYear()), title: 'New Achievement', giver: 'Given by...', desc: 'Why this one matters.', icon: 'trophy' });
    renderAwardsList();
  });

  document.getElementById('saveAwardsBtn').addEventListener('click', function () {
    if (AhmedStore.saveContent({ awardsPage: { list: awardsList } })) showToast('Achievements saved — live now.');
  });

  document.getElementById('awardsPageTitle').value = content.awardsPage.pageTitle;
  document.getElementById('awardsPageSub').value = content.awardsPage.pageSub;
  document.getElementById('saveAwardsIntroBtn').addEventListener('click', function () {
    var patch = {
      awardsPage: {
        pageTitle: document.getElementById('awardsPageTitle').value.trim(),
        pageSub: document.getElementById('awardsPageSub').value.trim()
      }
    };
    if (AhmedStore.saveContent(patch)) showToast('Awards page intro saved.');
  });

  /* =======================================================================
     CONTACT & SOCIALS
  ======================================================================= */
  document.getElementById('contactPageTitle').value = content.contactPage.pageTitle;
  document.getElementById('contactPageSub').value = content.contactPage.pageSub;
  document.getElementById('contactEmail').value = content.site.email;
  document.getElementById('contactWhatsapp').value = content.site.whatsapp;
  document.getElementById('contactInstagram').value = content.site.instagram === '#' ? '' : content.site.instagram;
  document.getElementById('contactYoutube').value = content.site.youtube === '#' ? '' : content.site.youtube;

  document.getElementById('saveContactBtn').addEventListener('click', function () {
    var patch = {
      contactPage: {
        pageTitle: document.getElementById('contactPageTitle').value.trim(),
        pageSub: document.getElementById('contactPageSub').value.trim()
      },
      site: {
        email: document.getElementById('contactEmail').value.trim(),
        whatsapp: document.getElementById('contactWhatsapp').value.trim(),
        instagram: document.getElementById('contactInstagram').value.trim() || '#',
        youtube: document.getElementById('contactYoutube').value.trim() || '#'
      }
    };
    if (AhmedStore.saveContent(patch)) showToast('Contact info saved — live now.');
  });

  /* =======================================================================
     THEME
  ======================================================================= */
  var themeGrid = document.getElementById('themeGrid');
  var currentTheme = AhmedStore.getTheme();

  function renderThemeGrid() {
    themeGrid.innerHTML = AhmedStore.THEMES.map(function (t) {
      return (
        '<div class="theme-option' + (t.id === currentTheme ? ' selected' : '') + '" data-theme-id="' + t.id + '">' +
          '<div class="theme-swatch-row">' +
            t.swatch.map(function (c) { return '<span class="theme-swatch" style="background:' + c + '"></span>'; }).join('') +
          '</div>' +
          '<span class="theme-option-name">' + t.name + '</span>' +
          '<span class="theme-selected-badge">' +
            '<svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
        '</div>'
      );
    }).join('');
  }
  renderThemeGrid();

  themeGrid.addEventListener('click', function (e) {
    var opt = e.target.closest('.theme-option');
    if (!opt) return;
    var id = opt.getAttribute('data-theme-id');
    currentTheme = id;
    AhmedStore.setTheme(id);
    renderThemeGrid();
    showToast('Theme applied site-wide — check any page.');
  });

  /* =======================================================================
     ACCOUNT SECURITY
  ======================================================================= */
  function renderCredsNotice() {
    var box = document.getElementById('credsNotice');
    if (AhmedStore.isDefaultCreds()) {
      box.classList.remove('ok');
      box.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/></svg>' +
        '<span>You\'re still using the default demo login (<strong>admin</strong> / <strong>Admin@123</strong>). Change it below before your site goes live.</span>';
    } else {
      box.classList.add('ok');
      box.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/></svg>' +
        '<span>You\'ve set a custom username and password. Nice — just make sure you\'ll remember them.</span>';
    }
  }
  renderCredsNotice();

  document.getElementById('saveCredsBtn').addEventListener('click', function () {
    var errorBox = document.getElementById('securityError');
    errorBox.classList.remove('show');

    var current = document.getElementById('currentPassword').value;
    var newUser = document.getElementById('newUsername').value.trim();
    var newPass = document.getElementById('newPassword').value;
    var confirmPass = document.getElementById('confirmPassword').value;
    var creds = AhmedStore.getCreds();

    function fail(msg) {
      errorBox.textContent = msg;
      errorBox.classList.add('show');
    }

    if (current !== creds.password) return fail('Your current password is incorrect.');
    if (!newUser) return fail('Please enter a new username.');
    if (!newPass || newPass.length < 6) return fail('New password should be at least 6 characters.');
    if (newPass !== confirmPass) return fail('New password and confirmation don\'t match.');

    AhmedStore.setCreds(newUser, newPass);
    document.getElementById('currentPassword').value = '';
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    renderCredsNotice();
    showToast('Login details updated.');
  });

  document.getElementById('resetContentBtn').addEventListener('click', function () {
    if (!confirm('This will erase every edit you\'ve made in this browser and restore the original site content. Continue?')) return;
    AhmedStore.resetContent();
    showToast('Content reset. Reloading...');
    setTimeout(function () { window.location.reload(); }, 900);
  });

  /* ---------------------------------------------------------------------
     helpers
  --------------------------------------------------------------------- */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : str;
    return div.innerHTML;
  }
  function escapeAttr(str) { return escapeHtml(str).replace(/"/g, '&quot;'); }

});
