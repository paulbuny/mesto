let profileEdit = document.querySelector('.profile__edit'),
    profileName = document.querySelector('.profile__info-title'),
    profileJob = document.querySelector('.profile__info-text'),

    formElement = document.querySelector('.pop-up__form'),
    popUp = document.querySelector('.pop-up'),
    popUpInputName = formElement.querySelector('.pop-up__input_profile_name'),
    popUpInputJob = formElement.querySelector('.pop-up__input_profile_job'),
    popUpClose = document.querySelector('.pop-up__close');

function openPopUp() {
    popUp.classList.add('pop-up_display_active');

    popUpInputName.value = profileName.textContent;
    popUpInputJob.value = profileJob.textContent;
}

function closePopUp() {
    popUp.classList.remove('pop-up_display_active');
}

function saveProfileData (evt) {
    evt.preventDefault();

    profileName.textContent = popUpInputName.value;
    profileJob.textContent = popUpInputJob.value;

    closePopUp();
}

profileEdit.addEventListener('click', openPopUp);
popUpClose.addEventListener('click', closePopUp);
formElement.addEventListener('submit', saveProfileData);
