const nameField = document.querySelector(".popup__input_type_name");
const aboutField = document.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__title");
const about = document.querySelector(".profile__subtitle");
const cardListContainer = document.querySelector(".elems__list");
const templateCard = document.querySelector(".template");
const cardLinkField = document.querySelector(".popup__input_type_link");
const cardTitleField = document.querySelector(".popup__input_type_title");
const closeEditButton = document.querySelector(".popup__close-btn_edit");
const closeImgPopupBtn = document.querySelector(".popup-img__close-btn");
const closeAddPopupBtn = document.querySelector(".popup__close-btn_add");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form_edit");
const newCardBtn = document.querySelector(".popup__form_add");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup-edit");
const popupAddCard = document.querySelector(".popup-add");
const popupImage = document.querySelector(".popup-img");
const modalImg = document.querySelector(".popup-img__picture");
const modalTitle = document.querySelector(".popup-img__caption");


function renderList() {
  const cardList = initialCards.map(composeCard);
  cardListContainer.append(...cardList);
}

function composeCard(item) {
  const newCard = templateCard.content.cloneNode(true);
  const cardTitle = newCard.querySelector(".elems__title");
  const cardImage = newCard.querySelector(".elems__img");
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const likeBtn = newCard.querySelector(".elems__like");
  likeBtn.addEventListener("click", like);

  newCardBtn.addEventListener("submit", addNewCard);

  const removeBtn = newCard.querySelector(".elems__remove-btn");
  removeBtn.addEventListener("click", removeCard);

  cardImage.addEventListener("click", () => {
    composePopupInfo(item);
  });

  return newCard;
}

function composePopupInfo(item) {
  modalTitle.textContent = item.name;
  modalImg.alt = item.name;
  modalImg.src = item.link;
  openPopup(popupImage);
}

function addNewCard(ev) {
  ev.preventDefault(ev);
  const cardTitle = cardTitleField.value;
  const cardLink = cardLinkField.value;
  const newCard = composeCard({ name: cardTitle, link: cardLink });
  cardListContainer.prepend(newCard);
  newCardBtn.reset();
  closePopup(popupAddCard);
}

function removeCard(ev) {
  ev.target.closest(".elem").remove();
}

function like(ev) {
  ev.target.classList.toggle("elems__like_status_active");
}

function formSubmitHandler(ev) {
  ev.preventDefault();
  const nameInput = nameField.value;
  const jobInput = aboutField.value;
  profileName.textContent = nameInput;
  about.textContent = jobInput;
  closePopup(popupEdit);
}
formElement.addEventListener("submit", formSubmitHandler);

function clearErrorMessage(ev) {
    const errorContainer = ev.querySelectorAll('.error');
    const errorInputs = ev.querySelectorAll('.popup__input_error');
    errorContainer.forEach(span => {
        span.textContent = '';
    });
    errorInputs.forEach(input => {
        input.classList.remove('popup__input_error');
    });
}

function openPopup(ev) {
  ev.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(ev) {
  ev.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape)
}

editButton.addEventListener("click", () => {
  const saveProfile = popupEdit.querySelector(".popup__save-btn");
  openPopup(popupEdit);
  nameField.value = profileName.textContent;
  aboutField.value = about.textContent;
  checkButtonStatus(saveProfile, true, validationConfig);
});

addBtn.addEventListener("click", () => {
  const addNewCardBtn = popupAddCard.querySelector(".popup-add__make-btn");
  console.log(addNewCardBtn);
  openPopup(popupAddCard);
  checkButtonStatus(addNewCardBtn, false, validationConfig);
});

closeEditButton.addEventListener("click", () => {
  closePopup(popupEdit);
  clearErrorMessage(popupEdit);
});

closeAddPopupBtn.addEventListener("click", () => {
  closePopup(popupAddCard);
  clearErrorMessage(popupAddCard);
  newCardBtn.reset();
});

closeImgPopupBtn.addEventListener("click", () => {
  closePopup(popupImage);
});

function closePopupByEscape(ev) {
    const popupOpened = document.querySelector('.popup_opened');
    if (ev.key === "Escape") {
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

renderList();
