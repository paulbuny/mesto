let profileEdit = document.querySelector('.profile__edit'),
    profileClose = document.querySelector('.pop-up__close'),
    formElement = document.querySelector('.pop-up__form'),
    popUp = document.querySelector('.pop-up'),
    profileName = document.querySelector('.profile__info-title'),
    profileJob = document.querySelector('.profile__info-text');

togglePopUp = document.addEventListener('click', function (evt) {
    if (evt.target === profileEdit || evt.target === profileClose) {

        popUp.classList.toggle('pop-up_display_active');

        let popUpInput = [...document.querySelectorAll('.pop-up__input')];

        popUpInput[0].value = profileName.textContent;
        popUpInput[1].value = profileJob.textContent;
    }
});

function formSubmitHandler (evt) {
    evt.preventDefault();

    let popUpInput = [...document.querySelectorAll('.pop-up__input')];

    profileName.textContent = popUpInput[0].value;
    profileJob.textContent = popUpInput[1].value;

    popUp.classList.toggle('pop-up_display_active');
}

formElement.addEventListener('submit', formSubmitHandler);
