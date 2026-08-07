/* SX.galleryFilter — gallery landing: chip filter over the masonry album grid.
   Binds [data-sx-gallery-filter]. Simple OR-filter (one active chip), reusable pattern
   from the category archive chips but scoped to its own attribute to avoid collisions. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-gallery-filter]").forEach(function (el) {
      if (el.dataset.sxBoundGalleryFilter) return; el.dataset.sxBoundGalleryFilter = "1";
      var grid = el.querySelector("[data-sx-gallery-grid]");
      var items = Array.prototype.slice.call(grid.querySelectorAll("[data-gcat]"));
      var count = el.querySelector("[data-sx-gallery-count]");
      var moreBtn = el.querySelector("[data-sx-gallery-more]");
      el.querySelectorAll(".sx-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          el.querySelectorAll(".sx-chip").forEach(function (c) {
            c.classList.toggle("is-active", c === chip);
            c.setAttribute("aria-pressed", c === chip ? "true" : "false");
          });
          var val = chip.dataset.val;
          var shown = 0;
          /* Filtering searches the WHOLE archive, so the albums still parked
             behind "عرض المزيد" join the pool and the button retires — otherwise
             it would sit there claiming to reveal tiles that are already out. */
          items.forEach(function (it) {
            it.removeAttribute("data-more");
            var ok = val === "all" || it.dataset.gcat === val;
            it.hidden = !ok;
            if (ok) shown++;
          });
          if (moreBtn) moreBtn.hidden = true;
          if (count) count.textContent = shown + " ألبوم";
        });
      });
      if (moreBtn) moreBtn.addEventListener("click", function () {
        grid.querySelectorAll("[data-more]").forEach(function (t) { t.hidden = false; t.removeAttribute("data-more"); items.push(t); });
        moreBtn.hidden = true;
        if (count) count.textContent = items.filter(function (it) { return !it.hidden; }).length + " ألبوم";
      });
    });
  }
  window.SX = window.SX || {}; SX.initGalleryFilter = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
