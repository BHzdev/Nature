// Debounce of Lodash
debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Change tab on click
$('[data-group]').each(function () {
  let $allTarget = $(this).find('[data-target]'),
    $allClick = $(this).find('[data-click]'),
    activeClass = 'active';

  $allTarget.first().addClass(activeClass);
  $allClick.first().addClass(activeClass);

  $allClick.click(function (e) {
    e.preventDefault();

    let id = $(this).data('click'),
      $target = $('[data-target="' + id + '"]');

    $allClick.removeClass(activeClass);
    $allTarget.removeClass(activeClass);

    $target.addClass(activeClass);
    $(this).addClass(activeClass);
  });
});

// Smooth Scroll
$('.menu-nav a[href^="#"]').click(function (e) {
  e.preventDefault();
  let id = $(this).attr('href'),
    menuHeight = $('.menu').innerHeight(),
    targetOffSet = $(id).offset().top;
  $('html, body').animate(
    {
      scrollTop: targetOffSet - menuHeight,
    },
    500,
  );
});

$('.logo').click(function (e) {
  e.preventDefault();
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    500,
  );
});

// Active links
$('section').each(function () {
  let height = $(this).height(),
    offSetTop = $(this).offset().top,
    id = $(this).attr('id'),
    menuHeight = $('.menu').innerHeight(),
    $itemMenu = $('a[href="#' + id + '"]');

  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    if (offSetTop < scrollTop && offSetTop + height - menuHeight > scrollTop) {
      $itemMenu.addClass('active');
    } else {
      $itemMenu.removeClass('active');
    }
  });
});

// Mobile Menu
$('.mobile-btn').click(function () {
  $(this).toggleClass('active');
  $('.mobile-menu').toggleClass('active');
});

// Slider
(function () {
  function slider(sliderName, velocidade) {
    var sliderClass = '.' + sliderName,
      activeClass = 'active',
      rotate = setInterval(rotateSlide, velocidade);

    $(sliderClass + ' > :first').addClass(activeClass);

    $(sliderClass).hover(
      function () {
        clearInterval(rotate);
      },
      function () {
        rotate = setInterval(rotateSlide, velocidade);
      },
    );

    function rotateSlide() {
      var activeSlide = $(sliderClass + ' > .' + activeClass),
        nextSlide = activeSlide.next();

      if (nextSlide.length == 0) {
        nextSlide = $(sliderClass + ' > :first');
      }
      activeSlide.removeClass(activeClass);
      nextSlide.addClass(activeClass);
    }
  }

  slider('introducao', 2000);
})();

// Scroll Animation
(function () {
  var $target = $('[data-anime="scroll"]'),
    animationClass = 'animate',
    offset = ($(window).height() * 3) / 4;

  function animeScroll() {
    var documentTop = $(document).scrollTop();

    $target.each(function () {
      var itemTop = $(this).offset().top;
      if (documentTop > itemTop - offset) {
        $(this).addClass(animationClass);
      } else {
        $(this).removeClass(animationClass);
      }
    });
  }

  animeScroll();

  $(document).scroll(
    debounce(function () {
      animeScroll();
    }, 200),
  );
})();
