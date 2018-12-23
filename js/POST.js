'use strict';

(function () {
  var onLoad = function () {
    var success = document.querySelector('.success');
    window.map.upload.goodUpLoad();
    success.classList.remove('hidden');
    window.data.keyDown(success);
    window.data.documentClick(success);
  };

  window.POST = {
    onLoad: onLoad
  };
})();
