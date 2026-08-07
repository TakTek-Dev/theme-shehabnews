/* SX.archive — category archive: functional filters + view switcher.
   Binds [data-sx-archive]. Filters by data-cat / data-type / data-age (days),
   sorts by DOM order or data-views, switches list/grid/compact views
   (persisted in localStorage: sx-archive-view). */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-archive]").forEach(function (el) {
      if (el.dataset.sxBoundArchive) return; el.dataset.sxBoundArchive = "1";
      var list = el.querySelector("[data-sx-archive-list]");
      var empty = el.querySelector("[data-sx-archive-empty]");
      var count = el.querySelector("[data-sx-archive-count]");
      var resets = Array.prototype.slice.call(el.querySelectorAll("[data-sx-archive-reset]"));
      var pag = el.querySelector(".sx-pagination");
      var items = Array.prototype.slice.call(list.querySelectorAll("[data-cat]"));
      var state = { cat: "all", type: "all", age: "all", sort: "new", view: "list" };
      try { state.view = localStorage.getItem("sx-archive-view") || "list"; } catch (e) {}

      function applyView() {
        list.classList.remove("is-list", "is-grid", "is-compact");
        list.classList.add("is-" + state.view);
        el.querySelectorAll("[data-sx-view]").forEach(function (b) {
          b.setAttribute("aria-pressed", b.dataset.sxView === state.view ? "true" : "false");
        });
      }
      function apply() {
        var shown = items.filter(function (it) {
          var okCat = state.cat === "all" || it.dataset.cat === state.cat;
          var okType = state.type === "all" || it.dataset.type === state.type;
          var okAge = state.age === "all" || parseInt(it.dataset.age || "0", 10) <= parseInt(state.age, 10);
          var ok = okCat && okType && okAge;
          it.hidden = !ok;
          return ok;
        });
        var sorted = shown.slice();
        if (state.sort === "old") sorted.reverse();
        if (state.sort === "views") sorted.sort(function (a, b) { return (parseInt(b.dataset.views || 0, 10)) - (parseInt(a.dataset.views || 0, 10)); });
        if (state.sort !== "new") sorted.forEach(function (it) { list.appendChild(it); });
        else items.forEach(function (it) { list.appendChild(it); });
        if (empty) empty.hidden = shown.length > 0;
        if (pag) pag.style.display = shown.length ? "" : "none";
        if (count) count.textContent = shown.length ? shown.length + " مادة معروضة من 1,248" : "لا نتائج";
        var active = state.cat !== "all" || state.type !== "all" || state.age !== "all";
        if (resets[0]) resets[0].hidden = !active;
      }
      el.querySelectorAll('[data-sx-af="cat"] .sx-chip').forEach(function (chip) {
        chip.addEventListener("click", function () {
          state.cat = chip.dataset.val;
          el.querySelectorAll('[data-sx-af="cat"] .sx-chip').forEach(function (c) {
            c.classList.toggle("is-active", c === chip);
            c.setAttribute("aria-pressed", c === chip ? "true" : "false");
          });
          apply();
        });
      });
      el.querySelectorAll("[data-sx-af-select]").forEach(function (sel) {
        sel.addEventListener("change", function () { state[sel.dataset.sxAfSelect] = sel.value; apply(); });
      });
      el.querySelectorAll("[data-sx-view]").forEach(function (b) {
        b.addEventListener("click", function () {
          state.view = b.dataset.sxView;
          try { localStorage.setItem("sx-archive-view", state.view); } catch (e) {}
          applyView();
        });
      });
      resets.forEach(function (reset) { reset.addEventListener("click", function () {
        state.cat = "all"; state.type = "all"; state.age = "all";
        el.querySelectorAll('[data-sx-af="cat"] .sx-chip').forEach(function (c, i) {
          c.classList.toggle("is-active", i === 0);
          c.setAttribute("aria-pressed", i === 0 ? "true" : "false");
        });
        el.querySelectorAll("[data-sx-af-select]").forEach(function (s) { if (s.dataset.sxAfSelect !== "sort") s.value = "all"; });
        apply();
      }); });
      applyView();
      apply();
    });
  }
  window.SX = window.SX || {}; SX.initArchive = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
