export default class FormValidator {
    constructor(validationElements, formElement) {
        this._formElement = formElement;
        this._inputSelector = validationElements.inputSelector;
        this._submitButtonSelector = validationElements.submitButtonSelector;
        this._inactiveButtonClass = validationElements.inactiveButtonClass;
        this._inputErrorClass = validationElements.inputErrorClass;
        this._errorClass = validationElements.errorClass;
}

    //Метод отображения ошибки
    _showInputError (form, input) {
        const error = form.querySelector(`.${input.name}-error`);

        input.classList.add(this._inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
    }

    //Метод исчезновения ошибки
    _hideInputError (form, input) {
            const error = form.querySelector(`.${input.name}-error`);

            input.classList.remove(this._inputErrorClass);
            error.classList.remove(this._errorClass);
            error.textContent = '';
    }

    //Метод проверки полей на валидность
    _checkValidation (form, input) {
        if (!input.validity.valid) {
            this._showInputError(form, input);
        } else {
            this._hideInputError (form, input);
        }
    }

    //Метод для переключения состояния кнопкни в зависимоти от правильности заполнения полей ввода
    _toggleButtonState(button, isValid) {
        if (isValid) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }

    //Метод для назначания "случашетелей" на поля ввода
    _setEventListeners (form) {
        const inputList = form.querySelectorAll(this._inputSelector);
        const submit = form.querySelector(this._submitButtonSelector);

        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkValidation(form, input);
                this._toggleButtonState(submit, form.checkValidity());
            });
        });
    }

    //Метод для включения валидации
    enableValidation () {

            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(this._formElement);

            const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

            this._toggleButtonState(buttonElement, this._formElement.checkValidity());
        };

    resetValidation (form) {
        const inputList = form.querySelectorAll(this._inputSelector);

        inputList.forEach((input) => {
            this._hideInputError(form, input)
        });

        const button = form.querySelector(this._submitButtonSelector);

        this._toggleButtonState(button, form.checkValidity());
    }
}