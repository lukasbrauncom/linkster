/*
* Content snippets
*/

var snippets = {};

snippets.home = {};
snippets.home.menu = {
  root: document.body
};
snippets.home.menu.folder = {
  render: function(item, depth) {
    return "<h"+(depth+2)+">"+item.title+"</"+(depth+2)+">";
  }
}
snippets.home.menu.bookmark = {
  render: function(item, depth) {
    return "<div style=\"background-color: red;\"><strong>"+item.title+"</h2><br/><a href=\""+item.url+"\">Link</a><br/>Added: "+new Date(item.dateAdded).toLocaleDateString("en-US")+"</div><br/>";
  }
}
