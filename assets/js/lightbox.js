/* SX.lightbox — <dialog> gallery lightbox. Binds [data-sx-lightbox]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-lightbox]").forEach(function (gal) {
      if (gal.dataset.sxBound) return; gal.dataset.sxBound = "1";
      var dlg = document.querySelector("dialog.sx-lightbox");
      if (!dlg) return;
      var items = Array.prototype.slice.call(gal.querySelectorAll("[data-sx-lightbox-item]"));
      var img = dlg.querySelector("img"), cap = dlg.querySelector("[data-sx-lb-caption]"), cnt = dlg.querySelector("[data-sx-lb-counter]");
      var i = 0;
      function show(n) {
        i = (n + items.length) % items.length;
        var it = items[i], im = it.querySelector("img");
        if (img && im) { img.src = im.getAttribute("src"); img.alt = im.alt || ""; }
        if (cap) cap.textContent = it.dataset.caption || (im ? im.alt : "") || "";
        if (cnt) cnt.textContent = (i + 1) + " / " + items.length;
      }
      items.forEach(function (it, n) {
        it.addEventListener("click", function (e) { e.preventDefault(); show(n); dlg.showModal(); });
      });
      dlg.querySelectorAll("[data-sx-next]").forEach(function (b) { b.addEventListener("click", function () { show(i + 1); }); });
      dlg.querySelectorAll("[data-sx-prev]").forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
      dlg.querySelectorAll("[data-sx-lb-close]").forEach(function (b) { b.addEventListener("click", function () { dlg.close(); }); });
      dlg.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") show(i + 1);
        if (e.key === "ArrowRight") show(i - 1);
      });
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    });
  }
  window.SX = window.SX || {}; SX.initLightbox = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
