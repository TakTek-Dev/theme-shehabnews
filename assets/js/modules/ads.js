/* SX.ads — sticky footer ad: dismiss + remember the choice.
   Closing hides the bar for the rest of the browsing session
   (sessionStorage, so it comes back on a fresh visit — not a
   permanent opt-out, which is an ad-ops decision, not a theme one). */
(function () {
  var KEY = "sx-ad-sticky-closed";

  function init(root) {
    (root || document).querySelectorAll(".sx-ad-sticky").forEach(function (bar) {
      if (bar.dataset.sxBoundAds) return; bar.dataset.sxBoundAds = "1";

      var dismissed = false;
      try { dismissed = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
      if (dismissed) { bar.remove(); return; }

      bar.hidden = false;
      var btn = bar.querySelector("[data-sx-ad-close]");
      if (!btn) return;
      btn.addEventListener("click", function () {
        bar.remove();
        try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
      });
    });
  }

  window.SX = window.SX || {}; SX.initAds = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
