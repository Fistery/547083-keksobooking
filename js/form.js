'use strict';
(function () {

  var form = document.querySelector('.ad-form');
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');
  var button = document.querySelector('.ad-form__submit');
  var formData = new FormData(form);
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  document.addEventListener('DOMContentLoaded', function () {
    type.onchange = changeEventHandlerType;
    timeIn.onchange = changeEventHandlerTimeIn;
    timeOut.onchange = changeEventHandlerTimeIn;
  }, false);

  var changeEventHandlerType = function () {
    if (type.value === 'bungalo') {
      price.placeholder = '0';
      price.min = '0';
    } else if (type.value === 'flat') {
      price.placeholder = '1000';
      price.min = '1000';
    } else if (type.value === 'house') {
      price.placeholder = '5000';
      price.min = '5000';
    } else if (type.value === 'palace') {
      price.placeholder = '10000';
      price.min = '10000';
    }
  };
  changeEventHandlerType();

  var changeEventHandlerTimeIn = function () {
    timeOut.value = timeIn.value;
  };
  changeEventHandlerTimeIn();

  // document.addEventListener('DOMContentLoaded', function () {
  //   timeIn.onchange = changeEventHandlerTimeOut;
  // }, false);

  // var changeEventHandlerTimeOut = function () {
  //   if (timeOut.value === '12') {
  //     timeIn.value = '12';
  //   } else if (timeOut.value === '13') {
  //     timeIn.value = '13';
  //   } else if (timeOut.value === '14') {
  //     timeIn.value = '14';
  //   }
  // };
  // changeEventHandlerTimeOut();


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

  form.addEventListener('submit', function () {
    event.preventDefault();
    window.upload(formData, window.POST.onLoad, window.main.onError);
  });

  window.form = {
    form: form
  };
})();
