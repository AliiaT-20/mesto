import '../pages/index.css';
import {FormValidator} from "../components/FormValidator.js"
import Section from "../components/Section.js"
import Card from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api.js"
import {editButton, addButton, popupEdit, popupAdd, name, about, profileName, profileAbout, profileAvatar, formEdit, elements,
    placeTitle, placeLink, formAdd, popups, submitButtonAddForm, popupImage, photoFromPopupImage, titleFromPopupImage, updateAvatar, initialCards, config} from "../utils/constants.js"
import Popup from '../components/Popup';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '2eb4d3bb-6397-4fac-946b-506829848b31',
        'Content-Type': 'application/json'
    }
});

api.getInitialCards()
.then((data) => {
    addCard(data);
})

api.getProfileInfo()
.then((info) => {
    console.log(info)
    profileName.textContent = info.name;
    profileAbout.textContent = info.about;
    profileAvatar.src = info.avatar;
})

const validatorFormAdd = new FormValidator(config, formAdd);
validatorFormAdd.enableValidation();

const validatorFormEdit = new FormValidator(config, formEdit);
validatorFormEdit.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();


const removePopup = new PopupWithSubmit('.popup_type_remove-card', () => {
    removePopup.close()
}, api);

function createCard(item) {
    return new Card(item, '.card-template_type_photo', (title, image) => {
        imagePopup.open(title, image);
    }, removePopup, api)
}

function addCard(data) {
    const cardList = new Section({items: data, renderer: (item) => {
        const card = createCard(item);
        const newCard = card.generateCard(item, profileName);
        newCard.querySelector('.element__like-counter').textContent = item.likes.length;
        cardList.addItem(newCard)
    }}, '.elements')
    cardList.renderItems();
}

const addPopup = new PopupWithForm('.popup_type_add', (inputs) => {
    const card = createCard(inputs);
    api.createCard(inputs).then(cardData => {
        const newCard = card.generateCard(cardData, profileName)
        document.querySelector('.elements').prepend(newCard);
        addPopup.close();
    })
    .finally(() => {
        addPopup.renderLoading(false)
    });
});

addPopup.setEventListeners();
addButton.addEventListener('click', function () {
    addPopup.open();
    submitButtonAddForm.disabled = true;
    submitButtonAddForm.classList.add("popup__submit-button_inactive")
});

const user = new UserInfo({name: '.profile__name', about: '.profile__about'})

const editPopup = new PopupWithForm('.popup_type_edit', (inputs) => {
    user.setUserInfo(inputs.name, inputs.about);
    api.editProfileInfo({name: name.value, about: about.value})
    .finally(() => {
        editPopup.renderLoading(false)
    });
    editPopup.close();
});
editPopup.setEventListeners();
editButton.addEventListener('click', function () {
    editPopup.open();
    name.value = user.getUserInfo().name;
    about.value = user.getUserInfo().about;
});

const updateAvatarPopup = new PopupWithForm('.popup_type_edit-profile', (inputs) => {
    api.updateAvatar(inputs.link)
    .then((data) => {
        profileAvatar.src = data.avatar
    })
    .finally(() => {
        updateAvatarPopup.renderLoading(false)
    });
    updateAvatarPopup.close();
})
updateAvatarPopup.setEventListeners();
updateAvatar.addEventListener('click', () => {
    updateAvatarPopup.open();
})