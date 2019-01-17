'use strict';

(function () {
  var DEFAULT_SELECTS_VALUE = 'any';
  var mapHouseFilters = document.querySelector('.map__filters');
  var houseTypeSelect = mapHouseFilters.querySelector('#housing-type');
  var housePriseSelect = mapHouseFilters.querySelector('#housing-price');
  var houseRoomsSelect = mapHouseFilters.querySelector('#housing-rooms');
  var houseGuestsSelect = mapHouseFilters.querySelector('#housing-guests');
  var houseFeaturesFieldset = mapHouseFilters.querySelector('#housing-features');

  var PriceFilterValue = {
    low: '10000',
    high: '50000'
  };

  var getValidityChecboxValue = function (checkbox) {
    var checkboxId = checkbox;
    var regExp = /filter-/;
    var resultValidity = checkboxId.replace(regExp, '');
    return resultValidity;
  };

  var onChangeFilter = function () {
    window.util.debounce(filterPreform());
  };

  var getCheckedCheckboxes = function () {
    return houseFeaturesFieldset.querySelectorAll('input[type=checkbox]:checked');
  };

  var resetMapFilters = function () {
    var checkboxes = getCheckedCheckboxes();
    var selects = mapHouseFilters.querySelectorAll('select');
    checkboxes.forEach(function (item) {
      item.checked = false;
    });
    selects.forEach(function (item) {
      item.value = DEFAULT_SELECTS_VALUE;
    });
  };

  houseTypeSelect.onchange = onChangeFilter;
  housePriseSelect.onchange = onChangeFilter;
  houseRoomsSelect.onchange = onChangeFilter;
  houseGuestsSelect.onchange = onChangeFilter;
  houseFeaturesFieldset.onchange = onChangeFilter;

  var filterPreform = function () {
    window.util.deletePins();
    var cards = window.util.getCards();
    cards.forEach(function (item) {
      item.remove();
    });
    var filterPeoples = window.peoples.filter(function (item) {
      return houseTypeSelect.value === 'any' || item.offer.type === houseTypeSelect.value;
    })
      .filter(function (item) {
        return item.offer.rooms === parseInt(houseRoomsSelect.value, 10) || houseRoomsSelect.value === 'any';
      })
      .filter(function (item) {
        if (housePriseSelect.value === 'any') {
          return true;
        } else if (housePriseSelect.value === 'low') {
          return item.offer.price < PriceFilterValue.low;
        } else if (housePriseSelect.value === 'middle') {
          return item.offer.price >= PriceFilterValue.low && item.offer.price <= PriceFilterValue.high;
        } else if (housePriseSelect.value === 'high') {
          return item.offer.price >= PriceFilterValue.high;
        }
        return false;
      })
      .filter(function (item) {
        return item.offer.guests === parseInt(houseGuestsSelect.value, 10) || houseGuestsSelect.value === 'any';
      })
      .filter(function (item) {
        var checkedCheckboxes = getCheckedCheckboxes();
        if (checkedCheckboxes.length === 0) {
          return true;
        }
        for (var j = 0; j < checkedCheckboxes.length; j++) {
          var checkboxValidityValue = getValidityChecboxValue(checkedCheckboxes[j].id);
          if (item.offer.features.indexOf(checkboxValidityValue) < 0) {
            return false;
          }
        }
        return true;
      });

    window.data.createAllPin(filterPeoples);
    window.data.generatedCard(filterPeoples);

  };

  window.mapFilters = {
    resetMapFilters: resetMapFilters
  };

})();
