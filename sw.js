const CACHE = "min-thailand-road-trip-v25";
const ASSETS = ["./", "./index.html", "./manifest-v25.webmanifest", "./icon-192-v25.png", "./icon-512-v25.png", "./scenic-rider.png"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => {
  const u = new URL(event.request.url);
  if (u.protocol === "http:" || u.protocol === "https:") {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(r => { const copy=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return r; }).catch(() => caches.match("./index.html"))));
  }
});
