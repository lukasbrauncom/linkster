/*
* Caching url element information and assets
*/

function setCacheForItem(item, key, value) {	
	console.log("setCacheForItem");

	item.url = {
	  key: value
	}

	console.log("item.url");
	console.log(item.url);

    browser.storage.local.set({key, value})
    .then(setItem, onError);
}

function getCacheForItem(item, key) {
	let fetchedItem = browser.storage.local.get(item.url);
	fetchedItem.then(getItem, onError);
}

function deleteCacheForItem(item, key) {
	key = item.url + "." + key;
	browser.storage.local.remove(key);
}

function setItem() {
  console.log("setItem");
}

function onError(error) {
  console.log(error)
}

function getItem(item) {
	console.log("getItem:");
 	console.log(item);
}