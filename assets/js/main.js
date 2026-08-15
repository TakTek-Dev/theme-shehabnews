/* ============================================================
   Shehab News — main.js (bundled theme runtime)
   GENERATED: concatenation of assets/js/modules/* in load order.
   Source of truth = the individual modules; edit THEM, then rebuild:

     cat assets/js/modules/{theme,menu,tabs,ticker,slider,video,video-float,poll,audio,brief,lightbox,ads,swiper-init,numbers}.js >> main.js
     (or run: bash tools/build-main-js.sh)

   Every module is an isolated IIFE: self-initializing on
   DOMContentLoaded, idempotent (per-module data-sx-bound-* guard), binds by
   data-attribute, exposes SX.init* for re-init after DOM injection.
   Loading: ONE deferred file per page + vendor Swiper before it.
   ============================================================ */

/* ── module: theme.js ─────────────────────────────────────────── */
/* SX.theme — dark-mode toggle. Binds [data-sx-theme-toggle]. */
(function () {
  var KEY = "sx-theme";
  function apply(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    document.querySelectorAll("[data-sx-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    });
  }
  function init(root) {
    (root || document).querySelectorAll("[data-sx-theme-toggle]").forEach(function (btn) {
      if (btn.dataset.sxBoundTheme) return; btn.dataset.sxBoundTheme = "1";
      btn.addEventListener("click", function () {
        apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });
  }
  window.SX = window.SX || {}; SX.initTheme = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();

/* ── module: menu.js ─────────────────────────────────────────── */
/* SX.menu — mobile drawer, nav dropdowns, search overlay. */
(function () {
  function init(root) {
    root = root || document;
    root.querySelectorAll("[data-sx-drawer-open]").forEach(function (btn) {
      if (btn.dataset.sxBoundMenu) return; btn.dataset.sxBoundMenu = "1";
      var drawer = document.querySelector("[data-sx-drawer]");
      var scrim = document.querySelector("[data-sx-scrim]");
      if (!drawer) return;
      function set(open) {
        drawer.classList.toggle("is-open", open);
        if (scrim) scrim.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
        if (open) { var f = drawer.querySelector("a,button,input"); if (f) f.focus(); }
      }
      btn.addEventListener("click", function () { set(!drawer.classList.contains("is-open")); });
      drawer.querySelectorAll("[data-sx-drawer-close]").forEach(function (c) {
        c.addEventListener("click", function () { set(false); btn.focus(); });
      });
      if (scrim) scrim.addEventListener("click", function () { set(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) { set(false); btn.focus(); }
      });
    });
    root.querySelectorAll("[data-sx-dropdown]").forEach(function (item) {
      if (item.dataset.sxBoundMenu) return; item.dataset.sxBoundMenu = "1";
      var btn = item.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        document.querySelectorAll("[data-sx-dropdown].is-open").forEach(function (o) {
          if (o !== item) { o.classList.remove("is-open"); var b = o.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false"); }
        });
      });
    });
    root.querySelectorAll("[data-sx-search-toggle]").forEach(function (btn) {
      if (btn.dataset.sxBoundMenu) return; btn.dataset.sxBoundMenu = "1";
      var panel = document.querySelector("[data-sx-search]");
      if (!panel) return;
      btn.addEventListener("click", function () {
        var open = panel.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) { var i = panel.querySelector("input"); if (i) i.focus(); }
      });
    });
  }
  document.addEventListener("click", function (e) {
    if (!e.target.closest("[data-sx-dropdown]")) {
      document.querySelectorAll("[data-sx-dropdown].is-open").forEach(function (o) {
        o.classList.remove("is-open"); var b = o.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll("[data-sx-dropdown].is-open").forEach(function (o) { o.classList.remove("is-open"); });
    var s = document.querySelector("[data-sx-search].is-open");
    if (s) { s.classList.remove("is-open"); var t = document.querySelector("[data-sx-search-toggle]"); if (t) { t.setAttribute("aria-expanded", "false"); t.focus(); } }
  });
  window.SX = window.SX || {}; SX.initMenu = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();

/* ── module: tabs.js ─────────────────────────────────────────── */
/* SX.tabs — accessible tabs. Binds [data-sx-tabs]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-tabs]").forEach(function (el) {
      if (el.dataset.sxBoundTabs) return; el.dataset.sxBoundTabs = "1";
      var tabs = Array.prototype.slice.call(el.querySelectorAll("[role=tab]"));
      var panels = Array.prototype.slice.call(el.querySelectorAll("[role=tabpanel]"));
      function select(i) {
        tabs.forEach(function (t, j) {
          t.setAttribute("aria-selected", i === j ? "true" : "false");
          t.tabIndex = i === j ? 0 : -1;
        });
        panels.forEach(function (p, j) { p.hidden = i !== j; });
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { select(i); });
        t.addEventListener("keydown", function (e) {
          var dir = 0, rtl = (el.closest("[dir]") || document.documentElement).dir !== "ltr";
          if (e.key === "ArrowRight") dir = rtl ? -1 : 1;
          if (e.key === "ArrowLeft") dir = rtl ? 1 : -1;
          if (e.key === "Home") { select(0); tabs[0].focus(); e.preventDefault(); return; }
          if (e.key === "End") { select(tabs.length - 1); tabs[tabs.length - 1].focus(); e.preventDefault(); return; }
          if (!dir) return;
          e.preventDefault();
          var n = (i + dir + tabs.length) % tabs.length;
          select(n); tabs[n].focus();
        });
      });
      select(Math.max(0, tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; })));
    });
  }
  window.SX = window.SX || {}; SX.initTabs = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();

/* ── module: ticker.js ─────────────────────────────────────────── */
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

/* ── module: slider.js ─────────────────────────────────────────── */
/* SX.slider — slider with counter. Binds [data-sx-slider]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-slider]").forEach(function (el) {
      if (el.dataset.sxBoundSlider) return; el.dataset.sxBoundSlider = "1";
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

/* ── module: video.js ─────────────────────────────────────────── */
/* SX.video — "استوديو شهاب" cinema player. Binds [data-sx-video].
   ONE custom control bar drives both sources:
   - YouTube via the IFrame Player API (controls:0, unified seek/mute/fs, onError fallback)
   - Local MP4 via <video>
   Playlist items: data-video-type="youtube|file" + data-video-id / data-video-src + data-poster.
   Auto-advances on end. SX.initVideo(root) is re-init safe. */
(function () {
  var PLAY = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"></path></svg>';
  var PAUSE = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"></path></svg>';
  var VOL = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"></path><path d="M16 9a4 4 0 0 1 0 6"></path></svg>';
  var MUTED = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"></path><path d="m16 9 5 6m0-6-5 6"></path></svg>';

  var ytReady = null;
  function loadYT() {
    if (ytReady) return ytReady;
    ytReady = new Promise(function (res) {
      if (window.YT && YT.Player) return res(window.YT);
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () { if (prev) prev(); res(window.YT); };
      var s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
      setTimeout(function () { res(window.YT || null); }, 8000);
    });
    return ytReady;
  }
  function fmt(s) {
    s = Math.max(0, Math.floor(s || 0));
    var m = Math.floor(s / 60), ss = s % 60;
    return m + ":" + (ss < 10 ? "0" : "") + ss;
  }

  function setup(el) {
    if (el.dataset.sxBoundVideo) return; el.dataset.sxBoundVideo = "1";
    var frame = el.querySelector("[data-sx-video-frame]");
    if (!frame) return;
    var poster = frame.querySelector(".sx-video__poster");
    var video = frame.querySelector("video");
    var embed = frame.querySelector(".sx-video__embed");
    var msg = frame.querySelector(".sx-video__msg");
    var bigPlay = frame.querySelector(".sx-play");
    var glowImg = el.querySelector(".sx-video__glow img");
    var caption = el.querySelector("[data-sx-video-caption]");
    var metaLine = el.querySelector("[data-sx-video-meta]");
    var srcBadge = el.querySelector("[data-sx-video-srcbadge]");
    var btnPlay = frame.querySelector('[data-sx-ctl="play"]');
    var btnMute = frame.querySelector('[data-sx-ctl="mute"]');
    var btnFs = frame.querySelector('[data-sx-ctl="fs"]');
    var fill = frame.querySelector(".sx-video__fill");
    var buff = frame.querySelector(".sx-video__buff");
    var seek = frame.querySelector(".sx-video__seek input");
    var timeEl = frame.querySelector(".sx-video__time");
    var items = Array.prototype.slice.call(el.querySelectorAll("[data-sx-video-item]"));
    if (!items.length || !video) return;
    var current = items[0], mode = null, yt = null, ytTimer = null, muted = false;

    function setPlaying(on) {
      el.classList.toggle("is-playing", on);
      frame.classList.toggle("is-paused", !on);
      if (btnPlay) btnPlay.innerHTML = on ? PAUSE : PLAY;
    }
    function updateBar(cur, dur, buffered) {
      var p = dur ? (cur / dur) * 100 : 0;
      if (fill) fill.style.inlineSize = p + "%";
      if (seek && document.activeElement !== seek) seek.value = p;
      if (timeEl) timeEl.textContent = fmt(cur) + " / " + fmt(dur);
      if (buff && buffered != null && dur) buff.style.inlineSize = Math.min(100, (buffered / dur) * 100) + "%";
    }
    function stopAll() {
      try { video.pause(); } catch (e) {}
      video.removeAttribute("src");
      if (ytTimer) { clearInterval(ytTimer); ytTimer = null; }
      if (yt) { try { yt.destroy(); } catch (e) {} yt = null; }
      embed.innerHTML = ""; embed.hidden = true; video.hidden = true;
      if (msg) msg.hidden = true;
      frame.classList.remove("is-file", "is-embed", "is-error", "is-paused");
      el.classList.remove("is-playing");
      updateBar(0, 0, 0);
      mode = null;
    }
    function fail(text) {
      frame.classList.remove("is-file", "is-embed");
      frame.classList.add("is-error");
      if (msg) { msg.hidden = false; msg.textContent = text; }
      el.classList.remove("is-playing");
    }
    function select(item, autoplay) {
      current = item;
      items.forEach(function (i) { i.classList.toggle("is-active", i === item); });
      var t = item.querySelector(".sx-card__title");
      if (caption && t) caption.textContent = t.textContent.trim();
      if (metaLine) {
        var m = item.querySelector(".sx-card__meta");
        if (m) metaLine.textContent = m.textContent.trim();
      }
      if (srcBadge) srcBadge.textContent = item.dataset.videoType === "youtube" ? "يوتيوب" : "فيديو محلي";
      stopAll();
      var p = item.dataset.poster;
      if (poster && p) poster.src = p;
      if (glowImg && p) glowImg.src = p;
      frame.classList.add("is-poster");
      if (autoplay) play();
    }
    function play() {
      frame.classList.remove("is-poster");
      if (current.dataset.videoType === "youtube") {
        mode = "yt";
        frame.classList.add("is-embed");
        embed.hidden = false;
        var mount = document.createElement("div");
        embed.appendChild(mount);
        loadYT().then(function (YTNS) {
          if (!YTNS) return fail("تعذر تحميل مشغل يوتيوب في هذه البيئة.");
          if (mode !== "yt") return;
          yt = new YTNS.Player(mount, {
            videoId: current.dataset.videoId,
            playerVars: { autoplay: 1, rel: 0, hl: "ar", controls: 0, playsinline: 1, modestbranding: 1 },
            events: {
              onReady: function (e) {
                if (muted) e.target.mute();
                e.target.playVideo();
                // autoplay-policy fallback: if not playing shortly, start muted (always allowed)
                setTimeout(function () {
                  if (yt && yt.getPlayerState && yt.getPlayerState() !== 1) {
                    muted = true;
                    if (btnMute) btnMute.innerHTML = MUTED;
                    yt.mute(); yt.playVideo();
                  }
                }, 1200);
                if (ytTimer) clearInterval(ytTimer);
                ytTimer = setInterval(function () {
                  if (!yt || !yt.getCurrentTime) return;
                  updateBar(yt.getCurrentTime(), yt.getDuration(), yt.getDuration() * (yt.getVideoLoadedFraction ? yt.getVideoLoadedFraction() : 0));
                }, 400);
              },
              onStateChange: function (e) {
                if (e.data === 1) setPlaying(true);
                else if (e.data === 2 || e.data === 0) setPlaying(false);
                if (e.data === 0) next();
              },
              onError: function () { fail("هذا الفيديو غير متاح للتضمين — جرّب عنصرًا آخر من القائمة."); }
            }
          });
        });
      } else {
        mode = "file";
        frame.classList.add("is-file");
        video.hidden = false;
        video.muted = muted;
        video.src = current.dataset.videoSrc;
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function () {});
      }
    }
    function next() {
      var n = items[items.indexOf(current) + 1];
      if (n) select(n, true); else select(items[0], false);
    }
    function toggle() {
      if (frame.classList.contains("is-poster")) return play();
      if (mode === "file") { video.paused ? video.play() : video.pause(); }
      else if (yt && yt.getPlayerState) { yt.getPlayerState() === 1 ? yt.pauseVideo() : yt.playVideo(); }
    }

    bigPlay && bigPlay.addEventListener("click", play);
    poster && poster.addEventListener("click", play);
    items.forEach(function (item) {
      item.addEventListener("click", function (e) {
        if (e.target.closest("a")) e.preventDefault();
        select(item, true);
      });
    });
    btnPlay && btnPlay.addEventListener("click", toggle);
    seek && seek.addEventListener("input", function () {
      var p = seek.value / 100;
      if (mode === "file" && video.duration) video.currentTime = p * video.duration;
      else if (yt && yt.seekTo) yt.seekTo(p * yt.getDuration(), true);
    });
    btnMute && btnMute.addEventListener("click", function () {
      muted = !muted;
      btnMute.innerHTML = muted ? MUTED : VOL;
      if (mode === "file") video.muted = muted;
      else if (yt) { muted ? yt.mute() : yt.unMute(); }
    });
    btnFs && btnFs.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (frame.requestFullscreen) frame.requestFullscreen();
    });
    var btnAudio = frame.querySelector('[data-sx-ctl="audio-only"]');
    if (btnAudio) btnAudio.addEventListener("click", function () {
      var on = el.classList.toggle("is-audio-only");
      btnAudio.setAttribute("aria-pressed", on ? "true" : "false");
    });
    el.addEventListener("click", function (e) {
      var c = e.target.closest("[data-sx-chapter]");
      if (!c) return;
      e.preventDefault();
      var t = parseFloat(c.dataset.time) || 0;
      el.querySelectorAll("[data-sx-chapter]").forEach(function (n) { n.classList.toggle("is-active", n === c); });
      if (frame.classList.contains("is-poster")) play();
      if (mode === "file") { video.currentTime = t; if (video.paused) video.play(); }
      else if (yt && yt.seekTo) { yt.seekTo(t, true); yt.playVideo(); }
    });
    video.addEventListener("play", function () { setPlaying(true); });
    video.addEventListener("pause", function () { setPlaying(false); });
    video.addEventListener("click", toggle);
    video.addEventListener("timeupdate", function () {
      var b = 0;
      try { if (video.buffered.length) b = video.buffered.end(video.buffered.length - 1); } catch (e) {}
      updateBar(video.currentTime, video.duration, b);
    });
    video.addEventListener("ended", next);
    video.addEventListener("error", function () {
      if (!video.getAttribute("src")) return;
      fail("ملف الفيديو المحلي غير متوفر بعد — ضع MP4 في assets/video/ وسيعمل مباشرة.");
    });
    if (btnMute) btnMute.innerHTML = VOL;
    if (btnPlay) btnPlay.innerHTML = PLAY;
    select(items[0], false);
  }

  function init(root) {
    (root || document).querySelectorAll("[data-sx-video]").forEach(setup);
  }
  window.SX = window.SX || {}; SX.initVideo = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();

/* ── module: video-float.js ─────────────────────────────────────────── */
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

/* ── module: poll.js ─────────────────────────────────────────── */
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

/* ── module: audio.js ─────────────────────────────────────────── */
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

/* ── module: brief.js ─────────────────────────────────────────── */
/* SX.brief — «موجز الأخبار»: the audio layer over the dispatch sheet.
   Binds [data-sx-brief]. The sheet is complete WITHOUT this module and
   without an audio file: JS only adds play/seek/track on top of published
   markup, so nothing here is required for the briefing to be readable.

   Contract:
     section[data-sx-brief][data-edition="2026-08-07"]
       audio[data-sx-brief-audio]            — omit src (or leave empty) → silent state
       button[data-sx-brief-play]            — play / pause
       button[data-sx-brief-rate]            — cycles 1 → 1.25 → 1.5 (persisted)
       [data-sx-brief-clock]                 — "mm:ss / mm:ss"
       button[data-sx-brief-resume]          — restores the saved position, pre-seek only
       [data-sx-brief-live]                  — polite live region
       .sx-brief__take[data-at="82"]         — a take; data-at optional (then not seekable)
         button.sx-brief__seek               — jumps to data-at

   Never autoplays. Position is remembered per EDITION, so yesterday's
   offset can never restore onto today's bulletin. */
(function () {
  var KEY = "sx-brief-pos";
  var RATE_KEY = "sx-brief-rate";
  var RATES = [1, 1.25, 1.5];

  function mmss(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function init(root) {
    (root || document).querySelectorAll("[data-sx-brief]").forEach(function (el) {
      if (el.dataset.sxBoundBrief) return; el.dataset.sxBoundBrief = "1";

      var audio = el.querySelector("[data-sx-brief-audio]");
      var playBtn = el.querySelector("[data-sx-brief-play]");
      var rateBtn = el.querySelector("[data-sx-brief-rate]");
      var clock = el.querySelector("[data-sx-brief-clock]");
      var resumeBtn = el.querySelector("[data-sx-brief-resume]");
      var live = el.querySelector("[data-sx-brief-live]");
      var takes = Array.prototype.slice.call(el.querySelectorAll(".sx-brief__take"));
      var edition = el.dataset.edition || "current";

      // Seek buttons work as in-sheet jumps even before any audio exists.
      takes.forEach(function (t) {
        var btn = t.querySelector(".sx-brief__seek");
        if (!btn) return;
        btn.addEventListener("click", function () {
          var at = parseFloat(t.dataset.at);
          if (!audio || !isFinite(at)) return;
          audio.currentTime = at;
          if (audio.paused) audio.play().catch(function () {});
        });
      });

      // No audio source → silent state. The sheet itself is unchanged.
      var src = audio && (audio.getAttribute("src") || (audio.querySelector("source") || {}).src);
      if (!audio || !src) { el.classList.add("is-silent"); return; }
      /* A declared src can still 404 (the TTS job didn't run). Treat a load
         failure exactly like "no audio today" rather than leaving a dead
         play button on the page. */
      audio.addEventListener("error", function () { el.classList.add("is-silent", "is-error"); el.classList.remove("is-playing"); });

      var savedRate = parseFloat(read(RATE_KEY));
      if (RATES.indexOf(savedRate) > -1) { audio.playbackRate = savedRate; if (rateBtn) rateBtn.textContent = "×" + savedRate; }

      // Resume offer — scoped to this edition, pre-seek only, never autoplay.
      var saved = read(KEY);
      if (saved && resumeBtn) {
        try {
          var parsed = JSON.parse(saved);
          if (parsed.edition === edition && parsed.t > 15) {
            resumeBtn.hidden = false;
            resumeBtn.textContent = "تابع من " + mmss(parsed.t);
            resumeBtn.addEventListener("click", function () {
              audio.currentTime = parsed.t;
              resumeBtn.hidden = true;
              audio.play().catch(function () {});
            });
          }
        } catch (e) {}
      }

      function paint() {
        if (clock) clock.textContent = mmss(audio.currentTime) + " / " + mmss(audio.duration || parseFloat(el.dataset.duration) || 0);
      }
      paint();
      audio.addEventListener("loadedmetadata", paint);

      playBtn && playBtn.addEventListener("click", function () {
        if (audio.paused) audio.play().catch(function () {}); else audio.pause();
      });
      audio.addEventListener("play", function () { el.classList.add("is-playing"); if (resumeBtn) resumeBtn.hidden = true; });
      audio.addEventListener("pause", function () { el.classList.remove("is-playing"); });
      audio.addEventListener("ended", function () {
        el.classList.remove("is-playing");
        takes.forEach(function (t) { t.classList.remove("is-on-air"); t.removeAttribute("aria-current"); });
        write(KEY, JSON.stringify({ edition: edition, t: 0 }));
      });

      rateBtn && rateBtn.addEventListener("click", function () {
        var i = (RATES.indexOf(audio.playbackRate) + 1) % RATES.length;
        audio.playbackRate = RATES[i];
        rateBtn.textContent = "×" + RATES[i];
        write(RATE_KEY, String(RATES[i]));
      });

      // Track the active take. The live region fires on take CHANGE only —
      // announcing every timeupdate would flood a screen reader.
      var currentIdx = -1;
      audio.addEventListener("timeupdate", function () {
        paint();
        var t = audio.currentTime, idx = -1;
        for (var i = 0; i < takes.length; i++) {
          var at = parseFloat(takes[i].dataset.at);
          if (isFinite(at) && t >= at) idx = i;
        }
        if (idx === currentIdx) return;
        currentIdx = idx;
        takes.forEach(function (tk, i) {
          tk.classList.toggle("is-on-air", i === idx);
          if (i === idx) tk.setAttribute("aria-current", "true"); else tk.removeAttribute("aria-current");
        });
        if (live && idx > -1) {
          var p = takes[idx].querySelector("p");
          live.textContent = "الآن: " + (p ? p.textContent.trim().slice(0, 90) : "الفقرة " + (idx + 1));
        }
        write(KEY, JSON.stringify({ edition: edition, t: Math.floor(t) }));
      });
    });
  }

  window.SX = window.SX || {}; SX.initBrief = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();

/* ── module: lightbox.js ─────────────────────────────────────────── */
/* SX.lightbox — <dialog> gallery lightbox. Binds [data-sx-lightbox]. */
(function () {
  function init(root) {
    (root || document).querySelectorAll("[data-sx-lightbox]").forEach(function (gal) {
      if (gal.dataset.sxBoundLightbox) return; gal.dataset.sxBoundLightbox = "1";
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

/* ── module: ads.js ─────────────────────────────────────────── */
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

/* ── module: swiper-init.js ─────────────────────────────────────────── */
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

/* ── module: numbers.js ─────────────────────────────────────────── */
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
