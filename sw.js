importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
	
	// html
	workbox.routing.registerRoute(
	  new RegExp('.*\.html'),
	  workbox.strategies.cacheOnly()
	); 
	
	// js
	workbox.routing.registerRoute(
		new RegExp('.*\.js'),
		workbox.strategies.networkFirst({
			// Use a custom cache name
			cacheName: 'js-cache',
		})
	);

	workbox.routing.registerRoute(
		// Cache CSS files
		/.*\.css/,
		// Use cache but update in the background ASAP
		workbox.strategies.staleWhileRevalidate({
			// Use a custom cache name
			cacheName: 'css-cache',
		})
	);

	workbox.routing.registerRoute(
		// Cache image files
		/.*\.(?:png|jpg|jpeg|svg|gif)/,
		// Use the cache if it's available
		workbox.strategies.cacheFirst({
			// Use a custom cache name
			cacheName: 'image-cache',
			plugins: [
				new workbox.expiration.Plugin({
					// Cache only 20 images
					maxEntries: 20,
					// Cache for a maximum of a week
					maxAgeSeconds: 7 * 24 * 60 * 60,
				})
			],
		})
	);
} else {
	console.log(`Boo! Workbox didn't load 😬`);
}