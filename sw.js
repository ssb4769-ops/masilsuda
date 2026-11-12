// 마실수다 서비스 워커: 앱 화면을 저장해 두어 빠르게 열고, 인터넷이 약해도 화면이 뜨게 합니다.
// 화면 파일을 바꾸면 아래 버전을 올려 주세요.
const CACHE = 'masilsuda-v1';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
// 한 번 받으면 다시 받을 필요가 없는 외부 파일 (스타일, 글꼴, 라이브러리)
const STATIC_HOSTS = ['cdn.tailwindcss.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // 같은 사이트 파일: 항상 최신을 먼저 받고, 안 되면 저장본 사용
    if (url.origin === self.location.origin) {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE).then((c) => c.put(req, copy));
                    return res;
                })
                .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
        );
        return;
    }

    // 외부 정적 파일: 저장본을 먼저 쓰고 없으면 받아서 저장
    if (STATIC_HOSTS.includes(url.hostname)) {
        event.respondWith(
            caches.match(req).then((cached) => cached || fetch(req).then((res) => {
                const copy = res.clone();
                caches.open(CACHE).then((c) => c.put(req, copy));
                return res;
            }))
        );
    }
    // 그 밖의 요청(Supabase 데이터 등)은 손대지 않습니다.
});
