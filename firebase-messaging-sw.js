// self.addEventListener("fetch", (event)=>{
//   console.log(event);
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('app').then(function (cache) {
            return cache.addAll(
        ['/',
          'resources/css/style.css',
          'resources/js/index.js',

            'https://code.jquery.com/jquery-3.2.1.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
            'https://fonts.googleapis.com/icon?family=Material+Icons'

        ]
            );
        })
    );
});
