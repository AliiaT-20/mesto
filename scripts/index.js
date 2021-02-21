import {config, FormValidator} from "./FormValidator.js"
import Card from "./Card.js"

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const closeButtonEdit = document.querySelector('.popup__close-button_type_edit')
const closeButtonAdd = document.querySelector('.popup__close-button_type_add')
const name = popupEdit.querySelector('.popup__text_type_name');
const about = popupEdit.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formEdit = popupEdit.querySelector(".popup__form_type_edit");
const elements = document.querySelector('.elements');
const placeTitle = popupAdd.querySelector('.popup__text_type_title');
const placeLink = popupAdd.querySelector('.popup__text_type_link');
const formAdd = popupAdd.querySelector('.popup__form_type_add');
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const title = popupImage.querySelector('.popup__image-title');
const closeButtonImage = document.querySelector('.popup__close-button_type_image');
const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
      }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
}

function editProfile() {
    name.value = profileName.textContent;
    about.value = profileAbout.textContent;
}

function createCard(card, cardSelector) {
    return new Card(card, cardSelector);
}

function renderCardAtEnd(item) {
    elements.append(item);
}

function renderCardAtStart(item) {
    elements.prepend(item);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
}

function submitProfileForm(event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileAbout.textContent = about.value;
    closePopup(popupEdit);
}

function submitAddForm(event) {
    event.preventDefault();
    const addingByUserCard = new Card({name: placeTitle.value, link: placeLink.value}, '.card-template_type_photo').generateCard();
    renderCardAtStart(addingByUserCard);
    closePopup(popupAdd);
}

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})


editButton.addEventListener('click', function () {
    openPopup(popupEdit);
    editProfile();
});

addButton.addEventListener('click', function () {
    openPopup(popupAdd);
    placeLink.value = "";
    placeTitle.value = "";
});

forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
})

formEdit.addEventListener('submit', submitProfileForm);
formAdd.addEventListener('submit',  submitAddForm);


initialCards.forEach((item) => {
    const card = new Card(item, '.card-template_type_photo');
    const cardElement = card.generateCard();
    elements.append(cardElement);
})