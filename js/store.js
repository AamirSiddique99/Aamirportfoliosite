/* ==========================================================================
   AHMED PORTFOLIO — CONTENT STORE
   Single source of truth for every editable piece of content on the site.
   Read by every public page's render.js. Written by the Admin Panel.

   HOW IT WORKS
   - DEFAULT_CONTENT below matches the original hand-built site exactly.
   - Any edits saved from the Admin Panel are stored as a JSON "override"
     object in this browser's localStorage (key: ahmed_content_v1).
   - getContent() returns DEFAULT_CONTENT with the override deep-merged on
     top, so pages always have something sensible to show even before any
     edits are made.
   - Because this is a static site with no server/database, saved changes
     live in THIS browser only. See the Admin Panel dashboard for details.
   ========================================================================== */

(function (global) {

  var CONTENT_KEY = 'ahmed_content_v1';
  var THEME_KEY = 'ahmed_theme_v1';
  var AUTH_KEY = 'ahmed_admin_session_v1';
  var CREDS_KEY = 'ahmed_admin_creds_v1';

  var DEFAULT_CONTENT = {
  "site": {
    "email": "ahmed.editz@gmail.com",
    "whatsapp": "Available on request \u2014 mention it in your message",
    "instagram": "#",
    "youtube": "#",
    "headshot": "assets/img/headshot-placeholder.svg"
  },
  "home": {
    "eyebrow": "Video Editor & Content Creator",
    "name": "Aamir Siddique",
    "taglinePrefix": "Turning raw footage into",
    "taglineHighlight": "stories that hook.",
    "sub": "5 years cutting for brands, creators and agencies \u2014 edited over 300 videos with an eye for pacing, rhythm and retention. If it's boring, it doesn't ship.",
    "stats": {
      "videos": 300,
      "clients": 50,
      "years": 5,
      "rating": 4.9
    }
  },
  "about": {
    "pageTitleLine1": "From hobby to",
    "pageTitleLine2": "full-time craft.",
    "pageSub": "Five years, 300+ edits, and one habit that never changed \u2014 chasing the cut that keeps someone watching.",
    "storyHeading": "Built one weekend edit at a time",
    "storyParagraph1": "I started editing videos five years ago as a hobby \u2014 helping a friend cut his YouTube uploads on weekends, mostly just to see if I could make his footage feel less like raw clips and more like something worth watching.",
    "storyParagraph2": "Somewhere between the first jump cut and the hundredth late night render, I fell in love with storytelling itself \u2014 not just the edit, but the sound design and color grading that give a story its mood. What started as a favor turned into a full-time career.",
    "missionQuote": "I don't just cut clips together \u2014 I build a narrative that keeps the viewer watching until the very end.",
    "storyParagraph3": "That's the difference I try to bring to every project: structure first, polish second. My mission is simple \u2014 help creators and brands turn raw, unorganized footage into polished stories that actually grow their audience."
  },
  "servicesPage": {
    "pageTitle": "Services & Pricing",
    "pageSub": "Straightforward packages built around how creators and brands actually publish \u2014 pick one, or combine a few.",
    "note": "Every package is a starting point \u2014 final pricing depends on footage volume, turnaround time, and project scope. Custom bundles available on request.",
    "list": [
      {
        "id": "svc-1",
        "icon": "scissors",
        "title": "YouTube Video Editing",
        "desc": "Full editing of long-form YouTube videos \u2014 cuts, transitions, and pacing built to hold attention from the cold open to the outro.",
        "price": "150",
        "unit": "/ video"
      },
      {
        "id": "svc-2",
        "icon": "bolt",
        "title": "Short-Form Reels Editing",
        "desc": "Fast-paced vertical edits for Instagram Reels, YouTube Shorts, and TikTok \u2014 built to hook in the first second and hold the scroll.",
        "price": "60",
        "unit": "/ reel"
      },
      {
        "id": "svc-3",
        "icon": "palette",
        "title": "Color Grading & Sound Design",
        "desc": "Professional color correction and audio mixing that gives every video a consistent, cinematic finish from start to finish.",
        "price": "100",
        "unit": "/ video"
      },
      {
        "id": "svc-4",
        "icon": "grid",
        "title": "Full Channel Management",
        "desc": "Complete editing and upload management for an entire YouTube channel \u2014 a consistent publishing engine, handled monthly.",
        "price": "600",
        "unit": "/ month"
      }
    ]
  },
  "awardsPage": {
    "pageTitle": "Awards & Achievements",
    "pageSub": "A few moments where the work got noticed \u2014 by peers, by the industry, and by people just starting out.",
    "list": [
      {
        "id": "award-1",
        "year": "2024",
        "title": "Best Editing Award",
        "giver": "Local Content Creators Meetup",
        "desc": "Recognized for outstanding storytelling through video editing \u2014 proof that structure and pacing, not just visuals, are what make a video land.",
        "icon": "trophy"
      },
      {
        "id": "award-2",
        "year": "2024",
        "title": "Featured Editor",
        "giver": "A Popular Video Editing Software Brand",
        "desc": "Recognized for consistent, high-quality client work \u2014 a nod from the tools I use every day, for the results they help produce.",
        "icon": "badge"
      },
      {
        "id": "award-3",
        "year": "2025",
        "title": "Guest Speaker",
        "giver": "Local College Seminar",
        "desc": "Invited to speak about video editing as a career path \u2014 sharing what actually goes into turning a hobby into full-time work.",
        "icon": "mic"
      }
    ]
  },
  "portfolio": {
    "pageTitle": "Portfolio",
    "pageSub": "A cross-section of edits, reels, and color & sound work \u2014 organized by craft, not just chronology.",
    "projects": [
      {
        "id": "proj-1",
        "cat": "youtube",
        "title": "The Last Startup",
        "desc": "Edited a 22-minute founder documentary, tightening a 4-hour interview into a story arc with a clear beginning, struggle, and payoff.",
        "img": "assets/img/yt-startup-doc.svg"
      },
      {
        "id": "proj-2",
        "cat": "youtube",
        "title": "Kitchen Confidential",
        "desc": "Cut a 45-episode weekly cooking show, keeping pacing and comedic timing consistent across the entire season.",
        "img": "assets/img/yt-kitchen-show.svg"
      },
      {
        "id": "proj-3",
        "cat": "youtube",
        "title": "Behind the Boards",
        "desc": "Synced performance footage to the beat and layered B-roll for an 18-minute music producer vlog episode.",
        "img": "assets/img/yt-boards-vlog.svg"
      },
      {
        "id": "proj-4",
        "cat": "youtube",
        "title": "Rebuilding the Van",
        "desc": "Compressed 30 hours of build footage into a satisfying 25-minute series finale with a clear before-and-after payoff.",
        "img": "assets/img/yt-van-build.svg"
      },
      {
        "id": "proj-5",
        "cat": "youtube",
        "title": "The Interview Room",
        "desc": "Re-cut a 2-hour podcast recording into a tight, clip-worthy long-form upload built for retention.",
        "img": "assets/img/yt-podcast-cut.svg"
      },
      {
        "id": "proj-6",
        "cat": "youtube",
        "title": "City Lights",
        "desc": "Edited and color graded a 15-minute travel vlog episode with dynamic pacing across three cities.",
        "img": "assets/img/yt-travel-vlog.svg"
      },
      {
        "id": "proj-7",
        "cat": "shortform",
        "title": "3AM Thoughts",
        "desc": "Cut a 30-second hook-first reel built for the first two seconds \u2014 it went on to hit 2M views organically.",
        "img": "assets/img/sf-3am-thoughts.svg"
      },
      {
        "id": "proj-8",
        "cat": "shortform",
        "title": "Try This Trick",
        "desc": "Fast-paced 15-second product demo cut, built frame-by-frame for scroll-stopping retention.",
        "img": "assets/img/sf-try-trick.svg"
      },
      {
        "id": "proj-9",
        "cat": "shortform",
        "title": "Day In My Life",
        "desc": "Edited a punchy vertical lifestyle montage with tight trending-audio sync and quick cuts.",
        "img": "assets/img/sf-day-in-life.svg"
      },
      {
        "id": "proj-10",
        "cat": "shortform",
        "title": "Before / After",
        "desc": "Timed a satisfying reveal cut on the beat drop, engineered for maximum shareability.",
        "img": "assets/img/sf-before-after.svg"
      },
      {
        "id": "proj-11",
        "cat": "shortform",
        "title": "Quick Tip #12",
        "desc": "Distilled a 10-minute tutorial into a single actionable 20-second clip without losing the payoff.",
        "img": "assets/img/sf-quick-tip.svg"
      },
      {
        "id": "proj-12",
        "cat": "shortform",
        "title": "Studio Session",
        "desc": "Cut a vertical behind-the-scenes teaser to promote an artist's full-length release.",
        "img": "assets/img/sf-studio-session.svg"
      },
      {
        "id": "proj-13",
        "cat": "colorsound",
        "title": "Golden Hour",
        "desc": "Applied a warm, cinematic color grade to match the couple's outdoor ceremony and golden-hour reception.",
        "img": "assets/img/cs-golden-hour.svg"
      },
      {
        "id": "proj-14",
        "cat": "colorsound",
        "title": "Neon Nights",
        "desc": "Built a moody teal-and-magenta color grade with layered sound design for a music video.",
        "img": "assets/img/cs-neon-nights.svg"
      },
      {
        "id": "proj-15",
        "cat": "colorsound",
        "title": "Silent Static",
        "desc": "Designed atmosphere, foley, and a full dialogue mix for a 12-minute independent short film.",
        "img": "assets/img/cs-silent-static.svg"
      },
      {
        "id": "proj-16",
        "cat": "colorsound",
        "title": "Product Glow",
        "desc": "Graded a clean, high-contrast commercial look for a tech product launch campaign.",
        "img": "assets/img/cs-product-glow.svg"
      },
      {
        "id": "proj-17",
        "cat": "colorsound",
        "title": "Coastline",
        "desc": "Balanced skin tones and skies across 40 minutes of mixed drone and handheld documentary footage.",
        "img": "assets/img/cs-coastline.svg"
      },
      {
        "id": "proj-18",
        "cat": "colorsound",
        "title": "Bassline",
        "desc": "Synced multi-camera concert footage and mixed the full live audio track for release.",
        "img": "assets/img/cs-bassline.svg"
      }
    ]
  },
  "contactPage": {
    "pageTitle": "Let's Start a Project",
    "pageSub": "Got footage that needs a story, or a channel that needs a system? Reach out for editing or full channel management \u2014 I typically reply within 24 hours."
  }
};;

  var DEFAULT_CREDS = { username: 'admin', password: 'Admin@123' };

  var THEMES = [
    { id: 'charcoal-orange', name: 'Charcoal Orange', swatch: ['#0c0c0f', '#ff5a1f', '#2ed3ff'] },
    { id: 'midnight-blue',   name: 'Midnight Blue',   swatch: ['#080b16', '#3b82f6', '#7c5cff'] },
    { id: 'slate-purple',    name: 'Slate Purple',    swatch: ['#120f18', '#a855f7', '#ff6ec7'] },
    { id: 'emerald-dark',    name: 'Emerald Dark',    swatch: ['#08120e', '#12e08a', '#ffb020'] }
  ];

  function isPlainObject(v) {
    return v && typeof v === 'object' && !Array.isArray(v);
  }

  function deepMerge(base, override) {
    if (!override) return base;
    var out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
    Object.keys(override).forEach(function (key) {
      var overrideVal = override[key];
      var baseVal = base ? base[key] : undefined;
      if (isPlainObject(overrideVal) && isPlainObject(baseVal)) {
        out[key] = deepMerge(baseVal, overrideVal);
      } else if (overrideVal !== undefined) {
        // Arrays and primitives: override replaces wholesale (correct for
        // CRUD lists like services/awards/portfolio projects).
        out[key] = overrideVal;
      }
    });
    return out;
  }

  function getOverride() {
    try {
      var raw = localStorage.getItem(CONTENT_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Content store read failed, using defaults.', e);
      return {};
    }
  }

  function getContent() {
    return deepMerge(DEFAULT_CONTENT, getOverride());
  }

  function saveContent(partial) {
    var current = getOverride();
    var merged = deepMerge(current, partial);
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(merged));
      return true;
    } catch (e) {
      console.error('Save failed', e);
      return false;
    }
  }

  function resetContent() {
    localStorage.removeItem(CONTENT_KEY);
  }

  /* ---------- Theme ---------- */
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'charcoal-orange';
  }
  function setTheme(id) {
    localStorage.setItem(THEME_KEY, id);
    document.documentElement.setAttribute('data-theme', id);
  }
  function applyStoredTheme() {
    document.documentElement.setAttribute('data-theme', getTheme());
  }

  /* ---------- Auth ---------- */
  function getCreds() {
    try {
      var raw = localStorage.getItem(CREDS_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_CREDS;
    } catch (e) {
      return DEFAULT_CREDS;
    }
  }
  function setCreds(username, password) {
    localStorage.setItem(CREDS_KEY, JSON.stringify({ username: username, password: password }));
  }
  function isDefaultCreds() {
    var c = getCreds();
    return c.username === DEFAULT_CREDS.username && c.password === DEFAULT_CREDS.password;
  }
  var SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
  function login(username, password) {
    var creds = getCreds();
    if (username === creds.username && password === creds.password) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ ts: Date.now() }));
      return true;
    }
    return false;
  }
  function isLoggedIn() {
    try {
      var raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return false;
      var session = JSON.parse(raw);
      return (Date.now() - session.ts) < SESSION_TTL_MS;
    } catch (e) {
      return false;
    }
  }
  function logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  global.AhmedStore = {
    getContent: getContent,
    saveContent: saveContent,
    resetContent: resetContent,
    THEMES: THEMES,
    getTheme: getTheme,
    setTheme: setTheme,
    applyStoredTheme: applyStoredTheme,
    login: login,
    isLoggedIn: isLoggedIn,
    logout: logout,
    getCreds: getCreds,
    setCreds: setCreds,
    isDefaultCreds: isDefaultCreds,
    DEFAULT_CREDS: DEFAULT_CREDS
  };

})(window);
