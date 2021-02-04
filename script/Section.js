export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = containerSelector ;
      }

      renderItems() {
        this._renderedItems.forEach(element => {
            this._renderer(element)
        });
      }

      addItem(item) {
        this._container.append(item)
      }
}