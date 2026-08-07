/* SX.variants — styleguide-only variant switcher.
   Swapping changes ONLY the variant class + data-variant (the contract). */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sg-demo]").forEach(function (demo) {
      if (demo.dataset.sxBound) return; demo.dataset.sxBound = "1";
      var key = demo.dataset.sgDemo;
      var buttons = demo.querySelectorAll("[data-sg-variant]");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var n = btn.dataset.sgVariant;
          if (window.SX && SX.resetSwipers) SX.resetSwipers(demo);
          demo.querySelectorAll("[data-section]").forEach(function (section) {
            var base = "sx-" + section.dataset.section;
            Array.prototype.slice.call(section.classList).forEach(function (c) {
              if (c.indexOf(base + "--v") === 0) section.classList.remove(c);
            });
            section.classList.add(base + "--v" + n);
            section.dataset.variant = n;
          });
          buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
          var code = demo.querySelector("[data-sg-code]");
          if (code) code.textContent = "class=\"sx-section sx-" + key + " sx-" + key + "--v" + n + "\" data-section=\"" + key + "\" data-variant=\"" + n + "\"";
          if (window.SX) { ["initTabs", "initTicker", "initSlider", "initVideo", "initVideoFloat", "initSwipers", "initAudio", "initPoll", "initSearchFilters"].forEach(function (f) { if (SX[f]) SX[f](demo); }); }
        });
      });
    });
  }
  /* LTR test button (#sg-dir): flips the whole document to dir="ltr"/lang="en"
     and back — proves the logical-properties layout is RTL/LTR-agnostic.
     (Moved here from a former inline <script> at the end of styleguide.html.) */
  function bindDirToggle() {
    var btn = document.getElementById("sg-dir");
    if (!btn || btn.dataset.sxBound) return; btn.dataset.sxBound = "1";
    btn.addEventListener("click", function () {
      var h = document.documentElement, toLtr = h.dir !== "ltr";
      h.dir = toLtr ? "ltr" : "rtl";
      h.lang = toLtr ? "en" : "ar";
      this.textContent = toLtr ? "عودة إلى RTL" : "تجربة LTR (القسم الإنجليزي)";
    });
  }

  window.SX = window.SX || {}; SX.initVariants = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); bindDirToggle(); });
})();
