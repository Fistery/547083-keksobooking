'use strict';

var randomAuthorNumber = function (number) {
  return Math.round(Math.random() * number);
};

var houseDiscription = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
  'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var randomNumber = function (min, max) {
  var price = min - 0.5 + Math.random() * (max - min + 1);
  price = Math.round(price);
  return price;
};

var houseType = ['palace', 'flat', 'house', 'bungalo'];

var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// var randomElement = function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// };

var randomFeatures = function () {
  var randFeatures = [];
  for (var i = 0; i < randomNumber(0, features.length); i++) {
    var feature = features[randomNumber(0, features.length)];
    randFeatures.push(feature);
    features.splice(feature);
  }
  return randFeatures;
};

var newFeatures = randomFeatures();

var map = document.querySelector('.map');
var mapStyle = window.getComputedStyle(map, null).getPropertyValue('width');

var generatedPeoples = function (numberPeoples) {
  var authors = [];
  for (var i = 0; i < numberPeoples; i++) {
    var people = {
      author: {
        avatar: 'img/avatars/user0' + randomAuthorNumber(7)
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
        x: randomNumber(0, mapStyle),
        y: randomNumber(130, 630)
      }
    };
    authors.push(people);
  }
  return authors;
};

var peoples = generatedPeoples(7);

var authorPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPinTemplate = document.querySelector('.map__pins');

var createPin = function () {
  for (var i = 0; i < peoples.length; i++) {
    var authorPinTemplate = mapPinTemplate.cloneNode(true);
    authorPin.src = peoples[i].author.avatar;
    authorPin.alt = peoples[i].offer.title;
    authorPin.style.left = peoples[i].x - 20;
    authorPin.style.top = peoples[i].y - 40;

    mapPinTemplate.appendChild(authorPinTemplate);
  }
};

createPin();

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
    card.querySelector('.popup__type').textContent = peoples[0].offer.type;
    card.querySelector('.popup__text--capacity').textContent = peoples[0].offer.rooms + ' комнаты для ' +
      peoples[0].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + peoples[0].offer.checkin + ', выезд до ' +
      peoples[0].offer.checkout;
    card.querySelector('.popup__features').textContent = peoples[0].offer.features;
    card.querySelector('.popup__description').textContent = peoples[0].offer.description;
    card.querySelector('.popup__photos').textContent = peoples[0].offer.photos;

    cardTemplate.appendChild(card);
  }
};

generatedCard();
