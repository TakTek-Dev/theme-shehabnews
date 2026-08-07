/* SX.menu — mobile drawer, nav dropdowns, search overlay. */
(function () {
  function init(root) {
    root = root || document;
    root.querySelectorAll("[data-sx-drawer-open]").forEach(function (btn) {
      if (btn.dataset.sxBoundMenu) return; btn.dataset.sxBoundMenu = "1";
      var drawer = document.querySelector("[data-sx-drawer]");
      var scrim = document.querySelector("[data-sx-scrim]");
      if (!drawer) return;
      function set(open) {
        drawer.classList.toggle("is-open", open);
        if (scrim) scrim.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
        if (open) { var f = drawer.querySelector("a,button,input"); if (f) f.focus(); }
      }
      btn.addEventListener("click", function () { set(!drawer.classList.contains("is-open")); });
      drawer.querySelectorAll("[data-sx-drawer-close]").forEach(function (c) {
        c.addEventListener("click", function () { set(false); btn.focus(); });
      });
      if (scrim) scrim.addEventListener("click", function () { set(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) { set(false); btn.focus(); }
      });
    });
    root.querySelectorAll("[data-sx-dropdown]").forEach(function (item) {
      if (item.dataset.sxBoundMenu) return; item.dataset.sxBoundMenu = "1";
      var btn = item.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        document.querySelectorAll("[data-sx-dropdown].is-open").forEach(function (o) {
          if (o !== item) { o.classList.remove("is-open"); var b = o.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false"); }
        });
      });
    });
    root.querySelectorAll("[data-sx-search-toggle]").forEach(function (btn) {
      if (btn.dataset.sxBoundMenu) return; btn.dataset.sxBoundMenu = "1";
      var panel = document.querySelector("[data-sx-search]");
      if (!panel) return;
      btn.addEventListener("click", function () {
        var open = panel.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) { var i = panel.querySelector("input"); if (i) i.focus(); }
      });
    });
  }
  document.addEventListener("click", function (e) {
    if (!e.target.closest("[data-sx-dropdown]")) {
      document.querySelectorAll("[data-sx-dropdown].is-open").forEach(function (o) {
        o.classList.remove("is-open"); var b = o.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll("[data-sx-dropdown].is-open").forEach(function (o) { o.classList.remove("is-open"); });
    var s = document.querySelector("[data-sx-search].is-open");
    if (s) { s.classList.remove("is-open"); var t = document.querySelector("[data-sx-search-toggle]"); if (t) { t.setAttribute("aria-expanded", "false"); t.focus(); } }
  });
  window.SX = window.SX || {}; SX.initMenu = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
