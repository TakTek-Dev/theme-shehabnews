/* SX.videoWall — interactive video wall (video.html hero section). No fixed central
   player: each [data-sx-vwall-item] card plays inline, in place, on click. Only one
   card plays at a time. The active card floats into a corner mini-window if the
   visitor scrolls it out of view, and returns to its slot when scrolled back. */
(function () {
  function buildStage(stage, type, idOrSrc) {
    stage.innerHTML = "";
    if (type === "youtube") {
      var ifr = document.createElement("iframe");
      ifr.src = "https://www.youtube.com/embed/" + idOrSrc + "?autoplay=1&rel=0&playsinline=1";
      ifr.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      ifr.allowFullscreen = true;
      ifr.setAttribute("title", "مشغل الفيديو");
      stage.appendChild(ifr);
    } else {
      var v = document.createElement("video");
      v.src = idOrSrc; v.controls = true; v.autoplay = true; v.playsInline = true;
      stage.appendChild(v);
    }
  }

  function init(root) {
    (root || document).querySelectorAll("[data-sx-video-wall]").forEach(function (wall) {
      if (wall.dataset.sxBound) return; wall.dataset.sxBound = "1";
      var active = null; // currently playing card
      var io = null;

      function disconnectIO() { if (io) { io.disconnect(); io = null; } }

      function closeCard(card) {
        var stage = card.querySelector(".sx-vwall-card__stage");
        stage.innerHTML = ""; stage.hidden = true;
        card.classList.remove("is-playing", "is-floating");
        if (card === active) { active = null; disconnectIO(); }
      }

      function watchFloat(card) {
        disconnectIO();
        io = new IntersectionObserver(function (entries) {
          var vis = entries[0].isIntersecting;
          card.classList.toggle("is-floating", !vis);
        }, { threshold: 0.05 });
        io.observe(card);
      }

      function openCard(card) {
        if (active && active !== card) closeCard(active);
        active = card;
        var stage = card.querySelector(".sx-vwall-card__stage");
        buildStage(stage, card.dataset.videoType, card.dataset.videoType === "youtube" ? card.dataset.videoId : card.dataset.videoSrc);
        stage.hidden = false;
        card.classList.add("is-playing");
        watchFloat(card);
      }

      wall.addEventListener("click", function (e) {
        var closeBtn = e.target.closest(".sx-vwall-card__close");
        if (closeBtn) { e.preventDefault(); closeCard(closeBtn.closest(".sx-vwall-card")); return; }
        var card = e.target.closest("[data-sx-vwall-item]");
        if (!card) return;
        if (card.classList.contains("is-floating")) { e.preventDefault(); card.scrollIntoView({ block: "center" }); return; }
        if (card.classList.contains("is-playing")) return;
        e.preventDefault();
        openCard(card);
      });
    });
  }
  window.SX = window.SX || {}; SX.initVideoWall = init;
  document.addEventListener("DOMContentLoaded", function () { init(document); });
})();
