import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._picture = document.querySelector('.popup-img__picture')
        this._pictureCaption = document.querySelector('.popup-img__caption')
    }
    open(name, link) {
        this._pictureCaption.textContent = name;
        this._picture.alt = name
        this._picture.src = link
        super.open()
    }
}