'use strict';
(function () {

  var init = function (data, showPins) {

    var authorPin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');


    var mapPinTemplate = document.querySelector('.map__pins');

    var createAllPin = function (peoples) {
      for (var i = 0; i < peoples.length; i++) {
        var authorPinTemplate = authorPin.cloneNode(true);
        authorPinTemplate.querySelector('img').src = peoples[i].author.avatar;
        authorPinTemplate.querySelector('img').alt = peoples[i].offer.title;
        authorPinTemplate.style.left = peoples[i].location.x - 25 + 'px';
        authorPinTemplate.style.top = peoples[i].location.y - 70 + 'px';
        authorPinTemplate.classList.add('hidden');

        mapPinTemplate.appendChild(authorPinTemplate);
      }
    };

    var pinDeleteHidden = function () {
      var pins = window.util.pins();
      pins.forEach(function (item) {
        item.classList.remove('hidden');
      })
      window.util.writeFivePins();
    };

    if (showPins) {
      pinDeleteHidden();
    }

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
        if (peoples[i].offer.title.rooms && peoples[i].offer.title.guests) {
          card.querySelector('.popup__text--capacity').textContent = peoples[i].offer.rooms + ' комнаты для ' +
            peoples[i].offer.guests + ' гостей';
        }
        if (peoples[i].offer.title.rooms && !peoples[i].offer.title.guests) {
          card.querySelector('.popup__text--capacity').textContent = peoples[i].offer.rooms + ' комнаты';
        }
        if (!peoples[i].offer.title.rooms && peoples[i].offer.title.guests) {
          card.querySelector('.popup__text--capacity').textContent = 'Для ' + peoples[i].offer.guests + ' гостей';
        }
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

    var mapFilters = document.querySelector('.map__filters');

    var selectFilters = mapFilters.querySelectorAll('select');
    var fieldsetFilters = mapFilters.querySelector('fieldset');


    var disableSelect = function () {
      for (var i = 0; i < selectFilters.length; i++) {
        if (window.util.map.classList.contains('map--faded')) {
          selectFilters[i].setAttribute('disabled', true);
        } else {
          selectFilters[i].removeAttribute('disabled');
        }
      }

      if (window.util.map.classList.contains('map--faded')) {
        fieldsetFilters.setAttribute('disabled', true);
      } else {
        fieldsetFilters.removeAttribute('disabled');
      }
    };

    disableSelect();

    window.util.disableFieldset();

    window.util.mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.util.map.classList.remove('map--faded');
      window.util.form.classList.remove('ad-form--disabled');
      createAllPin(data);
      оnOpen();
      generatedCard(data);
      popClose();
      pinDeleteHidden();
      disableSelect();
      window.util.disableFieldset();


      var coordsPin = {
        x: evt.pageX,
        y: evt.pageY
      };

      var onMouseMov = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: coordsPin.x - moveEvt.pageX,
          y: coordsPin.y - moveEvt.pageY
        };

        var limits = {
          top: window.util.map.offsetTop + window.util.mainPin.offsetHeight + 30,
          right: window.util.map.offsetWidth + window.util.map.offsetLeft - window.util.mainPin.clientWidth / 2,
          bottom: window.util.map.offsetHeight + window.util.map.offsetTop - window.util.mainPin.offsetHeight - 84,
          left: window.util.map.offsetLeft + window.util.mainPin.clientWidth / 2
        };

        coordsPin = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        var addressLeft = window.util.mainPin.offsetLeft + 32.5;
        var addressTop = window.util.mainPin.offsetTop + 65;
        inputAdress.value = addressLeft + '\, ' + addressTop;

        if ((coordsPin.x > limits.left && coordsPin.x < limits.right) &&
          (coordsPin.y > limits.top && coordsPin.y < limits.bottom)) {
          window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + 'px';
          window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMov);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMov);
      document.addEventListener('mouseup', onMouseUp);
    });

    var inputAdress = document.querySelector('#address');
    var addressLeft = window.util.mainPin.offsetLeft + 32.5;
    var addressTop = window.util.mainPin.offsetTop + 65;
    inputAdress.value = addressLeft + '\, ' + addressTop;

    var оnOpen = function OnOpen() {
      var pins = window.util.pins();
      var loop = function loop(i) {
        pins[i].addEventListener('click', function () {
          var cards = window.util.cards();
          cards.forEach(function (item) {
            item.classList.add('hidden');
          });
          cards[i - 1].classList.remove('hidden');
        });
      };

      for (var i = 1; i < pins.length; i++) {
        loop(i);
      }
    };

    var popClose = function () {
      var cards = window.util.cards();
      var cardClose = document.querySelectorAll('.popup__close');
      var closePopup = function (i) {
        cardClose[i].addEventListener('click', function () {
          cards[i].classList.add('hidden');
        });
      };

      for (var i = 0; i < cardClose.length; i++) {
        closePopup(i);
        window.data.keyDown(cards[i]);
      }
    };

    var resetForm = function () {
      var pins = window.util.pins();
      pins.forEach(function (item) {
        if (item.classList.contains('map__pin--main')) {
          return true;
        }
        item.classList.add('hidden');
      })
      window.util.form.reset();
      window.util.form.classList.add('ad-form--disabled');
      window.util.disableFieldset();
    };

    var setMainPinCoordinate = function () {
      window.util.mainPin.style.left = 570 + 'px';
      window.util.mainPin.style.top = 375 + 'px';
      inputAdress.value = addressLeft + '\, ' + addressTop;
      window.util.map.classList.add('map--faded');
    };

    var onClickFormClearButton = function () {
      var formClearButton = document.querySelector('.ad-form__reset');
      formClearButton.addEventListener('click', function () {
        resetForm();
        setMainPinCoordinate();
      });
    };

    onClickFormClearButton();
  };

  window.map = {
    init: init
  };
})();
