/* SX.slider — slider with counter. Binds [data-sx-slider]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-slider]").forEach(function (el) {
      if (el.dataset.sxBound) return; el.dataset.sxBound = "1";
      var slides = Array.prototype.slice.call(el.querySelectorAll("[data-sx-slide]"));
      var counter = el.querySelector("[data-sx-counter]");
      if (!slides.length) return;
      var i = Math.max(0, slides.findIndex(function (s) { return s.classList.contains("is-active"); }));
      function show(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, j) { s.classList.toggle("is-active", i === j); });
        if (counter) counter.textContent = (i + 1) + " / " + slides.length;
      }
      el.querySelectorAll("[data-sx-next]").forEach(function (b) { b.addEventListener("click", function () { show(i + 1); }); });
      el.querySelectorAll("[data-sx-prev]").forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
      show(i);
    });
  }
  window.SX = window.SX || {}; SX.initSlider = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
