'use strict';
(function () {

  var init = function (data, showPins) {

    var MAINPIN_ADDRESS_LEFT = 32.5;
    var MAINPIN_ADDRESS_TOP = 65;
    var LIMIT_TOP = 32;
    var LIMIT_BOTTOM = 84;

    if (showPins) {
      window.data.pinDeleteHidden();
    }

    window.util.disableSelect();
    window.util.disableFieldset();

    window.util.mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.util.map.classList.remove('map--faded');
      window.util.form.classList.remove('ad-form--disabled');
      window.data.createAllPin(data);
      window.data.generatedCard(data);
      window.util.disableSelect();
      window.util.disableFieldset();


      var coordsPin = {
        x: evt.pageX,
        y: evt.pageY
      };

      var onMouseMov = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: coordsPin.x - moveEvt.pageX,
          y: coordsPin.y - moveEvt.pageY
        };

        var limits = {
          top: window.util.map.offsetTop + window.util.mainPin.offsetHeight + LIMIT_TOP,
          right: window.util.map.offsetWidth + window.util.map.offsetLeft - window.util.mainPin.clientWidth / 2,
          bottom: window.util.map.offsetHeight + window.util.map.offsetTop - window.util.mainPin.offsetHeight - LIMIT_BOTTOM,
          left: window.util.map.offsetLeft + window.util.mainPin.clientWidth / 2
        };

        coordsPin = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        var addressLeft = window.util.mainPin.offsetLeft + MAINPIN_ADDRESS_LEFT;
        var addressTop = window.util.mainPin.offsetTop + MAINPIN_ADDRESS_TOP;
        window.form.adressInput.value = addressLeft + '\, ' + addressTop;

        if ((coordsPin.x > limits.left && coordsPin.x < limits.right) &&
          (coordsPin.y > limits.top && coordsPin.y < limits.bottom)) {
          window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + 'px';
          window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMov);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMov);
      document.addEventListener('mouseup', onMouseUp);
    });

    var addressLeft = window.util.mainPin.offsetLeft + MAINPIN_ADDRESS_LEFT;
    var addressTop = window.util.mainPin.offsetTop + MAINPIN_ADDRESS_TOP;
    window.form.adressInput.value = addressLeft + '\, ' + addressTop;
  };

  window.map = {
    init: init
  };
})();
