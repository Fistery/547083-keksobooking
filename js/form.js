'use strict';
(function () {
  var MAINPIN_POSITION_LEFT = 32.5;
  var MAINPIN_POSITION_TOP = 65;
  var MAINPIN_ADDRESS_LEFT = 570;
  var MAINPIN_ADDRESS_TOP = 375;
  var houseRoomsInput = document.querySelector('#room_number');
  var houseCapacityInput = document.querySelector('#capacity');
  var housePriceInput = document.querySelector('#price');
  var houseTypeInput = document.querySelector('#type');
  var submitButton = document.querySelector('.ad-form__submit');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var formClearButton = document.querySelector('.ad-form__reset');
  var adressInput = document.querySelector('#address');
  var mainPinAddressLeft = window.util.mainPin.offsetLeft + MAINPIN_POSITION_LEFT;
  var mainPinAddressTop = window.util.mainPin.offsetTop + MAINPIN_POSITION_TOP;

  var TypeNames = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };

  var MinPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var RoomsValue = {
    one: '1',
    two: '2',
    three: '3',
    hundred: '100'
  };

  var CapacityValue = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3'
  };

  document.addEventListener('DOMContentLoaded', function () {
    houseTypeInput.onchange = onChangehouseTypeInput;
    timeInInput.onchange = onChangeTimeInput;
    timeOutInput.onchange = onChangeTimeInput;
    houseCapacityInput.onchange = onChangeCapacityInput;

  }, false);

  var onChangehouseTypeInput = function () {
    if (houseTypeInput.value === TypeNames.bungalo) {
      housePriceInput.placeholder = MinPrices.bungalo;
      housePriceInput.min = MinPrices.bungalo;
    } else if (houseTypeInput.value === TypeNames.flat) {
      housePriceInput.placeholder = MinPrices.flat;
      housePriceInput.min = MinPrices.flat;
    } else if (houseTypeInput.value === TypeNames.house) {
      housePriceInput.placeholder = MinPrices.house;
      housePriceInput.min = MinPrices.house;
    } else if (houseTypeInput.value === TypeNames.palace) {
      housePriceInput.placeholder = MinPrices.palace;
      housePriceInput.min = MinPrices.palace;
    }
  };


  var onChangeTimeInput = function (evt) {
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  var onChangeCapacityInput = function () {
    if (houseRoomsInput.value === RoomsValue.one && houseCapacityInput.value > CapacityValue.one) {
      houseCapacityInput.setCustomValidity('количество гостей не может быть больше одного');
    } else if (houseRoomsInput.value === RoomsValue.one && houseCapacityInput.value === CapacityValue.zero) {
      houseCapacityInput.setCustomValidity('одна комната сдается только для гостей');
    } else if (houseRoomsInput.value === RoomsValue.two && houseCapacityInput.value > CapacityValue.two) {
      houseCapacityInput.setCustomValidity('количество гостей не может быть больше двух');
    } else if (houseRoomsInput.value === RoomsValue.two && houseCapacityInput.value === CapacityValue.zero) {
      houseCapacityInput.setCustomValidity('две комнаты сдаются только для гостей');
    } else if (houseRoomsInput.value === RoomsValue.three && houseCapacityInput.value > CapacityValue.three) {
      houseCapacityInput.setCustomValidity('количество гостей не может быть больше трех');
    } else if (houseRoomsInput.value === RoomsValue.three && houseCapacityInput.value === CapacityValue.zero) {
      houseCapacityInput.setCustomValidity('три комнаты сдаются только для гостей');
    } else if (houseRoomsInput.value === RoomsValue.hundred && houseCapacityInput.value > CapacityValue.zero) {
      houseCapacityInput.setCustomValidity('сто комнат не сдаются для гостей');
    } else {
      houseCapacityInput.setCustomValidity('');
    }
    submitButton.removeEventListener('click', onChangeCapacityInput);
  };

  var resetForm = function () {
    var cards = window.util.getCards();
    window.util.deletePins();
    cards.forEach(function (item) {
      item.remove();
    });
    window.util.form.reset();
    window.util.form.classList.add('ad-form--disabled');
    window.util.map.classList.add('map--faded');
    window.util.disableFieldset();
    window.util.disableSelect();
    window.util.mainPin.style.left = MAINPIN_ADDRESS_LEFT + 'px';
    window.util.mainPin.style.top = MAINPIN_ADDRESS_TOP + 'px';
    adressInput.setAttribute('value', mainPinAddressLeft + '\, ' + mainPinAddressTop);
    window.loadPhotos.removeUpload();
    window.util.mainPin.addEventListener('click', window.util.activeMap);
  };

  formClearButton.addEventListener('click', resetForm);

  submitButton.addEventListener('click', onChangeCapacityInput);
  window.util.form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(window.util.form);
    window.backend.load('POST', 'https://js.dump.academy/keksobooking', window.backend.onLoadForm, window.main.onError, formData);
  });

  window.form = {
    adressInput: adressInput,
    resetForm: resetForm
  };

})();
