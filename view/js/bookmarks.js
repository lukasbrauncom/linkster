/*
* Handly bookmark functionality
*/

function Tree(data) {
  var that = this;
  this.data = data;
  
  this.iterate = function(item, snippet, depth) {
    if(item.type === "folder") {
      snippet.root.innerHTML += snippet.folder.render(item, depth);
    } else {
      snippet.root.innerHTML += snippet.bookmark.render(item, depth);
    }
    
    if(item.children) {
      item.children.forEach(function(child) {
        that.iterate(child, snippet, depth);
      });
    }
    
    depth++;
  }
  
  this.render = function(snippet) {
    this.iterate(this.data, snippet, 0)
  }
}


function Bookmarks() {
  /*
  this.listBookmarks = function(bookmarks) {
    bookmarks.forEach(function(bookmark) {
      document.body.appendChild("<div><h2>"+bookmark.title+"</h2><a href=\""+bookmark.url+"\">"+bookmark.url+"</a>Added: "+bookmark.added+"</div>");
      console.log(bookmark);
    });
  }
  */
  
  this.iterateBookmarksTree = function(item, depth) {
    console.log(item);
    if(item.type === "folder") {
      document.body.innerHTML += "<h"+(depth+2)+">"+item.title+"</"+(depth+2)+">";
    } else {
      document.body.innerHTML += "<div style=\"background-color: red;\"><strong>"+item.title+"</h2><br/><a href=\""+item.url+"\">Link</a><br/>Added: "+new Date(item.dateAdded).toLocaleDateString("en-US")+"</div><br/>";
    }
    
    if(item.children) {
      item.children.forEach(function(child) {
        this.iterateBookmarksTree(child, depth);
      });
    }
    
    depth++;
  }
  
  /*
  browser.bookmarks.getTree().then((bookmarksTree) => {
    console.log(bookmarksTree);
    this.iterateBookmarksTree(bookmarksTree[0], 0);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
  */
  
  this.getTree = function() {
    return browser.bookmarks.getTree().then((bookmarksTree) => {
      return new Tree(bookmarksTree[0]);
    }).catch((error) => {
      console.log("Error:", error);
    });
  }
  
  
  /*
  browser.bookmarks.getRecent(1).then((bookmarks) => {
    this.listBookmarks(bookmarks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
  */
}


