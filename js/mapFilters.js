'use strict';

(function () {
  var mapHouseFilters = document.querySelector('.map__filters');
  var houseType = mapHouseFilters.querySelector('#housing-type');
  var housePrise = mapHouseFilters.querySelector('#housing-price');
  var houseRooms = mapHouseFilters.querySelector('#housing-rooms');
  var houseGuests = mapHouseFilters.querySelector('#housing-guests');
  var houseFeatures = mapHouseFilters.querySelector('#housing-features');

  var checkboxWifi = houseFeatures.querySelector('#filter-wifi');
  var checkboxDishwasher = houseFeatures.querySelector('#filter-dishwasher');
  var checkboxParking = houseFeatures.querySelector('#filter-parking');
  var checkboxWasher = houseFeatures.querySelector('#filter-washer');
  var checkboxElevator = houseFeatures.querySelector('#filter-elevator');
  var checkboxConditioner = houseFeatures.querySelector('#filter-conditioner');

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
    one: 1,
    two: 2,
    three: 3
  };

  var HouseGuestsValue = {
    one: '1',
    two: '2',
    null: '0'
  };

  var NumberGuestsValue = {
    one: 1,
    two: 2,
    null: 'Не для гостей'
  };

  var Features = {
    wifi: 'wifi',
    dishwasher: 'dishwasher',
    parking: 'parking',
    washer: 'washer',
    elevator: 'elevator',
    conditioner: 'conditioner'
  };

  var changeEventHandlerHouseType = function () {
    window.util.debounce(houseTypeFilter(houseType.value));
  };

  var changeEventHandlerPrice = function () {
    window.util.debounce(houseTypeFilter(houseType.value));
  };

  var changeEventHandlerRooms = function () {
    window.util.debounce(houseTypeFilter(houseType.value));
  };

  var changeEventHandlerGuests = function () {
    window.util.debounce(houseTypeFilter(houseType.value));
  };

  var changeEventHandlerFeatures = function () {
    window.util.debounce(houseTypeFilter(houseType.value));
  };

  houseType.onchange = changeEventHandlerHouseType;
  housePrise.onchange = changeEventHandlerPrice;
  houseRooms.onchange = changeEventHandlerRooms;
  houseGuests.onchange = changeEventHandlerGuests;
  houseFeatures.onchange = changeEventHandlerFeatures;

  var houseTypeFilter = function (Type) {
    var pins = window.util.pins();
    var cards = window.util.cards();
    pins.forEach(function (item) {
      if (item.classList.contains('map__pin--main')) {
        return;
      }
      item.remove();
    });
    cards.forEach(function (item) {
      item.remove();
    });
    var filterPeoples = window.peoples.filter(function (item) {
      if (houseType.value === 'any') {
        return true;
      } else if (item.offer.type === Type) {
        return true;
      } else {
        return false;
      }
    })
      .filter(function (item) {
        if (housePrise.value === 'any') {
          return true;
        } else if (housePrise.value === 'low' && item.offer.price < PriceFilterValue.low) {
          return true;
        } else if (housePrise.value === 'middle' && (item.offer.price >= PriceFilterValue.low || item.offer.price <= PriceFilterValue.high)) {
          return true;
        } else if (housePrise.value === 'high' && item.offer.price >= PriceFilterValue.high) {
          return true;
        } else {
          return false;
        }
      })
      .filter(function (item) {
        if (houseRooms.value === 'any') {
          return true;
        } else if (houseRooms.value === HouseRoomsValue.one && item.offer.rooms === NumberRoomsValue.one) {
          return true;
        } else if (houseRooms.value === HouseRoomsValue.two && item.offer.rooms === NumberRoomsValue.two) {
          return true;
        } else if (houseRooms.value === HouseRoomsValue.three && item.offer.rooms === NumberRoomsValue.three) {
          return true;
        } else {
          return false;
        }
      })
      .filter(function (item) {
        if (houseGuests.value === 'any') {
          return true;
        } else if (houseGuests.value === HouseGuestsValue.one && item.offer.guests === NumberGuestsValue.one) {
          return true;
        } else if (houseGuests.value === HouseGuestsValue.two && item.offer.guests === NumberGuestsValue.two) {
          return true;
        } else if (houseGuests.value === HouseGuestsValue.null && item.offer.guests === NumberGuestsValue.null) {
          return true;
        } else {
          return false;
        }
      })
      .filter(function (item) {
        if (checkboxWifi.checked && item.offer.features.indexOf(Features.wifi) > -1) {
          return true;
        } else if (checkboxDishwasher.checked && item.offer.features.indexOf(Features.dishwasher) > -1) {
          return true;
        } else if (checkboxParking.checked && item.offer.features.indexOf(Features.parking) > -1) {
          return true;
        } else if (checkboxWasher.checked && item.offer.features.indexOf(Features.washer) > -1) {
          return true;
        } else if (checkboxElevator.checked && item.offer.features.indexOf(Features.elevator) > -1) {
          return true;
        } else if (checkboxConditioner.checked && item.offer.features.indexOf(Features.conditioner) > -1) {
          return true;
        } else if (!checkboxWifi.checked && !checkboxDishwasher.checked && !checkboxParking.checked &&
          !checkboxWasher.checked && !checkboxElevator.checked && !checkboxConditioner.checked) {
          return true;
        } else {
          return false;
        }
      });

    window.data.createAllPin(filterPeoples);
    window.data.generatedCard(filterPeoples);
  };

})();
