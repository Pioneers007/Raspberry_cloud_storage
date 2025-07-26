
const steps = document.querySelectorAll('.step');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

steps.forEach(step => observer.observe(step));

// Copy text and show checkmark on click
steps.forEach(step => {
  step.addEventListener('click', () => {
    navigator.clipboard.writeText(step.textContent);
    step.classList.add('clicked');
    setTimeout(() => {
      step.classList.remove('clicked');
    }, 1500);
  });
});
