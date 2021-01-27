import { initialCards } from './initialCards.js';

const cardListContainer = document.querySelector(".elems__list");
const popup = document.querySelector('.popup-img')

function closePopupByEscape(ev) {
    const popupOpened = document.querySelector('.popup_opened');
    if (ev.key === "Escape") {
     popupOpened.classList.remove("popup_opened");
     }
}

function openPopupImage(name, link) {
    popup.querySelector(".popup-img__caption").textContent = name;
    popup.querySelector('.popup-img__picture').alt = name;
    popup.querySelector('.popup-img__picture').src = link;
    openPopup(popup);
  }

function openPopup(ev) {
   ev.classList.add("popup_opened");
   document.addEventListener("keydown", closePopupByEscape);
 }


export default class Card {
    constructor(data, cardSelector, openPopupImage) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openPopupImage = openPopupImage;
    }

    _getTemplate() {
        const newCard = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elems__item')
        .cloneNode(true);

        return newCard
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elems__title').textContent = this._name;
        this._element.querySelector('.elems__img').src = this._link;
        this._element.querySelector('.elems__title').alt = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elems__like').addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._element.querySelector('.elems__remove-btn').addEventListener('click', () => {
            this._removeCard();
        })

        this._element.querySelector('.elems__img').addEventListener('click', () => {
            this._openPopupImage(this._name, this._link)
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.elems__like').classList.toggle('elems__like_status_active')
    }

    _removeCard() {
        this._element.closest(".elem").remove()
    }
    
}

initialCards.forEach((item) => {
    const card = new Card(item, 'template', openPopupImage);
    const cardElem = card.generateCard();
    cardListContainer.append(cardElem);
})