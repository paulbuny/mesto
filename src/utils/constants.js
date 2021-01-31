const editProfileButton = document.querySelector('.profile__edit');
const profileName = '.profile__info-title';
const profileJob = '.profile__info-text';

    //Pop-up элементы редактирования профиля
const profileForm = document.querySelector('.pop-up__edit-profile');
const popupProfileSelector = '.pop-up_edit-profile';
const popupInputName = profileForm.querySelector('.pop-up__input_profile_name');
const popupInputJob = profileForm.querySelector('.pop-up__input_profile_job');

    //Pop-up элементы добавления новой карточки "места"
const popupCardForm = document.querySelector('.pop-up__card-form');
const popupCardSelector = '.pop-up_new-card';
const popupCardImage = '.pop-up_card-image';
const cardTemplateSelector = '.card-template';

    //Элементы добавления карточек
const addCardButton = document.querySelector('.profile__add');
const cardsContainer = '.cards';

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

export {
    editProfileButton,
    profileName,
    profileJob,
    profileForm,
    popupProfileSelector,
    popupInputName,
    popupInputJob,
    popupCardForm,
    popupCardSelector,
    popupCardImage,
    cardTemplateSelector,
    addCardButton,
    cardsContainer,
    initialCards,
    validationConfig
};