// const error = document.querySelector('#name-input-error');
// console.log(error);
// const input = document.querySelector('#name-input');
// console.log(input);
// input.addEventListener('input', (ev) => {
//     if(input.validity.valid) {
//         error.textContent = "";
//     } else {
//         error.textContent = input.validationMessage;
//     }
// })


function showErrorMessage(form, input){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add('popup__input_error');
    
}

function hideErrorMessage(form, input){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove('popup__input_error');
}

function checkValidationStatus(form, input) {
    if (input.validity.valid) {
        hideErrorMessage(form, input);
    } else {
        showErrorMessage(form, input);
    }
}

function checkButtonStatus(button, validStatus) {
    if (validStatus) {
        button.classList.remove('popup__btn_state_inval');
        button.removeAttribute('disabled', true);
    } else {
        button.classList.add('popup__btn_state_inval');
        button.setAttribute('disabled', true);
    }
}

function setEventListener(form) {
    const inputList = form.querySelectorAll('.popup__input');
    const submitBtn = form.querySelector('.popup__btn');

    inputList.forEach(input => {
        input.addEventListener('input', (ev) => {
            checkValidationStatus(form, input);
            checkButtonStatus(submitBtn, form.checkValidity())
        })
    })
}

function enableValidation() {
    const formList = document.querySelectorAll('.popup__form');
    formList.forEach(form => {
        setEventListener(form);

        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
        });

        const submitBtn = form.querySelector('.popup__btn');
        checkButtonStatus(submitBtn, form.checkValidity());
    });

}

enableValidation();