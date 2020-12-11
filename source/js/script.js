'use strict';

(function () {

  /* Меню */

  var createFocusTrap = window.createFocusTrap;

  var body = document.querySelector('body');
  var header = document.querySelector('.header');

  if (header) {
    header.classList.remove('header--no-js');
    header.classList.add('header--closed');
    var menuButton = header.querySelector('.header__menu-toggle');

    menuButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (header.classList.contains('header--closed')) {
        header.classList.remove('header--closed');
        body.dataset.scrollY = getBodyScrollTop(); // сохраним значение скролла

        body.classList.add('body-lock');

        if (existVerticalScroll()) {
          body.style.top = '-' + body.dataset.scrollY + 'px';
        }
      } else {
        header.classList.add('header--closed');
        body.classList.remove('body-lock');

        if (existVerticalScroll()) {
          window.scrollTo(0, +body.dataset.scrollY);
        }
      }

    });
  }

  /* Получение положения на странице при открытии поп-апа */

  var existVerticalScroll = function () {
    return document.body.offsetHeight > window.innerHeight;
  };

  var getBodyScrollTop = function () {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  };


})();
