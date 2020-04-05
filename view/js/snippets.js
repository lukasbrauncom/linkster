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

  	var urlType = "Website";
  	if (item.url.substring(item.url.length-4) == ".pdf") {
  		urlType = "PDF";
  	}

  	var status = "";
  	if (Math.floor((Math.random() * 2) + 1) == 1) {
		status = "inactive";
  	}

    return "<a href=\""+item.url+"\" title=\""+item.url+"\"><div class=\"tile "+status+"\"><img class=\"favicon\" width=\"16px\" height=\"16px\" src=\"https://"+urlString+"\/favicon.ico\"/>"+urlString+"<br><h2 class=\"tileTitle\"><strong>"+item.title+"</h2><br/>"+new Date(item.dateAdded).toLocaleDateString("en-US")+"<div class=\"urlType\">"+urlType+"</div></div></a>";
  }
}
