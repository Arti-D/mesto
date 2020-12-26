function showErrorMessage(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputInvalClass);
}

function hideErrorMessage(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputInvalClass);
}

function checkValidationStatus(form, input, config) {
  if (input.validity.valid) {
    hideErrorMessage(form, input, config);
  } else {
    showErrorMessage(form, input, config);
  }
}

function checkButtonStatus(button, validStatus, config) {
  if (validStatus) {
    button.classList.remove(config.btnInvalClass);
    button.removeAttribute("disabled", true);
  } else {
    button.classList.add(config.btnInvalClass);
    button.setAttribute("disabled", true);
  }
}

function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitBtn = form.querySelector(config.submitBtnSelector);

  inputList.forEach((input) => {
    input.addEventListener("input", (ev) => {
      checkValidationStatus(form, input, config);
      checkButtonStatus(submitBtn, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((form) => {
    setEventListener(form, config);

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
    });

    const submitBtn = form.querySelector(config.submitBtnSelector);
    checkButtonStatus(submitBtn, form.checkValidity(), config);
  });
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitBtnSelector: '.popup__btn',
    inputInvalClass: '.popup__input_error',
    btnInvalClass: '.popup__btn_state_inval',
};

enableValidation(validationConfig);

