/*
* Open main view when plugin button is clicked
*/
console.log("Call background.js");

function onCreated(tab) {
  console.log("Created main view in tab ${tab.id}");
}

function onError(error) {
  console.log("Error: ${error}");
}

browser.browserAction.onClicked.addListener(function() {
  var creating = browser.tabs.create({
    active: true,
    url: "view/index.html"
  });
  creating.then(onCreated, onError);
});
