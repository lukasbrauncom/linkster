/*
* Root Object
*/

function Linkster() {
    this.view = new View();
    this.controller = new Controller();
    this.model = new Model(this.view, this.controller);
}

var linkster = new Linkster();

