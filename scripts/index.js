import FormValidator from './FormValidator.js';
import Card from './Card.js';

//Элементы редактирования профиля
const profileEdit = document.querySelector('.profile__edit'),
    profileName = document.querySelector('.profile__info-title'),
    profileJob = document.querySelector('.profile__info-text'),

    //Pop-up элементы редактирования профиля
    profileForm = document.querySelector('.pop-up__edit-profile'),
    popUpProfile = document.querySelector('.pop-up_edit-profile'),
    popUpInputName = profileForm.querySelector('.pop-up__input_profile_name'),
    popUpInputJob = profileForm.querySelector('.pop-up__input_profile_job'),
    popUpCloseProfile = document.querySelector('.pop-up__close-profile'),

    //Pop-up элементы добавления новой карточки "места"
    popUpPlace = document.querySelector('.pop-up_new-card'),
    popUpPlaceForm = document.querySelector('.pop-up__card-form'),
    popUpPlaceClose = document.querySelector('.pop-up__close-card'),
    cardDataName = document.querySelector('.pop-up__input_card_place'),
    cardDataLink = document.querySelector('.pop-up__input_card_image'),

    //Элементы добавления карточек
    addCardButton = document.querySelector('.profile__add'),
    cardsContainer = document.querySelector('.cards'),

    //Pop-up элементы отображения изображения карточки
    popUpImage = document.querySelector('.pop-up_card-image'),
    popUpCloseImage = document.querySelector('.pop-up__close-image'),
    popUpPicture = document.querySelector('.pop-up__image'),
    popUpImageCaption = document.querySelector('.pop-up__caption');

//Стартовый массив карточек
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

const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit',
    inactiveButtonClass: 'pop-up__submit_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__error_visible'
};

//Функция открытия окна pop-up
export function openPopUp (popUpElement) {
    popUpElement.classList.add('pop-up_display_active');
    popUpElement.addEventListener('mousedown', closePopUpOnOverlayClick);
    document.addEventListener('keydown', closePopUpOnEscape);
}

//Функция закрытия окна pop-up
function closePopUp (popUpElement) {
    popUpElement.classList.remove('pop-up_display_active');
    document.removeEventListener('keydown', closePopUpOnEscape);
    popUpElement.removeEventListener('mousedown', closePopUpOnOverlayClick);
}

//Функция закрытия окна pop-up по клику на подложку
function closePopUpOnOverlayClick(evt) {
    closePopUp(evt.target);
}

//Функция закрытия окна pop-up по нажатию Esc
function closePopUpOnEscape (evt) {
    if (evt.key === 'Escape') {
        closePopUp(document.querySelector('.pop-up_display_active'));
    }
}

//Функция редактирования данных профиля
function editProfileData (popUpElement) {
    openPopUp(popUpElement);

    popUpInputName.value = profileName.textContent;
    popUpInputJob.value = profileJob.textContent;

    formValidation.resetValidation(profileForm);
}

//Функция сохранения отредактированных данных профиля
function saveProfileData (evt) {
    evt.preventDefault();

    profileName.textContent = popUpInputName.value;
    profileJob.textContent = popUpInputJob.value;

    closePopUp(popUpProfile);
}

//Вызов рендера изначальных карточек
initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.createCard();
    cardsContainer.prepend(cardElement);
});

//Функия добавления новой карточки
function addNewCard (evt) {
    evt.preventDefault();

    const cardData = {
        name: cardDataName.value,
        link: cardDataLink.value
    };

    const card = new Card(cardData, '.card-template');
    const cardElement = card.createCard();

    cardsContainer.prepend(cardElement);
    closePopUp(popUpPlace);
    popUpPlaceForm.reset();

    //Изменение состояния кнопки по открытию
    formValidation.resetValidation(popUpPlaceForm);
}

export function openPopUpImage (name, link) {
    popUpPicture.src = link;
    popUpPicture.alt = name;
    popUpImageCaption.textContent = name;
    openPopUp(popUpImage);
}

profileEdit.addEventListener('click', () => editProfileData(popUpProfile));
popUpCloseProfile.addEventListener('click', () => closePopUp(popUpProfile));
profileForm.addEventListener('submit', saveProfileData);

addCardButton.addEventListener('click', ()=> openPopUp(popUpPlace));
popUpPlaceClose.addEventListener('click', () => closePopUp(popUpPlace));
popUpPlaceForm.addEventListener('submit', addNewCard);

popUpCloseImage.addEventListener('click', () => closePopUp(popUpImage));

const formValidation = new FormValidator(validationConfig);
formValidation.enableValidation();