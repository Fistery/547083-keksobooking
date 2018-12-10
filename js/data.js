'use strict';
(function () {

  // рандомные числа

  var randomNumber = function (min, max) {
    var price = min - 0.5 + Math.random() * (max - min + 1);
    price = Math.round(price);
    return price;
  };

  // массивы

  var houseDiscription = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var houseType = ['palace', 'flat', 'house', 'bungalo'];

  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];

  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  // создание рандомных удобств

  var randomFeatures = function () {
    var randFeatures = [];
    var rn = randomNumber(1, 6);
    for (var i = 0; i < rn; i++) {
      var feature = features[randomNumber(0, features.length - 1)];
      if (randFeatures.indexOf(feature) < 0) {
        randFeatures.push(feature);
      }
    }
    return randFeatures;
  };

  var newFeatures = randomFeatures();

  // получение ширины блока карты

  var map = document.querySelector('.map');

  // создание массива авторов

  var generatedPeoples = function (numberPeoples) {
    var authors = [];
    for (var i = 0; i < numberPeoples; i++) {
      var people = {
        author: {
          avatar: 'img/avatars/user0' + randomNumber(1, 8) + '.png'
        },
        offer: {
          title: houseDiscription[randomNumber(0, houseDiscription.length)],
          address: '' + randomNumber(0, 3000) + '\, ' + randomNumber(0, 1500),
          price: randomNumber(1000, 1000000),
          type: houseType[randomNumber(0, 3)],
          rooms: randomNumber(1, 5),
          guests: randomNumber(1, 10),
          checkin: checkin[randomNumber(0, 2)],
          checkout: checkout[randomNumber(0, 2)],
          features: newFeatures,
          description: '',
          photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
          ]
        },
        location: {
          x: randomNumber(0, map.clientWidth),
          y: randomNumber(130, 630)
        }
      };
      authors.push(people);
    }
    return authors;
  };

  var peoples = generatedPeoples(7);

  // добавление дополнительных картинок в card

  var cardImageTemplate = function (selector, photos) {
    var selectorImg = selector.querySelector('img');
    for (var i = 0; i < photos.length; i++) {
      var cardImageTemp = selectorImg.cloneNode(true);
      cardImageTemp.src = photos[i];
      selector.appendChild(cardImageTemp);
    }
    selectorImg.remove();
  };

  // изменение удобств ['palace', 'flat', 'house', 'bungalo'];

  var convertType = function () {
    var type = houseType[randomNumber(0, houseType.length - 1)];
    if (type === 'palace') {
      type = 'Дворец';
    } else if (type === 'flat') {
      type = 'Квартира';
    } else if (type === 'house') {
      type = 'Дом';
    } else {
      type = 'Бунгало';
    }
    return type;
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
  var success = document.querySelector('.succes');


  var ESC_KEY = 27;

  var keyDown = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY) {
        element.classList.add('hidden');
      }
    });
  };

  var documentClick = function (element) {
    document.addEventListener('click', function () {
      element.classList.add('hidden');
    });
  };

  window.data = {
    convertType: convertType,
    peoples: peoples,
    map: map,
    cardImageTemplate: cardImageTemplate,
    keyDown: keyDown,
    error: error,
    success: success,
    documentClick: documentClick
  };
})();
