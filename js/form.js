'use strict';
(function () {

  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var button = document.querySelector('.ad-form__submit');

  button.addEventListener('click', function () {
    if (rooms.value === '1' && capacity.value > '1') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === '1' && capacity.value === '0') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === '2' && capacity.value > '2') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === '2' && capacity.value === '0') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === '3' && capacity.value > '3') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === '3' && capacity.value === '0') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else if (rooms.value === '0' && capacity.value < '100') {
      capacity.setCustomValidity('выберите другое количество гостей');
    } else {
      capacity.setCustomValidity('');
    }
  });
})();
