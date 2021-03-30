export default class Card {
    constructor(data, cardSelector, handleCardClick, handleTrashClick, id, handleLikeCard, handleDeleteLike) {
        this._name = data.name;
        this._image = data.link;
        this._id = data._id;
        this._userID = id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._addLikeCard = handleLikeCard;
        this._deleteLike = handleDeleteLike;
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    }
    generateCard(data) {
        this._element = this._getTemplate();
        if (data.owner._id !== this._userID) {
            this._element.querySelector('.element__button-trash').style.display = "none"
        }
        if (data.likes.length !== 0) {
            for (let i = 0; i < data.likes.length; i ++) {
                if (data.likes[i]._id === this._userID) {
                    this._element.querySelector('.element__button').classList.add('element__button_active')
                }
            }
        }
        this._element.querySelector('.element__like-counter').textContent = data.likes.length;
        this._imageCard = this._element.querySelector('.element__photo');
        this._titleCard = this._element.querySelector('.element__title');
        this._setEventListeners();
        this._imageCard.src = this._image;
        this._imageCard.alt = "Картинка - " + this._name;
        this._titleCard.textContent = this._name;
        this._newCardId = data._id
        this._likeBtn = this._element.querySelector('.element__button')
        return this._element;
    }
    getId() {
        return this._newCardId
    }
    setLikesInfo(data) {
        this._handleLikeCard();
        this._element.querySelector('.element__like-counter').textContent = data.likes.length;
    }
    removeCard() {
        this._element.querySelector('.element__button-trash').closest('.element').remove()
    }
    _setEventListeners() {
        this._element.querySelector('.element__button-trash').addEventListener('click', (evt) => {

            console.log(evt)
            this._handleTrashClick(this._newCardId, this);
        })
        this._element.querySelector('.element__button').addEventListener('click', (evt) => {
            if (this._isLiked(evt)) {
                this._deleteLike(this);
            } else {
                this._addLikeCard(this);
            }
            
        })
        this._imageCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._image);
        })
       
    }
    _handleRemoveCard() {
        this._element.querySelector('.element__button-trash').closest('.element').remove();
    }
    _handleLikeCard() {
        this._likeBtn.classList.toggle('element__button_active');
    }
    _isLiked(evt) {
        if (evt.target.classList.contains('element__button_active')) {
            return true
        } else {
            return false
        }
    }
}

