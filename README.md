# Shehab News — Flagship Theme (static, CMS-ready)

Production-grade static front-end for **وكالة شهاب للأنباء**. No build step, no framework —
plain HTML + CSS custom properties + vanilla JS modules, structured for extraction into
Blade templates of the Laravel/Livewire CMS. Fully self-contained: no CDN dependencies.

## Folder structure

```
├── index.html                 ← entry point (homepage)
├── *.html                     ← the other pages (see table below)
├── partials/                  ← canonical reusable chrome (header, navigation, sidebar, footer)
├── sections.json              ← section/variant contract consumed by the installer
├── assets/
│   ├── css/
│   │   ├── style.css          ← entry stylesheet: ALL design tokens + reset + header/footer
│   │   ├── sections.css       ← card system + all sections × variants
│   │   ├── components.css     ← atoms/molecules + article prose
│   │   ├── dark.css           ← dark theme (token overrides only)
│   │   └── pages/             ← page-scoped styles (components.css, styleguide.css)
│   ├── js/
│   │   ├── main.js            ← GENERATED bundle of modules/ — the one file pages load
│   │   ├── modules/           ← source modules (theme, menu, tabs, ticker, slider, video,
│   │   │                        video-float, poll, audio, lightbox, ads, swiper-init, numbers)
│   │   └── pages/             ← page-only scripts (archive, search-filters, gallery-filter,
│   │                            video-wall, variants, components)
│   ├── images/                ← logos + placeholder SVGs (+ images/real/ CC press photos)
│   ├── fonts/fonts.css        ← @font-face slot (system stack today — see Fonts)
│   ├── vendor/swiper/         ← Swiper 11 (MIT), vendored — no CDN at runtime
│   └── video/                 ← drop demo-1.mp4 / demo-2.mp4 here (player copes while absent)
├── tools/                     ← dev-only: chrome.js generator, support.js, font-fallback.js,
│                                build-main-js.sh (rebuilds assets/js/main.js)
├── uploads/, screenshots/     ← client reference material — NOT part of the theme runtime
```

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

## Partials (reusable chrome)

`partials/` holds the canonical copy of each shared block, with usage notes inside each file:

- `header.html` — top bar + brand + navbar + mobile drawer/scrim
- `navigation.html` — the navbar alone (reference for the CMS menu builder)
- `sidebar.html` — archive/article widget column
- `footer.html` — newsletter CTA + link grid + legal bar

Static HTML has no include mechanism, so every page embeds an identical copy; the partial
file is the source of truth (re-sync copies if it changes). On the CMS side each becomes
`@include('partials.x')`. Active nav state = add `aria-current="page"` to the current link.

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
| assets/css/style.css | **All design tokens on :root** (palette, type, spacing, radii, shadows, social brand colors) + reset, header, footer, page scaffolding |
| assets/css/sections.css | Card system + all 16 sections × variants + platform surfaces |
| assets/css/components.css | Atoms/molecules + article prose |
| assets/css/dark.css | Dark theme = token overrides on `[data-theme="dark"]` only |
| assets/css/pages/*.css | Page-scoped styles (styleguide + components reference pages only) |

Load order in every head (deliberate cascade): style → sections → components → dark →
vendor swiper → page css. Rules kept throughout: no hex outside token blocks; logical
properties only (RTL-native, `dir="ltr"` fully supported — test with the LTR button in the
styleguide); no `:nth-child` for semantics; every image box has an explicit aspect-ratio +
object-fit; titles are line-clamped; ad boxes reserve their space (zero CLS).

## JS

Pages load **one** deferred bundle: `assets/js/main.js` (preceded by vendored Swiper on pages
with rails, followed by an optional `assets/js/pages/*.js`). The bundle is a plain
concatenation of `assets/js/modules/*` — edit the modules, then rebuild with
`bash tools/build-main-js.sh` (order is defined inside the script; `node --check` validates).

Each module is isolated, self-initializing, idempotent (`data-sx-bound` guard), binds by
data-attribute, and can be re-initialized after DOM injection: `SX.initTabs(root)`,
`initTicker`, `initSlider`, `initVideo`, `initMenu`, `initTheme`, `initPoll`, `initLightbox`,
`initAds`, `initSwipers`, `initNumbers`. `pages/variants.js` is styleguide-only.

The tiny inline `<script>` at the top of every head is the anti-FOUC theme guard
(applies the saved dark mode before first paint) — it stays inline deliberately.

## Vendored libraries & media

- **Swiper 11.2.10** (MIT) powers all horizontal rails — vendored at
  `assets/vendor/swiper/swiper-bundle.min.{js,css}`. No CDN at runtime.
- **Video hub** plays YouTube (youtube-nocookie embeds) and local MP4s with custom
  controls. Drop real files as `assets/video/demo-1.mp4` / `demo-2.mp4` — the player
  shows a styled notice while they are missing.

## Fonts

Brand face kept from the current site: **Helvetica Neue** through the system stack
(`--font-sans` token in style.css), with Arabic-capable fallbacks (Segoe UI, Tahoma,
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
aspect-ratio (zero CLS), `loading="lazy"` below the fold; all scripts `defer`; zero CDN
dependencies.

## Placeholders

assets/images/real/ holds CC-licensed stand-in press photos (see CREDITS.md there) —
replace with agency media before production.

assets/images/ contains neutral SVG stand-ins (wide/square/portrait/poster/avatar) and the two
logo variants (logo-blue for light chrome, logo-white for dark chrome + footer). Replace with
CMS media; every `<img>` already carries width/height and object-fit.
