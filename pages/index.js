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
imagePopup.setEventListeners();

function createCard(item) {
    return new Card(item, '.card-template_type_photo', (title, image) => {
        imagePopup.open(title, image);
    }).generateCard();
}

const cardList= new Section({items: initialCards, renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
}}, '.elements')
cardList.renderItems();

const addPopup = new PopupWithForm('.popup_type_add', (inputs) => {
    const card = createCard(inputs);
    cardList.addItemStart(card);
    addPopup.close();
});
addPopup.setEventListeners();
addButton.addEventListener('click', function () {
    addPopup.open();
    submitButtonAddForm.disabled = true;
    submitButtonAddForm.classList.add("popup__submit-button_inactive")
});

const user = new UserInfo({name: '.profile__name', about: '.profile__about'})

const editPopup = new PopupWithForm('.popup_type_edit', (inputs) => {
    user.setUserInfo(inputs.name, inputs.about)
    editPopup.close();
});
editPopup.setEventListeners();
editButton.addEventListener('click', function () {
    editPopup.open();
    name.value = user.getUserInfo().name;
    about.value = user.getUserInfo().about;
});
