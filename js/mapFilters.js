'use strict';

(function () {
  var mapHouseFilters = document.querySelector('.map__filters');
  var houseType = mapHouseFilters.querySelector('#housing-type');
  var housePrise = mapHouseFilters.querySelector('#housing-price');
  var houseRooms = mapHouseFilters.querySelector('#housing-rooms');
  var houseGuests = mapHouseFilters.querySelector('#housing-guests');
  var houseFeatures = mapHouseFilters.querySelector('#housing-features');

  var PriceFilterValue = {
    low: '10000',
    high: '50000'
  };

  var HouseRoomsValue = {
    one: '1',
    two: '2',
    three: '3'
  };

  var NumberRoomsValue = {
    one: '1',
    two: '2',
    three: '3'
  }

  var HouseGuestsValue = {
    one: '1',
    two: '2',
    null: '0'
  };

  var NumberGuestsValue = {
    one: '1',
    two: '2',
    null: 'Не для гостей'
  };

  var changeEventHandlerHouseType = function () {
    window.util.debounce(getTypeFilter());
    window.util.writeFivePins();
  };

  var changeEventHandlerPrice = function () {
    window.util.debounce(getPriceFilter());
    window.util.writeFivePins();
  };

  var changeEventHandlerRooms = function () {
    window.util.debounce(getRoomsFilter());
    window.util.writeFivePins();
  };

  var changeEventHandlerGuests = function () {
    window.util.debounce(getGuestsFilter());
    window.util.writeFivePins();
  };

  var changeEventHandlerFeatures = function () {
    window.util.debounce(getFeaturesFilter());
    window.util.writeFivePins();
  };

  var pinAddHide = function () {
    var pins = window.util.pins();
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.add('hidden');
    }
  };

  houseType.onchange = changeEventHandlerHouseType;
  housePrise.onchange = changeEventHandlerPrice;
  houseRooms.onchange = changeEventHandlerRooms;
  houseGuests.onchange = changeEventHandlerGuests;
  houseFeatures.onchange = changeEventHandlerFeatures;

  var getTypeFilter = function () {
    var pins = window.util.pins();
    var cards = window.util.cards();
    pinAddHide();
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add('hidden');
      var value = cards[i].querySelector('.popup__type');
      if (houseType.value === 'any') {
        window.util.pinDeleteHidden();
      }
      if (houseType.value === 'palace') {
        if (value.textContent === 'Дворец') {
          pins[i + 1].classList.remove('hidden');
        }
      }
      if (houseType.value === 'flat') {
        if (value.textContent === 'Квартира') {
          pins[i + 1].classList.remove('hidden');
        }
      }
      if (houseType.value === 'house') {
        if (value.textContent === 'Дом') {
          pins[i + 1].classList.remove('hidden');
        }
      }
      if (houseType.value === 'bungalo') {
        if (value.textContent === 'Бунгало') {
          pins[i + 1].classList.remove('hidden');
        }
      }
    }
  };

  var getPriceFilter = function () {
    var pins = window.util.pins();
    var cards = window.util.cards();
    getTypeFilter();
    for (var i = 0; i < cards.length; i++) {
      var price = cards[i].querySelector('.popup__text--price').textContent;
      var NumberPrice = parseInt((price.match(/\d+/)), 10);
      if (housePrise.value === 'low') {
        if (NumberPrice > PriceFilterValue.low) {
          pins[i + 1].classList.add('hidden');
        }
      }
      if (housePrise.value === 'middle') {
        if (NumberPrice < PriceFilterValue.low || NumberPrice > PriceFilterValue.high) {
          pins[i + 1].classList.add('hidden');
        }
      }
      if (housePrise.value === 'high') {
        if (NumberPrice < PriceFilterValue.high) {
          pins[i + 1].classList.add('hidden');
        }
      }
    }
  };

  var getRoomsFilter = function () {
    getTypeFilter();
    getPriceFilter();
    var cards = window.util.cards();
    for (var i = 0; i < cards.length; i++) {
      var pins = window.util.pins();
      var rooms = cards[i].querySelector('.popup__text--capacity').textContent;
      var NumberRooms = rooms.match(/\d+/g);
      if (houseRooms.value === HouseRoomsValue.one) {
        if (NumberRooms[0] > NumberRoomsValue.one) {
          pins[i + 1].classList.add('hidden');
        }
      }
      if (houseRooms.value === HouseRoomsValue.two) {
        if (NumberRooms[0] > NumberRoomsValue.two && NumberRooms[0] < NumberRoomsValue.two) {
          pins[i + 1].classList.add('hidden');
        }
      }
      if (houseRooms.value === HouseRoomsValue.three) {
        if (NumberRooms[0] < NumberRoomsValue.three) {
          pins[i + 1].classList.add('hidden');
        }
      }
    }
  };

  var getGuestsFilter = function () {
    getTypeFilter();
    getPriceFilter();
    getRoomsFilter();
    var cards = window.util.cards();
    for (var i = 0; i < cards.length; i++) {
      var pins = window.util.pins();
      var guests = cards[i].querySelector('.popup__text--capacity').textContent;
      var NumberGuests = guests.match(/\d+/g);
      if (houseGuests.value === HouseGuestsValue.one) {
        if (NumberGuests[1] > NumberGuestsValue.one) {
          pins[i + 1].classList.add('hidden');
        }
      }
      if (houseGuests.value === HouseGuestsValue.two) {
        if (NumberGuests[1] > NumberGuestsValue.two && NumberGuests[1] < NumberGuestsValue.two) {
          pins[i + 1].classList.add('hidden');
        }
      }
      if (houseGuests.value === HouseGuestsValue.null) {
        if (NumberGuests[1] !== NumberGuestsValue.null) {
          pins[i + 1].classList.add('hidden');
        }
      }
    }
  };

  var getFeaturesFilter = function () {
    getTypeFilter();
    getPriceFilter();
    getRoomsFilter();
    getGuestsFilter();
    var checkboxWifi = houseFeatures.querySelector('#filter-wifi');
    var checkboxDishwasher = houseFeatures.querySelector('#filter-dishwasher');
    var checkboxParking = houseFeatures.querySelector('#filter-parking');
    var checkboxWasher = houseFeatures.querySelector('#filter-washer');
    var checkboxElevator = houseFeatures.querySelector('#filter-elevator');
    var checkboxConditioner = houseFeatures.querySelector('#filter-conditioner');
    var cards = window.util.cards();


    for (var i = 0; i < cards.length; i++) {
      var cardFeauturesList = cards[i]
        .querySelector('.popup__features')
        .querySelectorAll('.popup__feature');
      var pins = window.util.pins();

      var getClassContains = function (className) {
        for (var j = 0; j < cardFeauturesList.length; j++) {
          if (cardFeauturesList[j].classList.contains(className)) {
            return true;
          }
        }
        return false;
      };

      if (checkboxWifi.checked) {
        if (getClassContains('popup__feature--wifi')) {
          continue;
        }
        pins[i + 1].classList.add('hidden');
      }
      if (checkboxDishwasher.checked) {
        if (getClassContains('popup__feature--dishwasher')) {
          continue;
        }
        pins[i + 1].classList.add('hidden');
      }
      if (checkboxParking.checked) {
        if (getClassContains('popup__feature--parking')) {
          continue;
        }
        pins[i + 1].classList.add('hidden');
      }
      if (checkboxWasher.checked) {
        if (getClassContains('popup__feature--washer')) {
          continue;
        }
        pins[i + 1].classList.add('hidden');
      }
      if (checkboxElevator.checked) {
        if (getClassContains('popup__feature--elevator')) {
          continue;
        }
        pins[i + 1].classList.add('hidden');
      }
      if (checkboxConditioner.checked) {
        if (getClassContains('popup__feature--conditioner')) {
          continue;
        }
        pins[i + 1].classList.add('hidden');
      }
    }
  };

})();
