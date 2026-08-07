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
    if (el.dataset.sxBound) return; el.dataset.sxBound = "1";
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
