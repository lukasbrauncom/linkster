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

  	var urlType = "Website";
  	if (item.url.substring(item.url.length-4) == ".pdf") {
  		urlType = "PDF";
  	}

  	var category = "";
  	var randCategory = Math.floor((Math.random() * 7) + 1);
  	if (randCategory == 1) {
		category = "categoryColorImages";
  	}
  	else if (randCategory == 2) {
		category = "categoryColorVideos";
  	}
  	else if (randCategory == 3) {
		category = "categoryColorDocuments";
  	}
  	else {
		category = "categoryColorDefault";
  	}

	// if (item.info.category == "article") {
	// 	category = "categoryColorNews";
 //  	}

  	if (item.status == "404") {
  		category = "inactive";
  	}

    return "<a href=\""+item.url+"\" target=\"_new\" title=\""+item.url+"\"><div class=\"tile "+category+"\"><img class=\"favicon\" width=\"16px\" height=\"16px\" src=\"https://"+urlString+"\/favicon.ico\"/><div class=\"domainLabel\">"+urlString+"</div><br><h2 class=\"tileTitle\"><strong>"+item.title+"</strong></h2><br/><div class=\"tileFooter\"><div class=\"dateAdded\">"+ new Date(item.dateAdded).toLocaleDateString("en-US")+"</div><div class=\"urlType\">"+urlType+"</div></div></div></a>";
  }
};

snippets.home.pagination = {
  root: document.getElementById("footer")
};
