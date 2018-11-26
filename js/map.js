'use strict';

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

// создание меток авторов

var authorPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPinTemplate = document.querySelector('.map__pins');

var createAllPin = function () {
  // debugger;
  for (var i = 0; i < peoples.length; i++) {
    var authorPinTemplate = authorPin.cloneNode(true);
    authorPinTemplate.querySelector('img').src = peoples[i].author.avatar;
    authorPinTemplate.querySelector('img').alt = peoples[i].offer.title;
    authorPinTemplate.style.left = peoples[i].location.x - 20 + 'px';
    authorPinTemplate.style.top = peoples[i].location.y - 40 + 'px';

    mapPinTemplate.appendChild(authorPinTemplate);
  }
};

createAllPin();

// добавление дополнительных картинок в card

var cardImage = document.querySelector('#card')
  .content
  .querySelector('.popup__photos');

var cardImg = document.querySelector('#card')
  .content
  .querySelector('.popup__photos')
  .querySelector('.popup__photo');


var cardImageTemplate = function () {
  for (var z = 1; z < 3; z++) {
    var cardImageTemp = cardImg.cloneNode(true);
    cardImageTemp.src = peoples[0].offer.photos[z];
    cardImage.appendChild(cardImageTemp);
  }
};

cardImageTemplate();

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

// создание карт авторов

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var generatedCard = function () {
  for (var j = 0; j < peoples.length; j++) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = peoples[0].author.avatar;
    card.querySelector('.popup__title').textContent = peoples[0].offer.title;
    card.querySelector('.popup__text--address').textContent = peoples[0].offer.address;
    card.querySelector('.popup__text--price').textContent = peoples[0].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = convertType();
    card.querySelector('.popup__text--capacity').textContent = peoples[0].offer.rooms + ' комнаты для ' +
      peoples[0].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + peoples[0].offer.checkin + ', выезд до ' +
      peoples[0].offer.checkout;
    card.querySelector('.popup__features').textContent = peoples[0].offer.features;
    card.querySelector('.popup__description').textContent = peoples[0].offer.description;
    card.querySelector('.popup__photos').querySelector('.popup__photo').src = peoples[0].offer.photos[0];

    map.appendChild(card);
  }
};

generatedCard();

