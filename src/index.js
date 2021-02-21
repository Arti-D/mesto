import '../pages/index.css';
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidation.js";
// import { initialCards } from "../script/initialCards.js";
import Section from "../script/Section.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import UserInfo from "../script/UserInfo.js";
import Api from "../script/Api.js"

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
const profileAvatar = document.querySelector(".profile__avatar-img")

// Работа с API

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: '7d190d24-45cc-41a1-907b-c30a1fbc5d49',
    'Content-type': 'application/json'
  }
}
const api = new Api(config)
api.getCards()
  .then(cards => {
    cardList.renderItems(cards)
  })
  .catch(err => console.log(err))

api.getUserInfo()
  .then(userData => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData)
  })
  .catch(err => console.log(err))

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
    renderer: (item) => {
      const card = new Card(item, "template", handleCardClick);
      const cardElem = card.generateCard();
      cardList.addItem(cardElem);
    },
  },
  cardListContainer
);

// Работа с формами //

const userInfo = new UserInfo({
  nameElement: nameField,
  infoElement: aboutField,
  titleField: profileName,
  infoField: aboutProfile,
  avatarElement: profileAvatar,
});
// userInfo.setUserInfo(profileName.textContent, aboutProfile.textContent);

const popupWithEditForm = new PopupWithForm({
  popupSelector: ".popup-edit",
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data),
    api.setUserInfo(data)
    .catch(err => console.log(err))
    popupWithEditForm.close();
  },
});
popupWithEditForm.setEventListeners();
editButton.addEventListener("click", () => {
  userInfo.setUserInfo({name: profileName.textContent, about: aboutProfile.textContent});
  userInfo.updateInfo()
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
