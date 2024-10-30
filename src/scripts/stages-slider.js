document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.js-stages-slider-steps');
  const sliderWrapper = document.querySelector('.js-stages-slider-wrapper');
  const prevButton = document.querySelector('.js-stages-button-prev');
  const nextButton = document.querySelector('.js-stages-button-next');
  const paginationElements = document.querySelectorAll('.js-pagination-element');
  let currentSlide = 0;
  const lastSlide = paginationElements.length - 1;
  let width = 0;
  let startX = 0;
  let endX = 0;

  const updateSlidePosition = () => {
    slides.style.transform = `translateX(-${width * currentSlide}px)`;
  }

  const updateSliderWidth = () => {
    width = sliderWrapper.offsetWidth;
    updateSlidePosition();
  }

  const togglePaginationActiveClass = (index) => {
    paginationElements[index].classList.toggle('slider-pagination-element_active');
  }

  const updateNavigationButtons = () => {
    prevButton.classList.toggle('slider-navigation-button_disabled', currentSlide === 0);
    nextButton.classList.toggle('slider-navigation-button_disabled', currentSlide === lastSlide);
  }

  const moveToSlide = (newSlide) => {
    togglePaginationActiveClass(currentSlide);
    currentSlide = newSlide;
    slides.style.transition = '0.6s';
    updateSlidePosition();
    setTimeout(() => {
      slides.style.transition = '0s';
    }, 1000);
    togglePaginationActiveClass(currentSlide);
    updateNavigationButtons();
  }

  const goToNextSlide = () => {
    if (currentSlide < lastSlide) {
      moveToSlide(currentSlide + 1);
    }
  }

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      moveToSlide(currentSlide - 1);
    }
  }

  sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });


  sliderWrapper.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance < 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
  });

  const initSlider = () => {
    updateSliderWidth();
    window.addEventListener('resize', updateSliderWidth);
    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);
  }

  initSlider();
});
