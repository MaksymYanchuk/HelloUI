import slider from "./modules/slider.js";

slider({
  sliderSelector: ".slider",
  сonfig: {
    currentSlide: 0,
    slidesToShow: 4,
    isPagination: true,
    responsive: [
      {
        breakpoint: 768,
        slidesToShow: 3,
      },
      {
        breakpoint: 350,
        slidesToShow: 1,
      },
      {
        breakpoint: 500,
        slidesToShow: 2,
      },
    ],
    dotInactiveClass: "test",
  },
});
