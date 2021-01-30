import '../pages/index.css';

//Импорт констант
import {
    editProfileButton,
    profileName,
    profileJob,
    profileForm,
    popupProfileSelector,
    popupInputName,
    popupInputJob,
    popupCardForm,
    popupCardSelector,
    cardTemplateSelector,
    addCardButton,
    cardsContainer,
    initialCards,
    validationConfig
} from '../utils/constants.js'

//Импорт класса валидации формы
import FormValidator from '../components/FormValidator.js';

//Импорт класса генерации карточки
import Card from '../components/Card.js';

//Импорт класса поп-апа с формой
import PopupWithForm from "../components/PopupWithForm.js";

//Импорт класса поп-апа с картинкой
import PopupWithImage from "../components/PopupWithImage.js";

//Импорт класса добавления новых элементов в секцию
import Section from "../components/Section.js";

//Импорт класса заполнения данных о пользователе
import UserInfo from "../components/UserInfo.js";


/*НИЖЕ - код касающийся данных о профиле*/

//Создание нового класса валидации для формы заполнения профиля
const profilePopupValidation = new FormValidator(validationConfig, profileForm);
profilePopupValidation.enableValidation();

//Создания нового класса для заполненния профиля
const userData = new UserInfo({nameSelector: profileName, jobSelector: profileJob});

//Создания нового класса для поп-апа с формой заполнения информации о профиле
const popupSaveProfile = new PopupWithForm({
    popupSelector: popupProfileSelector,
    handleFormSubmit: (item) => {

        userData.setUserInfo(item);
    },
});

popupSaveProfile.setEventListeners();

//Функция для открытия по поп-апа с формой заполнения информации о профиле
function openPopupProfile() {
    const user = userData.getUserInfo();

    popupInputName.value = user.name;
    popupInputJob.value = user.job;

    popupSaveProfile.open();

    profilePopupValidation.resetValidation(profileForm);
}

//Вызов открытия попапа формы заполнения информации о профиле
editProfileButton.addEventListener('click', () => openPopupProfile());

/*НИЖЕ - код касающийся карточек*/

//Создание нового класса валидации для формы добавления новой карточки
const cardPopupValidation = new FormValidator(validationConfig, popupCardForm);
cardPopupValidation.enableValidation();

//Рендер начальных карточек
const initialCardsRenderer = new Section({
    items: initialCards,
    render: (item) =>{

        //Создание нового экземпляра класа для каждой отдельной карточки
        const cardsArray = new Card(item, cardTemplateSelector, {
            handleCardCreate: (item) => {
                const popupImage = new PopupWithImage('.pop-up_card-image');

                popupImage.open({ name: item._name, link: item._link});
        }});
        cardsArray.createCard();
        initialCardsRenderer.addItem(cardsArray._element);
    }}, cardsContainer);

initialCardsRenderer.renderItems();


//Создание нового экземпляра класа для поп-апа с формой добавления новой карточки
const popupAddNewCard = new PopupWithForm({
    popupSelector: popupCardSelector,
    handleFormSubmit: (item) => {

        //Создание нового экземпляра класса для новой карточки
        const cardElement = new Card(item, cardTemplateSelector, {
            handleCardCreate: (item) => {

                //Создание нового экземпляра класса для поп-апа с изображением
                const popupImage = new PopupWithImage('.pop-up_card-image');
                popupImage.open({ name: item._name, link: item._link});
            }
        });

        cardElement.createCard();
        initialCardsRenderer.addItem(cardElement._element);
    },
});

popupAddNewCard.setEventListeners();

//Функия для вызова поп-апа с формой добавления новой карточки
function openCardPopup(){
    popupAddNewCard.open();
    cardPopupValidation.resetValidation(popupCardForm);
}

//Вызов открытия попапа формы добавления новой карточки
addCardButton.addEventListener('click', () => openCardPopup());