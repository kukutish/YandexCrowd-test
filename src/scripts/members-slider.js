window.addEventListener('load', () => {
  const sliderContainer = document.querySelector('.js-members__slider');
  const prevButton = document.querySelector('.js-members-button-prev');
  const nextButton = document.querySelector('.js-members-button-next');
  const currentSlideCounter = document.querySelector('.js-members-numbers-active');
  const totalSlidesCounter = document.querySelector('.js-members-numbers-total-slides');
  const slides = sliderContainer.children;

  let slideWidth = 0;
  let currentSlideIndex = 1;
  let isTransitioning = false;
  let autoSlideInterval = 0;
  let windowWidth = window.innerWidth;

  const updateSlideWidth = () => {
    setTimeout(() => {
      slideWidth = slides[0].offsetWidth;
    }, 500);
  }

  const updateWindowWidth = () => {
    windowWidth = window.innerWidth;
  }

  const updateSlideCounter = () => {
    currentSlideCounter.innerText = `${currentSlideIndex}`;
  }


  const updateSlidePosition = (value) => {
    sliderContainer.style.transform = `translateX(${value}px)`;
  }

  const toggleSlideClass = (num) => {
    slides[num].classList.toggle('section-members__animation-show');
  }

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  }

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(moveToNextSlide, 4000);
  }

  const moveToNextSlide = () => {
    if (isTransitioning) return;

    sliderContainer.style.transition = '0.5s';
    updateSlidePosition((slideWidth + 20) * -1)
    toggleSlideClass(0)
    currentSlideIndex = (currentSlideIndex === slides.length) ? 1 : currentSlideIndex + 1;
    updateSlideCounter();
    isTransitioning = true;
    nextButton.style.cursor = 'auto';
    setTimeout(() => {
      sliderContainer.style.transition = '0s';
      toggleSlideClass(windowWidth > 992 ? 3 : 1)
      sliderContainer.appendChild(slides[0]);
      updateSlidePosition(0);
      isTransitioning = false;
      nextButton.style.cursor = 'pointer';
    }, 500);
  }

  const moveToPreviousSlide = () => {
    if (isTransitioning) return;

    isTransitioning = true;
    prevButton.style.cursor = 'auto';

    sliderContainer.style.transition = '0s';
    sliderContainer.insertBefore(slides[slides.length - 1], slides[0]);
    updateSlidePosition((slideWidth + 20) * -1);
    setTimeout(() => {
      sliderContainer.style.transition = '0.5s';
      updateSlidePosition(0);
      toggleSlideClass(windowWidth > 992 ? 3 : 1)
      currentSlideIndex = (currentSlideIndex === 1) ? slides.length : currentSlideIndex - 1;
      updateSlideCounter();
      setTimeout(() => {
        toggleSlideClass(0)
        isTransitioning = false;
        prevButton.style.cursor = 'pointer';
      }, 500);
    }, 20);
  }

  const updateSlideClass = (value) => {
    Array.from(slides).forEach((element, index) => {
      if (index < value) {
        element.classList.add('section-members__animation-show');
      } else {
        element.classList.remove('section-members__animation-show');
      }
    })
  }

  const handleResize = () => {
    stopAutoSlide();
    isTransitioning = true;
    updateSlideWidth();
    updateWindowWidth();
    updateSlideClass(windowWidth > 992 ? 3 : 1);
    updateSlidePosition(0);
    isTransitioning = false;
    startAutoSlide();
  }

  const initSlider = () => {
    updateSlideWidth();
    autoSlideInterval = setInterval(moveToNextSlide, 4000);
    window.addEventListener('resize', handleResize);
    updateSlideCounter();
    totalSlidesCounter.innerText = `${slides.length}`;
    startAutoSlide();
    updateSlideClass(windowWidth > 992 ? 3 : 1);
  }

  nextButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToNextSlide();
    startAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToPreviousSlide();
    startAutoSlide();
  });

  initSlider();
});
