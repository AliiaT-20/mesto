import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._submit = formSubmit;
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._inputList = this._popup.querySelectorAll('.popup__text');
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else if (!isLoading) {
            this._submitButton.textContent = "Сохранить";
        }
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._submit(this._getInputValues());
        })
    }
    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
}