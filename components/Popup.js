export default class Popup{
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }
    open() {
        this._popup.classList.add('popup_opened');
        /*document.addEventListener('keydown', closeByEscape); */
    }
    close() {
        this._popup.classList.remove('popup_opened');
        /*document.removeEventListener('keydown', closeByEscape); */
    }
    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        })
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })
    }
}