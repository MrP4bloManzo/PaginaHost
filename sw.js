'use strict';

/* =========================================================
   FASTSERVICE CAMPUS
   ULTRA PREMIUM SERVICE WORKER
   NEXT GEN PWA ENGINE
========================================================= */

/* =========================================================
   VERSION
========================================================= */

const VERSION =
  'fastservice-v10';

const STATIC_CACHE =
  `static-${VERSION}`;

const DYNAMIC_CACHE =
  `dynamic-${VERSION}`;

const IMAGE_CACHE =
  `images-${VERSION}`;

const API_CACHE =
  `api-${VERSION}`;

/* =========================================================
   CACHE LIMITS
========================================================= */

const LIMITS = {

  dynamic: 60,
  images: 80,
  api: 40

};

/* =========================================================
   OFFLINE PAGE
========================================================= */

const OFFLINE_PAGE = `
<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>Sin conexión</title>

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{

  min-height:100vh;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:24px;

  font-family:
    system-ui,
    sans-serif;

  background:
    linear-gradient(
      135deg,
      #ff5a1f,
      #ff8c42
    );

  color:#fff;

}

.offline-card{

  width:100%;
  max-width:420px;

  padding:42px 28px;

  border-radius:34px;

  text-align:center;

  background:
    rgba(255,255,255,.12);

  backdrop-filter:
    blur(20px);

  border:
    1px solid rgba(255,255,255,.15);

}

h1{

  font-size:42px;

  margin-bottom:14px;

}

p{

  line-height:1.7;

  opacity:.9;

  margin-bottom:24px;

}

button{

  border:none;

  padding:16px 24px;

  border-radius:18px;

  background:#fff;

  color:#ff5a1f;

  font-weight:700;

  cursor:pointer;

}

</style>

</head>

<body>

<div class="offline-card">

<h1>
📡 Sin conexión
</h1>

<p>
FastService no pudo conectarse.
Revisa internet e intenta nuevamente.
</p>

<button onclick="location.reload()">
Reintentar 🚀
</button>

</div>

</body>

</html>
`;

/* =========================================================
   STATIC FILES
========================================================= */

const STATIC_ASSETS = [

  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',

  'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'

];

/* =========================================================
   INSTALL
========================================================= */

self.addEventListener(
  'install',
  event => {

    console.log(
      '⚡ Installing SW...'
    );

    event.waitUntil(

      (async () => {

        const cache =
          await caches.open(
            STATIC_CACHE
          );

        await cache.addAll(
          STATIC_ASSETS
        );

        await cache.put(

          './offline.html',

          new Response(
            OFFLINE_PAGE,
            {
              headers: {
                'Content-Type':
                  'text/html'
              }
            }
          )

        );

        await self.skipWaiting();

      })()

    );

  }
);

/* =========================================================
   ACTIVATE
========================================================= */

self.addEventListener(
  'activate',
  event => {

    console.log(
      '🚀 SW Activated'
    );

    event.waitUntil(

      (async () => {

        const keys =
          await caches.keys();

        await Promise.all(

          keys.map(key => {

            if (

              ![
                STATIC_CACHE,
                DYNAMIC_CACHE,
                IMAGE_CACHE,
                API_CACHE
              ].includes(key)

            ) {

              return caches.delete(
                key
              );

            }

          })

        );

        await self.clients.claim();

      })()

    );

  }
);

/* =========================================================
   FETCH
========================================================= */

self.addEventListener(
  'fetch',
  event => {

    const request =
      event.request;

    /* ONLY GET */

    if (
      request.method !== 'GET'
    ) return;

    const url =
      new URL(request.url);

    /* IGNORE EXTENSIONS */

    if (

      url.protocol ===
      'chrome-extension:'

      ||

      url.protocol ===
      'edge-extension:'

      ||

      url.protocol ===
      'moz-extension:'

    ) {

      return;

    }

    /* =====================================================
       HTML
    ====================================================== */

    if (

      request.headers
        .get('accept')
        ?.includes('text/html')

    ) {

      event.respondWith(

        networkFirst(
          request
        )

      );

      return;

    }

    /* =====================================================
       IMAGES
    ====================================================== */

    if (
      request.destination === 'image'
    ) {

      event.respondWith(

        cacheFirst(
          request,
          IMAGE_CACHE,
          LIMITS.images
        )

      );

      return;

    }

    /* =====================================================
       JS/CSS/FONTS
    ====================================================== */

    if (

      request.destination === 'style'
      ||
      request.destination === 'script'
      ||
      request.destination === 'font'

    ) {

      event.respondWith(

        staleWhileRevalidate(
          request
        )

      );

      return;

    }

    /* =====================================================
       APIs
    ====================================================== */

    if (

      url.pathname.includes('/api/')

    ) {

      event.respondWith(

        networkFirstAPI(
          request
        )

      );

      return;

    }

    /* =====================================================
       DEFAULT
    ====================================================== */

    event.respondWith(

      networkWithFallback(
        request
      )

    );

  }
);

/* =========================================================
   STRATEGIES
========================================================= */

/* =========================================================
   NETWORK FIRST
========================================================= */

async function networkFirst(
  request
) {

  try {

    const fresh =
      await fetch(request);

    const cache =
      await caches.open(
        DYNAMIC_CACHE
      );

    cache.put(
      request,
      fresh.clone()
    );

    return fresh;

  } catch {

    const cached =
      await caches.match(
        request
      );

    return (

      cached
      ||
      caches.match(
        './offline.html'
      )

    );

  }

}

/* =========================================================
   CACHE FIRST
========================================================= */

async function cacheFirst(
  request,
  cacheName,
  limit
) {

  const cached =
    await caches.match(
      request
    );

  if (cached) {

    return cached;

  }

  try {

    const fresh =
      await fetch(request);

    const cache =
      await caches.open(
        cacheName
      );

    cache.put(
      request,
      fresh.clone()
    );

    trimCache(
      cacheName,
      limit
    );

    return fresh;

  } catch {

    return new Response(
      '',
      {
        status: 404
      }
    );

  }

}

/* =========================================================
   STALE WHILE REVALIDATE
========================================================= */

async function staleWhileRevalidate(
  request
) {

  const cache =
    await caches.open(
      DYNAMIC_CACHE
    );

  const cached =
    await cache.match(
      request
    );

  const network =
    fetch(request)
      .then(response => {

        cache.put(
          request,
          response.clone()
        );

        return response;

      })
      .catch(() => cached);

  return cached || network;

}

/* =========================================================
   API STRATEGY
========================================================= */

async function networkFirstAPI(
  request
) {

  try {

    const response =
      await fetch(request);

    const cache =
      await caches.open(
        API_CACHE
      );

    cache.put(
      request,
      response.clone()
    );

    trimCache(
      API_CACHE,
      LIMITS.api
    );

    return response;

  } catch {

    return caches.match(
      request
    );

  }

}

/* =========================================================
   NETWORK FALLBACK
========================================================= */

async function networkWithFallback(
  request
) {

  try {

    const response =
      await fetch(request);

    const cache =
      await caches.open(
        DYNAMIC_CACHE
      );

    cache.put(
      request,
      response.clone()
    );

    trimCache(
      DYNAMIC_CACHE,
      LIMITS.dynamic
    );

    return response;

  } catch {

    return caches.match(
      request
    );

  }

}

/* =========================================================
   CACHE TRIMMER
========================================================= */

async function trimCache(
  cacheName,
  limit
) {

  const cache =
    await caches.open(
      cacheName
    );

  const keys =
    await cache.keys();

  if (
    keys.length <= limit
  ) return;

  await cache.delete(
    keys[0]
  );

  trimCache(
    cacheName,
    limit
  );

}

/* =========================================================
   PUSH
========================================================= */

self.addEventListener(
  'push',
  event => {

    let data = {

      title:
        'FastService 🚀',

      body:
        'Nueva actualización disponible'

    };

    if (event.data) {

      try {

        data =
          event.data.json();

      } catch {

        data.body =
          event.data.text();

      }

    }

    const options = {

      body:
        data.body,

      icon:
        'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',

      badge:
        'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',

      vibrate: [200, 100, 200],

      tag:
        'fastservice-notification',

      renotify: true,

      data: {

        url: './',

        createdAt:
          Date.now()

      },

      actions: [

        {
          action: 'open',
          title: 'Abrir 🚀'
        },

        {
          action: 'close',
          title: 'Cerrar'
        }

      ]

    };

    event.waitUntil(

      self.registration
        .showNotification(
          data.title,
          options
        )

    );

  }
);

/* =========================================================
   NOTIFICATION CLICK
========================================================= */

self.addEventListener(
  'notificationclick',
  event => {

    event.notification.close();

    if (
      event.action === 'close'
    ) return;

    event.waitUntil(

      (async () => {

        const clientsList =
          await clients.matchAll({

            type: 'window',
            includeUncontrolled: true

          });

        for (
          const client
          of clientsList
        ) {

          if (
            'focus' in client
          ) {

            return client.focus();

          }

        }

        if (
          clients.openWindow
        ) {

          return clients.openWindow(
            './'
          );

        }

      })()

    );

  }
);

/* =========================================================
   BACKGROUND SYNC
========================================================= */

self.addEventListener(
  'sync',
  event => {

    if (
      event.tag ===
      'sync-orders'
    ) {

      console.log(
        '🔄 Syncing orders...'
      );

      event.waitUntil(

        Promise.resolve()

      );

    }

  }
);

/* =========================================================
   PERIODIC SYNC
========================================================= */

self.addEventListener(
  'periodicsync',
  event => {

    if (
      event.tag ===
      'refresh-content'
    ) {

      event.waitUntil(

        refreshDynamicContent()

      );

    }

  }
);

/* =========================================================
   REFRESH CONTENT
========================================================= */

async function refreshDynamicContent() {

  try {

    const cache =
      await caches.open(
        DYNAMIC_CACHE
      );

    await cache.addAll([
      './index.html',
      './style.css',
      './script.js'
    ]);

    console.log(
      '♻️ Dynamic content refreshed'
    );

  } catch (error) {

    console.error(
      'Refresh failed:',
      error
    );

  }

}

/* =========================================================
   MESSAGE CHANNEL
========================================================= */

self.addEventListener(
  'message',
  event => {

    if (
      !event.data
    ) return;

    switch (
      event.data.type
    ) {

      case 'SKIP_WAITING':

        self.skipWaiting();

        break;

      case 'CLEAR_CACHE':

        clearAllCaches();

        break;

      default:

        break;

    }

  }
);

/* =========================================================
   CLEAR CACHE
========================================================= */

async function clearAllCaches() {

  const keys =
    await caches.keys();

  await Promise.all(

    keys.map(key => {

      return caches.delete(
        key
      );

    })

  );

  console.log(
    '🗑️ Cache cleared'
  );

}

/* =========================================================
   ERROR HANDLER
========================================================= */

self.addEventListener(
  'error',
  error => {

    console.error(
      'SW Error:',
      error
    );

  }
);

self.addEventListener(
  'unhandledrejection',
  error => {

    console.error(
      'Unhandled Promise:',
      error
    );

  }
);

/* =========================================================
   READY
========================================================= */

console.log(
  '🔥 FastService SW Loaded'
);