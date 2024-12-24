const slideBanner = document.getElementById('slideBanner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const images = [
    'her/her1.jpg',
    'her/her2.jpg',
    'her/her3.jpg',
    'her/her4.jpg'
];

let currentIndex = 0;

function renderSlides() {
  slideBanner.innerHTML = '';
  for (let i = -1; i < 2; i++) {
    const idx = (currentIndex + i + images.length) % images.length;
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide-item';
    slideDiv.style.transform = `translateX(${(i + 1) * 100}%)`;
    slideDiv.innerHTML = `<img src="${images[idx]}" alt="gift" />`;
    slideBanner.appendChild(slideDiv);
  }
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  const slides = document.querySelectorAll('.slide-item');
  slides.forEach((slide, i) => {
    slide.style.transition = 'transform 0.5s ease-in-out';
    slide.style.transform = `translateX(${(i - 1) * 100}%)`;
  });
  setTimeout(() => {
    renderSlides();
  }, 500);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  const slides = document.querySelectorAll('.slide-item');
  slides.forEach((slide, i) => {
    slide.style.transition = 'transform 0.5s ease-in-out'; 
    slide.style.transform = `translateX(${(i + 1) * 100}%)`;
  });
  setTimeout(() => {
    renderSlides();
  }, 500);
}

prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Initial render
renderSlides();
setInterval(showNext, 2000);

const observerOptions = {   
    root: null,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // Multiple thresholds for smoother animation
    rootMargin: "-50px"
};

const fadeInElements = document.querySelectorAll('.contenthead, .container-banner, .contentmain, .contentfoot');

const fadeInOutOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        // Calculate opacity based on intersection ratio
        const opacity = entry.intersectionRatio;
        const translateY = 30 - (entry.intersectionRatio * 30); // Start at 30px, move to 0px
        
        entry.target.style.opacity = opacity;
        entry.target.style.transform = `translateY(${translateY}px)`;
        
        // Optional: add/remove classes for fully visible/hidden states
        if (entry.intersectionRatio > 0.8) {
            entry.target.classList.add('fully-visible');
        } else if (entry.intersectionRatio < 0.1) {
            entry.target.classList.remove('fully-visible');
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.5s ease-out';
    fadeInOutOnScroll.observe(element);
});

document.addEventListener('DOMContentLoaded', function() {
    const backgroundAudio = document.getElementById('backgroundAudio');
    const storedTime = localStorage.getItem('audioTime');
    const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
    let audioStarted = false;
    
    if (storedTime) {
        backgroundAudio.currentTime = parseFloat(storedTime);
    }

    function startAudio() {
        if (!audioStarted && wasPlaying) {
            backgroundAudio.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
            audioStarted = true;
        }
    }
    startAudio();
    document.body.addEventListener('click', startAudio, { once: true });
    setInterval(() => {
        localStorage.setItem('audioTime', backgroundAudio.currentTime);
    }, 1000);
});
