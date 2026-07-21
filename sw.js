const CACHE_VERSION = 'qo-v34';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './hintergrund-host.css',
  './auth.js',
  './avatare.js',
  './zurueck.js',
  './symbole.js',
  './host-fx.js',
  './sound-toggle.js',
  './buzzer-fx.js',
  './hintergrund.js',
  './bestenliste.js',
  './spiel-beenden.js',
  './pwa.js',
  './statistiken/',
  './statistiken/index.html',
  './anleitung/',
  './anleitung/index.html',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const istHTML =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  event.respondWith(
    fetch(req, { cache: 'no-store' })
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => {
          if (hit) return hit;
          if (istHTML) return caches.match('./index.html');
          return Response.error();
        })
      )
  );
});
