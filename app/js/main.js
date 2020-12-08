$(function () {
  const prefix = '$',
  postfix = '.00';

  $('.production-tubs__top-item').on('click', function (e) {
    e.preventDefault();
    $('.production-tubs__top-item').removeClass('production-tubs__top-item--active');
    $(this).addClass('production-tubs__top-item--active');
    $('.production-tubs__content-item').removeClass('production-tubs__content-item--active');
    $($(this).attr('href')).addClass('production-tubs__content-item--active');
  })

  $('.production__input').styler();

  $(".filter-products__star").rateYo({
    starWidth: '10px',
    normalFill: '#d6d6d6',
    ratedFill: '#ffcc00',
    spacing: '10px',
    readOnly: true,
    'starSvg': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 511.98685 511" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></g></svg>'
  });

  $(".star").rateYo({
    starWidth: '18px',
    normalFill: '#d6d6d6',
    ratedFill: '#ffcc00',
    spacing: '12px',
    readOnly: true,
    'starSvg': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 511.98685 511" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"/></g></svg>'
  });

  $('.production__thumb').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: '.production__main',
    draggable: false,
    vertical: true
  })
  $('.production__main').slick({
    asNavFor: '.production__thumb',
    focusOnSelect: true,
    arrows: false,
    draggable: false,
    fade: true
  })

  $('.product-related__slide').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button class="product-related__prev"><img src="../images/icons/slick-left.svg" alt="Icon prev"></button>',
    nextArrow: '<button class="product-related__next"><img src="../images/icons/slick-right.svg" alt="Icon next"></button>',
    centerPadding: '40px'
  })

  $('.rpice-slider').ionRangeSlider({
    type: "double",
    onStart: function (data) {
      $('.filter-rpice__from').text(prefix.concat(data.from, postfix));
      $('.filter-rpice__to').text(prefix.concat(data.to, postfix));
    },
    onChange: function (data) {
      $('.filter-rpice__from').text(prefix.concat(data.from, postfix));
      $('.filter-rpice__to').text(prefix.concat(data.to, postfix));
    }
  });

  $('.main-slider__inner').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000
  });

  const containerProduct = $('.products__inner');
  
  if(document.querySelector('.products__inner')){
    var mixer = mixitup(containerProduct, {
      selectors: {
        control: '.products-week__sorting-btn'
      }
    });
  }

  const containerDesing = $('.design__items');

  if(document.querySelector('.design__items')){
    var mixer = mixitup(containerDesing, {
      selectors: {
        control: '.design__sorting-btn'
      }
    });
  }

});