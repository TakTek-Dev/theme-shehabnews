#!/usr/bin/env bash
# Rebuild assets/js/main.js from assets/js/modules/* (no build system needed).
# Run from the theme root:  bash tools/build-main-js.sh
set -euo pipefail
cd "$(dirname "$0")/.."

ORDER=(theme menu tabs ticker slider video video-float poll audio lightbox ads swiper-init numbers)
OUT=assets/js/main.js

{
  cat <<'EOF'
/* ============================================================
   Shehab News — main.js (bundled theme runtime)
   GENERATED: concatenation of assets/js/modules/* in load order.
   Source of truth = the individual modules; edit THEM, then rebuild:

     cat assets/js/modules/{theme,menu,tabs,ticker,slider,video,video-float,poll,audio,lightbox,ads,swiper-init,numbers}.js >> main.js
     (or run: bash tools/build-main-js.sh)

   Every module is an isolated IIFE: self-initializing on
   DOMContentLoaded, idempotent (per-module data-sx-bound-* guard), binds by
   data-attribute, exposes SX.init* for re-init after DOM injection.
   Loading: ONE deferred file per page + vendor Swiper before it.
   ============================================================ */
EOF
  for m in "${ORDER[@]}"; do
    echo
    echo "/* ── module: $m.js ─────────────────────────────────────────── */"
    cat "assets/js/modules/$m.js"
  done
} > "$OUT"

node --check "$OUT" 2>/dev/null && echo "OK: $OUT rebuilt ($(wc -l < "$OUT") lines)" || echo "WARNING: rebuilt but node not available for syntax check"
