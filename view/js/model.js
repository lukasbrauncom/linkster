/*
* Model
*/

function Model(view, controller) {
    var that = this;
    
    this.view = view;
    this.controller = controller;
    
    this.state = "home";
    this.bookmarks = new Bookmarks();
    
    //console.log(this.bookmarks.getTree());
    
    this.bookmarks.getTree().then((bookmarksTree) => {
        var latest = bookmarksTree.getLatest(0, 5);
        that.view.update(that.state, latest);
    });
}
