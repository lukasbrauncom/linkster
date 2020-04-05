/*
* Create and handle user actions
*/


function Controller() {
  var that = this;

  this.bind = function(event, elements, fnct, params=[]) {
    var elemets = elements.trim();
    var key = elements[0];
    elements = elements.slice(1, elements.length);
    if(key === ".") {
      elements = document.getElementsByClassName(elements);
      for(let i =0; i < elements.length; i++) {
        if(params.length === 0) {
          elements[i].addEventListener(event, fnct, false);
        } else {
          elements[i].addEventListener(event, function(e) { fnct(params[i]); }, false);
        }
      }
    };
  };
}
