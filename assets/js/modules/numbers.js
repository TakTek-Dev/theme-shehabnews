/* SX.numbers — count-up numerals on scroll. Binds [data-sx-count]. Finite animation. */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fmt(n) { return Math.round(n).toLocaleString("en-US"); }
  function animate(el) {
    var target = parseFloat(el.dataset.sxCount || "0");
    var suffix = el.dataset.sxSuffix || "";
    if (reduced) { el.textContent = fmt(target) + suffix; return; }
    var dur = 1300, t0 = performance.now();
    function step(t) {
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function init(root) {
    (root || document).querySelectorAll("[data-sx-count]").forEach(function (el) {
      if (el.dataset.sxBoundNumbers || el.dataset.sxCount === "" || isNaN(parseFloat(el.dataset.sxCount))) return;
      el.dataset.sxBoundNumbers = "1";
      if (!("IntersectionObserver" in window)) { el.textContent = fmt(parseFloat(el.dataset.sxCount || "0")) + (el.dataset.sxSuffix || ""); return; }
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) { io.unobserve(el); animate(el); } });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }
  window.SX = window.SX || {}; SX.initNumbers = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
