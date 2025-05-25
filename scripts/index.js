// scripts/index.js

// Данные initialCards берутся из cards.js

// Находим контейнер для карточек и шаблон
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Находим поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

// Добавляем анимацию всем поп-апам
popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Обработчик закрытия по Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

// Универсальные функции открытия/закрытия поп-апов
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие поп-апов по клику на крестик и на оверлей
popups.forEach(popup => {
  // Крестик
  const closeBtn = popup.querySelector('.popup__close');
  closeBtn.addEventListener('click', () => closeModal(popup));

  // Оверлей
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) closeModal(popup);
  });
});

// Функция создания карточки
function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Заполняем данными
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Лайк
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Удаление карточки
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // Открытие картинки в поп-апе
  cardImage.addEventListener('click', () => {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  return cardElement;
}

// Рендер начальных карточек
initialCards.forEach(cardData => {
  const card = createCard(cardData);
  placesList.append(card);
});

// ----- Редактирование профиля -----
const editButton = document.querySelector('.profile__edit-button');
const profileForm = profilePopup.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Открытие поп-апа профиля и заполнение полей
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

// Сохранение изменений профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profilePopup);
});

// ----- Добавление новой карточки -----
const addButton = document.querySelector('.profile__add-button');
const cardForm = cardPopup.querySelector('.popup__form[name="new-place"]');
const titleInput = cardForm.querySelector('.popup__input_type_card-name');
const linkInput = cardForm.querySelector('.popup__input_type_url');

// Открытие формы добавления карточки и очистка полей
addButton.addEventListener('click', () => {
  cardForm.reset();
  openModal(cardPopup);
});

// Обработка отправки формы добавления карточки
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard({ name: titleInput.value, link: linkInput.value });
  placesList.prepend(newCard);
  closeModal(cardPopup);
});

// Валидация формы профиля
function enableValidation(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__button');
  
  function toggleButtonState() {
    submitButton.disabled = !formElement.checkValidity();
  }
  
  function showInputError(input, errorMessage) {
    const errorElement = formElement.querySelector(`.popup__error_type_${input.name}`);
    input.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  }
  
  function hideInputError(input) {
    const errorElement = formElement.querySelector(`.popup__error_type_${input.name}`);
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_visible');
  }
  
  function checkInputValidity(input) {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
    } else {
      hideInputError(input);
    }
  }
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      toggleButtonState();
    });
  });
  
  toggleButtonState();
}

// Включение валидации для формы профиля
enableValidation(profileForm);

// Обновленный обработчик отправки формы
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (profileForm.checkValidity()) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profilePopup);
  }
});