const validationElements = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit',
    inactiveButtonClass: 'pop-up__submit_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__error_visible'
};

//Функция отображения ошибки
function showInputError (formElement, inputElement, elementsList, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.add(elementsList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(elementsList.errorClass);
}

//Функция исчезновения ошибки
function hideInputError (formElement, inputElement, elementsList) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.remove(elementsList.inputErrorClass);
    errorElement.classList.remove(elementsList.errorClass);
    errorElement.textContent = '';
}

//Функция проверки полей на валидность
function isValid (formElement, inputElement, elementsList) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, elementsList, inputElement.validationMessage);
    } else {
        hideInputError (formElement, inputElement, elementsList);
    }
}

//Функция назначания "случашетелей" на поля ввода
function setEventListeners (formElement, elementsList) {
    const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
    const buttonElement = formElement.querySelector(elementsList.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, elementsList);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            isValid(formElement, inputElement, elementsList);
            toggleButtonState(inputList, buttonElement, elementsList);
        });
    });
}

//Функция включения валидации
function enableValidation (elementsList) {
    const formList = Array.from(document.querySelectorAll(elementsList.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, elementsList);
    });
}

//Функция проверки. Если хотя бы одно из полей заполнено не верно, кнопка будет неактивна
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
       return !inputElement.validity.valid;
    });
}

//Функция переключения состояния кнопкни в зависимоти от правильности заполнения полей ввода
function toggleButtonState(inputList, buttonElement, elementsList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(elementsList.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(elementsList.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

enableValidation(validationElements);