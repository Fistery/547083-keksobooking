'use strict';

(function () {
  var DEBOUNCE_TIME = 500;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');

  var debounce = function (cb) {
    var lastTimeout = null;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_TIME);
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
      item.disabled = form.classList.contains('ad-form--disabled');
    });
  };

  var disableSelect = function () {
    var selectFilters = mapFilters.querySelectorAll('select');
    var fieldsetFilters = mapFilters.querySelectorAll('fieldset');
    selectFilters.forEach(function (item) {
      item.disabled = map.classList.contains('map--faded');
    });
    fieldsetFilters.forEach(function (item) {
      item.disabled = map.classList.contains('map--faded');
    });
  };


  var getPins = function () {
    return document.querySelectorAll('.map__pin');
  };

  var getCards = function () {
    return document.querySelectorAll('.map__card');
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin + .map__pin');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.util = {
    map: map,
    form: form,
    debounce: debounce,
    mainPin: mainPin,
    goodUpLoad: goodUpLoad,
    disableFieldset: disableFieldset,
    getPins: getPins,
    getCards: getCards,
    deletePins: deletePins,
    disableSelect: disableSelect
  };
})();
