'use strict';
(function () {

  var ESC_KEY = 27;

  var onPinClick = function (i) {
    return function () {
      var cards = window.util.cards();
      cards.forEach(function (item) {
        item.classList.add('hidden');
      });

      var popupClose = function () {
        cards[i - 1].classList.add('hidden');
        cards[i - 1].querySelector('.popup__close').removeEventListener('click', popupClose);
      };

      cards[i - 1].classList.remove('hidden');
      cards[i - 1].querySelector('.popup__close').addEventListener('click', popupClose);
      window.data.keyDown(cards[i - 1]);
    };
  };

  var оnOpen = function () {
    var pins = window.util.pins();
    var loop = function loop(i) {
      pins[i].addEventListener('click', onPinClick(i));
    };

    for (var i = 1; i < pins.length; i++) {
      loop(i);
    }
  };

  var authorPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var mapPinTemplate = document.querySelector('.map__pins');

  var createAllPin = function (peoples) {
    if (document.querySelectorAll('.map__pin').length > 1) {
      return;
    }
    for (var i = 0; i < peoples.length; i++) {
      if (i === 5) {
        return;
      }
      var authorPinTemplate = authorPin.cloneNode(true);
      authorPinTemplate.querySelector('img').src = peoples[i].author.avatar;
      authorPinTemplate.querySelector('img').alt = peoples[i].offer.title;
      authorPinTemplate.style.left = peoples[i].location.x - 25 + 'px';
      authorPinTemplate.style.top = peoples[i].location.y - 70 + 'px';

      mapPinTemplate.appendChild(authorPinTemplate);
    }
    оnOpen();
  };

  var getAddFeatures = function (arr) {
    var newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    var featureFragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      var featureItems = newFeature.cloneNode(true);
      featureItems.classList.add('popup__feature--' + item);
      featureFragment.appendChild(featureItems);
    });
    return featureFragment;
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  cardTemplate.classList.add('hidden');

  var featureList = cardTemplate.querySelector('.popup__features');
  var featureElement = featureList.querySelectorAll('li');

  var featureElementRemove = function () {
    featureElement.forEach(function (item) {
      item.remove();
    });
  };
  featureElementRemove();

  var generatedCard = function (peoples) {
    for (var i = 0; i < peoples.length; i++) {
      if (!peoples[i].offer) {
        continue;
      }

      if (i === 5) {
        return;
      }

      var card = cardTemplate.cloneNode(true);

      card.querySelector('.popup__avatar').src = peoples[i].author.avatar;
      card.querySelector('.popup__title').textContent = peoples[i].offer.title;
      card.querySelector('.popup__text--address').textContent = peoples[i].offer.address;
      card.querySelector('.popup__text--price').textContent = peoples[i].offer.price + '₽/ночь';

      if (peoples[i].offer.type === 'palace') {
        card.querySelector('.popup__type').textContent = 'Дворец';
      }
      if (peoples[i].offer.type === 'flat') {
        card.querySelector('.popup__type').textContent = 'Квартира';
      }
      if (peoples[i].offer.type === 'house') {
        card.querySelector('.popup__type').textContent = 'Дом';
      }
      if (peoples[i].offer.type === 'bungalo') {
        card.querySelector('.popup__type').textContent = 'Бунгало';
      }
      card.querySelector('.popup__text--capacity').textContent = peoples[i].offer.rooms + ' комнаты для ' +
        peoples[i].offer.guests + ' гостей';
      if (peoples[i].offer.checkin && peoples[i].offer.checkout) {
        card.querySelector('.popup__text--time').textContent = 'Заезд после ' + peoples[i].offer.checkin + ', выезд до ' +
          peoples[i].offer.checkout;
      }
      if (peoples[i].offer.checkin && !peoples[i].offer.checkout) {
        card.querySelector('.popup__text--time').textContent = 'Заезд после ' + peoples[i].offer.checkin;
      }
      if (!peoples[i].offer.checkin && peoples[i].offer.checkout) {
        card.querySelector('.popup__text--time').textContent = 'Выезд до ' + peoples[i].offer.checkout;
      }
      card.querySelector('.popup__features').appendChild(getAddFeatures(peoples[i].offer.features));
      card.querySelector('.popup__description').textContent = peoples[i].offer.description;
      window.data.cardImageTemplate(card.querySelector('.popup__photos'), peoples[i].offer.photos);

      window.util.map.appendChild(card);
    }
  };

  var cardImageTemplate = function (selector, photos) {
    var selectorImg = selector.querySelector('img');
    photos.forEach(function (item) {
      var cardImageTemp = selectorImg.cloneNode(true);
      cardImageTemp.src = item;
      selector.appendChild(cardImageTemp);
    });
    selectorImg.remove();
  };

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');

  var generatedError = function () {
    var error = errorTemplate.cloneNode(true);
    error.classList.add('hidden');
    main.appendChild(error);
  };

  generatedError();

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var generateSuccess = function () {
    var successCard = successTemplate.cloneNode(true);
    successCard.classList.add('hidden');
    main.appendChild(successCard);
  };

  generateSuccess();

  var error = document.querySelector('.error');

  var keyDown = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY) {
        element.classList.add('hidden');
      }
    });
  };

  var documentClick = function (elem) {
    document.addEventListener('click', function () {
      elem.classList.add('hidden');
    });

  };

  window.data = {
    cardImageTemplate: cardImageTemplate,
    keyDown: keyDown,
    error: error,
    documentClick: documentClick,
    generatedCard: generatedCard,
    createAllPin: createAllPin
  };
})();
