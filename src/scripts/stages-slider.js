document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.js-stages-slider-steps');
  const sliderWrapper = document.querySelector('.js-stages-slider-wrapper');
  const prevButton = document.querySelector('.js-stages-button-prev');
  const nextButton = document.querySelector('.js-stages-button-next');
  const paginationElements = document.querySelectorAll('.js-pagination-element');
  let currentSlide = 0;
  const lastSlide = paginationElements.length - 1;
  let width = 0;

  function updateSliderWidth() {
    width = sliderWrapper.offsetWidth;
    updateSlidePosition();
  }

  function updateSlidePosition() {
    slides.style.transform = `translateX(-${width * currentSlide}px)`;
  }

  function togglePaginationActiveClass(index) {
    paginationElements[index].classList.toggle('slider-pagination-element_active');
  }

  function updateNavigationButtons() {
    prevButton.classList.toggle('slider-navigation-button_disabled', currentSlide === 0);
    nextButton.classList.toggle('slider-navigation-button_disabled', currentSlide === lastSlide);
  }

  function goToNextSlide() {
    if (currentSlide < lastSlide) {
      moveToSlide(currentSlide + 1);
    }
  }

  function goToPrevSlide() {
    if (currentSlide > 0) {
      moveToSlide(currentSlide - 1);
    }
  }

  function moveToSlide(newSlide) {
    togglePaginationActiveClass(currentSlide);
    currentSlide = newSlide;
    slides.style.transition = '1s';
    updateSlidePosition();
    setTimeout(() => {
      slides.style.transition = '0s';
    }, 1000);
    togglePaginationActiveClass(currentSlide);
    updateNavigationButtons();
  }

  function initSlider() {
    updateSliderWidth();
    window.addEventListener('resize', updateSliderWidth);
    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);
  }

  initSlider();
});
