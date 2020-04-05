/*
* Handle bookmark functionality
*/


function Bookmarks() {
  var that = this;
  
  this.test = function(tree) {
    return tree;
  };
  
  this.retrieve_meta = function(items) {
    let results = [];
    items.forEach(function(item) {
      results.push(fetch(item.url).then((response) => {
        item.status = response.status;
        item.contentType = response.headers.get("Content-Type");
        item.category = (item.status == 200) ? "default" : "broken";
        item.info = {};
        return item;
      }).catch((e) => {
        item.status = -1;
        item.contentType = "";
        item.category = "blocked";
        item.info = {};
        return Promise.resolve(item);
      }));
    });
    return Promise.all(results);
  };
  
  this.retrieve_items = function(result, item) {
    if(item.type === "bookmark") {
      return [item];
    }
    
    if(item.children) {
      item.children.forEach(function(child) {
        result = result.concat(that.retrieve_items([], child));
      });
      return result;
    }
  };
  
  this.load_bookmarks = function() {
    return browser.bookmarks.getTree();
  };
  
  this.get_latest = function(items, start, end) {
    items.sort(function(a, b) {
      return b.dateAdded - a.dateAdded;
    });
    return items.slice(start, end);
    
  };
  
  this.get_by_category = function(items, category) {
    items.forEach((item) => {
      console.log(item.category);
    })
    return items.filter(item => item.category == category);
  };
}


/*

function Tree(data) {
  var that = this;
  this.data = data;
  
  this.retrieve_meta = function(items) {
    let results = [];
    items.forEach(function(item) {
      fetch(item.url).then((response) => {
        item.status = response.status;
        item.contentType = response.headers.get("Content-Type");
        item.category = (item.status == 200) ? "default" : "broken";
        item.info = {};
      })
    });
    return items;
  };
  
  this.retrieve_info = function(items) {
    items.forEach(function(item) {
      fetch(item.url).then((response) => {
        item.status = response.status;
        item.contentType = response.headers.get("Content-Type");
        item.category = "default";
        item.info = {}
        
        pageFilters.forEach(function(pageFilter) {
          if(pageFilter.filter.test(item.url) && item.contentType.includes(pageFilter.expecteContentType)) {
            if(!pageFilter.dataSource) {
              response.clone().text().then(function(externalHTML) {
                var cleanHTML = DOMPurify.sanitize(externalHTML, {SAFE_FOR_JQUERY: true});
                var parser = new DOMParser();
                cleanHTML = parser.parseFromString(cleanHTML, 'text/html');
                item.category = pageFilter.category;
                
                for(let [key, value] of Object.entries(pageFilter.info)) {
                  item.info[key] = value(item, cleanHTML);
                }
                console.log(item.info);
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
  
  this.items = (async function() {return await that.retrieve_meta(that.extract_items([], data))}()).value;
  console.log(items);
*/
  
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
  
/*
  this.render = function(snippet) {
    this.iterate(this.data, snippet, 0)
  }
  
  this.getLatest = function(start, end) {
    console.log(that.items);
    that.items.sort(function(a, b) {
      return b.dateAdded - a.dateAdded;
    });
    return {index: 0, title: "Newest", children: that.retrieve_info(that.items.slice(start, end))};
  };
}


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


function extract_items


function retrieve_meta(bookmarksTree) {
  
};


function load_bookmarks() {
  return browser.bookmarks.getTree();
};

function Bookmarks() {
  var that = this;
  this.fullTree = function() {
    return browser.bookmarks.getTree().then((bookmarksTree) => {
      return new Tree(bookmarksTree[0]);
    }).catch((error) => {
      console.log("Error:", error);
    });
  }();
  console.log(this.fullTree);
  
  this.getTree = function() {
    return this.fullTree;
  };
  browser.bookmarks.getRecent(1).then((bookmarks) => {
    this.listBookmarks(bookmarks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
}


  */

/*

  
  this.retrieve_meta3 = async function(items) {
    for(var i=0; i<items.length; i++) {
      try {
        let item = await fetch(items[i].url).then((response) => {
          items[i].status = response.status;
          return items[i];
        });
        items[i] = item;
        return items;
      } catch(e) {
        console.log(e);
      };
    }
  };
  
  this.retrieve_meta2 = function(items) {
    var items_ = function() {
      result = [];
      items.forEach(function(item) {
        result.push(fetch(item.url).then((response) => {
          item.status = response.status;
          item.contentType = response.headers.get("Content-Type");
          item.category = (item.status == 200) ? "default" : "broken";
          item.info = {};
          
          pageFilters.forEach(function(pageFilter) {
            if(pageFilter.filter.test(item.url) && item.contentType.includes(pageFilter.expecteContentType)) {
              item.category = pageFilter.category;
            }
          });
          return item;
        }));
      });
      console.log(result);
      return result;
    }();
    console.log(items_);
  };
  
*/

