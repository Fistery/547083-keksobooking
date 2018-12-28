'use strict';

(function () {
  var debounce = function (callback) {
    var DEBOUNCE_TIME = 500;
    var lastTimeout = null;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_TIME)
  };

  window.debounce = {
    debounce: debounce
  }
})();
