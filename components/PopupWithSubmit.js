import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._submit = formSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._id, this._card);
        })
    }
    open(id, card) {
        super.open();
        this._id = id;
        this._card = card
    }
}