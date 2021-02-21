export default class Card {
  constructor(
    { name, link, owner, likes, _id, userId },
    cardSelector,
    handleCardClick,
    deleteSelector,
    deleteHandle,
    putLike,
    delLike
  ) {
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._likes = likes;
    this._userId = userId;
    // console.log(this._userId);
    this._imageId = _id;
    this._cardSelector = cardSelector;
    this._openPopupImage = handleCardClick;
    this._deleteSelector = deleteSelector;
    this._deleteHandle = deleteHandle;
    this._putLike = putLike
    this._delLike = delLike;
    this._handleLikeClick = this._handleLikeClick.bind(this)
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elems__item")
      .cloneNode(true);
    if (this._userId !== this._ownerId) {
      newCard.querySelector(this._deleteSelector).style.display = "none";
      return newCard;
    }
    return newCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elems__title").textContent = this._name;
    this._element.querySelector(".elems__img").src = this._link;
    this._element.querySelector(".elems__title").alt = this._name;
    this._likes.forEach((item) => {
        if(item._id === this._userId) {
            this._element.querySelector('.elems__like').classList.add('elems__like_status_active')
        }
    });
    this.updateLikes(this._likes)

    this._setEventListeners();
    return this._element;
  }

  updateLikes(likes) {
    this._element.querySelector(".elems__number-of-likes").textContent = likes.length;
  }

  _setEventListeners() {
    this._element.querySelector(".elems__like").addEventListener("click", this._handleLikeClick)
    this._element
      .querySelector(this._deleteSelector)
      .addEventListener("click", () => {
        this._deleteHandle();
      });

    this._element.querySelector(".elems__img").addEventListener("click", () => {
      this._openPopupImage(this._name, this._link);
    });
  }

  _handleLikeClick(evt) {
    if (evt.target.classList.contains("elems__like_status_active")) {
      this._element.querySelector('.elems__like').classList.remove('elems__like_status_active')
      this._delLike();
    } else {
      this._element.querySelector('.elems__like').classList.add('elems__like_status_active')
      this._putLike();
    }
  }

  removeCard() {
    this._element.closest(".elem").remove();
    this._element = null;
  }
}
