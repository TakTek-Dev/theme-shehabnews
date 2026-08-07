/* SX.searchFilters — search results: multi-group checkbox filters (type × section),
   date-range radio, sort, and list/grid/compact view switcher (persisted).
   Binds [data-sx-search]. Independent of archive.js (checkbox semantics differ: OR within
   a group, AND across groups) so category pages keep their simpler chip filter untouched. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-search-page]").forEach(function (el) {
      if (el.dataset.sxBoundSearchFilters) return; el.dataset.sxBoundSearchFilters = "1";
      var list = el.querySelector("[data-sx-search-list]");
      var empty = el.querySelector("[data-sx-search-empty]");
      var count = el.querySelector("[data-sx-search-count]");
      var pag = el.querySelector(".sx-pagination");
      var items = Array.prototype.slice.call(list.querySelectorAll("[data-cat]"));
      var resetBtns = Array.prototype.slice.call(el.querySelectorAll("[data-sx-search-reset]"));
      var typeBoxes = Array.prototype.slice.call(el.querySelectorAll('[data-sx-sf="type"]'));
      var catBoxes = Array.prototype.slice.call(el.querySelectorAll('[data-sx-sf="cat"]'));
      var ageRadios = Array.prototype.slice.call(el.querySelectorAll('[data-sx-sf="age"]'));
      var sortSel = el.querySelector('[data-sx-sf="sort"]');
      var activeCountEl = el.querySelector("[data-sx-active-count]");

      function checked(boxes) { return boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; }); }
      function apply() {
        var types = checked(typeBoxes), cats = checked(catBoxes);
        var age = ageRadios.length ? (ageRadios.filter(function (r) { return r.checked; })[0] || {}).value : "all";
        var shown = items.filter(function (it) {
          var okType = !types.length || types.indexOf(it.dataset.type) > -1;
          var okCat = !cats.length || cats.indexOf(it.dataset.cat) > -1;
          var okAge = !age || age === "all" || parseInt(it.dataset.age || "0", 10) <= parseInt(age, 10);
          var ok = okType && okCat && okAge;
          it.hidden = !ok;
          return ok;
        });
        if (sortSel) {
          var sorted = shown.slice();
          if (sortSel.value === "date") sorted.sort(function (a, b) { return (parseInt(a.dataset.age, 10)) - (parseInt(b.dataset.age, 10)); });
          sorted.forEach(function (it) { list.appendChild(it); });
        }
        if (empty) empty.hidden = shown.length > 0;
        if (pag) pag.style.display = shown.length ? "" : "none";
        if (count) count.textContent = shown.length ? shown.length + " نتيجة من 214 (٠٫١٤ ثانية)" : "0 نتيجة";
        var activeN = types.length + cats.length + (age && age !== "all" ? 1 : 0);
        resetBtns.forEach(function (b) { b.hidden = activeN === 0; });
        if (activeCountEl) { activeCountEl.textContent = activeN ? "(" + activeN + ")" : ""; }
      }
      typeBoxes.concat(catBoxes).forEach(function (b) { b.addEventListener("change", apply); });
      ageRadios.forEach(function (r) { r.addEventListener("change", apply); });
      if (sortSel) sortSel.addEventListener("change", apply);
      resetBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          typeBoxes.concat(catBoxes).forEach(function (b) { b.checked = false; });
          ageRadios.forEach(function (r, i) { r.checked = i === 0; });
          apply();
        });
      });

      var view = "list";
      try { view = localStorage.getItem("sx-archive-view") || "list"; } catch (e) {}
      function applyView() {
        list.classList.remove("is-list", "is-grid", "is-compact");
        list.classList.add("is-" + view);
        el.querySelectorAll("[data-sx-view]").forEach(function (b) {
          b.setAttribute("aria-pressed", b.dataset.sxView === view ? "true" : "false");
        });
      }
      el.querySelectorAll("[data-sx-view]").forEach(function (b) {
        b.addEventListener("click", function () {
          view = b.dataset.sxView;
          try { localStorage.setItem("sx-archive-view", view); } catch (e) {}
          applyView();
        });
      });
      applyView();
      apply();

      var demoBtn = el.querySelector("#toggle-empty");
      if (demoBtn) demoBtn.addEventListener("click", function () {
        var r = list, e2 = empty, on = e2.hidden;
        e2.hidden = !on; r.style.display = on ? "none" : "";
        if (pag) pag.style.display = on ? "none" : "";
        this.textContent = on ? "عرض النتائج" : "عرض حالة «لا نتائج» (للمراجعة)";
      });
    });
  }
  window.SX = window.SX || {}; SX.initSearchFilters = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
