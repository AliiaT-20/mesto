import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(title, image) {
        super.open();
        document.querySelector('.popup__image').src = image;
        document.querySelector('.popup__image').alt = "Картинка - " + title;
        document.querySelector('.popup__image-title').textContent = title;
        super.setEventListeners();
    }
}