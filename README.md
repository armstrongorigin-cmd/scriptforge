# ScriptForge

Write in fantasy cyphers and scripts, rendered live onto carved, inked, burned
and enchanted surfaces — for D&D props, hidden messages and forgotten lore.

Zero-dependency PWA (vanilla HTML/CSS/JS, no build step), same pattern as the
Atlas puppy tracker.

## Scripts

| Script | Source | Direction |
|---|---|---|
| Xandarian | Guardians of the Galaxy (user reference chart) | horizontal |
| Willowscript | Creator's charts + practice sheet | vertical stem, top-to-bottom |
| Tendrilis | Anomalis, via Omniglot | continuous vine |
| Dwarvish Runes | original, Davek-inspired | horizontal |
| Aeldari Glyphs | original, Warhammer-inspired | horizontal |

See [SCRIPTS.md](SCRIPTS.md) for the full gap analysis of each reference set
and what was filled in.

## Features

- Live type-to-render editor on a canvas, like a cypher typewriter
- 26 procedural surfaces (papyrus, obsidian brick, birch bark, slate, voidstone…)
- Auto-matched finishes: inked, painted, carved, embossed, scratched,
  burned/branded, chalk, arcane glow — plus weathering, fade, ink color,
  outline, size, spacing, and hand-jitter re-roll
- ~180-phrase D&D library (warnings, tomb inscriptions, curses, prophecies,
  trail cant, riddles…) with search and random pick
- Alphabet key sheet per script (`•` marks glyphs ScriptForge designed to fill
  gaps in the source material)
- PNG export through the iOS share sheet
- Offline-capable (service worker), state persists in localStorage

## Run locally

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1 -Port 8743 -Root scriptforge
```

Then open http://localhost:8743/. (The service worker is disabled on
localhost so edits show up on plain reload.)

## Install on iPhone

1. Push this folder to a GitHub repo and enable GitHub Pages (same as the
   Atlas tracker).
2. Open the Pages URL in Safari → Share → **Add to Home Screen**.
3. After any future change, bump `CACHE_VERSION` in `sw.js` so installed
   phones pick it up.

## Files

- `index.html` / `styles.css` — shell and phone-first UI
- `app.js` — layout engine (horizontal / vertical-stem / vine), material
  effects, UI wiring, export
- `glyphs-*.js` — one vector glyph set per script (stroked SVG paths in a
  100-unit em box)
- `backgrounds.js` — 26 procedural surface textures
- `phrases.js` — phrase library
- `sw.js`, `manifest.webmanifest`, `icon-*.png` — PWA plumbing
- `refs/` — downloaded Tendrilis reference materials
