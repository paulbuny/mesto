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

const cardTemplate = document.querySelector('.card-template').content;

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

// Функция вывода новой карточки
function cardRender(container, element) {
    container.prepend(element);
}

//Функция вывода карточек
function createCard(item) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardImage.addEventListener('click', () => openPopUpImage(item));

    const cardCaption = cardElement.querySelector('.card__title');
    cardCaption.textContent = item.name;

    const cardLikeBtn = cardElement.querySelector('.card__like');
    cardLikeBtn.addEventListener('click', cardLike);
    
    const deleteCardBtn = cardElement.querySelector('.card__delete');
    deleteCardBtn.addEventListener('click', removeCard);

    return cardElement;
}

//Вызов рендера изначальных карточек
initialCards.forEach((item)=> cardRender(cardsContainer, createCard(item)));

//Функия просмотра изображения в карточке
function openPopUpImage (item) {
    popUpPicture.src = item.link;
    popUpPicture.alt = item.name;
    popUpImageCaption.textContent = item.name;
    openPopUp(popUpImage);
}

//Функция удаления карточки
function removeCard (evt) {
    evt.target.parentElement.remove();
}

//Функция переключения лайка в карточке
function cardLike (evt){
    evt.target.classList.toggle('card__like_active');
}


//Функия добавления новой карточки
function addNewCard (evt) {
    evt.preventDefault();

    const cardData = {
        name: cardDataName.value,
        link: cardDataLink.value
    };

    cardRender(cardsContainer, createCard(cardData));
    closePopUp(popUpPlace);

    evt.target.reset();

    //Изменение состояния кнопки после закрытия
    toggleButtonState(popUpPlaceForm.querySelector('.pop-up__submit'), popUpPlaceForm.checkValidity(), validationElements);
}

//Функция открытия окна pop-up
function openPopUp (popUpElement) {
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

    //Изменение состояния кнопки по открытию
    toggleButtonState (profileForm.querySelector('.pop-up__submit'), profileForm.checkValidity(), validationElements);

    //Проверка валидации по открытию
    profileForm.querySelectorAll('.pop-up__input').forEach((input) => {
            checkValidation (profileForm, input, validationElements);
    });
}

//Функция сохранения отредактированных данных профиля
function saveProfileData (evt) {
    evt.preventDefault();

    profileName.textContent = popUpInputName.value;
    profileJob.textContent = popUpInputJob.value;

    closePopUp (popUpProfile);
}

profileEdit.addEventListener('click', () => editProfileData(popUpProfile));
popUpCloseProfile.addEventListener('click', () => closePopUp(popUpProfile));
profileForm.addEventListener('submit', saveProfileData);

addCardButton.addEventListener('click', ()=> openPopUp(popUpPlace));
popUpPlaceClose.addEventListener('click', () => closePopUp(popUpPlace));
popUpPlaceForm.addEventListener('submit', addNewCard);

popUpCloseImage.addEventListener('click', () => closePopUp(popUpImage));