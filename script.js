// DOM Elements
const scene = document.getElementById('scene');
const btnSunrise = document.getElementById('btn-sunrise');
const btnSunset = document.getElementById('btn-sunset');

const deckMid = document.getElementById('deck-mid');
const cracks = document.getElementById('cracks');
const splashMain = document.getElementById('splash-main');
const splashCar2 = document.getElementById('splash-car2');
const splashCar3 = document.getElementById('splash-car3');
const car1 = document.getElementById('car1');
const car2 = document.getElementById('car2');
const car3 = document.getElementById('car3');
const deb1 = document.getElementById('deb1');
const deb2 = document.getElementById('deb2');
const deb3 = document.getElementById('deb3');
const midCables = document.querySelectorAll('.mid-cable');
const startBtn = document.getElementById('start-btn');

// Theme Toggle Logic
btnSunrise.addEventListener('click', () => {
    scene.classList.remove('sunset-mode');
    btnSunrise.classList.add('active');
    btnSunset.classList.remove('active');
});

btnSunset.addEventListener('click', () => {
    scene.classList.add('sunset-mode');
    btnSunset.classList.add('active');
    btnSunrise.classList.remove('active');
});

// Animation Logic
let isAnimating = false;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function resetSplash(element, baseScale) {
    element.style.transition = 'none';
    element.classList.remove('splashing', 'splashing-car');
    element.style.transform = `translate(-50%, -50%) scale(${baseScale})`;
    element.style.opacity = '0';
}

async function playAnimationSequence() {
    if (isAnimating) return;
    isAnimating = true;
    startBtn.disabled = true;
    startBtn.innerText = "ANIMATION RUNNING...";

    // PHASE 1: Reset
    deckMid.className = 'deck';
    deb1.className = 'debris'; deb2.className = 'debris'; deb3.className = 'debris';
    cracks.style.transition = 'none'; cracks.style.opacity = '0';
    midCables.forEach(c => { c.style.transition = 'none'; c.style.opacity = '1'; });
    
    resetSplash(splashMain, 0.2);
    resetSplash(splashCar2, 0.2);
    resetSplash(splashCar3, 0.2);

    car2.classList.remove('car2-falling');
    car3.classList.remove('car3-falling');

    car1.style.transition = 'none'; car1.style.transform = 'translateX(0)'; 
    car2.style.transition = 'none'; car2.style.transform = 'translateX(0)'; 
    car3.style.transition = 'none'; car3.style.transform = 'translateX(0)'; 

    await sleep(800);

    // PHASE 2: Cars Drive
    car1.style.transition = 'transform 4.5s linear';
    car1.style.transform = 'translateX(1100px)'; 
    
    await sleep(1500);

    car2.style.transition = 'transform 2.5s ease-out';
    car2.style.transform = 'translateX(600px)'; 
    
    car3.style.transition = 'transform 2.8s ease-out';
    car3.style.transform = 'translateX(450px)'; 

    await sleep(2500); 

    // PHASE 3: Cracks & Snapping
    cracks.style.transition = 'opacity 0.2s ease-in';
    cracks.style.opacity = '1';

    midCables.forEach(c => {
        c.style.transition = 'opacity 0.2s ease-out';
        c.style.opacity = '0'; 
    });

    await sleep(600);

    // PHASE 4: Collapse
    deckMid.classList.add('falling');
    deb1.classList.add('falling-deb1');
    deb2.classList.add('falling-deb2');
    deb3.classList.add('falling-deb3');
    
    car2.classList.add('car2-falling');
    car3.classList.add('car3-falling');

    await sleep(450);

    // PHASE 5: Splash
    splashMain.style.opacity = '1';
    splashCar2.style.opacity = '0.9';
    splashCar3.style.opacity = '0.9';
    
    void splashMain.offsetWidth; void splashCar2.offsetWidth; void splashCar3.offsetWidth;
    
    splashMain.classList.add('splashing');
    splashCar2.classList.add('splashing-car');
    splashCar3.classList.add('splashing-car');

    await sleep(2500); 

    // PHASE 6: Rewind
    deckMid.classList.remove('falling');
    deckMid.classList.add('rewinding');
    
    deb1.classList.remove('falling-deb1'); deb2.classList.remove('falling-deb2'); deb3.classList.remove('falling-deb3');
    car2.classList.remove('car2-falling'); car3.classList.remove('car3-falling');
    
    deb1.style.opacity = '0'; deb2.style.opacity = '0'; deb3.style.opacity = '0';
    cracks.style.transition = 'opacity 1s ease-in-out';
    cracks.style.opacity = '0';

    midCables.forEach(c => {
        c.style.transition = 'opacity 1.5s ease-in-out';
        c.style.opacity = '1'; 
    });

    car1.style.transition = 'transform 1.5s ease-in-out'; car1.style.transform = 'translateX(0)';
    car2.style.transition = 'transform 1.5s ease-in-out'; car2.style.transform = 'translateX(0)';
    car3.style.transition = 'transform 1.5s ease-in-out'; car3.style.transform = 'translateX(0)';

    await sleep(1500); 
    deckMid.classList.remove('rewinding');

    isAnimating = false;
    startBtn.disabled = false;
    startBtn.innerText = "▶ INITIATE COLLAPSE";
}

startBtn.addEventListener('click', playAnimationSequence);