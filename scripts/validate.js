// Включение валидации всех форм
function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form, settings);
  });
}

// Установка обработчиков
function setEventListeners(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
}

// Проверка валидности поля
function checkInputValidity(form, input, settings) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    errorElement.textContent = '';
    input.classList.remove(settings.inputErrorClass);
  } else {
    errorElement.textContent = input.validationMessage;
    input.classList.add(settings.inputErrorClass);
  }
}

// Переключение состояния кнопки
function toggleButtonState(inputs, button, settings) {
  const isValid = Array.from(inputs).every(input => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(settings.inactiveButtonClass, !isValid);
}

// Конфиг валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};