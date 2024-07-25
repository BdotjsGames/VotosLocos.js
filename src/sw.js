self.addEventListener("install", function(event) {
	
	self.addEventListener("fetch", function(event) {
		event.respondWith(checkResponse(event.request).catch(function() {
			return returnFromCache(event.request);
		}));
		event.waitUntil(addToCache(event.request));
	});

	event.waitUntil(preLoad());
});

let preLoad = async function(){
	console.log("Installing web app");
	const cache = await caches.open("offline");
	console.log("caching index and important routes");
	return await cache.addAll(["/src/Assets/", "/src/Assets", "/src/js", "./index.html"]);
};

let checkResponse = function(request){
	return new Promise(function(fulfill, reject) {
		fetch(request).then(function(response){
			if(response.status !== 404) {
				fulfill(response);
			} else {
				reject();
			}
		}, reject);
	});
};

let addToCache = async function(request){
	const cache = await caches.open("offline");
	const response = await fetch(request);
	console.log(response.url + " was cached");
	return await cache.put(request, response);
};

let returnFromCache = async function(request){
	const cache = await caches.open("offline");
	const matching = await cache.match(request);
	if (!matching || matching.status == 404) {
		return cache.match("index.html");
	} else {
		return matching;
	}
};