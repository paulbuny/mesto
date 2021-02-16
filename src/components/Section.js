export default class Section {
    constructor({ render }, containerSelector) {
        this._render = render;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, id){
        items.forEach(item => {
            this._render(item, id);
        });
    }

    addItem (element) {
        this._container.append(element);
    }

    prependItem (element) {
        this._container.prepend(element);
    }
}