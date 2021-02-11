import Card from './Card.js';
import FormValidator from './FormValidation.js';
import { initialCards } from './initialCards.js';
import Section from "./Section.js";
import PopupWithImage from './PopupWithImage.js'
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__btn',
  inputInvalClass: 'popup__input_error',
  btnInvalClass: 'popup__btn_state_invalid',
};

const nameField = document.querySelector(".popup__input_type_name");
const aboutField = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const cardListContainer = document.querySelector(".elems__list");
const cardLinkField = document.querySelector(".popup__input_type_link");
const cardTitleField = document.querySelector(".popup__input_type_title");
const closeEditButton = document.querySelector(".popup__close-btn_edit");
const closeAddPopupBtn = document.querySelector(".popup__close-btn_add");
const closeImgPopupBtn = document.querySelector(".popup-img__close-btn");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form_edit");
const newCardBtn = document.querySelector(".popup__form_add");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add");
// Вадидация форм

const validationEditForm = new FormValidator(validationConfig, formElement)
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(validationConfig, newCardBtn)
validationAddForm.enableValidation();

// Открытие попапов

// function openPopupImage(name, link) {
//   popupImage.querySelector('.popup-img__caption').textContent = name;
//   popupImagePicture.alt = name;
//   popupImagePicture.src = link;
//   openPopup(popupImage);
// }

const popupWithImage = new PopupWithImage('.popup-img')
popupWithImage.setEventListeners() 

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

// function openPopup(ev) {
//   ev.classList.add("popup_opened");
//   document.addEventListener("keydown", closePopupByEscape);
// }



// Закрытие попапов

function closePopup(ev) {
  ev.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape)
}

function closePopupByEscape(ev) {
  const popupOpened = document.querySelector('.popup_opened');
  if (ev.key === "Escape" && popupOpened != null) {
   popupOpened.classList.remove("popup_opened");
   }
}

function closePopupOnOverlay() {
  document.addEventListener('mousedown', function (evt) {
      if (evt.target === document.querySelector(".popup_opened")) {
          document.querySelector(".popup_opened").classList.remove("popup_opened");
      }
  })
}
closePopupOnOverlay()

// Функции добавления карточек + слушатели к ним

function addNewCard(ev) {
  ev.preventDefault(ev);
  const cardTitle = cardTitleField.value;
  const cardLink = cardLinkField.value;
  const card = new Card({ name: cardTitle, link: cardLink }, 'template', handleCardClick);
  const cardElem = card.generateCard();
  cardListContainer.prepend(cardElem);
  newCardBtn.reset();
  closePopup(popupAddCard);
}
newCardBtn.addEventListener("submit", addNewCard);

function formSubmitHandler(ev) {
  ev.preventDefault();
  const nameInput = nameField.value;
  const jobInput = aboutField.value;
  profileName.textContent = nameInput;
  about.textContent = jobInput;
  closePopup(popupEdit);
}
formElement.addEventListener("submit", formSubmitHandler);

// Рендер карточек из массива

// initialCards.forEach((item) => {
//   const card = new Card(item, 'template', openPopupImage);
//   const cardElem = card.generateCard();
//   cardListContainer.append(cardElem);
// })
const cardList = new Section({data: initialCards, renderer: (item) => {
  const card = new Card(item, 'template', handleCardClick);
  const cardElem = card.generateCard();
  cardList.addItem(cardElem)
}}, cardListContainer)
cardList.renderItems();

// Слушатели кнопок отправки формы

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  nameField.value = profileName.textContent;
  aboutField.value = about.textContent;
  validationEditForm.checkButtonStatus(true);
});

addBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
  validationAddForm.checkButtonStatus(false);
});

// Слушатели закрытия попапов

closeEditButton.addEventListener("click", () => {
  closePopup(popupEdit);
  validationEditForm.clearErrorMessage();
});

closeAddPopupBtn.addEventListener("click", () => {
  closePopup(popupAddCard);
  validationAddForm.clearErrorMessage();
  newCardBtn.reset();
});

// closeImgPopupBtn.addEventListener("click", () => {
//   closePopup(popupImage);
// });
