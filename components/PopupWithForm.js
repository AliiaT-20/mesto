import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._submit = formSubmit;
    }
    _getInputValues() {
        return document.querySelectorAll('.popup__text');
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        })
    }
    close() {
        document.querySelector('.popup__form_type_add').reset();
        super.close();
    }
}