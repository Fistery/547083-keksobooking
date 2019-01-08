'use strict';
(function () {

  var init = function (data, showPins) {

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
      window.data.pinDeleteHidden();
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
          top: window.util.map.offsetTop + window.util.mainPin.offsetHeight + 30,
          right: window.util.map.offsetWidth + window.util.map.offsetLeft - window.util.mainPin.clientWidth / 2,
          bottom: window.util.map.offsetHeight + window.util.map.offsetTop - window.util.mainPin.offsetHeight - 84,
          left: window.util.map.offsetLeft + window.util.mainPin.clientWidth / 2
        };

        coordsPin = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        var addressLeft = window.util.mainPin.offsetLeft + 32.5;
        var addressTop = window.util.mainPin.offsetTop + 65;
        window.form.inputAdress.value = addressLeft + '\, ' + addressTop;

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

    var addressLeft = window.util.mainPin.offsetLeft + 32.5;
    var addressTop = window.util.mainPin.offsetTop + 65;
    window.form.inputAdress.value = addressLeft + '\, ' + addressTop;
  };

  window.map = {
    init: init
  };
})();
