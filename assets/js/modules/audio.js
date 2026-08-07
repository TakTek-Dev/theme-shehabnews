/* SX.audio — demo playback surface: toggles is-playing, animates progress.
   The CMS replaces this with its real player; the markup contract stays. Binds [data-sx-audio]. */
(function () {
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';
  var PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6v12M15 6v12"></path></svg>';
  function init(root) {
    (root || document).querySelectorAll("[data-sx-audio]").forEach(function (el) {
      if (el.dataset.sxBoundAudio) return; el.dataset.sxBoundAudio = "1";
      var btn = el.querySelector(".sx-audio__play");
      var bar = el.querySelector(".sx-audio__track span");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var on = el.classList.toggle("is-playing");
        btn.innerHTML = on ? PAUSE : PLAY;
        btn.setAttribute("aria-label", on ? "إيقاف مؤقت" : "تشغيل");
        if (on && bar && !el.sxTimer) {
          var p = parseFloat(bar.style.inlineSize) || 12;
          el.sxTimer = setInterval(function () {
            if (!el.classList.contains("is-playing")) return;
            p = (p + 0.4) % 100;
            bar.style.inlineSize = p + "%";
          }, 200);
        }
      });
    });
  }
  window.SX = window.SX || {}; SX.initAudio = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
