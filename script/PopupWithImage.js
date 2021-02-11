import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._picture = document.querySelector('.popup-img__picture')
    }
    open(name, link) {
        document.querySelector('.popup-img__caption').textContent = name;
        this._picture.alt = name
        this._picture.src = link
        super.open()
    }
}