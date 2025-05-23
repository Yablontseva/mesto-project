import { validationConfig } from './validate.js';
// @todo: Темплейт карточки

// @todo: DOM узлы

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const placesList = document.querySelector('.places__list');

// ====== Просмотр изображений ======
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Функция открытия попапа с изображением
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Функция создания карточки
function createCard(cardData) {
  // 1. Клонируем шаблон карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // 2. Наполняем карточку данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // 3. Добавляем обработчики (ваш код)
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  // Удаление карточки
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // Лайк карточки
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  cardImage.addEventListener('click', () => openImagePopup(cardData));
  // 4. Возвращаем готовую карточку
  return cardElement;
}

// Отрисовка карточек
function renderCards() {
  initialCards.forEach(card => {
    placesList.append(createCard(card));
  });
}

// Функции для модальных окон
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Закрытие по крестику
document.querySelectorAll('.popup__close').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

// Инициализация
document.addEventListener('DOMContentLoaded', renderCards);

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Элементы профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Открытие попапа
profileEditButton.addEventListener('click', () => {
  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.description.value = profileJob.textContent;
  openModal(profilePopup);
});

// Сохранение профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = profileForm.elements.name.value;
  profileJob.textContent = profileForm.elements.description.value;
  closeModal(profilePopup);
});

// Элементы для новой карточки
const cardAddButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];

// Открытие попапа
cardAddButton.addEventListener('click', () => {
  cardForm.reset();
  openModal(cardPopup);
});

// Добавление карточки
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const newCard = {
    name: cardForm.elements['place-name'].value,
    link: cardForm.elements.link.value
  };
  
  placesList.prepend(createCard(newCard));
  closeModal(cardPopup);
});

document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  enableValidation(validationConfig);
  
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});