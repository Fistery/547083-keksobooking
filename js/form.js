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
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var formClearButton = document.querySelector('.ad-form__reset');
  var adressInput = document.querySelector('#address');
  var mainPinAddressLeft = window.util.mainPin.offsetLeft + MAINPIN_POSITION_LEFT;
  var mainPinAddressTop = window.util.mainPin.offsetTop + MAINPIN_POSITION_TOP;
  var capasityOptions = document.querySelector('#capacity').querySelectorAll('option');

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

  var CapacityValueMap = {
    '1': {
      value: 1,
      items: [2]
    },
    '2': {
      value: 2,
      items: [1, 2]
    },
    '3': {
      value: 3,
      items: [0, 1, 2]
    },
    '100': {
      value: 0,
      items: [3]
    }
  };

  var onChangeTimeInput = function (evt) {
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  var onChangeRoomsInput = function () {
    setCapasityOptions();
  };

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

  houseTypeInput.onchange = onChangehouseTypeInput;
  timeInInput.onchange = onChangeTimeInput;
  timeOutInput.onchange = onChangeTimeInput;
  houseRoomsInput.onchange = onChangeRoomsInput;

  var addHiddenCapasityOptions = function () {
    capasityOptions.forEach(function (item) {
      item.removeAttribute('selected');
      item.classList.add('hidden');
    });
  };

  var setCapasityOptions = function () {
    addHiddenCapasityOptions();
    CapacityValueMap[houseRoomsInput.value].items.forEach(function (item) {
      capasityOptions[item].classList.remove('hidden');
    });
    houseCapacityInput.value = CapacityValueMap[houseRoomsInput.value].value;
  };

  setCapasityOptions();

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
    setCapasityOptions();
    window.util.mainPin.addEventListener('click', window.util.activeMap);
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
