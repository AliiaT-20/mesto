export default class Card {
    constructor(data, cardSelector, handleCardClick, popup, api) {
        this._name = data.name;
        this._image = data.link;
        this._id = data.id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._popup = popup;
        this._api = api;
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    }
    generateCard(data, name) {
        this._element = this._getTemplate();
        if (data.owner.name !== name.textContent) {
            this._element.querySelector('.element__button-trash').style.display = "none"
        }
        this._id = data._id;
        this._imageCard = this._element.querySelector('.element__photo');
        this._titleCard = this._element.querySelector('.element__title');
        this._setEventListeners();
        this._imageCard.src = this._image;
        this._imageCard.alt = "Картинка - " + this._name;
        this._titleCard.textContent = this._name;
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__button-trash').addEventListener('click', () => {
            this._popup.open();
            this._popup.setEventListeners(this._id, this._element);
        })
        this._element.querySelector('.element__button').addEventListener('click', (evt) => {
            if (this._isLiked(evt)) {
                this._api.deleteLike(this._id)
                .then((data) => {
                    this._element.querySelector('.element__like-counter').textContent = data.likes.length;
                })
            } else {
                this._api.addLike(this._id)
                .then((data) => {
                    this._element.querySelector('.element__like-counter').textContent = data.likes.length;
                })
            }
            this._handleLikeCard(evt);
        })
        this._imageCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._image);
        })
       
    }
    _handleRemoveCard() {
        this._element.querySelector('.element__button-trash').closest('.element').remove();
    }
    _handleLikeCard(evt) {
        evt.target.classList.toggle('element__button_active');
    }
    _isLiked(evt) {
        if (evt.target.classList.contains('element__button_active')) {
            return true
        } else {
            return false
        }
    }
}

