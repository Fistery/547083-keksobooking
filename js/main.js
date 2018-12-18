'use strict';

(function () {
  var onError = function (message) {
    window.console.error(message);
    window.data.error.classList.remove('hidden');
    window.data.keyDown(window.data.error);
    window.data.documentClick(window.data.error);
  };

  var onLoad = function (data) {
    window.map.init(data);
  };

  window.load('https://js.dump.academy/keksobooking/data', onLoad, onError);

  window.main = {
    onError: onError
  };
})();
