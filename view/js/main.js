/*
* Root Object
*/

function Linkster() {
    this.view = new View();
    this.model = new Model(this.view, this.view);
}

var linkster = new Linkster();

