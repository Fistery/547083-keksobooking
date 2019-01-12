'use strict';
(function () {
  var SUCCESS_CODE = 200;
  var MAX_LOAD_TIME = 10000;
  var load = function (type, URL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.open(type, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = MAX_LOAD_TIME;

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }

  };

  var onLoadForm = function () {
    window.util.goodUpLoad();
    window.data.generateSuccess();
  };

  window.backend = {
    load: load,
    onLoadForm: onLoadForm
  };
})();
