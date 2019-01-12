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
    zero: '0'
  };

  var NumberGuestsValue = {
    one: 1,
    two: 2,
    zero: 'Не для гостей'
  };

  var Features = {
    wifi: 'wifi',
    dishwasher: 'dishwasher',
    parking: 'parking',
    washer: 'washer',
    elevator: 'elevator',
    conditioner: 'conditioner'
  };

  var onChangeHouseType = function () {
    window.util.debounce(houseTypeFilterPreform(houseType.value));
  };

  var onChangeHousePrice = function () {
    window.util.debounce(houseTypeFilterPreform(houseType.value));
  };

  var onChangeHouseRooms = function () {
    window.util.debounce(houseTypeFilterPreform(houseType.value));
  };

  var onChangeHouseGuests = function () {
    window.util.debounce(houseTypeFilterPreform(houseType.value));
  };

  var onChangeHouseFeatures = function () {
    window.util.debounce(houseTypeFilterPreform(houseType.value));
  };

  houseType.onchange = onChangeHouseType;
  housePrise.onchange = onChangeHousePrice;
  houseRooms.onchange = onChangeHouseRooms;
  houseGuests.onchange = onChangeHouseGuests;
  houseFeatures.onchange = onChangeHouseFeatures;

  var houseTypeFilterPreform = function (type) {
    window.util.deletePins();
    var cards = window.util.getCards();
    cards.forEach(function (item) {
      item.remove();
    });
    var filterPeoples = window.peoples.filter(function (item) {
      if (houseType.value === 'any' || item.offer.type === type) {
        return true;
      }
        return false;
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
        }
          return false;
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
        }
          return false;
      })
      .filter(function (item) {
        if (houseGuests.value === 'any') {
          return true;
        } else if (houseGuests.value === HouseGuestsValue.one && item.offer.guests === NumberGuestsValue.one) {
          return true;
        } else if (houseGuests.value === HouseGuestsValue.two && item.offer.guests === NumberGuestsValue.two) {
          return true;
        } else if (houseGuests.value === HouseGuestsValue.zero && item.offer.guests === NumberGuestsValue.zero) {
          return true;
        }
          return false;
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
        }
        return false;
      });

    window.data.createAllPin(filterPeoples);
    window.data.generatedCard(filterPeoples);
  };

})();
