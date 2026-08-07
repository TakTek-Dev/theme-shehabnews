/* DEV PREVIEW ONLY — delete before production install.
   If the local woff2 files are not yet dropped into assets/fonts/,
   this loads IBM Plex Sans Arabic from Google Fonts so reviews render
   with the intended face. Production must ship the local files. */
(function () {
  if (!("fonts" in document)) return;
  document.fonts.ready.then(function () {
    if (document.fonts.check('16px "IBM Plex Sans Arabic"')) return;
    console.warn("[SX dev] Local Arabic webfont missing — loading CDN fallback. Ship woff2 files in assets/fonts/ for production.");
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  });
})();
