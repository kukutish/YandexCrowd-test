document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.js-members__slider');
    const prevButton = document.querySelector('.js-members-button-prev');
    const nextButton = document.querySelector('.js-members-button-next');
    const currentSlideCounter = document.querySelector('.js-members-numbers-active');
    const totalSlidesCounter = document.querySelector('.js-members-numbers-total-slides');
    const slides = sliderContainer.children;

    let slideWidth = 0;
    let currentSlideIndex = 1;
    let isTransitioning = false;
    let autoSlideInterval = setInterval(moveToNextSlide, 4000);

    function updateSlideWidth() {
        slideWidth = slides[0].offsetWidth;
    }

    function updateSlideCounter() {
        currentSlideCounter.innerText = `${currentSlideIndex}`;
    }


    function updateSlidePosition(value){
        sliderContainer.style.transform = `translateX(${value}px)`;
    }

    function moveToNextSlide() {
        if (isTransitioning) return;

        sliderContainer.style.transition = '0.8s';
        updateSlidePosition((slideWidth + 20) * -1)
        currentSlideIndex = (currentSlideIndex === slides.length) ? 1 : currentSlideIndex + 1;
        updateSlideCounter();

        isTransitioning = true;
        nextButton.style.cursor = 'auto';
        setTimeout(() => {
            sliderContainer.style.transition = '0s';
            sliderContainer.appendChild(slides[0]);
            updateSlidePosition(0);
            isTransitioning = false;
            nextButton.style.cursor = 'pointer';
        }, 800);
    }

    function moveToPreviousSlide() {
        if (isTransitioning) return;

        sliderContainer.style.transition = '0s';
        sliderContainer.insertBefore(slides[slides.length - 1], slides[0]);
        updateSlidePosition((slideWidth + 20) * -1);
        currentSlideIndex = (currentSlideIndex === 1) ? slides.length : currentSlideIndex - 1;
        updateSlideCounter();

        isTransitioning = true;
        prevButton.style.cursor = 'auto';
        setTimeout(() => {
            sliderContainer.style.transition = '0.8s';
            updateSlidePosition(0);
            setTimeout(() => {
                isTransitioning = false;
                prevButton.style.cursor = 'pointer';
            }, 800);
        }, 0);
    }

    function initSlider() {
        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);
        updateSlideCounter();
        totalSlidesCounter.innerText = `${slides.length}`;
        startAutoSlide();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(moveToNextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
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


