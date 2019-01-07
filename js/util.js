'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');

  var DEBOUNCE_TIME = 500;

  var debounce = function (cb) {
    var lastTimeout = null;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_TIME);
  };

  var numberPinElements = function () {
    var pins = document.querySelectorAll('.map__pin');
    var pinHideTrue = [];
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('hidden')) {
        pinHideTrue.push(pins[i]);
      }
    }
    return pinHideTrue;
  };


  var writeFivePins = function () {
    var pinTrue = numberPinElements();
    for (var i = 6; i < pinTrue.length; i++) {
      pinTrue[i].classList.add('hidden');
    }
  };

  var pinDeleteHidden = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = pins.length - 1; i > 0; i--) {
      pins[i].classList.remove('hidden');
    }
    window.util.writeFivePins();
  };

  var deleteCard = function () {
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (item) {
      item.remove();
    });
  };

  var goodUpLoad = function () {
    var pins = document.querySelectorAll('.map__pin');
    var inputAdress = document.querySelector('#address');
    var addressLeft = mainPin.offsetLeft + 32.5;
    var addressTop = mainPin.offsetTop + 65;
    for (var i = pins.length - 1; i > 0; i--) {
      pins[i].remove();
    }
    deleteCard();
    form.reset();
    mainPin.style.left = 570 + 'px';
    mainPin.style.top = 375 + 'px';
    inputAdress.value = addressLeft + '\, ' + addressTop;
    map.classList.add('map--faded');
    form.classList.remove('ad-form--disabled');
    disableFieldset();
  };


  var disableFieldset = function () {
    var formFieldsets = form.querySelectorAll('fieldset');
    formFieldsets.forEach(function (item) {
      if (form.classList.contains('ad-form--disabled')) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    });
  };

  var pins = function () {
    return document.querySelectorAll('.map__pin');
  };

  var cards = function () {
    return document.querySelectorAll('.map__card');
  };

  window.util = {
    map: map,
    form: form,
    debounce: debounce,
    mainPin: mainPin,
    writeFivePins: writeFivePins,
    pinDeleteHidden: pinDeleteHidden,
    goodUpLoad: goodUpLoad,
    disableFieldset: disableFieldset,
    pins: pins,
    cards: cards
  };
})();
