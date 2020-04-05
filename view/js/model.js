/*
* Model
*/

let state = {
  page: "home",
  pagination: {
    current: 1,
    pages: 1,
    elements_per_page: 6
  }
};

function Model(view, controller) {
  var that = this;

  this.view = view;
  this.controller = controller;
  
  this.items = null;
  
  this.bookmarks = new Bookmarks();
  this.bookmarks.load_bookmarks().then((tree) => {
    return that.bookmarks.retrieve_items([], tree[0]);
  }).then((items) => {
    return that.bookmarks.retrieve_meta(items);
  }).then((items) => {
    that.update(items);
  });
  
  this.cally = function(number) {
    state.pagination.current = number;
    that.update();
  };
  
  this.update = function(items=[]) {
    if(!that.items) {
      that.items = items;
    } else {
      items = that.items;
    }
    state.pagination.pages = Math.ceil(items.length / state.pagination.elements_per_page);
    
    start = state.pagination.elements_per_page*(state.pagination.current-1);
    end = state.pagination.elements_per_page*state.pagination.current;
    
    let data = {
      items: that.bookmarks.get_latest(items, start, end), // that.bookmarks.get_by_category(items, "broken"),
      pagination: state.pagination,
      menu: {
        sorting: "latest",
        query: ""
      }
    };
    
    that.view.update(state.page, data);
    
    let pagination_keys = [];
    for(let i=0; i < state.pagination.pages; i++) {
      if(i != state.pagination.current-1) {
        pagination_keys.push(i+1)
      }
    }
    that.controller.bind("click", ".pagination", that.cally, pagination_keys);
  };
  
  
  
  /*
  this.bookmarks = new Bookmarks();
  this.bookmarks_tree = false;

  this.max_pages = 1;

  this.cally = function(number) {
    state.pagination.current = number;
    that.update(that.bookmarks_tree);
  };
    
  this.bookmarks.getTree().then((bookmarksTree) => {
    that.bookmarks_tree = bookmarksTree;
    state.pagination.pages = Math.ceil(bookmarksTree.items.length / state.pagination.elements_per_page);
    that.update(bookmarksTree);
  });
  
  this.update = function(bookmarksTree) {
    start = state.pagination.elements_per_page*(state.pagination.current-1);
    end = state.pagination.elements_per_page*state.pagination.current;
    
    let data = {
      tree: bookmarksTree.getLatest(start, end),
      pagination: state.pagination,
      menu: {
        sorting: "latest",
        query: ""
      }
    };
    that.view.update(state.page, data);

    let pagination_keys = [];
    for(let i=0; i < state.pagination.pages; i++) {
      if(i != state.pagination.current-1) {
        pagination_keys.push(i+1)
      }
    }
    that.controller.bind("click", ".pagination", that.cally, pagination_keys);
  };
  */
}

