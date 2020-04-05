/*
* Model
*/

let state = {
  page: "home",
  pagination: {
    current: 1,
    pages: 1,
    elements_per_page: 60
  }
};

function Model(view, controller) {
  var that = this;

  this.view = view;
  this.controller = controller;

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
}

