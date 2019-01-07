'use strict';
(function () {

  var ESC_KEY = 27;

  var cardImageTemplate = function (selector, photos) {
    var selectorImg = selector.querySelector('img');
    photos.forEach(function (item) {
      var cardImageTemp = selectorImg.cloneNode(true);
      cardImageTemp.src = item;
      selector.appendChild(cardImageTemp);
    });
    selectorImg.remove();
  };

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var main = document.querySelector('main');

  var generatedError = function () {
    var error = errorTemplate.cloneNode(true);
    error.classList.add('hidden');
    main.appendChild(error);
  };

  generatedError();

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var generateSuccess = function () {
    var successCard = successTemplate.cloneNode(true);
    successCard.classList.add('hidden');
    main.appendChild(successCard);
  };

  generateSuccess();

  var error = document.querySelector('.error');

  var keyDown = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY) {
        element.classList.add('hidden');
      }
    });
  };

  var documentClick = function (elem) {
    document.addEventListener('click', function () {
      elem.classList.add('hidden');
    });

  };

  window.data = {
    cardImageTemplate: cardImageTemplate,
    keyDown: keyDown,
    error: error,
    documentClick: documentClick
  };
})();
