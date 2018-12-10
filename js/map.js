'use strict';
(function () {

  var init = function (data) {

    // создание меток авторов

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

    createAllPin(data);

    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    cardTemplate.classList.add('hidden');

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
        card.querySelector('.popup__type').textContent = window.data.convertType();
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
        card.querySelector('.popup__features').textContent = peoples[i].offer.features;
        card.querySelector('.popup__description').textContent = peoples[i].offer.description;
        window.data.cardImageTemplate(card.querySelector('.popup__photos'), peoples[i].offer.photos);

        window.data.map.appendChild(card);
      }
    };

    generatedCard(data);

    // добавим в форму элементы форм атрибуты если на ней есть класс .ad-form--disabled;
    // объявим форму
    var form = document.querySelector('.ad-form');
    // найдем все элементы fieldset
    var formFieldsets = form.querySelectorAll('fieldset');
    // соберем их всех через цикл и если на форме есть .ad-form--disabled добавим им атрибут disabled

    var disFieldset = function () {
      for (var i = 0; i < formFieldsets.length; i++) {
        if (form.classList.contains('ad-form--disabled')) {
          formFieldsets[i].setAttribute('disabled', true);
        } else {
          formFieldsets[i].removeAttribute('disabled');
        }
      }
    };

    disFieldset();

    // заблокируем форму .map__filters
    // найдем форму
    var mapFilters = document.querySelector('.map__filters');
    // найдем элементы select и fieldset
    var selectFilters = mapFilters.querySelectorAll('select');
    var fieldsetFilters = mapFilters.querySelector('fieldset');
    // заблокируем селекты если блок .map имеет класс .map--faded

    var disSelect = function () {
      for (var i = 0; i < selectFilters.length; i++) {
        if (window.data.map.classList.contains('map--faded')) {
          selectFilters[i].setAttribute('disabled', true);
        } else {
          selectFilters[i].removeAttribute('disabled');
        }
      }

      // заблокируем fieldset если блок .map имеет класс .map--faded
      if (window.data.map.classList.contains('map--faded')) {
        fieldsetFilters.setAttribute('disabled', true);
      } else {
        fieldsetFilters.removeAttribute('disabled');
      }
    };

    disSelect();
    // функция что бы убрать класс hidden
    var mapPins = document.querySelectorAll('.map__pin');

    var pinDelHidden = function () {
      for (var i = mapPins.length - 1; i > 0; i--) {
        mapPins[i].classList.remove('hidden');
      }
    };
    // сэмулируем перетаскивание метки
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.data.map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      pinDelHidden();
      disSelect();
      disFieldset();

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
          top: window.data.map.offsetTop + mainPin.offsetHeight + 30,
          right: window.data.map.offsetWidth + window.data.map.offsetLeft - mainPin.clientWidth / 2,
          bottom: window.data.map.offsetHeight + window.data.map.offsetTop - mainPin.offsetHeight - 84,
          left: window.data.map.offsetLeft + mainPin.clientWidth / 2
        };

        coordsPin = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };
        // при движении изменяем координаты на которые указывает наш пин
        var addressLeft = mainPin.offsetLeft + 32.5;
        var addressTop = mainPin.offsetTop + 65;
        inputAdress.value = addressLeft + '\, ' + addressTop;

        if ((coordsPin.x > limits.left && coordsPin.x < limits.right) &&
          (coordsPin.y > limits.top && coordsPin.y < limits.bottom)) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
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

    // устанавливаем координаты на которые указывает наш пин
    var inputAdress = document.querySelector('#address');
    var addressLeft = mainPin.offsetLeft + 32.5;
    var addressTop = mainPin.offsetTop + 65;
    inputAdress.value = addressLeft + '\, ' + addressTop;

    // сделаем так, что бы при нажатии на пин отображалась соответствующая ему катрочка
    // соберем массив из элементов card__pin
    var mapCardArr = document.querySelectorAll('.map__card');

    // обработаем событие
    var оnOpen = function OnOpen() {
      var loop = function loop(i) {
        mapPins[i].addEventListener('click', function () {
          mapCardArr[i - 1].classList.remove('hidden');
        });
      };

      for (var i = 1; i < mapPins.length; i++) {
        loop(i);
      }
    };

    оnOpen();
    // сделаем что бы попап закрывался нажатием на крестик
    var cardClose = document.querySelectorAll('.popup__close');
    var popClose = function () {
      var close = function (i) {
        cardClose[i].addEventListener('click', function () {
          mapCardArr[i].classList.add('hidden');
        });
      };

      for (var i = 0; i < cardClose.length; i++) {
        close(i);
      }
    };

    popClose();

    var allCard = document.querySelectorAll('.map__card');

    var goodUpLoad = function () {
      for (var i = mapPins.length; i > 0; i--) {
        mapPins[i].remove();
        allCard[i].remove();
      }
    };

    var formClearButton = document.querySelector('.ad-form__reset');

    var onClickFormClearButton = function () {
      formClearButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        form.reset();
        mainPin.style.left = 570 + 'px';
        mainPin.style.top = 375 + 'px';
        inputAdress.value = addressLeft + '\, ' + addressTop;
      });
    };

    onClickFormClearButton();

    window.map.upload = {
      goodUpLoad: goodUpLoad
    };
  };

  window.map = {
    init: init
  };
})();
