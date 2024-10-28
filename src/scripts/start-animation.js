document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animated-element');

  function checkVisibility() {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('aos-init');
      } else {
        element.classList.remove('aos-init');
      }
    });
  }

  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
})
