import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmitForm}) {
        super(popupSelector)
        this._handleSubmitForm = handleSubmitForm
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = this._popup.querySelectorAll('.popup__input')
        
    }

    _getInputValues() {
        this._values = {}
        this._inputList.forEach(element => {
            this._values[element.name] = element.value 
        });
        return this._values
    }

    setEventListeners() {
        this._form.addEventListener('submit', () => {
            this._handleSubmitForm(this._getInputValues())
        })

        super.setEventListeners()
    }

    close() {
        this._form.reset()
        super.close()
    }
}