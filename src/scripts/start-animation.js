document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animated-element');
  const offset = 80;

  function checkVisibility() {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - offset && rect.bottom > 0) {
        element.classList.add('aos-init');
      } else if (rect.top > window.innerHeight || rect.bottom < -offset) {
        element.classList.remove('aos-init');
      }
    });
  }

  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
})
