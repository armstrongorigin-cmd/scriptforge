# ScriptForge — Script Reference & Gap Analysis

How each cypher was sourced, what the reference materials contained, what was
missing or inconsistent, and what ScriptForge added to fill the gaps.

---

## 1. Xandarian (Guardians of the Galaxy)

**Sources:** User-provided chart (`11.jpg`) + 38 individual glyph images (A–Z, 0–9, period).

**Coverage in source:** A–Z, digits 0–9, period. Single-case script (no lowercase exists).

**Issues found:**
- No punctuation beyond the period — comma, question mark, exclamation, quotes,
  apostrophe, colon, semicolon, dash, parens and slash were all missing.
- The digits are compact bar-based glyphs that are easy to confuse at small
  sizes (0 vs 5 vs 7 are all bar+dot arrangements); rendered faithfully.

**Filled in by ScriptForge** (marked `•` in the in-app key): comma, `? ! ' " : ; - ( ) / +`
designed in the same angular, rounded-terminal HUD style. The period's diamond
shape was reused as the "dot" motif across `? ! : ;` for consistency.

---

## 2. Willowscript

**Sources:** Creator's "final version" chart (canonical), the earlier "updated
chart", two accent-marker sheets, and a practice-page photo.

**Coverage in source:** a–z, 0–9, rich punctuation (period `//`, comma `/`,
question `~`, exclamation zigzag, quote/paren curl, ellipsis `///`, colon,
semicolon, dash/slash, apostrophe), six accent markers (macron, acute, grave,
circumflex, caron/umlaut, tilde) and special letters æ, œ, ç, ñ, ß, þ.

**Structural findings (from the practice sheet):**
- Written **vertically**: letters are curls/loops/dots attached to a continuous
  central stem, read top-to-bottom, columns left-to-right.
- A small **arrowhead at the end of the text** marks reading direction —
  reproduced by the renderer.
- Words are separated by short breaks in the stem.

**Issues found:**
- The two charts disagree slightly on several digit shapes; the chart labeled
  "my final version" was treated as canonical.
- Several digits intentionally mimic letters (5 ≈ b, 0 ≈ p's loop, 4 ≈ x's curl).
  This is a property of the source script, kept faithfully — numbers are meant
  to be read from context. Digit loops were sized/positioned slightly lower than
  their letter twins to help disambiguate.

**Filled in by ScriptForge:** nothing invented — only normalization of the
hand-drawn forms into clean vectors, and the accent system wired to typed
characters (é, ñ, ü, etc. automatically render base letter + accent mark).

---

## 3. Tendrilis (by Anomalis)

**Sources:** Official chart and sample text from
[omniglot.com/conscripts/tendrilis.htm](https://www.omniglot.com/conscripts/tendrilis.htm)
(saved in `refs/`).

**Coverage in source:** a–z, digits 0–9, math symbols (+ − × ÷ = # % ✱).

**Structural findings:**
- Letters are loops, sprouts, leaves and berries attached to a **continuous
  horizontal vine** — the renderer draws a gently waving shared vine with a
  curled tip, matching the official sample text.
- Digit system: **1–5 = that many berries above the vine; 6–9 = (n−5) berries
  hanging below; 0 = a hollow hanging berry.**

**Issues found:**
- **No punctuation exists at all** in the source.
- `z` (hanging circle) and `0` (hollow hanging berry) are easy to confuse;
  rendered with different stalk treatments per the chart.

**Filled in by ScriptForge** (marked `•`): period (berry pair on the vine),
comma (hanging berry), question (spiral tendril), exclamation (sprout + berry),
apostrophe/quotes (tiny leaves), colon/semicolon (stacked berries), dash,
slash and paired fronds for parentheses — all in the vine idiom.

---

## 4. Dwarvish Runes (Davek-inspired) — original

D&D's official Davek script is commercial WotC material, so this is an
**original rune set in its spirit**: every stroke is a straight chisel cut,
no curves anywhere, optimized for the carved/stone surfaces. Full A–Z, 0–9
and punctuation.

---

## 5. Aeldari Glyphs (Warhammer-inspired) — original

Canon Aeldari/Eldar runes are **logographic** — each rune is a whole concept
(Khaine, doom, the Path), not a letter, so a faithful typeable A–Z cannot
exist. This set is an **original alphabet in the Aeldari visual idiom**:
flowing crescents and sweeps, with a systematic touch — every vowel carries a
floating gem-dot. Full A–Z, 0–9 and punctuation.

---

## Surfaces & finishes

26 procedurally generated surfaces, each with an auto-matched finish
(overridable in Style): inked (papyrus, parchment, vellum, map), scratched
(birch, oak bark, bone, rusted iron), burned/branded (plank, siding, walnut),
embossed (leather), painted (banner, cave wall), carved (obsidian, granite,
marble, sandstone, moss stone, clay, bronze, gold, verdigris), chalk (slate),
arcane glow (voidstone, crystal). Weathering, fade, size, spacing, ink color,
outline and hand-jitter re-roll are adjustable per render.
