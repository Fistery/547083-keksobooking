'use strict';

(function () {
  var onError = function (message) {
    window.console.error(message);
    window.data.error.classList.remove('hidden');
    window.data.keyDown(window.data.error);
    window.data.documentClick(window.data.error);
    window.form.resetForm();
  };

  var onLoad = function (data) {
    window.map.init(data, false);
    window.peoples = data;
  };

  var loadMap = function () {
    var onPostLoad = function (data) {
      window.map.init(data, true);
    };
    window.backend.load('https://js.dump.academy/keksobooking/data', onPostLoad, onError);
  };

  window.backend.load('https://js.dump.academy/keksobooking/data', onLoad, onError);

  window.main = {
    onError: onError,
    loadMap: loadMap
  };
})();
