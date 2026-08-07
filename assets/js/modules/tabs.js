/* SX.tabs — accessible tabs. Binds [data-sx-tabs]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-tabs]").forEach(function (el) {
      if (el.dataset.sxBoundTabs) return; el.dataset.sxBoundTabs = "1";
      var tabs = Array.prototype.slice.call(el.querySelectorAll("[role=tab]"));
      var panels = Array.prototype.slice.call(el.querySelectorAll("[role=tabpanel]"));
      function select(i) {
        tabs.forEach(function (t, j) {
          t.setAttribute("aria-selected", i === j ? "true" : "false");
          t.tabIndex = i === j ? 0 : -1;
        });
        panels.forEach(function (p, j) { p.hidden = i !== j; });
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { select(i); });
        t.addEventListener("keydown", function (e) {
          var dir = 0, rtl = (el.closest("[dir]") || document.documentElement).dir !== "ltr";
          if (e.key === "ArrowRight") dir = rtl ? -1 : 1;
          if (e.key === "ArrowLeft") dir = rtl ? 1 : -1;
          if (e.key === "Home") { select(0); tabs[0].focus(); e.preventDefault(); return; }
          if (e.key === "End") { select(tabs.length - 1); tabs[tabs.length - 1].focus(); e.preventDefault(); return; }
          if (!dir) return;
          e.preventDefault();
          var n = (i + dir + tabs.length) % tabs.length;
          select(n); tabs[n].focus();
        });
      });
      select(Math.max(0, tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; })));
    });
  }
  window.SX = window.SX || {}; SX.initTabs = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
