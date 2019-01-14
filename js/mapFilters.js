'use strict';

(function () {
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

  var onChangeFilter = function () {
    window.util.debounce(filterPreform());
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
        var checked = houseFeaturesFieldset.querySelectorAll('input[type=checkbox]:checked');
        if (checked.length === 0) {
          return true;
        }
        var result = item.offer.features.filter(function (it) {
          for (var j = 0; j < checked.length; j++) {
            if (checked[j].id === 'filter-' + it) {
              return true;
            }
          }
          return false;
        });
        return result.length > 0;
      });

    window.data.createAllPin(filterPeoples);
    window.data.generatedCard(filterPeoples);
  };

})();
