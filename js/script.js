const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const progressBarTop = document.querySelector('.progress-bar-top');
const themeToggle = document.querySelector('#theme-toggle');
const typedText = document.querySelector('.typing-text');
const typedPhrases = [
  'Web Developer',
  'Full Stack Developer',
  'Software Developer'
];
const skills = document.querySelectorAll('.progress-bar');
const contactForm = document.querySelector('#contact-form');
const formFields = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
  subject: document.querySelector('#subject'),
  message: document.querySelector('#message')
};
const errorMessages = {
  name: document.querySelector('#error-name'),
  email: document.querySelector('#error-email'),
  subject: document.querySelector('#error-subject'),
  message: document.querySelector('#error-message')
};

let currentPhrase = 0;
let currentChar = 0;
let deleting = false;

function typeLoop() {
  const current = typedPhrases[currentPhrase];
  if (!deleting) {
    typedText.textContent = current.slice(0, currentChar + 1);
    currentChar++;
    if (currentChar === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      deleting = false;
      currentPhrase = (currentPhrase + 1) % typedPhrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 80 : 120);
}

typeLoop();

menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const viewportHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollPosition / viewportHeight) * 100;
  progressBarTop.style.width = `${progress}%`;

  if (scrollPosition > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  document.querySelector('.navbar').classList.toggle('sticky', scrollPosition > 20);

  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href='#${id}']`);
    if (scrollPosition >= top && scrollPosition < bottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  revealOnScroll();
});

backToTop.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.88;
    if (top < triggerPoint) {
      el.classList.add('active-reveal');
    }
  });
}

window.addEventListener('load', () => {
  revealOnScroll();
  animateSkills();
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
  }
});

function animateSkills() {
  skills.forEach(bar => {
    const percent = bar.dataset.level;
    bar.style.width = `${percent}%`;
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  let valid = true;

  Object.entries(formFields).forEach(([key, field]) => {
    if (!field.value.trim()) {
      errorMessages[key].textContent = `Please enter your ${key}.`;
      valid = false;
    } else {
      errorMessages[key].textContent = '';
    }
  });

  if (formFields.email.value && !validateEmail(formFields.email.value)) {
    errorMessages.email.textContent = 'Enter a valid email address.';
    valid = false;
  }

  if (valid) {
    alert('Thank you! Your message has been submitted successfully.');
    contactForm.reset();
  }
});

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light-theme', themeToggle.checked);
  localStorage.setItem('portfolioTheme', themeToggle.checked ? 'light' : 'dark');
});
