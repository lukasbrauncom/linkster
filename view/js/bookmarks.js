/*
* Handle bookmark functionality
*/

function Tree(data) {
  var that = this;
  this.data = data;
  
  this.retrieve_details = function(items) {
    items.forEach(function(item) {
      fetch(item.url, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      }).then((response) => {
        item.status = response.status;
        item.contentType = response.headers.get("Content-Type");
        item.info = {}
        item.info.category = "default";
        
        pageFilters.forEach(function(pageFilter) {
          if(pageFilter.filter.test(item.url) && item.contentType.includes(pageFilter.expecteContentType)) {
            if(!pageFilter.dataSource) {
              response.clone().text().then(function(externalHTML) {
                var cleanHTML = DOMPurify.sanitize(externalHTML, {SAFE_FOR_JQUERY: true});
                var parser = new DOMParser();
                cleanHTML = parser.parseFromString(cleanHTML, 'text/html');
                item.info.title = pageFilter.title.filter(cleanHTML);
                item.info.category = pageFilter.category;
              }).catch((error) => {
                console.log(error);
              });
            }
          }
        });
      })
      .catch((error) => {
        item.status = -1;
        //console.log("Error:", error);
      });
    });
    return items;
  };
  
  this.extract_items = function(result, item) {
    if(item.type === "bookmark") {
      return [item];
    }
    
    if(item.children) {
      item.children.forEach(function(child) {
        result = result.concat(that.extract_items([], child));
      });
      return result;
    }
  };
  
  this.items = this.retrieve_details(this.extract_items([], data));
  
  
  
  /*
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
  */
  
  this.render = function(snippet) {
    this.iterate(this.data, snippet, 0)
  }
  
  this.getLatest = function(start, end) {
    that.items.sort(function(a, b) {
      return b.dateAdded - a.dateAdded;
    });
    return {index: 0, title: "Newest", children: that.items.slice(start, end)};
  };
}


function Bookmarks() {
  var that = this;
  this.fullTree = function() {
    return browser.bookmarks.getTree().then((bookmarksTree) => {
      return new Tree(bookmarksTree[0]);
    }).catch((error) => {
      console.log("Error:", error);
    });
  }();
  
  this.getTree = function() {
    return this.fullTree;
  };
  
  /*
  browser.bookmarks.getRecent(1).then((bookmarks) => {
    this.listBookmarks(bookmarks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
  */
}


