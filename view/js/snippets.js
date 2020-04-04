/*
* Content snippets
*/

var snippets = {};

snippets.home = {};
snippets.home.menu = {
  root: document.getElementById("main")
};
snippets.home.menu.folder = {
  render: function(item, depth) {
    return "<div><h"+(depth+2)+">"+item.title+"</"+(depth+2)+"></div>";
  }
}
snippets.home.menu.bookmark = {
  render: function(item, depth) {
  	var urlString = item.url;
  	urlString = urlString.match(/\/\/[A-Za-z0-9.]+/g);
  	urlString = urlString[0].substring(2);
    return "<div class=\"tile\"><a href=\""+item.url+"\">"+urlString+"</a><br><h2><strong>"+item.title+"</h2><br/>"+new Date(item.dateAdded).toLocaleDateString("en-US")+"</div>";
  }
}
