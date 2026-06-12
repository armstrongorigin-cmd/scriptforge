/* ScriptForge service worker — cache-first, bump CACHE_VERSION on every change */
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'scriptforge-' + CACHE_VERSION;
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './backgrounds.js',
  './phrases.js',
  './glyphs-xandarian.js',
  './glyphs-willowscript.js',
  './glyphs-tendrilis.js',
  './glyphs-dwarvish.js',
  './glyphs-aeldari.js',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith('scriptforge-') && k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request))
  );
});
