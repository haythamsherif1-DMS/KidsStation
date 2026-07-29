const CACHE_NAME = 'edrak-cache-v1.37';
// قائمة الملفات والصور اللي عاوزينها تتحمل وتتحفظ
const CACHE_NAME = 'edrak-cache-v1.37'; // ارفع الإصدار هنا أيضاً
const urlsToCache = [
  './index.html?v=1.37',
  './manifest.json?v=1.37',
  './script.js?v=1.37',
  './icon.png?v=1.37', // أضف الأيقونة هنا برقم إصدار جديد
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// استراتيجية جلب البيانات: يحاول يجيب من النت الأول عشان التحديثات، ولو مفيش نت يجيب من الكاش
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});






