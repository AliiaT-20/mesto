import {FormValidator} from "./FormValidator.js"
import Card from "./Card.js"
import {editButton, addButton, popupEdit, popupAdd, name, about, profileName, profileAbout, formEdit, elements,
    placeTitle, placeLink, formAdd, popups, submitButtonAddForm, popupImage, photoFromPopupImage, titleFromPopupImage, initialCards, config} from "./constants.js"



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

function createCard(card) {
    return new Card(card, '.card-template_type_photo', handleCardClick).generateCard();
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
    const addingByUserCard = createCard({name: placeTitle.value, link: placeLink.value});
    renderCardAtStart(addingByUserCard);
    closePopup(popupAdd);
}

function validateForm(form) {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
}

function handleCardClick(title, image) {
    photoFromPopupImage.src = image;
    titleFromPopupImage.textContent = title;
    openPopup(popupImage);
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
    formAdd.reset();
    submitButtonAddForm.disabled = true;
    submitButtonAddForm.classList.add("popup__submit-button_inactive")
});

validateForm(formAdd);
validateForm(formEdit);

formEdit.addEventListener('submit', submitProfileForm);
formAdd.addEventListener('submit',  submitAddForm);


initialCards.forEach((item) => {
    const card = createCard(item);
    elements.append(card);
})