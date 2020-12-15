'use strict';

(function () {

  var createFocusTrap = window.createFocusTrap;

  var body = document.querySelector('body');
  var header = document.querySelector('.header');

  var products = document.querySelector('.products');
  if (products) {
    products.classList.remove('products--no-js');
    var sliderContainer = products.querySelector('.products__container');
  }

  var questionsList = document.querySelector('.questions__list');
  if (questionsList) {
    var questionsButtons = questionsList.querySelectorAll('.questions__question');
  }

  /* Меню */

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

  // Инициализируем слайдер блока Продукты

  if (sliderContainer) {
    sliderContainer.classList.remove('products__container--no-js');

    var swiper = new Swiper('.products__container', {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 4,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      navigation: {
        nextEl: '.products__button--next',
        prevEl: '.products__button--prev',
      },
      breakpoints: {
      // when window width is <= 1023px
        1023: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        767: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          }
        }
      }
    });
  }

  // Аккордеон

  if (questionsList) {
    questionsList.classList.remove('questions__list--no-js');
    var questionsButtonsArray = Array.prototype.slice.call(questionsButtons, 0);
  }

  var onQuestionsButtonClick = function (evt) {
    var element;

    if (questionsButtonsArray.indexOf(evt.target) >= 0) {
      element = evt.target;
    } else {
      element = evt.target.parentElement;
    }

    if (element.classList.contains('questions__question--active')) {
      element.classList.remove('questions__question--active');
    } else {
      var activeQuestionsButton = questionsList.querySelector('.questions__question--active');
      if (activeQuestionsButton) {
        activeQuestionsButton.classList.remove('questions__question--active');
      }
      element.classList.add('questions__question--active');
    }
  };

  // Функция добавления обработчика собития на кнопку аккордеона

  var addQuestionsButtonClickHandler = function (button) {
    button.addEventListener('click', onQuestionsButtonClick);
  };

  // Добавляем обработчики на все кнопки аккордеона

  if (questionsList) {
    if (questionsButtons.length !== 0) {
      for (var j = 0; j < questionsButtons.length; j++) {
        addQuestionsButtonClickHandler(questionsButtons[j]);
      }
    }
  }


})();
