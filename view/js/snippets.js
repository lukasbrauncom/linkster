/*
* Content snippets
*/

var snippets = {};

snippets.home = {};
snippets.home.main = {
  root: document.getElementById("main")
};
snippets.home.main.folder = {
  render: function(item, depth) {
    return "<div><h"+(depth+2)+">"+item.title+"</"+(depth+2)+"></div>";
  }
};
snippets.home.main.bookmark = {
  render: function(item, depth) {
  	var urlString = item.url;
  	urlString = urlString.match(/\/\/[A-Za-z0-9.]+/g);
  	urlString = urlString[0].substring(2);
  	urlString = urlString.replace("www.", "");

  	var category = "categoryColorDefault";
  	var randCategory = Math.floor((Math.random() * 7) + 1);
  	if (item.category == 1) {
		category = "categoryColorVideos";
  	}

	//	if (item.info.category == "article") {
	//		category = "categoryColorNews";
 	//	}

 	getCacheForItem(item, "status");

  	if (item.status == "404")
  	{
  		category = "inactive";
  	}

  	var urlType = "Website";
  	if (item.url.substring(item.url.length-4) == ".pdf") {
  		urlType = "PDF";
  		category = "categoryColorDocuments";
  	} else if (item.url.substring(item.url.length-4) == ".pdf" || item.url.substring(item.url.length-4) == ".jpg" || item.url.substring(item.url.length-4) == ".png" || item.url.substring(item.url.length-5) == ".jpeg") {
  		urlType = "IMG";
  		category = "categoryColorImages";
  	}

    return "<a href=\""+item.url+"\" target=\"_new\" title=\""+item.url+"\"><div class=\"tile "+category+"\"><img class=\"favicon\" width=\"16px\" height=\"16px\" src=\"https://"+urlString+"\/favicon.ico\"/><div class=\"domainLabel\">"+urlString+"</div><br><h2 class=\"tileTitle\"><strong>"+item.title+"</strong></h2><br/>"+item.category+item.status+"<div class=\"tileFooter\"><div class=\"dateAdded\">"+ new Date(item.dateAdded).toLocaleDateString("en-US")+"</div><div class=\"urlType\">"+urlType+"</div></div></div></a>";
  }
};

snippets.home.pagination = {
  root: document.getElementById("footer")
};
