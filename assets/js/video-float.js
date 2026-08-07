/* SX.videoFloat — persistent floating mini-player groundwork ("PiP").
   On any page with a [data-sx-video-float-root] player: once playback starts and the
   player scrolls out of view, the SAME frame (no reparenting — iframes would reload)
   detaches visually into a fixed corner window via a position:fixed class swap, so
   YouTube/local playback continues uninterrupted while the visitor keeps reading.
   Click the floating frame's title bar to jump back; the close button pauses + exits.

   Cross-page continuity groundwork: the bound player also writes {title, poster,
   time, key} to localStorage as it plays. On any OTHER page, if a recent session
   exists, a small "استكمل المشاهدة" resume chip renders in the same corner — a real
   static site cannot keep a live media element alive across a full navigation/reload,
   so this is the honest bridge: one click returns to video.html and seeks to the
   saved timestamp. Wiring true uninterrupted cross-page audio (e.g. via a persistent
   app shell) is a CMS-side upgrade this groundwork is ready for. */
(function () {
  var KEY = "sx-video-session";
  var STALE_MS = 6 * 60 * 60 * 1000;

  function saveSession(data) {
    try { localStorage.setItem(KEY, JSON.stringify(Object.assign({ ts: Date.now() }, data))); } catch (e) {}
  }
  function readSession() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || Date.now() - s.ts > STALE_MS) return null;
      return s;
    } catch (e) { return null; }
  }
  function clearSession() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function setupFloat(root) {
    if (root.dataset.sxFloatBound) return; root.dataset.sxFloatBound = "1";
    var wrap = root.querySelector(".sx-video__player");
    var frame = wrap && wrap.querySelector(".sx-video-frame");
    if (!wrap || !frame) return;
    var spacer = wrap.querySelector(".sx-video__float-spacer");
    if (!spacer) { spacer = document.createElement("div"); spacer.className = "sx-video__float-spacer"; frame.parentNode.insertBefore(spacer, frame.nextSibling); }
    var sentinel = document.createElement("span");
    sentinel.className = "sx-video__float-sentinel";
    wrap.insertBefore(sentinel, wrap.firstChild);
    var bar = frame.querySelector(".sx-video__floatbar");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "sx-video__floatbar";
      bar.innerHTML = '<span class="sx-video__floatbar-title" data-sx-float-title></span>' +
        '<button type="button" class="sx-video__floatbar-btn" data-sx-float-expand aria-label="التوسيع للأعلى"><svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14v4h4M18 10V6h-4M6 18l6-6M18 6l-6 6"></path></svg></button>' +
        '<button type="button" class="sx-video__floatbar-btn" data-sx-float-close aria-label="إغلاق العرض العائم"><svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg></button>';
      frame.appendChild(bar);
    }
    function titleText() { var c = root.querySelector("[data-sx-video-caption]"); return c ? c.textContent.trim() : document.title; }
    function isPlaying() { return root.classList.contains("is-playing"); }
    function enter() {
      if (frame.classList.contains("is-floating")) return;
      var r = frame.getBoundingClientRect();
      spacer.style.blockSize = r.height + "px";
      spacer.hidden = false;
      frame.classList.add("is-floating");
      var t = bar.querySelector("[data-sx-float-title]");
      if (t) t.textContent = titleText();
      document.documentElement.classList.add("sx-has-float");
    }
    function exit() {
      if (!frame.classList.contains("is-floating")) return;
      frame.classList.remove("is-floating");
      spacer.hidden = true;
      document.documentElement.classList.remove("sx-has-float");
    }
    var io = new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      if (!vis && isPlaying()) enter(); else if (vis) exit();
    }, { threshold: 0.02 });
    io.observe(sentinel);

    bar.querySelector("[data-sx-float-close]").addEventListener("click", function (e) {
      e.stopPropagation();
      var v = frame.querySelector("video"); try { v && v.pause(); } catch (er) {}
      root.classList.remove("is-playing");
      exit();
    });
    bar.querySelector("[data-sx-float-expand]").addEventListener("click", function (e) {
      e.stopPropagation();
      spacer.scrollIntoView({ block: "center" });
    });
    frame.addEventListener("click", function (e) {
      if (!frame.classList.contains("is-floating")) return;
      if (e.target.closest(".sx-video__floatbar")) return;
      e.preventDefault(); e.stopPropagation();
      spacer.scrollIntoView({ block: "center" });
    }, true);

    var lastSave = 0;
    function persist() {
      var now = Date.now();
      if (now - lastSave < 3000) return;
      lastSave = now;
      var poster = root.querySelector(".sx-video__poster");
      var v = frame.querySelector("video");
      saveSession({ title: titleText(), poster: poster ? poster.getAttribute("src") : "", time: v ? v.currentTime : 0, page: location.pathname.split("/").pop() || "video.html" });
    }
    root.addEventListener("click", function () { setTimeout(persist, 300); });
    frame.addEventListener("timeupdate", persist, true);
    window.addEventListener("beforeunload", function () { if (isPlaying()) persist(); else clearSession(); });
  }

  function setupResumeChip() {
    if (document.querySelector("[data-sx-video-float-root]")) return; // this page owns the real player
    var s = readSession();
    var existing = document.querySelector(".sx-resume-chip");
    if (!s) { if (existing) existing.remove(); return; }
    if (existing) return;
    var chip = document.createElement("a");
    chip.className = "sx-resume-chip";
    chip.href = (s.page || "video.html") + "?t=" + Math.floor(s.time || 0) + "#player";
    chip.innerHTML = (s.poster ? '<img src="' + s.poster + '" alt="">' : "") +
      '<span class="sx-resume-chip__play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></span>' +
      '<span class="sx-resume-chip__body"><strong>استكمل المشاهدة</strong><span>' + (s.title || "") + '</span></span>' +
      '<button type="button" class="sx-resume-chip__close" aria-label="إغلاق">&times;</button>';
    document.body.appendChild(chip);
    chip.querySelector(".sx-resume-chip__close").addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation(); clearSession(); chip.remove();
    });
  }

  function applyResumeFromURL(root) {
    var m = location.search.match(/[?&]t=(\d+)/);
    if (!m) return;
    var t = parseInt(m[1], 10);
    if (!t) return;
    var tryApply = function () {
      var v = root.querySelector("video");
      if (v && v.readyState >= 1) { v.currentTime = t; return true; }
      return false;
    };
    var n = 0, iv = setInterval(function () { if (tryApply() || ++n > 20) clearInterval(iv); }, 300);
  }

  function init(root) {
    root = root || document;
    var main = root.querySelector ? root.querySelector("[data-sx-video-float-root]") : null;
    if (main) { setupFloat(main); applyResumeFromURL(main); }
    setupResumeChip();
  }
  window.SX = window.SX || {}; SX.initVideoFloat = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
