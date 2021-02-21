import Popup from './Popup.js'

export default class PopupDelete extends Popup {
    constructor(popupSelector, btnSelector) {
        super(popupSelector)
        this._btn = this._popup.querySelector(btnSelector)
        console.log(this._btn);
    }

    setEventListeners(deleteCard) {
        super.setEventListeners();
        this._deleteCard = deleteCard
        this._btn.addEventListener('click', deleteCard)
    }
}