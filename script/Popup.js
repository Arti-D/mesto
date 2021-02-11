export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(ev) {
    if (ev.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close-btn")) {
        this.close();
      }
    });

    console.log(this._popup);
  }
}
