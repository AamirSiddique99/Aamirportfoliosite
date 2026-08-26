/* ==========================================================================
   AHMED PORTFOLIO — ICON REGISTRY
   A small curated set of inline SVG icons used for Services and Awards,
   selectable from the Admin Panel so new items still match the site's
   premium, hand-designed icon style (no arbitrary icon uploads).
   ========================================================================== */

(function (global) {

  var SERVICE_ICONS = {
    scissors: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="5" cy="5" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="5" cy="19" r="2.3" stroke="currentColor" stroke-width="1.6"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>',
    palette: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 3.5a8.5 8.5 0 000 17 4 4 0 010-8 3.2 3.2 0 000-6.4 4.3 4.3 0 01-.5-2.6z" fill="currentColor" opacity=".9"/>',
    grid: '<rect x="3" y="4" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M3 9.5h18" stroke="currentColor" stroke-width="1.6"/><path d="M8 21h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 18v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    waveform: '<path d="M3 12h2.5l2-6 3 12 2.5-9 1.5 3H21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    target: '<path d="M9 21h6M10 18h4M8 10a4 4 0 118 0c0 2-1.5 2.8-2 4.2-.2.6-.3 1-.3 1.8h-3.4c0-.8-.1-1.2-.3-1.8-.5-1.4-2-2.2-2-4.2z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 7l1.6-2.5h4.8L16 7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="3.8" stroke="currentColor" stroke-width="1.6"/>',
    film: '<rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M3 15h18M8 4.5v15M16 4.5v15" stroke="currentColor" stroke-width="1.4"/>'
  };

  var AWARD_ICONS = {
    trophy: '<path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7z" fill="currentColor"/>',
    badge: '<path d="M12 3l7 4v10l-7 4-7-4V7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 11.5l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    mic: '<path d="M4 6.5h11v9H8l-3 3v-3H4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M17 9.5h3v7h-2l-2 2v-2h-1" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    star: '<path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    medal: '<circle cx="12" cy="14.5" r="6" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9L7 3h3l2 5M14.5 9L17 3h-3l-2 5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
  };

  function iconSvg(map, key, size) {
    var s = size || 26;
    var content = map[key] || Object.values(map)[0];
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none">' + content + '</svg>';
  }

  global.AhmedIcons = {
    SERVICE_ICONS: SERVICE_ICONS,
    AWARD_ICONS: AWARD_ICONS,
    serviceIcon: function (key, size) { return iconSvg(SERVICE_ICONS, key, size); },
    awardIcon: function (key, size) { return iconSvg(AWARD_ICONS, key, size); }
  };

})(window);
