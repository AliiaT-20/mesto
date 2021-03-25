import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector, formSubmit, api) {
        super(popupSelector);
        this._submit = formSubmit;
        this._api = api;
    }
    setEventListeners(id, element) {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._api.removeCard(id)
            
            this._submit();
            element.querySelector('.element__button-trash').closest('.element').remove()
        })
    }
}