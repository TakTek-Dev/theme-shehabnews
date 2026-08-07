/* SX pages/components — components.html ONLY.
   1) TOC scrollspy: highlights the .cx-toc link of the .cx-block in view.
   2) Token swatches: resolves each --token to its computed value, shows the
      hex, and copies `var(--token)` to the clipboard on click/Enter/Space.
   3) Toast demo button.
   Extracted from the page's former inline <script> block; loaded with
   `defer`, so the DOM is guaranteed parsed before it runs. */
(function () {
  var links = document.querySelectorAll('.cx-toc a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var a = map[e.target.id]; if (a) a.classList.add('is-active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('.cx-block[id]').forEach(function (s) { io.observe(s); });
  var probe = document.createElement('span');
  document.body.appendChild(probe);
  document.querySelectorAll('.cx-swatch[data-token]').forEach(function (sw) {
    var token = sw.dataset.token;
    probe.style.color = 'rgb(1,2,3)';
    probe.style.color = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    var hexEl = sw.querySelector('[data-hex]');
    if (hexEl) hexEl.textContent = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    function copy() {
      navigator.clipboard && navigator.clipboard.writeText('var(' + token + ')');
      var t = document.createElement('div'); t.className = 'sx-toast'; t.setAttribute('role', 'status');
      t.innerHTML = '<span>نُسخ: var(' + token + ')</span>';
      document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800);
    }
    sw.addEventListener('click', copy);
    sw.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copy(); } });
  });
  probe.remove();

  var toastBtn = document.getElementById('toast-btn');
  if (toastBtn) toastBtn.addEventListener('click', function () {
    var t = document.createElement('div'); t.className = 'sx-toast'; t.setAttribute('role', 'status');
    t.innerHTML = '<span>تم حفظ المادة في المحفوظات</span>';
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  });
})();
