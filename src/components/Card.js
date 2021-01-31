import PopupWithImage from "./PopupWithImage.js";

export default class Card {
    constructor(item, cardSelector, { handleCardCreate }) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;
        this._handleCardCreate = handleCardCreate;
    }

    //Метод для получения шаблона карточки
    _getTemplate () {
        const cardTemplate = document
            .querySelector(this._cardSelector).content
            .querySelector('.card')
            .cloneNode(true);

        return cardTemplate;
    }

    //Метод для создания жлемента карточки
    createCard () {
        this._element = this._getTemplate()
        this._cardImage = this._element.querySelector('.card__image');
        this._cardLikeElement = this._element.querySelector('.card__like');

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }

    //Метод для переключения лайка в карточке
    _cardLike () {
        this._cardLikeElement.classList.toggle('card__like_active');
    }

    //Метод для удаления карточки
    _removeCard () {
        this._element.remove();
    }

    //Метод по назначению слушателей для элементов карточки
    _setEventListeners() {
        this._element
            .querySelector('.card__like')
            .addEventListener('click', () => this._cardLike());
        this._element
            .querySelector('.card__delete')
            .addEventListener('click', () => this._removeCard());
        this._element
            .querySelector('.card__image')
            .addEventListener('click', () => this._handleCardCreate(this));
    }
}