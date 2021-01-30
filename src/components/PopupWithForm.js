import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector('.pop-up__form');
        this._inputList = this._formElement.querySelectorAll('.pop-up__input');
    }

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach(input => inputValues[input.name] = input.value);

        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();

        this._formElement.reset();
    }
}
