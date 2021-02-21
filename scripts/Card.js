export default class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
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
        this._setEventListeners();
        this._element.querySelector('.element__photo').src = this._image;
        this._element.querySelector('.element__title').textContent = this._title;
        
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__button-trash').addEventListener('click', () => {
            this._handleRemoveCard();
        })
        this._element.querySelector('.element__button').addEventListener('click', (evt) => {
            this._handleLikeCard(evt);
        })
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleImagePopup();
        })
        document.querySelector('.popup__close-button_type_image').addEventListener('click', () => {
            this._handleCloseImagePopup();
        })
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this._handleCloseImagePopup();
              }
        })
        document.querySelector('.popup_type_image').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this._handleCloseImagePopup();
            }
        })
       
    }
    _handleRemoveCard() {
        this._element.querySelector('.element__button-trash').closest('.element').remove();
    }
    _handleLikeCard(evt) {
        evt.target.classList.toggle('element__button_active');
    }
    _handleImagePopup() {
        document.querySelector('.popup_type_image').classList.add('popup_opened');
        document.querySelector('.popup__image').src = this._image;
        document.querySelector('.popup__image-title').textContent = this._title;
    }
    _handleCloseImagePopup() {
        document.querySelector('.popup_type_image').classList.remove('popup_opened');
    }
}

