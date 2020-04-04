/*
* Create and handle the view
*/

function Menu(bookmarkTree) {
  bookmarkTree.render(snippets.home.menu);
}

function Main(data) {
  bookmarkTree.render(snippets.home.menu);
}


function View() {
  var that = this;

  this.render = function(item, snippet, depth) {
    if(item.type === "folder") {
      snippet.root.innerHTML += snippet.folder.render(item, depth);
    } else {
      snippet.root.innerHTML += snippet.bookmark.render(item, depth);
    }
    
    if(item.children) {
      item.children.forEach(function(child) {
        that.render(child, snippet, depth);
      });
    }
    
    depth++;
  };

  this.update = function(state, data) {
    switch(state) {
      default:
        that.render(data, snippets.home.menu, 0);
        //data.render(snippets.home.menu);
    }
  };
}
