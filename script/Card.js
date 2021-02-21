export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openPopupImage = handleCardClick;
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
    getLikes(data) {
        this._numLikes = data.likes.length;
        this._element.querySelector('.elems__number-of-likes').textContent = this._numLikes
        // console.log(this._numLikes);
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
        this._element = null;
    }
    
}