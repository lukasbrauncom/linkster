/*
* Model
*/

function Model(view, controller) {
    this.view = view;
    this.controller = controller;
    
    this.state = "home";
    this.bookmarks = new Bookmarks();
    var that = this;
    
    //console.log(this.bookmarks.getTree());
    
    this.bookmarks.getTree().then((bookmarksTree) => {
        that.view.update(that.state, bookmarksTree);
    });
}
