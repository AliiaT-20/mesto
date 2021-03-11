import '../pages/index.css';
import {FormValidator} from "../components/FormValidator.js"
import Section from "../components/Section.js"
import Card from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"
import {editButton, addButton, popupEdit, popupAdd, name, about, profileName, profileAbout, formEdit, elements,
    placeTitle, placeLink, formAdd, popups, submitButtonAddForm, popupImage, photoFromPopupImage, titleFromPopupImage, initialCards, config} from "../utils/constants.js"


const validatorFormAdd = new FormValidator(config, formAdd);
validatorFormAdd.enableValidation();

const validatorFormEdit = new FormValidator(config, formEdit);
validatorFormEdit.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');

const cardList= new Section({items: initialCards, renderer: (item) => {
    const card = new Card(item, '.card-template_type_photo', (title, image) => {
        imagePopup.open(title, image);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}}, '.elements')
cardList.renderItems();

const addPopup = new PopupWithForm('.popup_type_add', () => {
    const card = new Card({name: placeTitle.value, link: placeLink.value}, '.card-template_type_photo', (title, image) => {
        imagePopup.open(title, image);
    });
    const cardElement = card.generateCard();
    cardList.addItemStart(cardElement);
    addPopup.close();
});
addButton.addEventListener('click', function () {
    addPopup.open();
    addPopup.setEventListeners();
    submitButtonAddForm.disabled = true;
    submitButtonAddForm.classList.add("popup__submit-button_inactive")
});

const user = new UserInfo({name: '.profile__name', about: '.profile__about'})

editButton.addEventListener('click', function () {
    editPopup.open();
    name.value = user.getUserInfo().name;
    about.value = user.getUserInfo().about;
    editPopup.setEventListeners();
});
const editPopup = new PopupWithForm('.popup_type_edit', () => {
    user.setUserInfo(name.value, about.value)
    editPopup.close();
});
