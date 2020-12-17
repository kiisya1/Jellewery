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

  var filter = document.querySelector('.filter');
  if (filter) {
    var filterContainer = filter.querySelector('.filter__container');
    var filterFocusTrap = createFocusTrap(filterContainer);
    var filterButtons = filter.querySelectorAll('.filter__feature button[type="button"]');
    var filterOpenButton = filter.querySelector('.filter__open-button');
    var filterCloseButton = filter.querySelector('.filter__close-button');
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
        blockPage();
      } else {
        header.classList.add('header--closed');
        unblockPage();
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

  var blockPage = function () {
    body.dataset.scrollY = getBodyScrollTop(); // сохраним значение скролла

    body.classList.add('body-lock');
    body.style.top = '-' + body.dataset.scrollY + 'px';
  };

  var unblockPage = function () {
    body.classList.remove('body-lock');
    body.style.top = '';
    window.scrollTo(0, +body.dataset.scrollY);
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

  // Фильтр

  if (filter) {
    filter.classList.remove('filter--no-js');
    var filterButtonsArray = Array.prototype.slice.call(filterButtons, 0);

    filterOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openFilter();
    });

  }

  var openFilter = function () {
    if (filterContainer.classList.contains('filter__container--closed')) {
      blockPage();
      filterContainer.classList.remove('filter__container--closed');
      filterFocusTrap.activate();
    }

    filterCloseButton.addEventListener('click', onFilterCloseButtonClick);
    filterContainer.addEventListener('click', onFilterContainerOverflowClick);
    document.addEventListener('keydown', onFilterKeydown);
  };

  var closeFilter = function () {
    if (!filterContainer.classList.contains('filter__container--closed')) {
      filterContainer.classList.add('filter__container--closed');
      unblockPage();
      filterFocusTrap.deactivate();

      filterCloseButton.removeEventListener('click', onFilterCloseButtonClick);
      filterContainer.removeEventListener('click', onFilterContainerOverflowClick);
      document.removeEventListener('keydown', onFilterKeydown);
    }
  };

  var onFilterCloseButtonClick = function (evt) {
    evt.preventDefault();
    closeFilter();
  };

  /* Функция закрытия фильтра при клике на оверфлоу */

  var onFilterContainerOverflowClick = function (evt) {
    if (evt.target === filterContainer) {
      closeFilter();
    }
  };

  /* Функция закрытия фильтра при нажатии на Escape */

  var onFilterKeydown = function (evt) {
    if (evt.keyCode === 27) {
      closeFilter();
    }
  };

  /* Функция открытия списка чекбоксов фильтра */

  var onFilterButtonClick = function (evt) {
    var element;

    if (filterButtonsArray.indexOf(evt.target) >= 0) {
      element = evt.target;
    } else {
      if (filterButtonsArray.indexOf(evt.target.parentElement) >= 0) {
        element = evt.target.parentElement;
      } else {
        element = evt.target.parentElement.parentElement;
      }
    }

    var elementParent = element.parentElement;

    if (elementParent.classList.contains('filter__feature--active')) {
      elementParent.classList.remove('filter__feature--active');
    } else {
      elementParent.classList.add('filter__feature--active');
    }
  };

  // Функция добавления обработчика собития на кнопку аккордеона

  var addFilterButtonClickHandler = function (button) {
    button.addEventListener('click', onFilterButtonClick);
  };

  // Добавляем обработчики на все кнопки аккордеона

  if (filter) {
    if (filterButtons.length !== 0) {
      for (var k = 0; k < filterButtons.length; k++) {
        addFilterButtonClickHandler(filterButtons[k]);
      }
    }
  }


})();
