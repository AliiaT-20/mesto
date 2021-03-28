import './index.css';
import {FormValidator} from "../components/FormValidator.js"
import Section from "../components/Section.js"
import Card from "../components/Card.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api.js"
import {editButton, addButton, popupEdit, popupAdd, name, about, profileName, profileAbout, profileAvatar, formEdit, elements,
    placeTitle, placeLink, formAdd, popups, submitButtonAddForm, popupImage, photoFromPopupImage, titleFromPopupImage, updateAvatar, formAva, initialCards, config} from "../utils/constants.js"
import Popup from '../components/Popup';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '2eb4d3bb-6397-4fac-946b-506829848b31',
        'Content-Type': 'application/json'
    }
});

const user = new UserInfo({name: '.profile__name', about: '.profile__about', photo: '.avatar'})
let userID = ""
let cardList = ""

function getIdProfile(id) {
    userID = id
}

api.getProfileInfo()
.then((info) => {
    user.setUserInfo(info.name, info.about, info.avatar);
    getIdProfile(info._id)
})
.catch(err => Promise.reject(err))

api.getInitialCards()
.then((data) => {
    cardList = new Section({items: data, renderer: (item) => {
        const card = createCard(item, userID);
        const newCard = card.generateCard(item);
        cardList.addItem(newCard)
    }}, '.elements')
    cardList.renderItems();
})
.catch(err => Promise.reject(err))


const validatorFormAdd = new FormValidator(config, formAdd);
validatorFormAdd.enableValidation();

const validatorFormEdit = new FormValidator(config, formEdit);
validatorFormEdit.enableValidation();

const validatorFormAva = new FormValidator(config, formAva);
validatorFormAva.enableValidation();



const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();


const removePopup = new PopupWithSubmit('.popup_type_remove-card', (id, card) => {
    api.removeCard(id)
    .then((data) => {
        removePopup.close()
        card.removeCard()
    })
    .catch(err => Promise.reject(err))
});

function handleLikeCard(card) {
    api.addLike(card.getId())
      .then(data => card.setLikesInfo(data))
      .catch(err => Promise.reject(err));
}

function handleDeleteLike(card) {
    api.deleteLike(card.getId())
      .then(data => card.setLikesInfo(data))
      .catch(err => Promise.reject(err));
}  

function createCard(item, id) {
    return new Card(item, '.card-template_type_photo', (title, image, card) => {
        imagePopup.open(title, image);
    }, (cardId, element, card) => {
        removePopup.open();
        removePopup.setEventListeners(cardId, element, card)
    }, id, handleLikeCard, handleDeleteLike)
}

const addPopup = new PopupWithForm('.popup_type_add', (inputs) => {
    const card = createCard(inputs, userID);
    api.createCard(inputs).then(cardData => {
        const newCard = card.generateCard(cardData)
        cardList.addItemStart(newCard);
        addPopup.close();
    })
    .catch(err => Promise.reject(err))
    .finally(() => {
        addPopup.renderLoading(false)
    });
});

addPopup.setEventListeners();
addButton.addEventListener('click', function () {
    addPopup.open();
    validatorFormAdd.disableSubmitButton();
});

const editPopup = new PopupWithForm('.popup_type_edit', (inputs) => {
    api.editProfileInfo({name: name.value, about: about.value})
    .then((data) => {
        user.setUserInfo(inputs.name, inputs.about);
        editPopup.close();
    })
    .catch(err => Promise.reject(err))
    .finally(() => {
        editPopup.renderLoading(false)
    });
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
        profileAvatar.src = data.avatar;
        updateAvatarPopup.close();
    })
    .catch(err => Promise.reject(err))
    .finally(() => {
        updateAvatarPopup.renderLoading(false)
    });
})
updateAvatarPopup.setEventListeners();
updateAvatar.addEventListener('click', () => {
    validatorFormAva.disableSubmitButton();
    updateAvatarPopup.open();
})