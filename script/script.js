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
const closeImgPopupBtn = document.querySelector('.popup-img__close-btn');
const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-img');
const closeAddPopupBtn = document.querySelector('.popup-add__close-btn');
const addBtn = document.querySelector('.profile__add-button');
const nameField = document.querySelector('.popup__input_type_name');
const aboutField  = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const cardListContainer = document.querySelector('.elems__list');
const templateCard = document.querySelector('.template');
const cardLinkField = document.querySelector('.popup-add__input_type_link');
const cardTitleField = document.querySelector('.popup-add__input_type_title');

function renderList(){
    const cardList = initialCards.map(composeCard);
    cardListContainer.append(...cardList);
};

function composeCard(item){
    const newCard = templateCard.content.cloneNode(true);
    const cardTitle = newCard.querySelector('.elems__title');
    const cardImage = newCard.querySelector('.elems__img');
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    
    const likeBtn = newCard.querySelector('.elems__like');
    likeBtn.addEventListener('click', like);
    
    addNewCardListener(newCard);

    removeCardListener(newCard);

    cardImage.addEventListener('click', composePopupInfo);

    return newCard;
};

function composePopupInfo(ev) {
    const modalImg = document.querySelector('.popup-img__picture');
    const modalTitle = document.querySelector('.popup-img__caption');
    modalTitle.textContent = ev.target.alt;
    modalImg.alt = ev.target.alt;
    modalImg.src = ev.target.src;
    openImgPopup();
};

function addNewCardListener() {
    const newCardBtn = document.querySelector('.popup-add__form');
    newCardBtn.addEventListener('submit', addNewCard);
}

function removeCardListener(item) {
    const removeBtn = item.querySelector('.elems__remove-btn');
    removeBtn.addEventListener('click', removeCard);
}

function addNewCard(ev) {
    ev.preventDefault(ev);
    const cardTitle = cardTitleField.value;
    const cardLink = cardLinkField.value;
    const newCard = composeCard({ name: cardTitle, link: cardLink });
    cardListContainer.prepend(newCard);
    cardTitleField.value = '';
    cardLinkField.value = '';
    closeAddPopup();
}

function removeCard(ev) {
    const targetCard = ev.target.closest('.elem');
    targetCard.remove();
}

function like(ev){
    ev.target.classList.toggle('elems__like_status_active');
}

function formSubmitHandler(ev) {
    ev.preventDefault();
    const nameInput = nameField.value;
    const jobInput = aboutField.value;
    profileName.textContent = nameInput;
    about.textContent = jobInput;
    closePopup()
}
formElement.addEventListener('submit', formSubmitHandler);

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

function openAddPopup() {
    popupAddCard.classList.add('popup-add_opened');
}
addBtn.addEventListener('click', openAddPopup);

function closeAddPopup() {
    popupAddCard.classList.remove('popup-add_opened');
}
closeAddPopupBtn.addEventListener('click', closeAddPopup);

function openImgPopup() {
    popupImage.classList.add('popup-img_opened');
}

function closeImgPopup() {
    popupImage.classList.remove('popup-img_opened');
}
closeImgPopupBtn.addEventListener('click', closeImgPopup);

renderList();