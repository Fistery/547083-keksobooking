'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var selectFilters = mapFilters.querySelectorAll('select');
  var fieldsetFilters = mapFilters.querySelector('fieldset');

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
    for (var i = pins.length - 1; i > 0; i--) {
      pins[i].remove();
    }
    deleteCard();
    window.form.resetForm();
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

  var disableSelect = function () {
    for (var i = 0; i < selectFilters.length; i++) {

      if (map.classList.contains('map--faded')) {
        selectFilters[i].setAttribute('disabled', true);
      } else {
        selectFilters[i].removeAttribute('disabled');
      }
    }

    if (map.classList.contains('map--faded')) {
      fieldsetFilters.setAttribute('disabled', true);
    } else {
      fieldsetFilters.removeAttribute('disabled');
    }
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
    cards: cards,
    disableSelect: disableSelect
  };
})();
