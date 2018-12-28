'use strict';

(function () {
  var mapHouseFilters = document.querySelector('.map__filters');
  var houseType = mapHouseFilters.querySelector('#housing-type');
  var housePrise = mapHouseFilters.querySelector('#housing-price');
  var houseRooms = mapHouseFilters.querySelector('#housing-rooms');
  var houseGuests = mapHouseFilters.querySelector('#housing-guests');
  var houseFeatures = mapHouseFilters.querySelector('#housing-features');

  document.addEventListener('DOMContentLoaded', function () {
    houseType.onchange = changeEventHandlerHouseType;
    housePrise.onchange = changeEventHandlerPrice;
    houseRooms.onchange = changeEventHandlerRooms;
    houseGuests.onchange = changeEventHandlerGuests;
    houseFeatures.onchange = changeEventHandlerFeatures;
  }, false);

  var typeFilter = function () {
    pinAddHide();
    for (var i = 0; i < window.map.upload.mapCards.length; i++) {
      window.map.upload.mapCards[i].classList.add('hidden');
      var value = window.map.upload.mapCards[i].querySelector('.popup__type');
      if (houseType.value === 'any') {
        window.map.upload.pinDelHidden();
      }
      if (houseType.value === 'palace') {
        if (value.textContent === 'Дворец') {
          window.map.upload.mapPins[i + 1].classList.remove('hidden');
        }
      }
      if (houseType.value === 'flat') {
        if (value.textContent === 'Квартира') {
          window.map.upload.mapPins[i + 1].classList.remove('hidden');
        }
      }
      if (houseType.value === 'house') {
        if (value.textContent === 'Дом') {
          window.map.upload.mapPins[i + 1].classList.remove('hidden');
        }
      }
      if (houseType.value === 'bungalo') {
        if (value.textContent === 'Бунгало') {
          window.map.upload.mapPins[i + 1].classList.remove('hidden');
        }
      }
    }
    window.map.upload.writeFivePins();
  };

  var priceFilter = function () {
    typeFilter();
    for (var i = 0; i < window.map.upload.mapCards.length; i++) {
      var price = window.map.upload.mapCards[i].querySelector('.popup__text--price').textContent;
      var NumberPrice = parseInt(price.match(/\d+/));
      if (housePrise.value === 'low') {
        if (NumberPrice > 10000) {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
      if (housePrise.value === 'middle') {
        if (NumberPrice < 10000 || NumberPrice > 50000) {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
      if (housePrise.value === 'high') {
        if (NumberPrice < 50000) {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
    }
    window.map.upload.writeFivePins();
  };

  var roomsFilter = function () {
    typeFilter();
    priceFilter();
    for (var i = 0; i < window.map.upload.mapCards.length; i++) {
      var rooms = window.map.upload.mapCards[i].querySelector('.popup__text--capacity').textContent;
      var NumberRooms = rooms.match(/\d+/g);
      if (houseRooms.value === '1') {
        if (NumberRooms[0] > '1') {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
      if (houseRooms.value === '2') {
        if (NumberRooms[0] > '2' && NumberRooms[0] < '2') {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
      if (houseRooms.value === '3') {
        if (NumberRooms[0] < '3') {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
    }
    window.map.upload.writeFivePins();
  };

  var guestsFilter = function () {
    typeFilter();
    priceFilter();
    roomsFilter();
    for (var i = 0; i < window.map.upload.mapCards.length; i++) {
      var guests = window.map.upload.mapCards[i].querySelector('.popup__text--capacity').textContent;
      var NumberGuests = guests.match(/\d+/g);
      if (houseGuests.value === '1') {
        if (NumberGuests[1] > '1') {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
      if (houseGuests.value === '2') {
        if (NumberGuests[1] > '2' && NumberGuests[1] < '2') {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
      if (houseGuests.value === '0') {
        if (NumberGuests[1] !== 'Не для гостей') {
          window.map.upload.mapPins[i + 1].classList.add('hidden');
        }
      }
    }
    window.map.upload.writeFivePins();
  };

  var featuresFilter = function () {
    typeFilter();
    priceFilter();
    roomsFilter();
    guestsFilter();
    var checkboxWifi = houseFeatures.querySelector('#filter-wifi');
    var checkboxDishwasher = houseFeatures.querySelector('#filter-dishwasher');
    var checkboxParking = houseFeatures.querySelector('#filter-parking');
    var checkboxWasher = houseFeatures.querySelector('#filter-washer');
    var checkboxElevator = houseFeatures.querySelector('#filter-elevator');
    var checkboxConditioner = houseFeatures.querySelector('#filter-conditioner');

    for (var i = 0; i < window.map.upload.mapCards.length; i++) {
      var cardFeauturesList = window.map.upload.mapCards[i]
        .querySelector('.popup__features')
        .querySelectorAll('.popup__feature');

      var getClassContains = function (className) {
        for (var j = 0; j < cardFeauturesList.length; j++) {
          if (cardFeauturesList[j].classList.contains(className)) {
            return 1;
          }
        }
      };
      if (checkboxWifi.checked) {
        if (getClassContains('popup__feature--wifi')) {
          continue;
        }
        window.map.upload.mapPins[i + 1].classList.add('hidden');
      }
      if (checkboxDishwasher.checked) {
        if (getClassContains('popup__feature--dishwasher')) {
          continue;
        }
        window.map.upload.mapPins[i + 1].classList.add('hidden');
      }
      if (checkboxParking.checked) {
        if (getClassContains('popup__feature--parking')) {
          continue;
        }
        window.map.upload.mapPins[i + 1].classList.add('hidden');
      }
      if (checkboxWasher.checked) {
        if (getClassContains('popup__feature--washer')) {
          continue;
        }
        window.map.upload.mapPins[i + 1].classList.add('hidden');
      }
      if (checkboxElevator.checked) {
        if (getClassContains('popup__feature--elevator')) {
          continue;
        }
        window.map.upload.mapPins[i + 1].classList.add('hidden');
      }
      if (checkboxConditioner.checked) {
        if (getClassContains('popup__feature--conditioner')) {
          continue;
        }
        window.map.upload.mapPins[i + 1].classList.add('hidden');
      }
    }
    // window.map.upload.numberPinElements();
  };

  var changeEventHandlerHouseType = function () {
    window.debounce.debounce(typeFilter());
  };

  var changeEventHandlerPrice = function () {
    window.debounce.debounce(priceFilter());
  };

  var changeEventHandlerRooms = function () {
    window.debounce.debounce(roomsFilter());
  };

  var changeEventHandlerGuests = function () {
    window.debounce.debounce(guestsFilter());
  };

  var changeEventHandlerFeatures = function () {
    window.debounce.debounce(featuresFilter());
  };

  var pinAddHide = function () {
    for (var i = 1; i < window.map.upload.mapPins.length; i++) {
      window.map.upload.mapPins[i].classList.add('hidden');
    }
  };

})();
