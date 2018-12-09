'use strict';

(function () {
  var onError = function (message) {
    window.console.error(message);
  };

  var onLoad = function (data) {
    window.map.init(data);
  };

  window.load('https://js.dump.academy/keksobooking/data', onLoad, onError);
})();
