export default class Card {
    constructor(item, currentUserId, cardSelector, { handleCardCreate, handleCardDelete, handleCardLike }) {
        this._likes = item.likes;
        this._link = item.link;
        this._name = item.name;
        this._owner = item.owner;
        this._id = item._id;
        this._isLiked = false;
        this._currentUserId = currentUserId;
        this._cardSelector = cardSelector;
        this._handleCardCreate = handleCardCreate;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
    }

    //Метод для получения шаблона карточки
    _getTemplate () {
        const cardTemplate = document
            .querySelector(this._cardSelector).content
            .querySelector('.card')
            .cloneNode(true);

        return cardTemplate;
    }

    //Метод для отображения или скрытия количества лайков если их кол.во > 0
    _getLikeCounter() {
        if (this._likes.length === 0 ) {
            this._cardLikeCounterElement.textContent = '';
        } else {
            this._cardLikeCounterElement.textContent = this._likes.length;
            this._likes.forEach((user) => {
                if (user._id === this._currentUserId) {
                    this._cardLike();
                }
            })
        }
    }

    //Метод для обновления количества отбраженных лайков
    refreshLikes (likes) {
        if (likes.length === 0) {
            this._cardLikeCounterElement.textContent = ''
        } else {
            this._cardLikeCounterElement.textContent = likes.length;
        }
        this.toggleLike();
        this._cardLike();
    }

    //Метод получения id текущей карточки
    getCardId () {
        return this._id;
    }

    //Метод переключения состояния лайка
    toggleLike () {
        return this._isLiked ? this._isLiked = false : this._isLiked = true;
    }

    //Метод для создания жлемента карточки
    createCard () {
        this._element = this._getTemplate()
        this._cardImage = this._element.querySelector('.card__image');
        this._cardLikeElement = this._element.querySelector('.card__like');
        this._cardLikeCounterElement = this._element.querySelector('.card__like-counter');
        this._cardDeleteBtn = this._element.querySelector('.card__delete');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._getLikeCounter();

        this._element.querySelector('.card__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    //Метод для переключения лайка в карточке
    _cardLike () {
        this._cardLikeElement.classList.toggle('card__like_active');
        this._isLiked = !this._isLiked;
    }

    //Метод для удаления карточки
    removeCard () {
        this._element.remove();
        this._element = null;
    }

    //Метод по назначению слушателей для элементов карточки
    _setEventListeners() {
        this._cardLikeElement
            .addEventListener('click', () => this._handleCardLike(this));

        if (this._currentUserId === this._owner._id) {
            this._cardDeleteBtn.addEventListener('click', () => this._handleCardDelete(this));
        } else {
            this._cardDeleteBtn.remove();
        }

        this._cardImage
            .addEventListener('click', () => this._handleCardCreate(this));
    }
}