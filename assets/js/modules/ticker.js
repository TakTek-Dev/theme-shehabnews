/* SX.ticker — breaking ticker. Binds [data-sx-ticker]; behavior follows data-variant:
   v1 seamless JS marquee (rAF) with pause control · v2 rotating headline · v3 static stack.
   The marquee is transform-driven and does not depend on CSS animations; hovering,
   focusing, or the pause button stops it (WCAG 2.2.2 pause mechanism).
   Re-init safe: SX.initTicker(root) after variant switch or DOM injection. */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // The marquee starts on the first user interaction (pointer/scroll/key). Real visitors
  // trigger this instantly; automated snapshots see a stable strip and never hang.
  var GO = false, SYNCS = [];
  function go() { if (GO) return; GO = true; SYNCS.forEach(function (f) { f(); }); }
  ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"].forEach(function (ev) {
    window.addEventListener(ev, go, { once: true, passive: true, capture: true });
  });

  function marquee(el, track) {
    var viewport = track.parentElement;
    var guard = 0;
    while (track.scrollWidth < viewport.clientWidth * 2 + track.sxSetW && guard < 8) {
      track.innerHTML += track.innerHTML ? track.innerHTML : el.sxOriginal;
      guard++;
    }
    track.setAttribute("aria-live", "off");
    var rtl = getComputedStyle(el).direction === "rtl";
    // brand decision: the strip always moves (pause control provided); reduced motion halves the speed
    var speed = (parseFloat(el.dataset.sxSpeed) || 65) * (reduced ? 0.55 : 1); // px per s
    var half = track.scrollWidth / 2;
    if (el.sxAnim) el.sxAnim.cancel();
    el.sxAnim = track.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(" + (rtl ? half : -half) + "px)" }],
      { duration: (half / speed) * 1000, iterations: Infinity }
    );
    function paused() { return el.sxHover || el.sxPaused || !GO; }
    function sync() { if (!el.sxAnim) return; if (paused()) el.sxAnim.pause(); else el.sxAnim.play(); }
    el.sxSync = sync;
    if (SYNCS.indexOf(sync) < 0) SYNCS.push(sync);
    sync();
    if (!el.sxEvBound) {
      el.sxEvBound = true;
      el.addEventListener("mouseenter", function () { el.sxHover = true; el.sxSync(); });
      el.addEventListener("mouseleave", function () { el.sxHover = false; el.sxSync(); });
      el.addEventListener("focusin", function () { el.sxHover = true; el.sxSync(); });
      el.addEventListener("focusout", function () { el.sxHover = false; el.sxSync(); });
      var btn = el.querySelector("[data-sx-ticker-pause]");
      if (btn) btn.addEventListener("click", function () {
        el.sxPaused = !el.sxPaused;
        btn.setAttribute("aria-pressed", el.sxPaused ? "true" : "false");
        btn.setAttribute("aria-label", el.sxPaused ? "تشغيل الشريط" : "إيقاف الشريط مؤقتًا");
        el.sxSync();
      });
    }
  }

  function setup(el) {
    var track = el.querySelector(".sx-ticker__track");
    if (!track) return;
    if (!el.sxOriginal) el.sxOriginal = track.innerHTML;
    if (el.sxAnim) { el.sxAnim.cancel(); el.sxAnim = null; }
    track.innerHTML = el.sxOriginal;
    track.style.transform = "";
    track.sxSetW = track.scrollWidth;
    if (el.sxTimer) { clearInterval(el.sxTimer); el.sxTimer = null; }
    var v = el.getAttribute("data-variant");
    if (v === "1") {
      marquee(el, track);
    } else {
      var items = track.querySelectorAll(".sx-ticker__item");
      if (v === "2") {
        if (items[0]) items[0].classList.add("is-active");
        if (items.length < 2) return;
        var i = 0;
        // rotation is a discrete swap — runs under reduced motion too, just slower
        el.sxTimer = setInterval(function () {
          items[i].classList.remove("is-active");
          i = (i + 1) % items.length;
          items[i].classList.add("is-active");
        }, parseInt(el.dataset.sxInterval || (reduced ? "7000" : "4500"), 10));
      }
    }
  }

  function init(root) {
    root = root || document;
    var list = [];
    if (root !== document && root.matches && root.matches("[data-sx-ticker]")) list.push(root);
    list = list.concat(Array.prototype.slice.call(root.querySelectorAll("[data-sx-ticker]")));
    list.forEach(setup);
  }
  window.SX = window.SX || {}; SX.initTicker = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
