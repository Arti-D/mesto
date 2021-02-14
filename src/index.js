import '../pages/index.css';
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidation.js";
import { initialCards } from "../script/initialCards.js";
import Section from "../script/Section.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import UserInfo from "../script/UserInfo.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitBtnSelector: ".popup__btn",
  inputInvalClass: "popup__input_error",
  btnInvalClass: "popup__btn_state_invalid",
};

const nameField = document.querySelector(".popup__input_type_name");
const aboutField = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
const cardListContainer = document.querySelector(".elems__list");
const cardLinkField = document.querySelector(".popup__input_type_link");
const cardTitleField = document.querySelector(".popup__input_type_title");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form_edit");
const newCardBtn = document.querySelector(".popup__form_add");
const addBtn = document.querySelector(".profile__add-button");

// Вадидация форм

const validationEditForm = new FormValidator(validationConfig, formElement);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(validationConfig, newCardBtn);
validationAddForm.enableValidation();

// Попапы

const popupWithImage = new PopupWithImage(".popup-img");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Рендер карточек из массива

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "template", handleCardClick);
      const cardElem = card.generateCard();
      cardList.addItem(cardElem);
    },
  },
  cardListContainer
);
cardList.renderItems();

// Работа с формами //

const userInfo = new UserInfo({
  nameElement: nameField,
  infoElement: aboutField,
});
userInfo.setUserInfo(profileName.textContent, aboutProfile.textContent);
userInfo.updateUserInfo();

const popupWithEditForm = new PopupWithForm({
  popupSelector: ".popup-edit",
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.updateUserInfo();
    popupWithEditForm.close();
    profileName.textContent = data.name;
    aboutProfile.textContent = data.about;
  },
});
popupWithEditForm.setEventListeners();
editButton.addEventListener("click", () => {
  userInfo.updateUserInfo();
  popupWithEditForm.open();
  validationEditForm.checkButtonStatus(true);
});

const popupWithCardForm = new PopupWithForm({
  popupSelector: ".popup-add",
  handleSubmitForm: (data) => {
    const cardTitle = cardTitleField.value;
    const cardLink = cardLinkField.value;
    const card = new Card(
      { name: cardTitle, link: cardLink },
      "template",
      handleCardClick
    );
    const cardElem = card.generateCard();
    cardListContainer.prepend(cardElem);
    popupWithCardForm.close();
  },
});
popupWithCardForm.setEventListeners();
addBtn.addEventListener("click", () => {
  popupWithCardForm.open();
  validationAddForm.checkButtonStatus(false);
});
