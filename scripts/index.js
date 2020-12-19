let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.close-icon');
let name = popup.querySelector('.popup__text_type_name');
let about = popup.querySelector('.popup__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function openPopup() {
    popup.classList.add('popup_opened');
    name.placeholder = profileName.textContent;
    about.placeholder = profileAbout.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup()
    }
});

let form = popup.querySelector(".popup__form");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = name.value;
    profileAbout.textContent = about.value;
    closePopup();
})