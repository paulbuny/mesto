import "../pages/index.css";

    //Импорт констант
import {
    editAvatarButton,
    editProfileButton,
    profileName,
    profileJob,
    profileAvatar,
    popupUpdateAvatar,
    profileAvatarForm,
    popupInputAvatar,
    profileForm,
    popupProfileSelector,
    popupInputName,
    popupInputJob,
    popupCardForm,
    popupConfirmDeleteSelector,
    popupCardSelector,
    popupCardImage,
    cardTemplateSelector,
    addCardButton,
    cardsContainer,
    validationConfig,
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

    //Импорт API подключения к серверву
import Api from "../components/Api.js";

    // Создание экземлпяра класса с найтройками подключения к API
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/',
    token: '7f507e56-179e-4a59-8e89-b0f615ca62d2',
    cohortId: 'cohort-20'
});

    //Запуск инициализации
Promise.all([
    api.getUserInformation(),
    api.getInitialCards(),
])
    .then((data) => {
        const [userInformation, initialCards] = data;

        //Рендер данных с сервера на странице
        userData.setUserInfo(userInformation);
        initialCardsRenderer.renderItems(initialCards, userInformation._id);
    })
    .catch(console.error);

/*НИЖЕ - код относящийся к карточкам*/

    //Создание нового класса валидации для формы добавления новой карточки
const cardPopupValidation = new FormValidator(validationConfig, popupCardForm);
cardPopupValidation.enableValidation();

let cardToDelete = {};

    //Создание нового экземпляра класса поп-апа с картинкой
const popupImage = new PopupWithImage(popupCardImage);

    //Создание нового экземпляра поп-апа подтверждения удаления карточки
const popUpConfirmOnDelete = new PopupWithForm({
    popupSelector: popupConfirmDeleteSelector,

    handleFormSubmit: () => {
        popUpConfirmOnDelete.renderLoading(true);

        api.deleteCard(cardToDelete.getCardId())
            .then(() => {
                cardToDelete.removeCard();
            })
            .catch(console.error)
            .finally(() => popUpConfirmOnDelete.renderLoading(false))
    }
})
popUpConfirmOnDelete.setEventListeners();

    //Фукнкция создания карточки
function createCard (item, currentUserId) {
    const cardElement = new Card(item, currentUserId, cardTemplateSelector, {

        handleCardCreate: () => {
            popupImage.open(item);
        },

        handleCardDelete: () => {
            cardToDelete = cardElement;
            popUpConfirmOnDelete.open();
        },

        handleCardLike: () => {
            if (cardElement.toggleLike() === true ) {

                api.addLike(cardElement.getCardId())
                    .then((res) => {
                        cardElement.refreshLikes(res.likes);
                    })
            } else {

                api.removeLike(cardElement.getCardId())
                    .then((res) => {
                        cardElement.refreshLikes(res.likes);
                    })
            }
        }
    });

    return cardElement.createCard();
}

    //Экземпляр класса рендера начальных карточек
const initialCardsRenderer = new Section({

    render: (data, id) => {
        initialCardsRenderer.addItem(createCard(data, id));
    }}, cardsContainer);

    //Создание нового экземпляра класа для поп-апа с формой добавления новой карточки
const popupAddNewCard = new PopupWithForm({
    popupSelector: popupCardSelector,

    handleFormSubmit: (item) => {
        popupAddNewCard.renderLoading(true);

        api.addNewCard({name: item.name, link: item.link})
            .then((data) => {
                initialCardsRenderer.prependItem(createCard(data, data.owner._id));
            })
            .catch(console.error)
            .finally(() => popupAddNewCard.renderLoading(false))
    }
});

popupAddNewCard.setEventListeners();

    //Функия для вызова поп-апа с формой добавления новой карточки
function openCardPopup(){
    popupAddNewCard.open();
    cardPopupValidation.resetValidation();
}

    //Вызов открытия попапа формы добавления новой карточки
addCardButton.addEventListener('click', () => openCardPopup());

    /*НИЖЕ - код относящийся к данным профиля*/

    //Создание нового класса валидации для формы заполнения профиля
const profilePopupValidation = new FormValidator(validationConfig, profileForm);
profilePopupValidation.enableValidation();

    //Создания нового класса для заполненния профиля
const userData = new UserInfo({
    nameSelector: profileName,
    jobSelector: profileJob,
    avatarImage: profileAvatar,
    });

    //Создания нового класса для поп-апа с формой заполнения информации о профиле
const popupSaveProfile = new PopupWithForm({
    popupSelector: popupProfileSelector,

    handleFormSubmit: (item) => {
        popupSaveProfile.renderLoading(true);

        api.saveUserInformation({
            name: item.name,
            about: item.about
        })
            .then((data) => userData.setUserInfo(data))
            .catch(console.error)
            .finally(() => popupSaveProfile.renderLoading(false))
    },
});

popupSaveProfile.setEventListeners();

    //Функция для открытия по поп-апа с формой заполнения информации о профиле
function openPopupProfile() {
    const user = userData.getUserInfo();

    popupInputName.value = user.name;
    popupInputJob.value = user.about;

    popupSaveProfile.open();

    profilePopupValidation.resetValidation();
}

    //Вызов открытия попапа формы заполнения информации о профиле
editProfileButton.addEventListener('click', () => openPopupProfile());

    //Создание нового класса ваолидации для формы редактирования аватара пользователя
const popupProfileAvatarValidation = new FormValidator(validationConfig, profileAvatarForm);
popupProfileAvatarValidation.enableValidation();

    //Создание нового класса для поп-апа с формой редактирования аватара пользователя
const popupProfileAvatar = new PopupWithForm({
    popupSelector: popupUpdateAvatar,

    handleFormSubmit: (item) => {
        popupProfileAvatar.renderLoading(true);

        api.changeUserAvatar(item.avatar)
            .then((data) => userData.setUserInfo(data))
            .catch(console.error)
            .finally(() => popupProfileAvatar.renderLoading(false))
    }
});

popupProfileAvatar.setEventListeners();

    //Функция открытия поп-апа для редаектирования аватара пользователя
function openPopupProfileAvatar () {
    const avatar = userData.getUserInfo();

    popupInputAvatar.value = avatar.avatar;

    popupProfileAvatar.open();
    popupProfileAvatarValidation.resetValidation();
}

    //Вызов поп-апа редактирования аватара пользователя
editAvatarButton.addEventListener('click', () => openPopupProfileAvatar());

