import {openPopUpImage} from "./index.js";

export default class Card {
    constructor(card, cardSelector) {
        this._name = card.name;
        this._link = card.link;
        this._cardSelector = cardSelector;
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
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }

    //Метод для переключения лайка в карточке
    _cardLike () {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
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
            .addEventListener('click', () => openPopUpImage(this._name, this._link));
    }
}