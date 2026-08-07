# Shehab News — Flagship Theme (static, CMS-ready)

Production-grade static front-end for **وكالة شهاب للأنباء**. No build step, no framework —
plain HTML + CSS custom properties + vanilla JS modules, structured for extraction into
Blade templates of the Laravel/Livewire CMS.

## Pages

| File | Purpose |
|---|---|
| index.html | Homepage — every section once, in its default variant |
| **styleguide.html** | **Every section × every variant with a live switcher — the review + install reference** |
| article.html | Single article (h1, JSON-LD, author, TTS, related, prev/next) |
| category.html | Archive with filter bar, pagination, sidebar |
| search.html | Results + filters + empty state |
| video.html | Video hub, playlists, programs |
| gallery.html | Albums grid + lightbox |
| writers.html | Writers index + single-writer view |
| special-file.html | Dossier landing |
| page.html | Static page + contact / "send us news" forms |
| 404.html | Not found |
| components.html | Atoms: buttons, badges, forms, tables, modal, toast, skeletons, empty states |

## The section-variant contract

~~~html
<section class="sx-section sx-news sx-news--v2" data-section="news" data-variant="2">
  <div class="sx-container">
    <header class="sx-section__head">…</header>
    <div class="sx-section__body">
      <article class="sx-card sx-card--lead">…</article>
      <article class="sx-card">…</article>
    </div>
  </div>
</section>
~~~

- **A variant switch changes only** `sx-<key>--v<N>` **and** `data-variant`. Markup is shared
  across all variants of a section (verified live in styleguide.html).
- One card partial per section, rendered in a loop. Modifier on the first post only: `sx-card--lead`
  (`sx-card--rank` for ranked lists). Variant CSS decides what each card shows — extra fields
  (excerpt, numerals, portraits) are simply hidden by variants that don't use them, so every
  variant consumes the same data shape.
- Overlay (text-over-image) treatment is applied **by variant scope**, not by card class — see the
  "OVERLAY CARD TREATMENT" block at the end of sections.css.
- Section order is free; every section is self-complete (own vertical padding, no sibling deps).
- `sections.json` mirrors the built markup 1:1 and is safe to feed the installer.

## CSS

| File | Contents |
|---|---|
| assets/css/main.css | **All design tokens on :root** (palette, type, spacing, radii, shadows, social brand colors) + reset, header, footer, page scaffolding |
| assets/css/sections.css | Card system + all 16 sections × variants + platform surfaces |
| assets/css/components.css | Atoms/molecules + article prose |
| assets/css/dark.css | Dark theme = token overrides on `[data-theme="dark"]` only |

Rules kept throughout: no hex outside token blocks; logical properties only (RTL-native,
`dir="ltr"` fully supported — test with the LTR button in the styleguide); no `:nth-child`
for semantics; every image box has an explicit aspect-ratio + object-fit; titles are
line-clamped; ad boxes reserve their space (zero CLS).

## JS modules (assets/js/)

Each module is isolated, self-initializing, idempotent (`data-sx-bound` guard), binds by
data-attribute, and can be re-initialized after DOM injection: `SX.initTabs(root)`,
`initTicker`, `initSlider`, `initVideo`, `initMenu`, `initTheme`, `initPoll`, `initLightbox`, `initAds`.
`variants.js` is styleguide-only. `font-fallback.js` is **dev-only** — delete for production.

## Vendored libraries & media

- **Swiper 11** (MIT) powers all horizontal rails; loaded from jsDelivr for review.
  Before production install, download swiper-bundle.min.{js,css} into assets/vendor/
  and swap the two CDN URLs in each page head.
- **Video hub** plays YouTube (youtube-nocookie embeds) and local MP4s with custom
  controls. Drop real files as assets/video/demo-1.mp4 / demo-2.mp4 — the player
  shows a styled notice while they are missing.

## Fonts

Brand face kept from the current site: **Helvetica Neue** through the system stack
(`--font-sans` token in main.css), with Arabic-capable fallbacks (Segoe UI, Tahoma,
Geeza Pro). No webfont is loaded — zero font bytes, zero FOIT. If the client later
licenses Neue Helvetica Arabic, declare it in assets/fonts/fonts.css and the token
picks it up site-wide.

## Dark mode

First-class theme: `<html data-theme="dark">`, persisted to localStorage (`sx-theme`), toggled
by any `[data-sx-theme-toggle]` button. All recoloring happens in dark.css token overrides —
no filters, no per-component dark rules (plus deliberate image dimming).

## Accessibility & performance

Semantic landmarks; one h1 per page; skip link; visible :focus-visible rings; AA contrast in
both themes; `prefers-reduced-motion` stops the marquee/rotator/shimmer; tabs, drawer,
dropdowns, sliders, lightbox are keyboard-operable. Images: explicit width/height +
aspect-ratio (zero CLS), `loading="lazy"` below the fold; all scripts `defer`; no CDN
dependencies (after removing the dev font fallback).

## Placeholders

assets/img/real/ holds CC-licensed stand-in press photos (see CREDITS.md there) —
replace with agency media before production.


assets/img/ contains neutral SVG stand-ins (wide/square/portrait/poster/avatar) and the two
logo variants (logo-blue for light chrome, logo-white for dark chrome + footer). Replace with
CMS media; every `<img>` already carries width/height and object-fit.
