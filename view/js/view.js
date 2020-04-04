/*
* Create and handle the view
*/

function Menu(bookmarkTree) {
  bookmarkTree.render(snippets.home.menu);
}

function Main(data) {
  console.log(data);
}

function View() {
  this.update = function(state, data) {
    switch(state) {
      default:
        var menu = Menu(data);
        var main = Main(data);
    }
  }
}
