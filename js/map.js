'use strict';
(function () {

  var init = function (showPins) {

    var MAINPIN_POSITION_TOP = 65;
    var MAINPIN_POSITION_LEFT = 32.5;
    var LIMIT_POSITION_TOP = 32;
    var LIMIT_POSITION_BOTTOM = 84;

    if (showPins) {
      window.data.pinDeleteHidden();
    }

    window.util.disableSelect();
    window.util.disableFieldset();

    window.util.mainPin.addEventListener('click', window.util.activeMap);

    window.util.mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var coordsPin = {
        x: evt.pageX,
        y: evt.pageY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: coordsPin.x - moveEvt.pageX,
          y: coordsPin.y - moveEvt.pageY
        };

        var limits = {
          top: window.util.map.offsetTop + window.util.mainPin.offsetHeight + LIMIT_POSITION_TOP,
          right: window.util.map.offsetWidth + window.util.map.offsetLeft - window.util.mainPin.clientWidth / 2,
          bottom: window.util.map.offsetHeight + window.util.map.offsetTop - window.util.mainPin.offsetHeight - LIMIT_POSITION_BOTTOM,
          left: window.util.map.offsetLeft + window.util.mainPin.clientWidth / 2
        };

        coordsPin = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        var mainPinAddressLeft = window.util.mainPin.offsetLeft + MAINPIN_POSITION_LEFT;
        var mainPinAddressTop = window.util.mainPin.offsetTop + MAINPIN_POSITION_TOP;
        window.form.adressInput.value = mainPinAddressLeft + '\, ' + mainPinAddressTop;

        if ((coordsPin.x > limits.left && coordsPin.x < limits.right) &&
          (coordsPin.y > limits.top && coordsPin.y < limits.bottom)) {
          window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + 'px';
          window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    var mainPinAddressLeft = window.util.mainPin.offsetLeft + MAINPIN_POSITION_LEFT;
    var mainPinAddressTop = window.util.mainPin.offsetTop + MAINPIN_POSITION_TOP;
    window.form.adressInput.value = mainPinAddressLeft + '\, ' + mainPinAddressTop;
  };

  window.map = {
    init: init
  };
})();
