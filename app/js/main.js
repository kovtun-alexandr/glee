$(function(){

  $('.main-slider__inner').slick({
    dots:true,
    arrows:false,
    fade: true,
    autoplay:true,
    autoplaySpeed: 2000
  });

  var mixerProduct = mixitup('.products__inner', {
    selectors: {
      control: '.products-week__sorting-btn'
    }
  });

  var mixerDesign = mixitup('.design__items', {
    selectors: {
      control: '.design__sorting-btn'
    }
  });

});