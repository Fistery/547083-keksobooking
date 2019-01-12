'use strict';
(function () {
  var MAINPIN_ADDRESS_LEFT = 32.5;
  var MAINPIN_ADDRESS_TOP = 65;
  var MAINPIN_LEFT_POSITION = 570;
  var MAINPIN_TOP_POSITION = 375;
  var houseRooms = document.querySelector('#room_number');
  var houseCapacity = document.querySelector('#capacity');
  var housePrice = document.querySelector('#price');
  var houseType = document.querySelector('#type');
  var submitButton = document.querySelector('.ad-form__submit');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var formClearButton = document.querySelector('.ad-form__reset');
  var adressInput = document.querySelector('#address');
  var addressLeft = window.util.mainPin.offsetLeft + MAINPIN_ADDRESS_LEFT;
  var addressTop = window.util.mainPin.offsetTop + MAINPIN_ADDRESS_TOP;

  var TypeNames = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace'
  };

  var MinPrices = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
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
    houseType.onchange = onChangeHouseType;
    timeInInput.onchange = onChangeTime;
    timeOutInput.onchange = onChangeTime;
  }, false);

  var onChangeHouseType = function () {
    if (houseType.value === TypeNames.bungalo) {
      housePrice.placeholder = MinPrices.bungalo;
      housePrice.min = MinPrices.bungalo;
    } else if (houseType.value === TypeNames.flat) {
      housePrice.placeholder = MinPrices.flat;
      housePrice.min = MinPrices.flat;
    } else if (houseType.value === TypeNames.house) {
      housePrice.placeholder = MinPrices.house;
      housePrice.min = MinPrices.house;
    } else if (houseType.value === TypeNames.palace) {
      housePrice.placeholder = MinPrices.palace;
      housePrice.min = MinPrices.palace;
    }
  };


  var onChangeTime = function (evt) {
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  submitButton.addEventListener('click', function () {
    if (houseRooms.value === RoomsValue.one && houseCapacity.value > CapacityValue.one) {
      houseCapacity.setCustomValidity('количество гостей не может быть больше одного');
    } else if (houseRooms.value === RoomsValue.one && houseCapacity.value === CapacityValue.zero) {
      houseCapacity.setCustomValidity('одна комната сдается только для гостей');
    } else if (houseRooms.value === RoomsValue.two && houseCapacity.value > CapacityValue.two) {
      houseCapacity.setCustomValidity('количество гостей не может быть больше двух');
    } else if (houseRooms.value === RoomsValue.two && houseCapacity.value === CapacityValue.zero) {
      houseCapacity.setCustomValidity('две комнаты сдаются только для гостей');
    } else if (houseRooms.value === RoomsValue.three && houseCapacity.value > CapacityValue.three) {
      houseCapacity.setCustomValidity('количество гостей не может быть больше трех');
    } else if (houseRooms.value === RoomsValue.three && houseCapacity.value === CapacityValue.zero) {
      houseCapacity.setCustomValidity('три комнаты сдаются только для гостей');
    } else if (houseRooms.value === RoomsValue.hundred && houseCapacity.value > CapacityValue.zero) {
      houseCapacity.setCustomValidity('сто комнат не сдаются для гостей');
    } else {
      houseCapacity.setCustomValidity('');
    }
  });

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
    window.util.mainPin.style.left = MAINPIN_LEFT_POSITION + 'px';
    window.util.mainPin.style.top = MAINPIN_TOP_POSITION + 'px';
    adressInput.setAttribute('value', addressLeft + '\, ' + addressTop);
    window.loadPhotos.removeUpload();
  };

  formClearButton.addEventListener('click', resetForm);


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
