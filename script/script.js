let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

