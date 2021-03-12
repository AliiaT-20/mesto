import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(title, image) {
        super.open();
        this._popup.querySelector('.popup__image').src = image;
        this._popup.querySelector('.popup__image').alt = "Картинка - " + title;
        this._popup.querySelector('.popup__image-title').textContent = title;
    }
}