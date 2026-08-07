/* SX.poll — vote once, reveal result bars from data-pct. Binds [data-sx-poll]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-poll]").forEach(function (el) {
      if (el.dataset.sxBoundPoll) return; el.dataset.sxBoundPoll = "1";
      el.querySelectorAll(".sx-poll__opt button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          el.classList.add("is-voted");
          el.querySelectorAll(".sx-poll__opt").forEach(function (opt) {
            var pct = opt.dataset.pct || "0";
            var bar = opt.querySelector(".sx-poll__bar span");
            var lab = opt.querySelector(".sx-poll__pct");
            if (bar) bar.style.inlineSize = pct + "%";
            if (lab) lab.textContent = pct + "%";
          });
          btn.closest(".sx-poll__opt").style.fontWeight = "700";
          var live = el.querySelector("[data-sx-poll-live]");
          if (live) live.textContent = "تم تسجيل صوتك";
        });
      });
    });
  }
  window.SX = window.SX || {}; SX.initPoll = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
