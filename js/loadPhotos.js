'use strict';

(function () {
  var TYPE_FILES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var AVATAR_MARGIN = 'auto';
  var ROOMS_PHOTO_WIDTH = 60;
  var ROOMS_PHOTO_HEIGHT = 60;
  var ROOMS_PHOTO_MARGIN = 5;
  var inputFileAvatar = document.querySelector('#avatar');
  var userAvatar = document.querySelector('.ad-form-header__preview > img');
  var avatarContainer = document.querySelector('.ad-form-header__preview');
  var avatarDefaultSrc = 'img/muffin-grey.svg';

  var inputFilePhotos = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var userPhoto = document.querySelector('.ad-form__photo');

  var deleteImages = function (container) {
    var images = container.querySelectorAll('img');
    images.forEach(function (item) {
      item.remove();
    });
  };

  var removeUpload = function () {
    var images = document.querySelectorAll('.form__photo');
    var userAvatarImage = document.querySelector('.ad-form-header__preview > img');
    userAvatarImage.remove();
    images.forEach(function (item) {
      item.remove();
    });
    var image = document.createElement('img');
    var avatar = image.cloneNode(true);
    avatarContainer.appendChild(avatar);
    avatar.src = avatarDefaultSrc;
    avatar.style.width = AVATAR_WIDTH + 'px';
    avatar.style.height = AVATAR_HEIGHT + 'px';
  };

  var getReaderResult = function (input, cont, paint, width, height, margin) {
    if (cont.querySelectorAll('img')) {
      deleteImages(cont);
    }
    var file = input.files;

    var getPhotoRooms = function (address) {
      var photoImage = document.createElement('img');
      var photoItem = photoImage.cloneNode(true);
      cont.appendChild(photoItem);
      photoItem.classList.add('form__photo');
      photoItem.style.width = width + 'px';
      photoItem.style.height = height + 'px';
      photoItem.style.margin = margin + 'px' + ' ' + margin + 'px';
      photoItem.src = address;
    };

    for (var i = 0; i < file.length; i++) {
      var fileName = file[i].name.toLowerCase();
      var matches = TYPE_FILES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.onload = function (evt) {
          getPhotoRooms(evt.target.result);
        };
        reader.readAsDataURL(file[i]);
      }
    }
    paint.remove();
  };

  inputFileAvatar.addEventListener('change', function () {
    getReaderResult(inputFileAvatar, avatarContainer, userAvatar, AVATAR_WIDTH, AVATAR_HEIGHT, AVATAR_MARGIN);
  });

  inputFilePhotos.addEventListener('change', function () {
    getReaderResult(inputFilePhotos, photoContainer, userPhoto, ROOMS_PHOTO_WIDTH, ROOMS_PHOTO_HEIGHT, ROOMS_PHOTO_MARGIN);
  });

  window.loadPhotos = {
    removeUpload: removeUpload
  };
})();
