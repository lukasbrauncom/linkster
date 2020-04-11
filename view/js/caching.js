/*
* Caching url element information and assets
*/

function Caching() {
	var that = this;

	this.setCacheForItem = function(key, value) {

		console.log("setCacheForItem");
		console.log("item", value);

		cacheItems = {
		  "item": value
		}

		console.log("cacheItems", cacheItems);

		browser.storage.local.set(cacheItems);
		//.then(setItem, onError);
		//return Promise.resolve(item);

		return cacheItems;
	};

	this.getCacheForItem = function(item) {

		key = item.url;

		console.log("getCacheForItem:", item);

		console.log("key:", key);

		fetchedItem = browser.storage.local.get("cacheItems").then((items) => {
			console.log("gotCacheForItem:", items[item]);
			return Promise.resolve(items[item]);
		});

		return Promise.resolve(item);
	};
}





// let monster = {
//   name: "Kraken",
//   tentacles: true,
//   eyeCount: 10
// }

// let kitten = {
//   name: "Moggy",
//   tentacles: false,
//   eyeCount: 2
// }

// function setCacheForItem(item, key, value) {	
// 	console.log("setCacheForItem");

// 	// item.url = {
// 	//   key: value
// 	// }

// 	// console.log("item.url");
// 	// console.log(item.url);


// 	// var dic = { "key1" : "value1",
//  //            "key2" : "value2",
//  //            "key3" : "value3"};

//  //    browser.storage.local.set(dic)
//  //    .then(setItem, onError);


// 	browser.storage.local.set({kitten, monster})
//   		.then(setItem, onError);

// }

// function getCacheForItem(item, key) {
// 	//let fetchedItem = browser.storage.local.get(item.url);
// 	// let fetchedItem = browser.storage.local.get("dic");
// 	// fetchedItem.then(getItem, onError);


// }

// function gotKitten(item) {
//   console.log(`${item.kitten.name} has ${item.kitten.eyeCount} eyes`);
// }

// function deleteCacheForItem(item, key) {
// 	key = item.url + "." + key;
// 	browser.storage.local.remove(key);
// }

// function setItem(item) {
//   console.log("setItem");

//   browser.storage.local.get("kitten")
//   	.then(gotKitten, onError);
// }

// function onError(error) {
//   console.log(error)
// }

// function getItem(item) {
// 	console.log("getItem:");
//  	console.log(item);
// }