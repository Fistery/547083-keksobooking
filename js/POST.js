'use strict';

(function () {
  var onLoad = function () {
    window.map.upload.goodUpLoad();
    window.data.success.classList.remove('hidden');
    window.data.keyDown(window.data.succes);
    window.data.documentClick(window.data.succes);
  };

  window.POST = {
    onLoad: onLoad
  };
})();
