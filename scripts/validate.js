const validationElements = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit',
    inactiveButtonClass: 'pop-up__submit_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__error_visible'
};

//Функция отображения ошибки
function showInputError (form, input, config) {
    const error = form.querySelector(`.${input.name}-error`);

    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
}

//Функция исчезновения ошибки
function hideInputError (form, input, config) {
    const error = form.querySelector(`.${input.name}-error`);

    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
}

//Функция проверки полей на валидность
function checkValidation (form, input, config) {
    if (!input.validity.valid) {
        showInputError(form, input, config);
    } else {
        hideInputError (form, input, config);
    }
}

//Функция переключения состояния кнопкни в зависимоти от правильности заполнения полей ввода
function toggleButtonState(button, isValid, config) {
    if (isValid) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

//Функция назначания "случашетелей" на поля ввода
function setEventListeners (form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submit = form.querySelector(config.submitButtonSelector);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkValidation(form, input, config);
            toggleButtonState(submit, form.checkValidity(), config);
        });
    });
}

//Функция включения валидации
function enableValidation (config) {
    const formList = document.querySelectorAll(config.formSelector);

    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, config);

        const buttonElement = form.querySelector(config.submitButtonSelector);

        toggleButtonState(buttonElement, form.checkValidity(), config);
    });
}

enableValidation(validationElements);