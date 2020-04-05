/*
* Extract information from specific kind of pages
*/

/*
* Filter Template
*/

function HTMLFilter(HTMLQuery, position, final=null) {
  var that = this;
  this.HTMLquery = HTMLQuery;
  this.position = position;
  this.final = final;
  
  this.filter = function(cleanHTML) {
    let result = cleanHTML.querySelectorAll(that.HTMLquery);
    result = result[that.position].innerHTML;
    if(final) {
      result = final(result);
    }
    return result;
  };
};



let pageFilters = []


// zeit.de
pageFilters.push({
  that: this,
  filter: new RegExp(/zeit.de\/[a-zA-Z]*\/[0-9]+-[0-9]+\//i),
  expecteContentType: "text/html",
  dataSource: null,
  
  title: new HTMLFilter("span.article-heading__title", 0, function(e) {return e.trim()}),
  category: "article",
  /*
  videoInfo = {
    title: ["h1", ".title", 0],
    previewImg: "https://img.youtube.com/vi/l2WCrXc7J-I/0.jpg";
    video: [],
    category: ["a", ".yt-simple-endpoint", 0]
  }
  */ 
});



// Youtube
pageFilters.push({
  that: this,
  filter: new RegExp(/yoxutube.com/i),
  
  title: new HTMLFilter("h1", "", "title", 0),
  category: "video",
  /*
  videoInfo = {
    title: ["h1", ".title", 0],
    previewImg: "https://img.youtube.com/vi/l2WCrXc7J-I/0.jpg";
    video: [],
    category: ["a", ".yt-simple-endpoint", 0]
  }
  */ 
});

/*
https://www.youtube.com/watch?v=l2WCrXc7J-I



<iframe width="924" height="520" src="https://www.youtube.com/embed/l2WCrXc7J-I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/
