import '../pages/index.css';
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidation.js";
import Section from "../script/Section.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import UserInfo from "../script/UserInfo.js";
import Api from "../script/Api.js"
import PopupDelete from "../script/PopupDelete.js"

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
    userInfo.setUserId(userData._id)
  })
  .catch(err => console.log(err))




// function delLike(cardId) {
//    return 
// }
// Вадидация форм

const validationEditForm = new FormValidator(validationConfig, formElement);
validationEditForm.enableValidation();

const validationAddForm = new FormValidator(validationConfig, newCardBtn);
validationAddForm.enableValidation();

// Попапы

const popupWithImage = new PopupWithImage(".popup-img");
popupWithImage.setEventListeners();

const popupDelete = new PopupDelete('.popup-sure', '.popup-sure__btn')


function removeCard(card) {
  return () => {
    api.deleteCard(card._imageId)
    .then(res => {
    card.removeCard(),
    popupDelete.close()
  })
  .catch(err => console.log(err))
  }
  
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Рендер карточек из массива

const cardList = new Section((item) =>  {
      cardList.addItem(createCard(item));
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

const popupWithEditForm = new PopupWithForm({
  popupSelector: ".popup-edit",
  handleSubmitForm: (data) => {
    api.setUserInfo(data)
    .then(res => {
      console.log(res);
      userInfo.setUserInfo(res)
      popupWithEditForm.close();
    })
    .catch(err => console.log(err))
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
    api.addCard(data)
    .then(res => {
      cardListContainer.prepend(createCard(res)); 
      popupWithCardForm.close();
    })
    .catch(err => console.log(err))
  },
});
popupWithCardForm.setEventListeners();

addBtn.addEventListener("click", () => {
  popupWithCardForm.open();
  validationAddForm.checkButtonStatus(false);
});

function createCard(data) {
  const card = new Card({...data, userId: userInfo.getUserId()},
    "template",
    handleCardClick,
    '.elems__remove-btn',
      () => {
      popupDelete.open()
      popupDelete.setEventListeners(removeCard(card))
    },
    () => {
          api.addLike(data._id)
          .then(res => {
            console.log(res);
            card.updateLikes(res.likes)
          })
  
    },
    () => {
      api.delLike(data._id).then(res => {
        console.log(res);

        card.updateLikes(res.likes)
      })
    }
  );
  return card.generateCard();
}
