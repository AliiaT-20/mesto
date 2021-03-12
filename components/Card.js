export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.title;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._imageCard = this._element.querySelector('.element__photo');
        this._titleCard = this._element.querySelector('.element__title');
        this._setEventListeners();
        this._imageCard.src = this._image;
        this._imageCard.alt = "Картинка - " + this._title;
        this._titleCard.textContent = this._title;
        
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__button-trash').addEventListener('click', () => {
            this._handleRemoveCard();
        })
        this._element.querySelector('.element__button').addEventListener('click', (evt) => {
            this._handleLikeCard(evt);
        })
        this._imageCard.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        })
       
    }
    _handleRemoveCard() {
        this._element.querySelector('.element__button-trash').closest('.element').remove();
    }
    _handleLikeCard(evt) {
        evt.target.classList.toggle('element__button_active');
    }
}

