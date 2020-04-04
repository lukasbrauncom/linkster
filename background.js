/*
* Open main view when plugin button is clicked
*/
console.log("Call background.js");


let openTab = false;


function onCreated(tab) {
  openTab = tab;
  console.log("Created main view in tab ${tab.id}");
}

function onError(error) {
  console.log("Error: ${error}");
}

browser.browserAction.onClicked.addListener(function() {
  console.log(openTab);
  if(!openTab) {
    var creating = browser.tabs.create({
      active: true,
      url: "view/index.html"
    });
    creating.then(onCreated, onError);
  } else {
    browser.tabs.update(openTab.id, {active: true});
  }
});
