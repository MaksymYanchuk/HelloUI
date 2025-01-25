function slider({ sliderSelector, сonfig }) {
  const _defaults = {
    currentSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    isPagination: true,
    gap: 10,
    slideWidth: 120,
    slideHeight: "auto",
    dotsContainerClass: "slider-pagination-container",
    dotClass: "slider-dot",
    dotActiveClass: "slider-active",
    prevButtonClasses: "slider__button slider__button_prev",
    nextButtonClasses: "slider__button slider__button_next",
    responsive: null,
  };

  const settings = mergeSettings(_defaults, сonfig);

  let isButtonHandlerAdded = false;
  let isResizeHandlerAdded = false;

  let offset = settings.currentSlide * settings.slideWidth;
  const slider = document.querySelector(sliderSelector);
  const sliderImages = Array.from(slider.children);
  const imageCount = sliderImages.length;
  const initialSlidesToShow = settings.slidesToShow;

  slider.innerHTML = "";

  const createElement = (element, classNames) => {
    const newElement = document.createElement(element);
    newElement.className = classNames;
    return newElement;
  };

  function debounce(f, t) {
    let timeoutId;

    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        f();
      }, t);
    };
  }

  const handlerNextBtn = (track) => {
    settings.currentSlide += settings.slidesToScroll;

    if (settings.currentSlide > imageCount - settings.slidesToShow) {
      settings.currentSlide = 0;
    }

    updateOffset();
    changeSlide(offset, track);
  };

  const handlerPrevBtn = (track) => {
    settings.currentSlide -= settings.slidesToScroll;

    if (settings.currentSlide < 0) {
      settings.currentSlide = imageCount - settings.slidesToShow;
    }

    updateOffset();
    changeSlide(offset, track);
  };
  
  const handleResize = () => {
    if (!settings.responsive) return;

    let newSlidesToShow = initialSlidesToShow;

    settings.responsive
      .sort((a, b) => b.breakpoint - a.breakpoint)
      .forEach((item) => {
        if (window.innerWidth <= item.breakpoint) {
          newSlidesToShow = item.slidesToShow;
        }
      });

    if (settings.slidesToShow !== newSlidesToShow) {
      settings.slidesToShow = newSlidesToShow;
      loadSlider();
    }
  };

  function loadSlider() {
    slider.innerHTML = "";
    const { prevButton, nextButton, track } = renderSlider();

    if (settings.isPagination) {
      const { paginationContainer, paginationDots } = renderPagination();
      setDotsColor(paginationDots);
      paginationContainer.addEventListener("click", (event) =>
        changeSlideByDot(event, paginationDots, track)
      );
    }

    if (settings.responsive && !isResizeHandlerAdded) {
      window.addEventListener("resize", debounce(handleResize, 200));
      handleResize();
      isResizeHandlerAdded = true;
    }

    if (!isButtonHandlerAdded) {
      nextButton.addEventListener("click", () => handlerNextBtn(track));
      prevButton.addEventListener("click", () => handlerPrevBtn(track));
      isButtonHandlerAdded = true;
    }
  }

  function renderSlider() {
    const prevButton = createElement("button", settings.prevButtonClasses);
    const nextButton = createElement("button", settings.nextButtonClasses);
    const trackContainer = createElement("div", "slider-track-container");
    const track = createElement("div", "slider-track");

    const visibleSlides = Math.min(settings.slidesToShow, imageCount);
    const totalWidth = visibleSlides * settings.slideWidth;
    trackContainer.style.width = `${totalWidth}px`;

    track.style.cssText = `width: ${
      settings.slideWidth * sliderImages.length
    }px; right: ${offset}px; gap: ${settings.gap}px`;

    for (let i = 0; i < sliderImages.length; i++) {
      const imgContainer = createElement("div", "slider-img-container");
      imgContainer.style.cssText = `width: ${settings.slideWidth}px; height: ${settings.slideHeight}`;

      imgContainer.appendChild(sliderImages[i]);
      track.appendChild(imgContainer);
    }

    slider.appendChild(prevButton);
    slider.appendChild(trackContainer);
    trackContainer.appendChild(track);
    slider.appendChild(nextButton);

    return { prevButton, nextButton, track };
  }

  function renderPagination() {
    const dotsCount = imageCount - settings.slidesToShow + 1;
    const paginationDots = [];
    const paginationContainer = createElement("div", settings.dotsContainerClass);

    slider.appendChild(paginationContainer);

    for (let i = 0; i < dotsCount; i++) {
      const dot = createElement("button", settings.dotClass);
      paginationDots.push(dot);
      paginationContainer.appendChild(dot);
    }

    return { paginationContainer, paginationDots };
  }

  function setDotsColor() {
    if (!settings.isPagination) return;
    document.querySelectorAll(`.${settings.dotClass}`).forEach((dot, i) => {
      dot.classList.toggle(settings.dotActiveClass, i === settings.currentSlide);
    });
  }

  function changeSlideByDot(event, dots, track) {
    const { target } = event;

    if (!target.classList.contains(settings.dotClass)) return;

    settings.currentSlide = dots.indexOf(target);
    updateOffset();

    changeSlide(offset, track);
  }

  function changeSlide(offset, track) {
    track.style.transform = `translateX(-${offset}px)`;

    if (settings.isPagination) {
      setDotsColor();
    }
  }

  function mergeSettings(defaults, custom) {
    return { ...defaults, ...custom };
  }

  function updateOffset() {
    offset = settings.currentSlide * settings.slideWidth;
  }

  loadSlider();
}

export default slider;
