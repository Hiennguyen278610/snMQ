const button = document.getElementById('playButton');
const modal = document.getElementById('gameModal');
const tiredBtn = document.getElementById('tiredBtn');
const notTiredBtn = document.getElementById('notTiredBtn');
const THRESHOLD = 85;
const MAX_MOVES = 15;
let moveCounter = 0;

const resetButtonPosition = () => {
    button.style.left = '50%';
    button.style.top = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.style.cursor = 'default';
};

button.removeEventListener('mouseover', () => {});
button.style.transition = 'none';

document.addEventListener('mousemove', (e) => {
    if (moveCounter >= MAX_MOVES) {
        resetButtonPosition();
        return;
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width/2;
    const buttonCenterY = buttonRect.top + buttonRect.height/2;
    
    const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
    );
    
    if(distance < THRESHOLD) {
        moveCounter++;
        const maxX = window.innerWidth - button.clientWidth;
        const maxY = window.innerHeight - button.clientHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        button.style.transform = 'none';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';

        // Add and remove animation class
        button.classList.remove('animate');
        void button.offsetWidth; // Trigger reflow
        button.classList.add('animate');

        if (moveCounter === MAX_MOVES) {
            setTimeout(resetButtonPosition, 100);
        }
    }
});

button.addEventListener('click', () => {
    console.log('haha');
    modal.style.display = 'flex';
});

tiredBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.getElementById('selectgift').style.display = 'flex';
});

notTiredBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    moveCounter = 0;
    resetButtonPosition();
    button.style.cursor = 'pointer';
});

document.addEventListener('DOMContentLoaded', function() {
    const giftLinks = document.querySelectorAll('.gift-option');
    const overlay = document.querySelector('.transition-overlay');
    const transitionAudio = document.getElementById('transitionAudio');

    giftLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent immediate navigation
            
            // Play audio and show overlay
            transitionAudio.play();
            overlay.classList.add('active');
            
            // Navigate after short delay for transition effect
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        });
    });
});