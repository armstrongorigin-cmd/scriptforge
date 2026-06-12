/* Procedurally generated surfaces. Each entry: { id, name, effect, ink, draw(ctx,w,h,R) }
   effect = default text finish for the material (user can override).
   R = seeded RNG (0..1). Textures are deterministic per surface. */
window.BACKGROUNDS = (function () {

  function speckle(ctx, w, h, R, n, color, aMax, s0, s1) {
    for (let i = 0; i < n; i++) {
      ctx.globalAlpha = R() * aMax;
      ctx.fillStyle = color;
      const s = s0 + R() * (s1 - s0);
      ctx.fillRect(R() * w, R() * h, s, s);
    }
    ctx.globalAlpha = 1;
  }

  function blotches(ctx, w, h, R, n, color, aMax, r0, r1) {
    for (let i = 0; i < n; i++) {
      const x = R() * w, y = R() * h, r = r0 + R() * (r1 - r0);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const a = (0.25 + R() * 0.75) * aMax;
      g.addColorStop(0, color.replace('A', a.toFixed(3)));
      g.addColorStop(1, color.replace('A', '0'));
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }

  function strokes(ctx, w, h, R, n, color, aMax, len, horiz, wobble, lw) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lw || 1;
    for (let i = 0; i < n; i++) {
      ctx.globalAlpha = 0.05 + R() * aMax;
      const x = R() * w, y = R() * h, l = len * (0.3 + R() * 0.7);
      ctx.beginPath();
      if (horiz) { ctx.moveTo(x, y); ctx.quadraticCurveTo(x + l / 2, y + (R() - 0.5) * wobble, x + l, y + (R() - 0.5) * wobble); }
      else { ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (R() - 0.5) * wobble, y + l / 2, x + (R() - 0.5) * wobble, y + l); }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function vignette(ctx, w, h, strength) {
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,' + strength + ')');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function fill(ctx, w, h, color) { ctx.fillStyle = color; ctx.fillRect(0, 0, w, h); }

  function woodGrain(ctx, w, h, R, base, dark, light, ridgeAlpha) {
    fill(ctx, w, h, base);
    strokes(ctx, w, h, R, 220, dark, ridgeAlpha, w, true, 26, 1.5);
    strokes(ctx, w, h, R, 120, light, ridgeAlpha * 0.7, w, true, 18, 1);
    for (let i = 0; i < 4; i++) { // knots
      const x = R() * w, y = R() * h;
      ctx.strokeStyle = dark;
      for (let r = 4; r < 26; r += 5) {
        ctx.globalAlpha = 0.15 + R() * 0.2;
        ctx.beginPath(); ctx.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  function bricks(ctx, w, h, R, base, mortar, bw, bh, shade) {
    fill(ctx, w, h, mortar);
    let row = 0;
    for (let y = 0; y < h; y += bh, row++) {
      for (let x = (row % 2 ? -bw / 2 : 0); x < w; x += bw) {
        const j = (R() - 0.5) * 6;
        ctx.fillStyle = base;
        ctx.fillRect(x + 3, y + 3, bw - 6, bh - 6);
        ctx.fillStyle = shade;
        ctx.globalAlpha = 0.12 + R() * 0.25;
        ctx.fillRect(x + 3, y + 3 + j, bw - 6, (bh - 6) / 2);
        ctx.globalAlpha = 1;
      }
    }
  }

  const defs = [
    { id: 'papyrus', name: 'Papyrus', effect: 'inked', ink: '#4a3318', draw(c, w, h, R) {
      fill(c, w, h, '#d9c490');
      strokes(c, w, h, R, 260, '#b89a5e', 0.3, w * 0.7, true, 4, 2);
      strokes(c, w, h, R, 260, '#c2a76b', 0.3, h * 0.7, false, 4, 2);
      strokes(c, w, h, R, 80, '#8a6a34', 0.18, w * 0.4, true, 6, 1);
      vignette(c, w, h, 0.22);
    } },
    { id: 'parchment', name: 'Aged Parchment', effect: 'inked', ink: '#3f2c14', draw(c, w, h, R) {
      fill(c, w, h, '#e3d2a9');
      blotches(c, w, h, R, 26, 'rgba(150,110,50,A)', 0.18, 60, 240);
      blotches(c, w, h, R, 10, 'rgba(110,70,25,A)', 0.14, 30, 110);
      speckle(c, w, h, R, 500, '#9a7a40', 0.18, 1, 2.5);
      vignette(c, w, h, 0.3);
    } },
    { id: 'vellum', name: 'Vellum Scroll', effect: 'inked', ink: '#432d12', draw(c, w, h, R) {
      fill(c, w, h, '#ece0c4');
      blotches(c, w, h, R, 16, 'rgba(190,160,110,A)', 0.2, 90, 300);
      speckle(c, w, h, R, 280, '#b89e6e', 0.12, 1, 2);
      vignette(c, w, h, 0.16);
    } },
    { id: 'map', name: 'Weathered Map', effect: 'inked', ink: '#41301a', weather: 0.35, draw(c, w, h, R) {
      fill(c, w, h, '#cdb988');
      blotches(c, w, h, R, 30, 'rgba(140,100,45,A)', 0.22, 50, 200);
      // fold lines
      c.strokeStyle = '#8a6f3e';
      for (let i = 1; i < 4; i++) {
        c.globalAlpha = 0.3; c.lineWidth = 2;
        c.beginPath(); c.moveTo(w * i / 4 + (R() - 0.5) * 20, 0); c.lineTo(w * i / 4 + (R() - 0.5) * 20, h); c.stroke();
      }
      c.globalAlpha = 0.25;
      c.beginPath(); c.moveTo(0, h / 2 + (R() - 0.5) * 30); c.lineTo(w, h / 2 + (R() - 0.5) * 30); c.stroke();
      c.globalAlpha = 1;
      blotches(c, w, h, R, 5, 'rgba(90,60,20,A)', 0.2, 60, 130); // stain rings
      vignette(c, w, h, 0.3);
    } },
    { id: 'birch', name: 'Birch Bark', effect: 'scratched', ink: '#33291f', draw(c, w, h, R) {
      fill(c, w, h, '#e8e3d8');
      strokes(c, w, h, R, 120, '#cfc8ba', 0.4, w * 0.5, true, 3, 3);
      for (let i = 0; i < 26; i++) { // lenticels
        c.globalAlpha = 0.4 + R() * 0.5;
        c.fillStyle = '#4a4038';
        const x = R() * w, y = R() * h, l = 18 + R() * 60;
        c.beginPath(); c.ellipse(x, y, l, 2.2 + R() * 2.4, 0, 0, Math.PI * 2); c.fill();
      }
      c.globalAlpha = 1;
      blotches(c, w, h, R, 9, 'rgba(120,105,88,A)', 0.2, 40, 140);
      vignette(c, w, h, 0.14);
    } },
    { id: 'oakbark', name: 'Oak Bark', effect: 'scratched', ink: '#e6d6ae', draw(c, w, h, R) {
      fill(c, w, h, '#4a3a2c');
      strokes(c, w, h, R, 280, '#241a10', 0.5, h * 0.55, false, 16, 5);
      strokes(c, w, h, R, 170, '#6b5840', 0.4, h * 0.5, false, 14, 3);
      strokes(c, w, h, R, 90, '#1c130b', 0.55, h * 0.7, false, 10, 8);
      vignette(c, w, h, 0.32);
    } },
    { id: 'plank', name: 'Rough Plank', effect: 'branded', ink: '#23150a', draw(c, w, h, R) {
      woodGrain(c, w, h, R, '#8a6a44', '#5e452a', '#a8875c', 0.4);
      for (let y = h / 4; y < h; y += h / 4) { // board seams
        c.globalAlpha = 0.5; c.strokeStyle = '#3a2a18'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
      }
      c.globalAlpha = 1; vignette(c, w, h, 0.22);
    } },
    { id: 'siding', name: 'House Siding', effect: 'branded', ink: '#1d1410', draw(c, w, h, R) {
      fill(c, w, h, '#7e8b8f');
      for (let y = 0; y < h; y += h / 6) {
        c.fillStyle = '#6c797d'; c.fillRect(0, y, w, 6);
        c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(0, y + 6, w, 4);
      }
      strokes(c, w, h, R, 150, '#5a666a', 0.35, h / 7, false, 5, 2); // weather streaks
      strokes(c, w, h, R, 90, '#98a4a8', 0.3, w * 0.3, true, 3, 1.5);
      blotches(c, w, h, R, 8, 'rgba(70,80,70,A)', 0.25, 40, 130);
      vignette(c, w, h, 0.2);
    } },
    { id: 'walnut', name: 'Dark Walnut Board', effect: 'branded', ink: '#120802', draw(c, w, h, R) {
      woodGrain(c, w, h, R, '#4e3522', '#33200f', '#6a4c30', 0.45);
      vignette(c, w, h, 0.3);
    } },
    { id: 'leather', name: 'Tooled Leather', effect: 'embossed', ink: '#3c2210', draw(c, w, h, R) {
      fill(c, w, h, '#8b5a33');
      blotches(c, w, h, R, 20, 'rgba(60,30,10,A)', 0.22, 60, 220);
      speckle(c, w, h, R, 900, '#5e3a1c', 0.22, 1, 2.4); // pores
      speckle(c, w, h, R, 320, '#a8743f', 0.2, 1, 2);
      vignette(c, w, h, 0.38);
    } },
    { id: 'banner', name: 'Cloth Banner', effect: 'painted', ink: '#e8d9a8', draw(c, w, h, R) {
      fill(c, w, h, '#7a2f2a');
      for (let y = 0; y < h; y += 4) { c.globalAlpha = 0.08; c.fillStyle = y % 8 ? '#5e211d' : '#94443e'; c.fillRect(0, y, w, 2); }
      for (let x = 0; x < w; x += 4) { c.globalAlpha = 0.06; c.fillStyle = x % 8 ? '#5e211d' : '#94443e'; c.fillRect(x, 0, 2, h); }
      c.globalAlpha = 1;
      blotches(c, w, h, R, 10, 'rgba(40,12,10,A)', 0.25, 60, 180);
      vignette(c, w, h, 0.3);
    } },
    { id: 'bone', name: 'Bone Plate', effect: 'scratched', ink: '#2b2018', draw(c, w, h, R) {
      fill(c, w, h, '#ddd3bd');
      blotches(c, w, h, R, 14, 'rgba(170,150,115,A)', 0.25, 60, 200);
      strokes(c, w, h, R, 40, '#b3a487', 0.3, 90, true, 50, 1); // hairline cracks
      speckle(c, w, h, R, 260, '#c4b596', 0.2, 1, 2.4);
      vignette(c, w, h, 0.2);
    } },
    { id: 'obsidian', name: 'Obsidian Brick', effect: 'carved', ink: '#000000', draw(c, w, h, R) {
      bricks(c, w, h, R, '#16181d', '#060708', w / 3.2, h / 5.5, '#272b33');
      blotches(c, w, h, R, 14, 'rgba(90,110,140,A)', 0.12, 30, 110); // glassy sheen
      blotches(c, w, h, R, 8, 'rgba(255,255,255,A)', 0.05, 16, 60);
      vignette(c, w, h, 0.4);
    } },
    { id: 'granite', name: 'Granite Slab', effect: 'carved', ink: '#26261f', draw(c, w, h, R) {
      fill(c, w, h, '#8d8d88');
      speckle(c, w, h, R, 1600, '#5e5e58', 0.4, 1, 3);
      speckle(c, w, h, R, 900, '#b3b3ac', 0.35, 1, 2.6);
      speckle(c, w, h, R, 280, '#3c3c38', 0.4, 1.5, 3.4);
      vignette(c, w, h, 0.26);
    } },
    { id: 'marble', name: 'White Marble', effect: 'carved', ink: '#4b4339', draw(c, w, h, R) {
      fill(c, w, h, '#e6e3dd');
      for (let i = 0; i < 9; i++) { // veins
        c.strokeStyle = i % 3 ? '#b9b2a6' : '#8f8a80';
        c.globalAlpha = 0.25 + R() * 0.3; c.lineWidth = 1 + R() * 2;
        c.beginPath();
        let x = R() * w, y = -10;
        c.moveTo(x, y);
        while (y < h + 10) { x += (R() - 0.5) * 90; y += 50 + R() * 70; c.quadraticCurveTo(x + (R() - 0.5) * 60, y - 30, x, y); }
        c.stroke();
      }
      c.globalAlpha = 1;
      blotches(c, w, h, R, 8, 'rgba(200,195,185,A)', 0.4, 80, 240);
      vignette(c, w, h, 0.12);
    } },
    { id: 'slate', name: 'Slate Board', effect: 'chalk', ink: '#eceae2', draw(c, w, h, R) {
      fill(c, w, h, '#2f3438');
      strokes(c, w, h, R, 130, '#22262a', 0.4, w * 0.5, true, 10, 2);
      strokes(c, w, h, R, 80, '#3d444a', 0.35, w * 0.4, true, 8, 1.5);
      blotches(c, w, h, R, 10, 'rgba(220,220,215,A)', 0.05, 40, 150); // chalk haze
      vignette(c, w, h, 0.3);
    } },
    { id: 'sandstone', name: 'Sandstone Wall', effect: 'carved', ink: '#6e5028', weather: 0.3, draw(c, w, h, R) {
      fill(c, w, h, '#c9a36a');
      speckle(c, w, h, R, 1400, '#a8803f', 0.3, 1, 3);
      speckle(c, w, h, R, 600, '#dbbc85', 0.3, 1, 2.6);
      blotches(c, w, h, R, 12, 'rgba(140,100,50,A)', 0.2, 60, 200);
      strokes(c, w, h, R, 24, '#9a7438', 0.25, w * 0.5, true, 14, 2); // strata
      vignette(c, w, h, 0.24);
    } },
    { id: 'cave', name: 'Cave Wall', effect: 'painted', ink: '#a33b1e', draw(c, w, h, R) {
      fill(c, w, h, '#6b5a47');
      blotches(c, w, h, R, 30, 'rgba(40,30,20,A)', 0.35, 50, 220);
      blotches(c, w, h, R, 20, 'rgba(130,112,90,A)', 0.3, 40, 160);
      speckle(c, w, h, R, 700, '#473a2c', 0.3, 1.5, 4);
      vignette(c, w, h, 0.45);
    } },
    { id: 'moss', name: 'Mossy Stone', effect: 'carved', ink: '#252b1f', draw(c, w, h, R) {
      fill(c, w, h, '#707a62');
      speckle(c, w, h, R, 1000, '#566048', 0.35, 1, 3);
      blotches(c, w, h, R, 18, 'rgba(70,105,45,A)', 0.4, 30, 130); // moss patches
      blotches(c, w, h, R, 10, 'rgba(120,140,80,A)', 0.3, 16, 70);
      blotches(c, w, h, R, 12, 'rgba(45,50,40,A)', 0.3, 50, 160);
      vignette(c, w, h, 0.3);
    } },
    { id: 'clay', name: 'Clay Tablet', effect: 'carved', ink: '#5c3a1c', draw(c, w, h, R) {
      fill(c, w, h, '#9a6b42');
      blotches(c, w, h, R, 16, 'rgba(120,75,40,A)', 0.3, 60, 200);
      speckle(c, w, h, R, 400, '#7e5430', 0.2, 1, 2.6);
      // rounded tablet edge shading
      c.strokeStyle = '#5e3c1e'; c.globalAlpha = 0.5; c.lineWidth = 14;
      c.strokeRect(7, 7, w - 14, h - 14);
      c.globalAlpha = 1; vignette(c, w, h, 0.3);
    } },
    { id: 'bronze', name: 'Bronze Plaque', effect: 'carved', ink: '#2e1c06', draw(c, w, h, R) {
      const g = c.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#9a7838'); g.addColorStop(0.5, '#7e5e26'); g.addColorStop(1, '#8e6c30');
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      strokes(c, w, h, R, 220, '#6a4e1e', 0.25, w * 0.6, true, 2, 1); // brush
      strokes(c, w, h, R, 120, '#b3914a', 0.25, w * 0.5, true, 2, 1);
      blotches(c, w, h, R, 6, 'rgba(60,40,10,A)', 0.25, 50, 160);
      vignette(c, w, h, 0.34);
    } },
    { id: 'iron', name: 'Rusted Iron', effect: 'scratched', ink: '#d9c9a8', draw(c, w, h, R) {
      fill(c, w, h, '#4e4540');
      blotches(c, w, h, R, 30, 'rgba(140,70,30,A)', 0.5, 30, 140); // rust
      blotches(c, w, h, R, 16, 'rgba(180,95,40,A)', 0.35, 16, 70);
      speckle(c, w, h, R, 800, '#332c28', 0.4, 1, 3);
      speckle(c, w, h, R, 200, '#8a5a30', 0.4, 1.5, 3);
      vignette(c, w, h, 0.4);
    } },
    { id: 'gold', name: 'Gold Panel', effect: 'carved', ink: '#3e2c08', draw(c, w, h, R) {
      const g = c.createLinearGradient(0, 0, w * 0.7, h);
      g.addColorStop(0, '#e0bc58'); g.addColorStop(0.45, '#c09a38'); g.addColorStop(0.7, '#dcb64e'); g.addColorStop(1, '#a8842c');
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      strokes(c, w, h, R, 160, '#a07e26', 0.2, w * 0.7, true, 2, 1);
      strokes(c, w, h, R, 100, '#f0d27a', 0.22, w * 0.5, true, 2, 1);
      vignette(c, w, h, 0.26);
    } },
    { id: 'verdigris', name: 'Verdigris Copper', effect: 'carved', ink: '#1d2c24', draw(c, w, h, R) {
      fill(c, w, h, '#4e7a68');
      blotches(c, w, h, R, 22, 'rgba(110,180,150,A)', 0.35, 30, 130); // patina
      blotches(c, w, h, R, 14, 'rgba(140,90,50,A)', 0.3, 20, 90); // exposed copper
      speckle(c, w, h, R, 500, '#3a5e4e', 0.3, 1, 3);
      vignette(c, w, h, 0.32);
    } },
    { id: 'void', name: 'Voidstone', effect: 'glow', ink: '#9fd8ff', draw(c, w, h, R) {
      fill(c, w, h, '#0a0a16');
      blotches(c, w, h, R, 7, 'rgba(70,60,140,A)', 0.22, 80, 260); // nebula
      blotches(c, w, h, R, 5, 'rgba(40,90,130,A)', 0.18, 60, 200);
      for (let i = 0; i < 130; i++) {
        c.globalAlpha = 0.25 + R() * 0.75; c.fillStyle = R() > 0.85 ? '#cfe2ff' : '#ffffff';
        const s = R() * 1.8 + 0.4;
        c.fillRect(R() * w, R() * h, s, s);
      }
      c.globalAlpha = 1; vignette(c, w, h, 0.3);
    } },
    { id: 'crystal', name: 'Arcane Crystal', effect: 'glow', ink: '#dcb8ff', draw(c, w, h, R) {
      fill(c, w, h, '#241338');
      for (let i = 0; i < 12; i++) { // facets
        c.globalAlpha = 0.1 + R() * 0.18;
        c.fillStyle = i % 2 ? '#4a2a6e' : '#341d52';
        c.beginPath();
        const x = R() * w, y = R() * h;
        c.moveTo(x, y); c.lineTo(x + (R() - 0.3) * 260, y + (R() - 0.5) * 200); c.lineTo(x + (R() - 0.7) * 260, y + (R() - 0.2) * 240);
        c.closePath(); c.fill();
      }
      c.globalAlpha = 1;
      blotches(c, w, h, R, 8, 'rgba(150,90,220,A)', 0.2, 50, 180);
      strokes(c, w, h, R, 30, '#6e44a0', 0.3, h * 0.4, false, 60, 1.5);
      vignette(c, w, h, 0.36);
    } }
  ];
  return defs;
})();
