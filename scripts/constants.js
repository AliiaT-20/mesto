export {editButton, addButton, popupEdit, popupAdd, name, about, profileName, profileAbout, formEdit, elements,
placeTitle, placeLink, formAdd, popups, submitButtonAddForm, popupImage, photoFromPopupImage, titleFromPopupImage, initialCards, config}

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const name = popupEdit.querySelector('.popup__text_type_name');
const about = popupEdit.querySelector('.popup__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formEdit = popupEdit.querySelector(".popup__form_type_edit");
const elements = document.querySelector('.elements');
const placeTitle = popupAdd.querySelector('.popup__text_type_title');
const placeLink = popupAdd.querySelector('.popup__text_type_link');
const formAdd = popupAdd.querySelector('.popup__form_type_add');
const popups = document.querySelectorAll('.popup');
const submitButtonAddForm = popupAdd.querySelector('.popup__submit-button');
const popupImage = document.querySelector('.popup_type_image');
const photoFromPopupImage = popupImage.querySelector('.popup__image');
const titleFromPopupImage = popupImage.querySelector('.popup__image-title');
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
  const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
}