/* Tendrilis — by Anomalis (omniglot.com/conscripts/tendrilis.htm), recreated from the chart.
   Letters are sprouts, loops and berries attached to a continuous horizontal vine.
   Glyph space: width w, vine baseline at y=50; attachments grow above (y<50) or hang
   below (y>50). The renderer draws the shared waving vine; glyphs draw attachments only.
   Digits: 1-5 = that many berries above the vine, 6-9 = (n-5) berries hanging below,
   0 = hollow hanging berry. Punctuation did not exist in the source chart and was
   designed in-style by ScriptForge (marked added:true). */
window.SCRIPTS = window.SCRIPTS || {};
(function () {
  function berry(x, y) {
    return 'M' + (x - 3) + ' ' + y + ' A3 3 0 1 1 ' + (x + 3) + ' ' + y + ' A3 3 0 1 1 ' + (x - 3) + ' ' + y;
  }
  window.SCRIPTS.tendrilis = {
    id: 'tendrilis',
    name: 'Tendrilis',
    tag: 'vine script by Anomalis',
    dir: 'vine',
    caseFold: 'lower',
    strokeW: 5,
    lineHeight: 1.6,
    letterSpace: 4,
    wordSpace: 46,
    note: 'Letters, digits and math marks from the Omniglot chart. Punctuation was missing from the source and is a ScriptForge in-style addition (marked •).',
    glyphs: {
      'a': { w: 52, p: ['M24 50 Q22 32 34 28 Q44 25 42 34 Q40 44 26 50'] },
      'b': { w: 48, p: ['M22 50 L24 38 Q25 26 33 28 Q40 31 34 40 Q30 45 24 48'] },
      'c': { w: 50, p: ['M36 50 Q20 48 18 38 Q17 30 26 32 Q36 35 36 44 L36 50'] },
      'd': { w: 54, p: ['M26 50 Q28 66 40 70 Q50 73 48 64 Q46 55 32 50'] },
      'e': { w: 48, p: ['M34 50 Q20 52 18 62 Q17 70 26 68 Q33 66 32 58'] },
      'f': { w: 50, p: ['M22 50 Q22 36 32 36 Q42 36 42 50 Q42 64 32 64 Q22 64 22 50'] },
      'g': { w: 52, p: ['M24 50 Q22 32 34 30 Q44 28 40 38 Q37 46 26 50', 'M32 50 Q40 58 34 64'] },
      'h': { w: 52, p: ['M30 50 Q46 54 46 64 Q46 74 36 72 Q28 70 32 62'] },
      'i': { w: 40, p: ['M28 50 L30 38', 'M31 28 L31.2 28'] },
      'j': { w: 42, p: ['M32 50 Q24 58 20 68'] },
      'k': { w: 50, p: ['M26 50 L38 28', 'M31 40 L43 34'] },
      'l': { w: 42, p: ['M26 50 Q30 38 28 26'] },
      'm': { w: 68, p: ['M18 50 A7 9 0 0 1 32 50 A7 9 0 0 1 46 50 A7 9 0 0 1 60 50'] },
      'n': { w: 58, p: ['M22 50 A7 12 0 0 0 36 50 A7 12 0 0 0 50 50'] },
      'o': { w: 44, p: ['M28 50 L28 42', 'M28 30 Q34 30 34 36 Q34 42 28 42 Q22 42 22 36 Q22 30 28 30'] },
      'p': { w: 52, p: ['M26 50 Q42 48 44 38 Q45 30 36 32 Q26 35 26 44 L26 50'] },
      'q': { w: 58, p: ['M20 50 Q16 28 30 24 Q44 21 40 32 Q36 42 22 48 Q34 47 50 50'] },
      'r': { w: 52, p: ['M30 50 L32 36', 'M32 36 Q26 26 34 25 Q40 25 34 34', 'M32 36 Q40 27 45 31 Q48 35 35 37'] },
      's': { w: 50, p: ['M38 50 Q40 40 31 40 Q22 40 26 47 Q30 54 20 56'] },
      't': { w: 50, p: ['M40 28 Q36 22 30 26 Q24 31 28 40 Q31 46 26 50'] },
      'u': { w: 46, p: ['M28 50 L28 56', 'M28 56 Q34 56 34 62 Q34 68 28 68 Q22 68 22 62 Q22 56 28 56', 'M28 76 L28.2 76'] },
      'v': { w: 44, p: ['M30 50 L20 68', 'M26 58 L17 60'] },
      'w': { w: 54, p: ['M26 50 L40 26', 'M32 40 L45 33', 'M29 45 L41 41'] },
      'x': { w: 52, p: ['M38 50 Q22 52 20 60 Q19 68 28 66 Q38 63 38 56 L38 50'] },
      'y': { w: 50, p: ['M30 50 L31 60', 'M31 60 Q23 65 27 71 Q31 76 33 67', 'M31 60 Q39 65 35 71 Q32 76 30 67', 'M31 82 L31.2 82'] },
      'z': { w: 48, p: ['M30 50 Q38 52 38 58 Q38 66 30 66 Q22 66 22 58 Q22 52 30 50'] },
      '1': { w: 46, p: ['M28 50 Q30 42 28 36', berry(29, 29)] },
      '2': { w: 50, p: ['M28 50 Q30 40 26 36', 'M28 44 Q34 40 36 36', berry(25, 30), berry(38, 30)] },
      '3': { w: 52, p: ['M28 50 Q30 40 28 36', berry(28, 26), berry(19, 32), berry(37, 32)] },
      '4': { w: 54, p: ['M30 50 L30 42', berry(23, 27), berry(37, 27), berry(23, 36), berry(37, 36)] },
      '5': { w: 56, p: ['M30 50 L30 44', berry(30, 30), berry(30, 20), berry(20, 30), berry(40, 30), berry(30, 39)] },
      '6': { w: 46, p: ['M28 50 Q26 58 28 64', berry(29, 70)] },
      '7': { w: 50, p: ['M28 50 Q26 58 30 62', 'M29 56 Q35 60 36 64', berry(27, 68), berry(39, 69)] },
      '8': { w: 52, p: ['M28 50 Q26 58 28 62', berry(28, 69), berry(19, 64), berry(37, 64)] },
      '9': { w: 54, p: ['M30 50 L30 58', berry(30, 64), berry(21, 69), berry(39, 69), berry(30, 75)] },
      '0': { w: 48, p: ['M28 50 Q24 56 26 60', 'M28 67 Q34 67 34 73 Q34 79 28 79 Q22 79 22 73 Q22 67 28 67'] },
      '+': { w: 48, p: ['M26 50 L34 30', 'M22 38 L40 34'] },
      '=': { w: 50, p: ['M22 44 L36 32', 'M30 48 L44 36'] },
      '*': { w: 46, p: ['M28 50 L28 44', 'M28 36 Q33 36 33 40 Q33 44 28 44 Q23 44 23 40 Q23 36 28 36', 'M28 28 L28 33', 'M19 37 L23 39', 'M33 39 L37 37'] },
      '.': { w: 46, added: true, p: [berry(22, 50), berry(33, 50)] },
      ',': { w: 38, added: true, p: [berry(27, 59)] },
      '?': { w: 56, added: true, p: ['M26 50 Q22 30 36 26 Q48 23 46 33 Q44 41 36 39 Q31 37 34 32'] },
      '!': { w: 42, added: true, p: ['M28 50 Q30 38 28 30', berry(28, 22)] },
      "'": { w: 38, added: true, p: ['M26 50 Q24 40 32 42 Q36 44 30 50'] },
      '"': { w: 50, added: true, p: ['M22 50 Q20 40 28 42 Q32 44 26 50', 'M34 50 Q32 40 40 42 Q44 44 38 50'] },
      ':': { w: 40, added: true, p: [berry(28, 41), berry(28, 59)] },
      ';': { w: 42, added: true, p: [berry(28, 41), 'M28 54 Q26 60 21 63'] },
      '-': { w: 42, added: true, p: ['M22 42 L36 38'] },
      '/': { w: 42, added: true, p: ['M22 44 L36 32'] },
      '(': { w: 42, added: true, p: ['M30 50 Q20 44 22 32 Q23 26 28 28'] },
      ')': { w: 42, added: true, p: ['M26 50 Q36 44 34 32 Q33 26 28 28'] },
      '×': { w: 50, p: ['M22 50 Q34 32 42 40 Q48 46 38 50'] },
      '÷': { w: 44, p: ['M30 34 Q24 42 32 50 Q40 58 32 66'] }
    }
  };
})();
