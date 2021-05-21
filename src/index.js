import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import { buttonLoaderText } from "../utils/utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitBtnSelector: ".popup__btn",
  inputInvalClass: "popup__input_error",
  btnInvalClass: "popup__btn_state_invalid",
};
const test = 'renderer';
const nameField = document.querySelector(".popup__input_type_name");
const aboutField = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
const cardListContainer = document.querySelector(".elems__list");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form_edit");
const newCardBtn = document.querySelector(".popup__form_add");
const addBtn = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar-img");
const avatarForm = document.querySelector(".popup__form_avatar");
const editAvatarBtn = document.querySelector(".profile__avatar-btn");

// Селекторы
const popupImageSelector = ".popup-img";
const popupSureSelector = ".popup-sure";
const popupSureBtnSelector = ".popup-sure__btn";
const popupEditSelector = ".popup-edit";
const popupAvatarSelector = ".popup-avatar";
const popupAddSelector = ".popup-add";
const removeCardBtnSelector = ".elems__remove-btn";
const templateSelector = ".template";

// Кнопки
const editSaveBtn = document.querySelector(".popup__save-btn");
const saveNewAvatarBtn = document.querySelector(".popup-avatar__make-btn");
const saveNewCard = document.querySelector(".popup-add__make-btn");
const confirmDelBtn = document.querySelector(popupSureBtnSelector);

// Работа с API

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "ecd44a5f-5259-4858-9be5-8f874f37b67e",
    "Content-type": "application/json",
  },
};
const api = new Api(config);

api
  .getAllInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    userInfo.setUserId(userData._id);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

// Вадидация форм

const validationEditForm = new FormValidator(validationConfig, formElement);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(validationConfig, newCardBtn);
validationAddForm.enableValidation();

const validateAvatar = new FormValidator(validationConfig, avatarForm);
validateAvatar.enableValidation();

// Попапы

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const popupDelete = new PopupDelete(popupSureSelector, popupSureBtnSelector);

// Функции

function removeCard(card) {
  return () => {
    buttonLoaderText(true, confirmDelBtn);
    api
      .deleteCard(card._imageId)
      .then((res) => {
        card.removeCard(), popupDelete.close();
      })
      .catch((err) => console.log(err));
  };
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Рендер карточек из массива

const cardList = new Section((item) => {
  cardList.addItem(createCard(item));
}, cardListContainer);

// Создание карточки

function createCard(data) {
  const card = new Card(
    { ...data, userId: userInfo.getUserId()},
    templateSelector,
    handleCardClick,
    removeCardBtnSelector,
    () => {
      buttonLoaderText(false, confirmDelBtn);
      popupDelete.open();
      popupDelete.setEventListeners(removeCard(card));
    },
    () => {
      api
        .addLike(data._id)
        .then((res) => {
          card.updateLikes(res.likes);
        })
        .catch((err) => console.log(err));
    },
    () => {
      api
        .delLike(data._id)
        .then((res) => {
          card.updateLikes(res.likes);
        })
        .catch((err) => console.log(err));
    }
  );
  return card.generateCard();
}

// Работа с формами //

const userInfo = new UserInfo({
  nameElement: nameField,
  infoElement: aboutField,
  titleField: profileName,
  infoField: aboutProfile,
  avatarElement: profileAvatar,
});

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleSubmitForm: (data) => {
    api
      .setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithEditForm.close();
      })
      .catch((err) => console.log(err))
      .finally(buttonLoaderText(true, editSaveBtn));
  },
});
popupWithEditForm.setEventListeners();

editButton.addEventListener("click", () => {
  userInfo.setUserInfo({
    name: profileName.textContent,
    about: aboutProfile.textContent,
  });
  userInfo.updateInfo();
  buttonLoaderText(false, editSaveBtn);
  popupWithEditForm.open();
  validationEditForm.clearErrorMessage();
  validationEditForm.checkButtonStatus(true);
});

const popupWithCardForm = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleSubmitForm: (data) => {
    api
      .addCard(data)
      .then((res) => {
        cardListContainer.prepend(createCard(res));
        popupWithCardForm.close();
      })
      .catch((err) => console.log(err))
      .finally(buttonLoaderText(true, saveNewCard));
  },
});
popupWithCardForm.setEventListeners();
addBtn.addEventListener("click", () => {
  buttonLoaderText(false, saveNewCard);
  popupWithCardForm.open();
  validationAddForm.clearErrorMessage();
  validationAddForm.checkButtonStatus(false);
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleSubmitForm: (data) => {
    api
      .newAvatar(data)
      .then((res) => {
        userInfo.setAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(buttonLoaderText(true, saveNewAvatarBtn));

    console.log(data);
  },
});
popupEditAvatar.setEventListeners();

editAvatarBtn.addEventListener("click", () => {
  buttonLoaderText(false, saveNewAvatarBtn);
  popupEditAvatar.open();
  validateAvatar.checkButtonStatus(false);
  validateAvatar.clearErrorMessage();
});
