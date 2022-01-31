if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/serviceworker.js").then(
      function (registration) {
        // Registration was successful
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  "/img/Abbas Zabier.png",
  "/img/adobe-illustrator-cc 1.png",
  "/img/adobe-photoshop-cs6 1.png",
  "/img/adobe-xd-1 1.png",
  "/img/bg-servicefix2.png",
  "/img/bootstrap-4 1.png",
  "/img/cartographer.png",
  "/img/css-5 1.png",
  "/img/Dicipline.png",
  "/img/direct-download 1.png",
  "/img/Ellipse 1.png",
  "/img/email 1.png",
  "/img/facebook 1.png",
  "/img/figma-1 1.png",
  "/img/fotdir.png",
  "/img/Fotodiri.png",
  "/img/Group 12.jpg",
  "/img/Group 21.png",
  "/img/Hardwork.png",
  "/img/html5 (1) 1.png",
  "/img/instagram 1.png",
  "/img/JavaScript-logo 1.png",
  "/img/link 1.png",
  "/img/Logo.png",
  "/img/Minjemin.png",
  "/img/pembatas.png",
  "/img/project.png",
  "/img/Rectangle 36.png",
  "/img/Rectangle 39.png",
  "/img/Rectangle 50.png",
  "/img/Rectangle.png",
  "/img/Trabo App Presentation 1.jpg",
  "/img/Trend.png",
  "/img/twitter 1.png",
  "/img/YoSinau.png",
  "/index.html",
  "/manifest.json",
  "/serviceworker.js",
  "/vanilla-tilt.js",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  var cacheAllowlist = CACHE_NAME;

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
