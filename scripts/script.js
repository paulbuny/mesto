//Элементы редактирования профиля
let profileEdit = document.querySelector('.profile__edit'),
    profileName = document.querySelector('.profile__info-title'),
    profileJob = document.querySelector('.profile__info-text'),

    //Pop-up элементы редактирования профиля
    formElement = document.querySelector('.pop-up__form'),
    popUp = document.querySelector('.pop-up_edit-profile'),
    popUpInputName = formElement.querySelector('.pop-up__input_profile_name'),
    popUpInputJob = formElement.querySelector('.pop-up__input_profile_job'),
    popUpClose = document.querySelector('.pop-up__close-profile'),

    //Pop-up элементы добавления новой карточки "места"
    popUpPlace = document.querySelector('.pop-up_new-card'),
    popUpPlaceForm = document.querySelector('.pop-up__card-form'),
    popUpPlaceClose = document.querySelector('.pop-up__close-card'),

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

//Вызов рендера изначальных карточек
initialCards.forEach(cardRender);

//Функция вывода карточек
function cardRender(item) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.addEventListener('click', openPopUpImage);

    const cardCaption = cardElement.querySelector('.card__title');
    cardCaption.textContent = item.name;

    const cardLikeBtn = cardElement.querySelector('.card__like');
    cardLikeBtn.addEventListener('click', cardLike);
    
    const deleteCardBtn = cardElement.querySelector('.card__delete');
    deleteCardBtn.addEventListener('click', removeCard);

    cardsContainer.prepend(cardElement);

    //Функия просмотра изображения в карточке
    function openPopUpImage() {
        popUpPicture.src = item.link;
        popUpImageCaption.textContent = item.name;
        openPopUp(popUpImage, popUpCloseImage);
    }

    //Функция удаления карточки
    function removeCard(evt) {
        evt.target.parentElement.remove();

        deleteCardBtn.removeEventListener('click', removeCard);
        cardLikeBtn.removeEventListener('click', cardLike);
        cardImage.removeEventListener('click', openPopUpImage);
    }

    //Функция переключения лайка в карточке
    function cardLike(evt){
        evt.target.classList.toggle('card__like_active');
    }

    return cardElement;
}

//Функия добавления новой карточки
function addNewCard (evt) {
    evt.preventDefault();

    const cardDataName = document.querySelector('.pop-up__input_card_place');
    const cardDataLink = document.querySelector('.pop-up__input_card_image');

    const cardData = {
        name: cardDataName.value,
        link: cardDataLink.value
    };

    cardRender(cardData);
    closePopUp(popUpPlace);

    cardDataName.value = '';
    cardDataLink.value = '';
}

//Функция открытия окна pop-up
function openPopUp (popUpElement, popUpCloseBtn) {
    popUpElement.classList.add('pop-up_display_active');
    popUpCloseBtn.addEventListener('click', ()=> closePopUp(popUpElement));
}

//Функция закрытия окна pop-up
function closePopUp (popUpElement) {
    popUpElement.classList.remove('pop-up_display_active');
}

//Функция редактирования данных профиля
function editProfileData (popUpElement, popUpCloseBtn) {
    openPopUp(popUpElement, popUpCloseBtn);

    popUpInputName.value = profileName.textContent;
    popUpInputJob.value = profileJob.textContent;
}

//Функция сохранения отредактированных данных профиля
function saveProfileData (evt) {
    evt.preventDefault();

    profileName.textContent = popUpInputName.value;
    profileJob.textContent = popUpInputJob.value;

    closePopUp (popUp);
}

profileEdit.addEventListener('click', () => editProfileData(popUp, popUpClose));
addCardButton.addEventListener('click', ()=> openPopUp(popUpPlace, popUpPlaceClose));
formElement.addEventListener('submit', saveProfileData);
popUpPlaceForm.addEventListener('submit', addNewCard);
