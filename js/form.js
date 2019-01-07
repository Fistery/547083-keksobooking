'use strict';
(function () {
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var button = document.querySelector('.ad-form__submit');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

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
    null: '0',
    one: '1',
    two: '2',
    three: '3'
  };

  document.addEventListener('DOMContentLoaded', function () {
    type.onchange = changeEventHandlerType;
    timeIn.onchange = changeEventHandlerTime;
    timeOut.onchange = changeEventHandlerTime;
  }, false);

  var changeEventHandlerType = function () {
    if (type.value === TypeNames.bungalo) {
      price.placeholder = MinPrices.bungalo;
      price.min = MinPrices.bungalo;
    } else if (type.value === TypeNames.flat) {
      price.placeholder = MinPrices.flat;
      price.min = MinPrices.flat;
    } else if (type.value === TypeNames.house) {
      price.placeholder = MinPrices.house;
      price.min = MinPrices.house;
    } else if (type.value === TypeNames.palace) {
      price.placeholder = MinPrices.palace;
      price.min = MinPrices.palace;
    }
  };
  changeEventHandlerType();

  var changeEventHandlerTime = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  button.addEventListener('click', function () {
    if (rooms.value === RoomsValue.one && capacity.value > CapacityValue.one) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === RoomsValue.one && capacity.value === CapacityValue.null) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === RoomsValue.two && capacity.value > CapacityValue.two) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === RoomsValue.two && capacity.value === CapacityValue.null) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === RoomsValue.three && capacity.value > CapacityValue.three) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === RoomsValue.three && capacity.value === CapacityValue.null) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === RoomsValue.hundred && capacity.value > CapacityValue.null) {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else {
      capacity.setCustomValidity('');
    }
  });

  window.util.form.addEventListener('submit', function () {
    event.preventDefault();
    var formData = new FormData(window.util.form);
    window.backend.upload(formData, window.backend.onLoadForm, window.main.onError);
  });

})();
