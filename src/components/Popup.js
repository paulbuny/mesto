export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeBtn = this._popupElement.querySelector('.pop-up__close');
    }

    //Метод открытия окна pop-up
    open () {
        this._popupElement.classList.add('pop-up_display_active');
        document.addEventListener('keydown',(evt) => this._handleEscClose(evt));
    }

    //Метод закрытия окна pop-up
    close () {
        this._popupElement.classList.remove('pop-up_display_active');
        document.removeEventListener('keydown',(evt) => this._handleEscClose(evt));
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
        this._popupElement.addEventListener('mousedown', (evt) => this._handleOverlayCLose(evt));
        this._closeBtn.addEventListener('click', this.close.bind(this));
    }
}