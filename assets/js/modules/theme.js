/* SX.theme — dark-mode toggle. Binds [data-sx-theme-toggle]. */
(function () {
  var KEY = "sx-theme";
  function apply(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    document.querySelectorAll("[data-sx-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    });
  }
  function init(root) {
    (root || document).querySelectorAll("[data-sx-theme-toggle]").forEach(function (btn) {
      if (btn.dataset.sxBoundTheme) return; btn.dataset.sxBoundTheme = "1";
      btn.addEventListener("click", function () {
        apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });
  }
  window.SX = window.SX || {}; SX.initTheme = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
