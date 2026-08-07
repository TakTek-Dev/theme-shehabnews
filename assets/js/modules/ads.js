/* SX.ads — sticky footer ad dismiss. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-ad-close]").forEach(function (btn) {
      if (btn.dataset.sxBoundAds) return; btn.dataset.sxBoundAds = "1";
      btn.addEventListener("click", function () {
        var bar = btn.closest(".sx-ad-sticky");
        if (bar) bar.remove();
      });
    });
  }
  window.SX = window.SX || {}; SX.initAds = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
