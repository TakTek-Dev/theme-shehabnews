/* SX.swipers — professional rails powered by Swiper 11 (MIT).
   Progressive enhancement: authored markup stays a plain scrollable rail;
   this module wraps it into a Swiper (slidesPerView:auto) with nav arrows,
   edge fades, keyboard and grab-cursor. SX.resetSwipers restores the raw
   markup (used by the styleguide variant switcher). */
(function () {
  var CH_IN = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"></path></svg>';
  var CH_OUT = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"></path></svg>';
  /* [selector, gap(px)] — the arrow-vs-content collision on the pulse rail is
     solved in CSS with a real gutter (.sx-pulse .sx-swiper padding-inline),
     not with slide offsets, so the arrows never sit over a headline at any
     scroll position. See "SWIPER RAILS" in sections.css. */
  var TARGETS = [
    ['.sx-pulse__rail', 0],
    ['.sx-files--v2 .sx-section__body', 16],
    ['.sx-programs--v1 .sx-section__body', 24],
    ['.sx-reels--v1 .sx-section__body', 16]
  ];

  function enhance(el, gap) {
    if (el.dataset.sxSwiper || typeof Swiper === "undefined") return;
    el.dataset.sxSwiper = "1";
    Array.prototype.forEach.call(el.children, function (c) { c.classList.add("swiper-slide"); });
    el.classList.add("swiper-wrapper");
    var rtl = getComputedStyle(el).direction === "rtl";
    var sw = document.createElement("div");
    sw.className = "swiper sx-swiper";
    sw.dir = rtl ? "rtl" : "ltr";
    el.parentNode.insertBefore(sw, el);
    sw.appendChild(el);
    /* Arrow host: a section may offer [data-sx-rail-nav] in its header (see the
       pulse section) — then the arrows live there, statically, and can never
       cover a headline. Without that slot they fall back to floating over the
       rail, which is fine for image rails. */
    var sec = el.closest(".sx-section");
    var navHost = sec && sec.querySelector("[data-sx-rail-nav]");
    if (navHost) navHost.innerHTML = "";
    function mkBtn(cls, label, svg) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "sx-rail__btn " + cls;
      b.setAttribute("aria-label", label); b.innerHTML = svg;
      (navHost || sw).appendChild(b); return b;
    }
    var prev = mkBtn("sx-rail__btn--prev", "السابق", rtl ? CH_IN : CH_OUT);
    var next = mkBtn("sx-rail__btn--next", "التالي", rtl ? CH_OUT : CH_IN);
    function u(s) {
      sw.classList.toggle("is-start", s.isBeginning);
      sw.classList.toggle("is-end", s.isEnd);
    }
    el.sxSwiperInst = new Swiper(sw, {
      slidesPerView: "auto",
      spaceBetween: gap,
      grabCursor: true,
      watchOverflow: true,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: { prevEl: prev, nextEl: next, disabledClass: "is-hidden" },
      on: { init: u, progress: u, resize: u }
    });
  }

  function reset(root) {
    (root || document).querySelectorAll(".sx-swiper").forEach(function (sw) {
      var el = sw.querySelector(".swiper-wrapper");
      if (!el) { sw.remove(); return; }
      if (el.sxSwiperInst) { el.sxSwiperInst.destroy(true, false); el.sxSwiperInst = null; }
      el.classList.remove("swiper-wrapper");
      el.removeAttribute("style");
      delete el.dataset.sxSwiper;
      Array.prototype.forEach.call(el.children, function (c) {
        c.classList.remove("swiper-slide", "swiper-slide-active", "swiper-slide-next", "swiper-slide-prev", "swiper-slide-visible", "swiper-slide-fully-visible");
        c.removeAttribute("style");
      });
      sw.parentNode.insertBefore(el, sw);
      sw.remove();
    });
  }

  function init(root) {
    TARGETS.forEach(function (t) {
      (root || document).querySelectorAll(t[0]).forEach(function (el) { enhance(el, t[1]); });
    });
  }
  window.SX = window.SX || {};
  SX.initSwipers = init;
  SX.resetSwipers = reset;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
