import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }
    open(title, image) {
        super.open();
        this._popupCardImage.src = image;
        this._popupCardImage.alt = "Картинка - " + title;
        this._popupImageTitle.textContent = title;
    }
}