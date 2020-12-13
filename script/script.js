const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const nameField = document.querySelector('.popup__input_type_name');
const aboutField  = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const about= document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const cardListContainer = document.querySelector('.elems__list');
const templateCard = document.querySelector('.template');

function renderList(){
    const cardList = initialCards.map(composeCard);
    cardListContainer.append(...cardList);
};

function composeCard(item){
    const newCard = templateCard.content.cloneNode(true);
    const cardTitle = newCard.querySelector('.elems__title');
    const cardImage = newCard.querySelector('.elems__img');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    const likeBtn = newCard.querySelector('.elems__like');
    likeBtn.addEventListener('click', like);

    return newCard;
};

function like(ev){
    ev.target.classList.toggle('elems__like_status_active');
    console.log('тык');
}

function openPopup() {
    popup.classList.add('popup_opened');
    nameField.value = profileName.textContent;
    aboutField.value = about.textContent;
}
editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
    evt.preventDefault();
    const nameInput = nameField.value;
    const jobInput = aboutField.value;
    profileName.textContent = nameInput;
    about.textContent = jobInput;

    closePopup()
}
formElement.addEventListener('submit', formSubmitHandler);

renderList();