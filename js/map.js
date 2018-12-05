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
  for (var i = 0; i < peoples.length; i++) {
    var authorPinTemplate = authorPin.cloneNode(true);
    authorPinTemplate.querySelector('img').src = peoples[i].author.avatar;
    authorPinTemplate.querySelector('img').alt = peoples[i].offer.title;
    authorPinTemplate.style.left = peoples[i].location.x - 25 + 'px';
    authorPinTemplate.style.top = peoples[i].location.y - 70 + 'px';
    authorPinTemplate.classList.add('hidden');

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

cardTemplate.classList.add('hidden');

var generatedCard = function () {
  for (var i = 0; i < peoples.length; i++) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = peoples[i].author.avatar;
    card.querySelector('.popup__title').textContent = peoples[i].offer.title;
    card.querySelector('.popup__text--address').textContent = peoples[i].offer.address;
    card.querySelector('.popup__text--price').textContent = peoples[i].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = convertType();
    card.querySelector('.popup__text--capacity').textContent = peoples[i].offer.rooms + ' комнаты для ' +
      peoples[i].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + peoples[i].offer.checkin + ', выезд до ' +
      peoples[i].offer.checkout;
    card.querySelector('.popup__features').textContent = peoples[i].offer.features;
    card.querySelector('.popup__description').textContent = peoples[i].offer.description;
    card.querySelector('.popup__photos').querySelector('.popup__photo').src = peoples[i].offer.photos[0];

    map.appendChild(card);
  }
};

generatedCard();

// добавим в форму элементы форм атрибуты если на ней есть класс .ad-form--disabled;
// объявим форму
var form = document.querySelector('.ad-form');
// найдем все элементы fieldset
var formFieldsets = form.querySelectorAll('fieldset');
// соберем их всех через цикл и если на форме есть .ad-form--disabled добавим им атрибут disabled

var disFieldset = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    if (form.classList.contains('ad-form--disabled')) {
      formFieldsets[i].setAttribute('disabled', true);
    } else {
      formFieldsets[i].removeAttribute('disabled');
    }
  }
};

disFieldset();

// заблокируем форму .map__filters
// найдем форму
var mapFilters = document.querySelector('.map__filters');
// найдем элементы select и fieldset
var selectFilters = mapFilters.querySelectorAll('select');
var fieldsetFilters = mapFilters.querySelector('fieldset');
// заблокируем селекты если блок .map имеет класс .map--faded

var disSelect = function () {
  for (var i = 0; i < selectFilters.length; i++) {
    if (map.classList.contains('map--faded')) {
      selectFilters[i].setAttribute('disabled', true);
    } else {
      selectFilters[i].removeAttribute('disabled');
    }
  }

  // заблокируем fieldset если блок .map имеет класс .map--faded
  if (map.classList.contains('map--faded')) {
    fieldsetFilters.setAttribute('disabled', true);
  } else {
    fieldsetFilters.removeAttribute('disabled');
  }
};

disSelect();
// функция что бы убрать класс hidden
var mapPins = document.querySelectorAll('.map__pin');

var pinDelHidden = function () {
  for (var i = mapPins.length - 1; i > 0; i--) {
    mapPins[i].classList.remove('hidden');
  }
};
// сэмулируем перетаскивание метки
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  pinDelHidden();
  disSelect();
  disFieldset();

  var coordsPin = {
    x: evt.pageX,
    y: evt.pageY
  };

  var onMouseMov = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: coordsPin.x - moveEvt.pageX,
      y: coordsPin.y - moveEvt.pageY
    };

    var limits = {
      top: map.offsetTop + mainPin.offsetHeight + 30,
      right: map.offsetWidth + map.offsetLeft - mainPin.clientWidth / 2,
      bottom: map.offsetHeight + map.offsetTop - mainPin.offsetHeight - 84,
      left: map.offsetLeft + mainPin.clientWidth / 2
    };

    coordsPin = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };
    // при движении изменяем координаты на которые указывает наш пин
    var addressLeft = mainPin.offsetLeft + 32.5;
    var addressTop = mainPin.offsetTop + 65;
    inputAdress.value = addressLeft + '\, ' + addressTop;

    if ((coordsPin.x > limits.left && coordsPin.x < limits.right) &&
    (coordsPin.y > limits.top && coordsPin.y < limits.bottom)){
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMov);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMov);
  document.addEventListener('mouseup', onMouseUp);
});

// устанавливаем координаты на которые указывает наш пин
var inputAdress = document.querySelector('#address');
var addressLeft = mainPin.offsetLeft + 32.5;
var addressTop = mainPin.offsetTop + 65;
inputAdress.value = addressLeft + '\, ' + addressTop;

// сделаем так, что бы при нажатии на пин отображалась соответствующая ему катрочка
// соберем массив из элементов card__pin
var mapCardArr = document.querySelectorAll('.map__card');

// обработаем событие
var оnOpen = function OnOpen() {
  var loop = function loop(i) {
    mapPins[i].addEventListener('click', function () {
      mapCardArr[i - 1].classList.remove('hidden');
    });
  };

  for (var i = 1; i < mapPins.length; i++) {
    loop(i);
  }
};

оnOpen();
// сделаем что бы попап закрывался нажатием на крестик
var cardClose = document.querySelectorAll('.popup__close');
var popClose = function () {
  var close = function (i) {
    cardClose[i].addEventListener('click', function () {
      mapCardArr[i].classList.add('hidden');
    });
  };

  for (var i = 0; i < cardClose.length; i++) {
    close(i);
  }
};

popClose();
