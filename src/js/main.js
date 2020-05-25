$(document).ready(function () {
  var up = $('.scroll-up');
  var hero = $('.hero').height();
  var modal = $(".modal");
  var modalContainer = $('.modal-container');
  var thanks = $('.thanks');
  var thanksContainer = $('.thanks-container');
  var containers = $('.header, .hero, .section, .footer');
  new WOW().init();
  var send = "<div class='sended'> <div class='sended__element'> Спасибо за отправленную заявку <div class='sended__element'>Вы также можете вступить в нашу группу в <a href='http://vk.com' class='sended__item'>ВКонтакте</a></div></div>";

  $('.contact__btn, .heroSend').on("click", function(e){
    e.preventDefault();
    modal.addClass('modal_active');
    containers.css({
      'filter':'blur(5px)',
      'transition': 'all 0.2s',
    });
  });

  modal.mouseup(function (e) { 
    e.preventDefault();
    if(e.target == this && e.target != modalContainer){
      modal.removeClass('modal_active');
      containers.css('filter', 'none');
    } 
  });

  $('body').keydown(function(event){
    if (event.which == 27){
      modal.removeClass('modal_active');
      thanks.removeClass('thanks_active');
      containers.css('filter', 'none');
    }
  });
  
  $('.modal__close').on("click", function(){
    modal.removeClass('modal_active');
    containers.css('filter', 'none');
  });

  $('.thanks-container__close').on("click", function(){
    thanks.removeClass('thanks_active');
    containers.css('filter', 'none');
  });

  thanks.mouseup(function(e){
    e.preventDefault();
    if(e.target == this && e.target != thanksContainer){
      thanks.removeClass('thanks_active');
    }
  });

  $('.hero__scroll').on('click', function(){
    $('html, body').animate({'scrollTop': hero}, 500);
  });


  $(window).scroll(function(e){
    e.preventDefault();
    if($(window).scrollTop() > hero / 2){
      up.addClass('scroll-up_active');
    }
    else{
      up.removeClass('scroll-up_active');
    }
  });

  up.click(function(){
    $('html, body').animate({scrollTop: 0}, 500);
    return false;
  });


  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');
  
  next.css('left', prev.width() + 25 + bullets.width() + 25);
  bullets.css('left', prev.width() + 25);


  $(".modal-container__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15,
      },
      userPhone: {
        required: true,
        minlength: 18
      },
      userEmail: {
        required: true,
        email: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Не меньше 2 букв",
        maxlength: "Не больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Введите телефон полностью"
      },
      userEmail: {
        required: "Введите Ваш email",
        email: "Введите корректный email"
        },
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.modal-container__form').replaceWith(send);
        }
      });
    }
  });
  $(".control__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15,
      },
      userPhone: {
        required: true,
        minlength: 18
      },
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Не меньше 2 букв",
        maxlength: "Не больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Введите телефон полностью"
      },
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.control__form').replaceWith(send);
        }
      });
    }
  });
  $(".footer-container__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15,
      },
      userPhone: {
        required: true,
        minlength: 18
      },
      userQuestion: {
        required: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Не меньше 2 букв",
        maxlength: "Не больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Введите телефон полностью"
      },
      userQuestion: "Заполните поле"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.footer-container__form').replaceWith(send);
        }
      });
    }
  });
  $('[type=tel]').mask('+7 (000) 000-00-00');

  // Создание Яндекс карты
  var myMap;
  ymaps.ready(init);
    function init(){
      myMap = new ymaps.Map('map', {
        center: [47.244729, 39.722810],
        zoom: 17
      }, {
        searchControlProvider: 'yandex#search'
      }),

    // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Наш офис',
        balloonContent: 'Вход с другой стороны улицы'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/pin.png',
        // Размеры метки.
        iconImageSize: [42, 42],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
      });

      myMap.geoObjects
        .add(myPlacemark);
      myMap.behaviors
        .disable(['rightMouseButtonMagnifier', 'scrollZoom']);
    }
});