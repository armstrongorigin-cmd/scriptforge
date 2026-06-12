/* Willowscript — recreated from the creator's "final version" chart (canonical) with
   the updated chart and practice sheet as cross-reference.
   Written VERTICALLY: letters hang off a continuous central stem, read top to bottom,
   columns left to right, with an arrowhead at the end of the text.
   Glyph space: 100 wide, h tall (default 52), stem at x=50. Letter paths run from
   (50,0) to (50,h) so consecutive slots fuse into one continuous stem.
   Known quirk of the source: several digits closely mimic letters (5~B, 0~P);
   forms follow the chart faithfully — see SCRIPTS.md. */
window.SCRIPTS = window.SCRIPTS || {};
window.SCRIPTS.willowscript = {
  id: 'willowscript',
  name: 'Willowscript',
  tag: 'vertical stem script',
  dir: 'v',
  caseFold: 'lower',
  strokeW: 4.5,
  colSpace: 105,
  slotH: 52,
  arrow: ['M36 0 L50 16', 'M64 0 L50 16'],
  note: 'Letters, digits, punctuation and accents from the reference charts. Digits intentionally resemble letters in the source; read them by context.',
  glyphs: {
    'a': { h: 52, p: ['M50 0 L50 52', 'M66 14 L66.2 14'] },
    'b': { h: 52, p: ['M50 0 L50 14 Q68 14 68 25 Q68 36 50 34 L50 52'] },
    'c': { h: 52, p: ['M50 0 L50 8 Q68 14 66 26 Q64 38 50 40 L50 52', 'M50 40 L36 47'] },
    'd': { h: 52, p: ['M50 0 L50 14 Q32 14 32 25 Q32 36 50 34 L50 52'] },
    'e': { h: 52, p: ['M50 0 L50 52', 'M34 14 L34.2 14'] },
    'f': { h: 52, p: ['M50 0 L50 52', 'M50 8 Q64 8 64 20 Q64 32 50 32 Q36 32 36 20 Q36 8 50 8'] },
    'g': { h: 52, p: ['M50 0 L50 52', 'M50 10 Q70 14 68 28 Q66 40 54 38 Q47 36 51 30'] },
    'h': { h: 52, p: ['M50 0 L50 52', 'M50 14 Q48 3 37 5 Q27 8 32 17'] },
    'i': { h: 52, p: ['M50 0 L50 52', 'M36 6 Q42 6 42 12 Q42 18 36 18 Q30 18 30 12 Q30 6 36 6'] },
    'j': { h: 52, p: ['M50 0 L50 52', 'M50 24 Q68 28 66 38 Q63 48 50 46'] },
    'k': { h: 52, p: ['M50 0 L50 52', 'M50 8 Q64 10 62 18 Q60 25 50 24', 'M50 24 Q66 27 64 37 Q61 46 50 44'] },
    'l': { h: 52, p: ['M50 0 L50 52', 'M60 8 L34 26 L60 44'] },
    'm': { h: 52, p: ['M50 0 L50 52', 'M50 8 Q36 10 38 18 Q40 25 50 24', 'M50 24 Q34 27 36 37 Q39 46 50 44', 'M44 46 Q37 51 33 47'] },
    'n': { h: 52, p: ['M50 0 L50 52', 'M50 14 Q52 3 63 5 Q73 8 68 17'] },
    'o': { h: 52, p: ['M50 0 L50 52', 'M64 6 Q70 6 70 12 Q70 18 64 18 Q58 18 58 12 Q58 6 64 6'] },
    'p': { h: 52, p: ['M50 0 L50 52', 'M50 6 Q64 6 64 20 Q64 34 50 34 Q36 34 36 20 Q36 6 50 6'] },
    'q': { h: 52, p: ['M50 0 L50 52', 'M50 8 Q68 16 66 28 Q64 40 50 42', 'M40 24 L62 22'] },
    'r': { h: 52, p: ['M50 0 L50 52', 'M50 4 Q70 6 68 18 Q64 34 40 46'] },
    's': { h: 52, p: ['M50 0 Q34 12 50 26 Q66 40 50 52'] },
    't': { h: 52, p: ['M50 0 L50 52', 'M36 6 L50 26', 'M38 26 L66 24'] },
    'u': { h: 52, p: ['M50 0 L50 52', 'M58 8 Q58 16 64 16 Q70 16 70 8'] },
    'v': { h: 52, p: ['M50 0 L50 52', 'M50 10 Q34 12 36 22 Q38 30 50 28', 'M42 30 Q34 38 39 44'] },
    'w': { h: 52, p: ['M50 0 L50 52', 'M50 16 Q58 4 68 6 Q76 9 72 20 Q70 26 62 28'] },
    'x': { h: 52, p: ['M50 0 L50 52', 'M64 12 Q52 16 54 26 Q56 36 66 36', 'M58 4 L68 10'] },
    'y': { h: 52, p: ['M50 0 Q36 12 50 26 Q62 38 50 52', 'M54 40 Q66 44 60 50'] },
    'z': { h: 52, p: ['M50 0 L50 6 Q70 16 70 26 Q70 36 50 46 L50 52'] },
    '0': { h: 52, p: ['M50 0 L50 52', 'M50 4 Q60 4 60 14 Q60 24 50 24 Q40 24 40 14 Q40 4 50 4'] },
    '1': { h: 52, p: ['M50 0 L50 52', 'M50 8 Q64 12 60 24 L56 30'] },
    '2': { h: 52, p: ['M50 0 L50 52', 'M42 10 Q44 2 54 4 Q62 6 60 14 Q58 20 52 22'] },
    '3': { h: 52, p: ['M50 0 L50 52', 'M50 12 Q66 16 64 26 Q62 34 52 32'] },
    '4': { h: 52, p: ['M50 0 L50 52', 'M64 10 Q52 12 52 22 Q52 32 64 32', 'M58 32 Q52 40 56 44'] },
    '5': { h: 52, p: ['M50 0 L50 52', 'M50 20 Q68 22 68 32 Q68 42 50 40'] },
    '6': { h: 52, p: ['M50 0 L50 52', 'M50 20 Q32 22 32 32 Q32 42 50 40'] },
    '7': { h: 52, p: ['M50 0 L50 52', 'M38 8 L58 28'] },
    '8': { h: 52, p: ['M50 0 L50 52', 'M58 8 Q68 14 62 22 Q56 28 62 36 Q66 42 58 46'] },
    '9': { h: 52, p: ['M50 0 L50 52', 'M50 4 Q60 4 60 14 Q60 24 50 24 Q40 24 40 14 Q40 4 50 4', 'M62 2 L68 8'] },
    '.': { h: 30, p: ['M40 12 L62 4', 'M40 24 L62 16'] },
    ',': { h: 22, p: ['M40 14 L62 6'] },
    '?': { h: 26, p: ['M34 14 Q42 4 50 12 Q58 20 68 10'] },
    '!': { h: 26, p: ['M38 20 L46 5 L54 20 L62 5'] },
    '"': { h: 24, p: ['M40 6 Q56 4 56 16 L56 20'] },
    '(': { h: 24, p: ['M40 6 Q56 4 56 16 L56 20'] },
    ')': { h: 24, p: ['M60 20 Q44 22 44 10 L44 6'] },
    ':': { h: 26, p: ['M42 16 L60 8', 'M36 6 L36.2 6', 'M66 18 L66.2 18'] },
    ';': { h: 26, p: ['M42 16 L60 8', 'M66 18 L66.2 18'] },
    '-': { h: 26, p: ['M42 18 L60 8', 'M60 8 L70 8', 'M32 18 L42 18'] },
    '/': { h: 26, p: ['M42 18 L60 8', 'M60 8 L70 8', 'M32 18 L42 18'] },
    "'": { h: 26, p: ['M42 16 L60 6', 'M60 6 L70 6', 'M66 16 L66.2 16'] },
    'æ': { h: 52, p: ['M50 0 L50 52', 'M66 14 L66.2 14', 'M34 14 L34.2 14'] },
    'œ': { h: 52, p: ['M50 0 L50 52', 'M64 6 Q70 6 70 12 Q70 18 64 18 Q58 18 58 12 Q58 6 64 6', 'M64 18 Q70 18 70 24 Q70 30 64 30 Q58 30 58 24 Q58 18 64 18'] },
    'ç': { h: 52, p: ['M50 0 L50 8 Q68 14 66 26 Q64 38 50 40 L50 52', 'M50 40 L36 47', 'M40 48 Q36 54 42 56'] },
    'ß': { h: 52, p: ['M50 0 L50 52', 'M50 8 Q66 8 66 16 Q66 24 50 22', 'M50 22 Q68 24 68 34 Q68 44 50 42'] },
    'þ': { h: 52, p: ['M50 0 L50 12 Q70 14 70 27 Q70 40 50 38 L50 52'] }
  },
  /* combining accent marks, drawn in the letter's slot on the free side of the stem */
  accents: {
    macron:  ['M26 8 L26 20', 'M34 8 L34 20'],
    acute:   ['M24 18 L34 6'],
    grave:   ['M24 6 L34 18'],
    circ:    ['M34 6 L24 13 L34 20'],
    caron:   ['M24 6 L34 13 L24 20'],
    umlaut:  ['M24 8 L34 18', 'M34 8 L24 18'],
    tilde:   ['M32 6 Q22 12 32 18']
  },
  /* unicode -> base letter + accent */
  accentMap: {
    'á':['a','acute'], 'à':['a','grave'], 'â':['a','circ'], 'ä':['a','umlaut'], 'ã':['a','tilde'], 'ā':['a','macron'],
    'é':['e','acute'], 'è':['e','grave'], 'ê':['e','circ'], 'ë':['e','umlaut'], 'ē':['e','macron'],
    'í':['i','acute'], 'ì':['i','grave'], 'î':['i','circ'], 'ï':['i','umlaut'], 'ī':['i','macron'],
    'ó':['o','acute'], 'ò':['o','grave'], 'ô':['o','circ'], 'ö':['o','umlaut'], 'õ':['o','tilde'], 'ō':['o','macron'],
    'ú':['u','acute'], 'ù':['u','grave'], 'û':['u','circ'], 'ü':['u','umlaut'], 'ū':['u','macron'],
    'ñ':['n','tilde'], 'ý':['y','acute'], 'š':['s','caron'], 'ž':['z','caron'], 'č':['c','caron']
  }
};
