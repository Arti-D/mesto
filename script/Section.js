export default class Section {
    constructor({ renderer }, containerSelector) {
        // this._renderedItems = data;
        this._renderer = renderer;
        this._container = containerSelector ;
      }

      renderItems(cardsData) {
        cardsData.forEach(element => {
            this._renderer(element)
        });
      }

      addItem(item) {
        this._container.append(item)
      }
}