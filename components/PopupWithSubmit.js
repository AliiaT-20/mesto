import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._submit = formSubmit;
    }
    setEventListeners(id, element, card) {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(id, card);
        })
    }
}