export default class FormValidator {
  constructor(validationConfig, formSelector) {
    this._config = validationConfig;
    this._form = formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitBtnSelector = validationConfig.submitBtnSelector;
    this._inputInvalClass = validationConfig.inputInvalClass;
  }
  _showErrorMessage(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputInvalClass);
  }

  _hideErrorMessage(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._inputInvalClass);
  }

  _checkValidationStatus(input) {
    if (input.validity.valid) {
      this._hideErrorMessage(input);
    } else {
      this._showErrorMessage(input);
    }
  }

  checkButtonStatus(validStatus) {
    const submitButton = this._form.querySelector(this._config.submitBtnSelector)
    if (validStatus) {
      submitButton.classList.remove(this._config.btnInvalClass);
      submitButton.removeAttribute("disabled", true);
    } else {
      submitButton.classList.add(this._config.btnInvalClass);
      submitButton.setAttribute("disabled", true);
    }
  }

  _setEventListener() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    inputList.forEach((input) => {
      input.addEventListener("input", (ev) => {
        this._checkValidationStatus(input);
        this.checkButtonStatus(this._form.checkValidity());
      });
    });
  }

  clearErrorMessage() {
    const errorContainer = this._form.querySelectorAll('.error');
    const errorInputs = this._form.querySelectorAll('.popup__input_error');
    errorContainer.forEach(span => {
        span.textContent = '';
    });
    errorInputs.forEach(input => {
        input.classList.remove('popup__input_error');
    });
}

  enableValidation() {
      this._setEventListener();
      this._form.addEventListener('submit', (ev) => {
        ev.preventDefault();
      })
      this.checkButtonStatus(this._form.checkValidity());
  }
}