const VERSION = 'v1.0'; [cite_start]// Diese Nummer bei jedem Update ändern! [cite: 169]
const CACHE_NAME = `italienisch-${VERSION}`;
const ASSETS = ['./', './index.html', './manifest.json'];

// Installation: Cache befüllen
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Erzwingt die sofortige Aktivierung
});

// Aktivierung: Alten Cache löschen
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Daten laden
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});