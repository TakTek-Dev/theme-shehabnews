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
