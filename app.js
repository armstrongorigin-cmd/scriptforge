/* ScriptForge — cypher text renderer */
(function () {
  'use strict';

  /* ---------- utils ---------- */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex);
    const n = m ? parseInt(m[1], 16) : 0x808080;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
  }
  function shade(hex, amt) { // amt -100..100
    const c = hexToRgb(hex);
    return rgbToHex(c.r + amt * 2.2, c.g + amt * 2.2, c.b + amt * 2.2);
  }
  function mix(h1, h2, t) {
    const a = hexToRgb(h1), b = hexToRgb(h2);
    return rgbToHex(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t);
  }
  function lum(hex) { const c = hexToRgb(hex); return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255; }
  const $ = (id) => document.getElementById(id);

  /* ---------- state ---------- */
  const SCRIPT_ORDER = ['xandarian', 'willowscript', 'tendrilis', 'dwarvish', 'aeldari'];
  const state = {
    text: 'Turn back or be unmade',
    script: 'xandarian',
    bg: 'obsidian',
    size: 1, weather: 0, fade: 0, spacing: 1, thick: 1, sharp: 0.5,
    align: 'center', aspect: 0.8, outline: false,
    effect: 'auto', color: null, seed: 7
  };
  try {
    const saved = JSON.parse(localStorage.getItem('scriptforge-v1') || 'null');
    if (saved && typeof saved === 'object') Object.assign(state, saved);
  } catch (e) { /* fresh start */ }
  let saveTimer = null;
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => localStorage.setItem('scriptforge-v1', JSON.stringify(state)), 250);
  }

  /* ---------- background cache ---------- */
  const bgCache = {};
  function bgDef(id) { return window.BACKGROUNDS.find(b => b.id === id) || window.BACKGROUNDS[0]; }
  function bgCanvas(id, w, h) {
    const key = id + ':' + w + 'x' + h;
    if (bgCache[key]) return bgCache[key];
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    bgDef(id).draw(cv.getContext('2d'), w, h, mulberry32(hashStr(id) ^ 0x9e37));
    bgCache[key] = cv;
    return cv;
  }
  const bgAvgCache = {};
  function bgAvg(id) {
    if (bgAvgCache[id]) return bgAvgCache[id];
    const cv = bgCanvas(id, 64, 64);
    const d = cv.getContext('2d').getImageData(8, 8, 48, 48).data;
    let r = 0, g = 0, b = 0, n = d.length / 4;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
    return (bgAvgCache[id] = rgbToHex(r / n, g / n, b / n));
  }

  /* ---------- glyph helpers ---------- */
  const pathCache = {};
  function p2d(d) { return pathCache[d] || (pathCache[d] = new Path2D(d)); }

  function resolveChar(script, ch) {
    // returns {glyph, extra:[accentPaths]} or null
    const g = script.glyphs;
    if (g[ch]) return { glyph: g[ch] };
    const folded = script.caseFold === 'upper' ? ch.toUpperCase() : ch.toLowerCase();
    if (g[folded]) return { glyph: g[folded] };
    if (script.accentMap && script.accentMap[folded]) {
      const [base, acc] = script.accentMap[folded];
      if (g[base]) return { glyph: g[base], extra: script.accents[acc] };
    }
    // strip diacritics, expand ligatures
    const norm = folded.normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (norm && g[norm]) return { glyph: g[norm] };
    const expand = { 'æ': 'ae', 'œ': 'oe', 'ß': 'ss', 'þ': 'th', 'ð': 'dh' }[folded];
    if (expand) return { multi: expand };
    return null;
  }

  /* ---------- layout ---------- */
  function layout(script, text, cw, ch, opts) {
    const placed = [];   // {paths:[d], x, y, s, lw, idx, abs}
    const margin = Math.min(cw, ch) * 0.1;
    const uw = cw - margin * 2, uh = ch - margin * 2;
    let fontPx = cw * 0.085 * opts.size * (script.dir === 'v' ? 1.15 : 1);

    for (let iter = 0; iter < 6; iter++) {
      placed.length = 0;
      const s = fontPx / 100;
      const lw = script.strokeW * s * (opts.thick || 1);
      let bw, bh;

      if (script.dir === 'v') {
        const slotPx = (g) => ((g.h || script.slotH) / 100) * fontPx;
        const colW = (script.colSpace / 100) * fontPx * opts.spacing;
        const cols = [[]];
        let colH = 0;
        const pushSlot = (item, hpx) => {
          if (colH + hpx > uh && cols[cols.length - 1].length) { cols.push([]); colH = 0; }
          cols[cols.length - 1].push(item); colH += hpx;
        };
        const chars = Array.from(text);
        for (let i = 0; i < chars.length; i++) {
          const ch_ = chars[i];
          if (ch_ === '\n') { cols.push([]); colH = 0; continue; }
          if (ch_ === ' ') { pushSlot({ gap: fontPx * 0.32 }, fontPx * 0.32); continue; }
          const r = resolveChar(script, ch_);
          if (!r) continue;
          if (r.multi) { for (const c2 of r.multi) { const r2 = resolveChar(script, c2); if (r2) pushSlot({ r: r2 }, slotPx(r2.glyph)); } continue; }
          pushSlot({ r }, slotPx(r.glyph));
        }
        // drop empty cols
        const fcols = cols.filter(c => c.length);
        bw = fcols.length * colW;
        bh = Math.max(...fcols.map(c => c.reduce((a, it) => a + (it.gap || slotPx(it.r.glyph)), 0)), 0) + fontPx * 0.3;
        if ((bw > uw || bh > uh) && iter < 5) { fontPx *= Math.min(uw / Math.max(bw, 1), uh / Math.max(bh, 1)) * 0.96; continue; }
        let x = (cw - bw) / 2 + colW / 2;
        let idx = 0;
        const maxColH = Math.max(...fcols.map(c => c.reduce((a, it) => a + (it.gap || slotPx(it.r.glyph)), 0)), 0);
        const blockTop = opts.align === 'left' ? margin : (ch - maxColH - fontPx * 0.3) / 2;
        for (const col of fcols) {
          let y = blockTop;
          for (const it of col) {
            if (it.gap) { y += it.gap; continue; }
            const g = it.r.glyph;
            const paths = it.r.extra ? g.p.concat(it.r.extra) : g.p;
            placed.push({ paths, x: x - fontPx / 2, y, s, lw, idx: idx++ });
            y += slotPx(g);
          }
          // direction arrow at the end of the last column
          if (col === fcols[fcols.length - 1] && script.arrow) {
            placed.push({ paths: script.arrow, x: x - fontPx / 2, y, s, lw, idx: idx++ });
          }
          x += colW;
        }
        return { placed, fontPx };
      }

      // horizontal + vine
      const lsp = (script.letterSpace / 100) * fontPx * opts.spacing;
      const wsp = (script.wordSpace / 100) * fontPx * opts.spacing;
      const lineH = (script.lineHeight || 1.3) * fontPx;
      const advance = (g) => (g.w / 100) * fontPx + lsp;
      const wordW = (word) => word.reduce((a, r) => a + advance(r.glyph), 0);
      const lines = [];
      for (const rawLine of text.split('\n')) {
        const words = [];
        for (const w of rawLine.split(' ')) {
          const rs = [];
          for (const ch_ of Array.from(w)) {
            const r = resolveChar(script, ch_);
            if (!r) continue;
            if (r.multi) { for (const c2 of r.multi) { const r2 = resolveChar(script, c2); if (r2) rs.push(r2); } }
            else rs.push(r);
          }
          if (rs.length) words.push(rs);
        }
        // wrap
        let cur = [], curW = 0;
        for (const wd of words) {
          const ww = wordW(wd);
          if (cur.length && curW + wsp + ww > uw) { lines.push({ words: cur, w: curW }); cur = [wd]; curW = ww; }
          else { cur.push(wd); curW += (cur.length > 1 ? wsp : 0) + ww; }
        }
        lines.push({ words: cur, w: curW });
      }
      bh = lines.length * lineH; bw = Math.max(...lines.map(l => l.w), 0);
      if (bh > uh && iter < 5) { fontPx *= Math.max(Math.sqrt(uh / bh) * 0.96, 0.5); continue; }
      let y = (ch - bh) / 2;
      let idx = 0;
      const vines = [];
      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        let x = opts.align === 'left' ? margin : (cw - line.w) / 2;
        const x0 = x;
        const baseY = y;
        const waveAmp = script.dir === 'vine' ? fontPx * 0.1 : 0;
        const waveY = (xx) => baseY + (waveAmp ? Math.sin(xx * 0.014 + li * 1.9) * waveAmp : 0);
        for (const wd of line.words) {
          for (const r of wd) {
            const g = r.glyph;
            const gy = waveY(x + (g.w / 200) * fontPx) - fontPx * 0.5;
            const paths = r.extra ? g.p.concat(r.extra) : g.p;
            placed.push({ paths, x, y: gy, s, lw, idx: idx++ });
            x += advance(g);
          }
          x += wsp;
        }
        if (script.dir === 'vine' && line.words.length) {
          const x1 = x - wsp - lsp;
          let d = 'M' + (x0 - fontPx * 0.3) + ' ' + waveY(x0 - fontPx * 0.3);
          for (let xx = x0 - fontPx * 0.3; xx <= x1 + fontPx * 0.15; xx += 18) d += ' L' + xx + ' ' + waveY(xx);
          // curled tip
          const tx = x1 + fontPx * 0.15, ty = waveY(tx);
          d += ' Q' + (tx + fontPx * 0.22) + ' ' + (ty - fontPx * 0.05) + ' ' + (tx + fontPx * 0.18) + ' ' + (ty - fontPx * 0.18);
          vines.push({ paths: [d], x: 0, y: 0, s: 1, lw, idx: idx++, abs: true });
        }
        y += lineH;
      }
      for (const v of vines) placed.unshift(v);
      return { placed, fontPx };
    }
    return { placed, fontPx };
  }

  /* ---------- effects ---------- */
  function passesFor(effect, opts) {
    const ink = opts.ink, bg = opts.bgAvg, glow = opts.glow;
    const light = lum(bg) > 0.5 ? shade(bg, 38) : shade(bg, 26);
    const dark = lum(bg) > 0.5 ? shade(bg, -52) : shade(bg, -30);
    switch (effect) {
      case 'painted': return [
        { c: ink, a: 0.3, w: 1.8 },
        { c: ink, a: 0.93, w: 1.05 }
      ];
      case 'carved': return [
        { c: light, a: 0.85, w: 1.0, dx: 0.45, dy: 0.5 },
        { c: opts.override ? ink : mix(dark, '#000000', 0.25), a: 0.92, w: 0.92, dx: -0.08, dy: -0.1 }
      ];
      case 'embossed': return [
        { c: mix(dark, '#000000', 0.2), a: 0.8, w: 1.0, dx: 0.45, dy: 0.5 },
        { c: light, a: 0.55, w: 1.0, dx: -0.3, dy: -0.35 },
        { c: opts.override ? ink : shade(bg, -16), a: 0.95, w: 0.85 }
      ];
      case 'scratched': return [
        { c: mix(bg, '#000000', 0.5), a: 0.5, w: 0.6, dx: 0.4, dy: 0.45 },
        { c: ink, a: 0.8, w: 0.45, j: 1 },
        { c: ink, a: 0.65, w: 0.4, j: 2 },
        { c: ink, a: 0.55, w: 0.38, j: 3 }
      ];
      case 'branded': return [
        { c: '#451f04', a: 0.4, w: 1.8, blur: 2.6 },
        { c: '#2b1204', a: 0.8, w: 1.25, blur: 0.9 },
        { c: opts.override ? ink : '#150a02', a: 0.95, w: 0.82 }
      ];
      case 'chalk': return [
        { c: ink, a: 0.45, w: 1.35, j: 1, erode: 0.5 },
        { c: ink, a: 0.85, w: 0.8, j: 2, erode: 0.32 }
      ];
      case 'glow': return [
        { c: glow, a: 0.5, w: 1.7, blur: 4.5 },
        { c: glow, a: 0.85, w: 1.1, blur: 1.6 },
        { c: mix(glow, '#ffffff', 0.72), a: 1, w: 0.5 }
      ];
      case 'inked':
      default: return [
        { c: ink, a: 0.28, w: 1.35, blur: 0.5 },
        { c: ink, a: 0.93, w: 1 }
      ];
    }
  }

  function renderText(ctx, script, placedInfo, opts) {
    const { placed } = placedInfo;
    let passes = passesFor(opts.effect, opts);
    if (opts.outline) {
      const oc = lum(opts.bgAvg) > 0.5 ? shade(opts.bgAvg, -65) : shade(opts.bgAvg, 40);
      passes = [{ c: oc, a: 0.85, w: 1.7 }].concat(passes);
    }
    const u = opts.weather;
    const blurMul = 2 * (1 - (opts.sharp == null ? 0.5 : opts.sharp));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let pi = 0; pi < passes.length; pi++) {
      const ps = passes[pi];
      for (const g of placed) {
        const R = mulberry32((opts.seed * 2654435761 + g.idx * 40503 + pi * 9973) >>> 0);
        ctx.save();
        ctx.strokeStyle = ps.c;
        let alpha = ps.a * (1 - opts.fade);
        if (u > 0) alpha *= 1 - u * R() * 0.55;
        ctx.globalAlpha = clamp(alpha, 0.02, 1);
        ctx.lineWidth = Math.max(g.lw * ps.w, 0.6);
        if (ps.blur && blurMul > 0.02) { ctx.shadowColor = ps.c; ctx.shadowBlur = g.lw * ps.blur * blurMul; }
        const jit = (ps.j ? g.lw * 0.45 : 0) + u * g.lw * 0.35;
        const dx = (ps.dx || 0) * g.lw + (jit ? (R() - 0.5) * 2 * jit : 0);
        const dy = (ps.dy || 0) * g.lw + (jit ? (R() - 0.5) * 2 * jit : 0);
        const erode = clamp(u * 0.85 + (ps.erode || 0), 0, 1);
        if (erode > 0.04) {
          const seg = 4 + (1 - erode) * 60 * (0.6 + R() * 0.8);
          const gap = erode * 9 * (0.5 + R());
          ctx.setLineDash([seg, gap]);
          ctx.lineDashOffset = R() * 50;
        }
        ctx.translate(g.x + dx, g.y + dy);
        if (u > 0 && !g.abs) {
          ctx.translate(50 * g.s, 50 * g.s);
          ctx.rotate((R() - 0.5) * u * 0.07);
          ctx.translate(-50 * g.s, -50 * g.s);
        }
        ctx.scale(g.s, g.s);
        for (const d of g.paths) ctx.stroke(p2d(d));
        ctx.restore();
      }
    }
  }

  /* ---------- main render ---------- */
  const stage = $('stage');
  function canvasSize() {
    const aspect = state.aspect; // w/h
    let w = Math.min(1500, Math.round(Math.sqrt(3000000 * aspect)));
    return { w, h: Math.round(w / aspect) };
  }
  function render() {
    const { w, h } = canvasSize();
    if (stage.width !== w || stage.height !== h) { stage.width = w; stage.height = h; }
    const ctx = stage.getContext('2d');
    const bg = bgDef(state.bg);
    ctx.setLineDash([]);
    ctx.drawImage(bgCanvas(bg.id, w, h), 0, 0);
    const script = window.SCRIPTS[state.script];
    if (!script || !state.text.trim()) return;
    const effect = state.effect === 'auto' ? bg.effect : state.effect;
    const baseWeather = bg.weather || 0;
    const opts = {
      size: state.size, spacing: state.spacing, align: state.align,
      thick: state.thick, sharp: state.sharp,
      weather: clamp(state.weather + baseWeather * (state.weather === 0 ? 1 : 0.4), 0, 1),
      fade: state.fade, seed: state.seed,
      effect,
      ink: state.color || bg.ink,
      override: !!state.color,
      glow: state.color || bg.ink,
      bgAvg: bgAvg(bg.id),
      outline: state.outline
    };
    const placedInfo = layout(script, state.text, w, h, opts);
    renderText(ctx, script, placedInfo, opts);
  }
  let renderTimer = null;
  function queueRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => { render(); persist(); }, 90);
  }

  /* ---------- UI ---------- */
  function buildScriptChips() {
    const row = $('script-chips');
    row.innerHTML = '';
    for (const id of SCRIPT_ORDER) {
      const sc = window.SCRIPTS[id];
      if (!sc) continue;
      const b = document.createElement('button');
      b.className = 'chip' + (state.script === id ? ' active' : '');
      b.textContent = sc.name;
      b.title = sc.tag;
      b.onclick = () => { state.script = id; buildScriptChips(); queueRender(); };
      row.appendChild(b);
    }
  }
  function buildBgStrip() {
    const row = $('bg-strip');
    row.innerHTML = '';
    for (const bg of window.BACKGROUNDS) {
      const b = document.createElement('button');
      b.className = 'bg-thumb' + (state.bg === bg.id ? ' active' : '');
      b.title = bg.name;
      const cv = document.createElement('canvas');
      cv.width = 96; cv.height = 96;
      bg.draw(cv.getContext('2d'), 96, 96, mulberry32(hashStr(bg.id) ^ 0x9e37));
      b.appendChild(cv);
      b.onclick = () => {
        state.bg = bg.id;
        document.querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('active'));
        b.classList.add('active');
        $('bg-name').textContent = bg.name;
        if (state.effect !== 'auto') { state.effect = 'auto'; $('ctl-effect').value = 'auto'; }
        queueRender();
      };
      row.appendChild(b);
    }
    $('bg-name').textContent = bgDef(state.bg).name;
  }
  function buildEffectSelect() {
    const sel = $('ctl-effect');
    const opts = [['auto', 'Auto (match surface)'], ['inked', 'Inked'], ['painted', 'Painted'], ['carved', 'Carved'], ['embossed', 'Embossed'], ['scratched', 'Scratched'], ['branded', 'Burned / branded'], ['chalk', 'Chalk'], ['glow', 'Arcane glow']];
    sel.innerHTML = opts.map(o => '<option value="' + o[0] + '">' + o[1] + '</option>').join('');
    sel.value = state.effect;
    sel.onchange = () => { state.effect = sel.value; queueRender(); };
  }

  /* sheets */
  function openSheet(id) { $(id).hidden = false; $('sheet-backdrop').hidden = false; }
  function closeSheets() {
    $('phrase-sheet').hidden = true; $('legend-sheet').hidden = true; $('sheet-backdrop').hidden = true;
  }
  $('sheet-backdrop').onclick = closeSheets;
  document.querySelectorAll('.sheet-close').forEach(b => b.onclick = closeSheets);

  /* phrases */
  let phraseCat = 'All';
  function buildPhraseCats() {
    const row = $('phrase-cats');
    row.innerHTML = '';
    const cats = ['All'].concat(window.PHRASES.map(p => p.cat));
    for (const cat of cats) {
      const b = document.createElement('button');
      b.className = 'chip' + (phraseCat === cat ? ' active' : '');
      b.textContent = cat;
      b.onclick = () => { phraseCat = cat; buildPhraseCats(); buildPhraseList(); };
      row.appendChild(b);
    }
  }
  function buildPhraseList() {
    const q = $('phrase-search').value.trim().toLowerCase();
    const ul = $('phrase-list');
    ul.innerHTML = '';
    for (const group of window.PHRASES) {
      if (phraseCat !== 'All' && group.cat !== phraseCat) continue;
      for (const ph of group.items) {
        if (q && !ph.toLowerCase().includes(q)) continue;
        const li = document.createElement('li');
        li.innerHTML = ph + '<span class="cat-tag">' + group.cat + '</span>';
        li.onclick = () => {
          state.text = ph; $('input').value = ph;
          closeSheets(); queueRender(); toast('Phrase set');
        };
        ul.appendChild(li);
      }
    }
    if (!ul.children.length) ul.innerHTML = '<li style="color:var(--dim)">No matches</li>';
  }
  $('btn-phrases').onclick = () => { buildPhraseCats(); buildPhraseList(); openSheet('phrase-sheet'); };
  $('phrase-search').oninput = buildPhraseList;
  $('btn-random').onclick = () => {
    const all = window.PHRASES.flatMap(g => g.items);
    const ph = all[Math.floor(Math.random() * all.length)];
    state.text = ph; $('input').value = ph;
    queueRender();
  };

  /* legend */
  function buildLegend() {
    const script = window.SCRIPTS[state.script];
    $('legend-title').textContent = script.name + ' key';
    $('legend-note').textContent = (script.note || '') + (script.dir === 'v' ? ' Written top-to-bottom.' : '');
    const grid = $('legend-grid');
    grid.innerHTML = '';
    const keys = Object.keys(script.glyphs).filter(k => k !== ' ');
    for (const k of keys) {
      const g = script.glyphs[k];
      const cell = document.createElement('div');
      cell.className = 'legend-cell';
      const cv = document.createElement('canvas');
      cv.width = 104; cv.height = 104;
      const c = cv.getContext('2d');
      c.strokeStyle = '#e8dcc8'; c.lineCap = 'round'; c.lineJoin = 'round';
      c.lineWidth = script.strokeW;
      const gh = g.h || 100;
      const sc = 86 / Math.max(100, gh);
      c.translate(52 - 50 * sc, 52 - (gh / 2) * sc);
      c.scale(sc, sc);
      for (const d of g.p) c.stroke(p2d(d));
      const label = document.createElement('span');
      label.textContent = (k === '.' ? 'period' : k) + (g.added ? ' •' : '');
      cell.appendChild(cv); cell.appendChild(label);
      grid.appendChild(cell);
    }
    openSheet('legend-sheet');
  }
  $('btn-legend').onclick = buildLegend;

  /* toast */
  let toastTimer = null;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
  }

  /* export */
  $('btn-export').onclick = () => {
    stage.toBlob(async (blob) => {
      if (!blob) { toast('Export failed'); return; }
      const name = 'scriptforge-' + state.script + '-' + Date.now() + '.png';
      const file = new File([blob], name, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file] }); return; } catch (e) { if (e.name === 'AbortError') return; }
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast('Image saved');
    }, 'image/png');
  };

  /* controls */
  const input = $('input');
  input.value = state.text;
  input.oninput = () => { state.text = input.value; queueRender(); };
  function bindRange(id, key) {
    const el = $(id);
    el.value = state[key];
    el.oninput = () => { state[key] = parseFloat(el.value); queueRender(); };
  }
  bindRange('ctl-size', 'size');
  bindRange('ctl-thick', 'thick');
  bindRange('ctl-sharp', 'sharp');
  bindRange('ctl-weather', 'weather');
  bindRange('ctl-fade', 'fade');
  bindRange('ctl-spacing', 'spacing');
  $('ctl-aspect').value = String(state.aspect);
  $('ctl-aspect').onchange = (e) => { state.aspect = parseFloat(e.target.value); queueRender(); };
  $('ctl-align').value = state.align;
  $('ctl-align').onchange = (e) => { state.align = e.target.value; queueRender(); };
  $('ctl-outline').checked = state.outline;
  $('ctl-outline').onchange = (e) => { state.outline = e.target.checked; queueRender(); };
  $('ctl-color').value = state.color || '#aa8855';
  $('ctl-color').oninput = (e) => { state.color = e.target.value; queueRender(); };
  $('ctl-color-reset').onclick = () => { state.color = null; queueRender(); toast('Using surface default ink'); };
  $('ctl-reseed').onclick = () => { state.seed = (state.seed * 16807 + 13) % 2147483647; queueRender(); };

  /* init */
  buildScriptChips();
  buildBgStrip();
  buildEffectSelect();
  render();

  const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);
  if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !isLocal) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
