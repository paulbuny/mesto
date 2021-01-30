export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeBtn = this._popupElement.querySelector('.pop-up__close');
        this._closeEsc = this._handleEscClose.bind(this);
        this._closeOnOvelay = this._handleOverlayCLose.bind(this);
    }

    //Метод открытия окна pop-up
    open () {
        this._popupElement.classList.add('pop-up_display_active');
    }

    //Метод закрытия окна pop-up
    close () {
        this._popupElement.classList.remove('pop-up_display_active');
    }

    //Метод закрытия окна popup по нажатию esc
    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    //Метод закрытия окна popup по клику по подложке
    _handleOverlayCLose (evt) {
        if(evt.target === evt.currentTarget) {
            this.close();
        }
    }

    //Метод назначения слушателей
    setEventListeners () {
        document.addEventListener('keydown', this._closeEsc);
        this._popupElement.addEventListener('mousedown', this._closeOnOvelay);
        this._closeBtn.addEventListener('click', this.close.bind(this));
    }
}