let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let nameField = document.querySelector('.popup__form_name');
let aboutField  = document.querySelector('.popup__form_about');
let name = document.querySelector('.profile__title');
let about= document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');

function openPopup() {
    popup.classList.add('popup_opened');
    nameField.value = name.textContent;
    aboutField.value = about.textContent;
}
editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
    
    evt.preventDefault();

    let nameInput = nameField.value;
    let jobInput = aboutField.value;

    name.textContent = nameInput;
    about.textContent = jobInput;

    closePopup()
}
formElement.addEventListener('submit', formSubmitHandler);