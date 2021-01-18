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
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
const placeTitle = popupAdd.querySelector('.popup__text_type_title');
const placeLink = popupAdd.querySelector('.popup__text_type_link');
const formAdd = popupAdd.querySelector('.popup__form_type_add');
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const title = popupImage.querySelector('.popup__image-title');
const closeButtonImage = document.querySelector('.popup__close-button_type_image');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function editProfile() {
    name.value = profileName.textContent;
    about.value = profileAbout.textContent;
}

function createCard() {
    const elementCard = elementTemplate.cloneNode(true);
    elementCard.querySelector('.element__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_active')
    }); 
    const buttonTrash = elementCard.querySelector('.element__button-trash');
    buttonTrash.addEventListener('click', function () {
        const cardItem = buttonTrash.closest('.element');
        cardItem.remove();
    });
    const elementPhoto = elementCard.querySelector('.element__photo');
    const elementTitle = elementCard.querySelector('.element__title');
    elementPhoto.addEventListener('click', function () {
        openPopup(popupImage);
        image.src = elementPhoto.src;
        title.textContent = elementTitle.textContent;
    });
    return elementCard;
}

function renderCardAtEnd(item) {
    elements.append(item);
}

function renderCardAtStart(item) {
    elements.prepend(item);
}

initialCards.forEach (card => {
    const additionalCard = createCard();
    additionalCard.querySelector('.element__photo').src = card.link;
    additionalCard.querySelector('.element__title').textContent = card.name;
    renderCardAtEnd(additionalCard);
})


function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function submitProfileForm(event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileAbout.textContent = about.value;
    closePopup(popupEdit);
}

function submitAddForm(event) {
    event.preventDefault();
    const addingByUserCard = createCard();
    addingByUserCard.querySelector('.element__photo').src = placeLink.value;
    addingByUserCard.querySelector('.element__title').textContent = placeTitle.value;
    renderCardAtStart(addingByUserCard);
    closePopup(popupAdd);
}

editButton.addEventListener('click', function () {
    openPopup(popupEdit);
    editProfile();
});
closeButtonEdit.addEventListener('click', function () {closePopup(popupEdit);});
addButton.addEventListener('click', function () {
    openPopup(popupAdd);
    placeLink.value = "";
    placeTitle.value = "";
});
closeButtonAdd.addEventListener('click', function() {closePopup(popupAdd);});
popupEdit.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupEdit)
    }
});
popupAdd.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupAdd)
    }
});
formEdit.addEventListener('submit', submitProfileForm);
formAdd.addEventListener('submit',  submitAddForm);
closeButtonImage.addEventListener('click', function () {closePopup(popupImage);});