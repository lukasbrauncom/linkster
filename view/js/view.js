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
  
  this.clean = function(snippet) {
    snippet.main.root.innerHTML = "";
    snippet.pagination.root.innerHTML = "";
  };
  
  /*
  this.render_main = function(item, snippet, depth) {
    if(item.type === "folder") {
      snippet.root.innerHTML += snippet.folder.render(item, depth);
    } else if(item.type === "bookmark") {
      snippet.root.innerHTML += snippet.bookmark.render(item, depth);
    }
    
    if(item.children) {
      item.children.forEach(function(child) {
        that.render_main(child, snippet, depth);
      });
    }
    
    depth++;
  };
  */
  
  this.render_main = function(items, snippet) {
    items.forEach(function(item) {
      if(item.type === "bookmark") {
        snippet.root.innerHTML += snippet.bookmark.render(item, 0);
      }
    });
  };
  
  this.render_pagination = function(pagination, snippet) {
    var pagination_list = "";
    for(let i = 1; i <= pagination.pages; i++) {
      if(i == pagination.current) {
        pagination_list += " <span id=\"selectedPage\">"+i+"</span>";
      } else {
        pagination_list += " <a class=\"pagination\">"+i+"</a>";
      }
    }
    snippet.root.innerHTML += "<div class=\"clear\">"+pagination_list+"</div>";
  };
  
  this.update_inputs = function() {
    
  };

  this.update = function(state, data) {
    switch(state) {
      default:
        that.clean(snippets.home);
        that.render_main(data.items, snippets.home.main);
        that.render_pagination(data.pagination, snippets.home.pagination);
    }
  };
}




