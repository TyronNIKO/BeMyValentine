const envelope = document.querySelector(".envelope");
const askingCard = document.querySelector(".asking-card");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const isMobile = window.matchMedia("(pointer: coarse)").matches;

/* Кнопка НІ */
yesBtn.addEventListener("click", () => {
    startLove();
});
const btnSize = 80; // розмір кнопки
const attempts = 100; // щоб не зациклитися
let shrinkFactor = 1;
noBtn.addEventListener("click", () => {
    noBtn.style.position = "absolute";

    shrinkFactor -= 0.2; // кожен раз трохи зменшуємо
    for (let i = 0; i < attempts; i++) {
        const maxX = askingCard.clientWidth - btnSize;
        const maxY = askingCard.clientHeight - btnSize;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        const dx = randomX - noBtn.offsetLeft;
        const dy = randomY - noBtn.offsetTop;

        if (Math.hypot(dx, dy) >= 2 * btnSize) {
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            // noBtn.style.transform = `scale("${shrinkFactor}")`;
            noBtn.style.transform = `scale(${shrinkFactor})`;
            break; // вийшли з циклу, координати підібрано
        }
    }
});

envelope.addEventListener("click", e => {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    askingCard.style.transform = "translate(0%, -100%)";
    askingCard.style.transitionDelay = "0.5s";

    // не даємо кліку піти в document
    e.stopPropagation();
});
document.addEventListener("click", e => {
    // якщо клік не всередині envelope
    if (!envelope.contains(e.target)) {
        envelope.classList.remove("open");
        askingCard.style.transform = "translate(0%, 0%)";
        askingCard.style.transitionDelay = "0s";
    }
});
/* Старт анімації */
function startLove() {
    envelope.classList.add("hide"); // shrink + fade

    setTimeout(() => {
        document.querySelector(".final-message").style.opacity = "1";
        explodeConfetti();
    }, 500);
}

/* Вибух конфеті з центру */
function explodeConfetti() {
    const container = document.querySelector(".confetti-container");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 200; i++) {
        const particle = document.createElement("div");
        particle.classList.add("confetti");

        const isHeart = Math.random() > 0.7;

        if (isHeart) {
            particle.innerHTML = "❤️";
            particle.style.fontSize = "16px";
        } else {
            particle.style.background = Math.random() > 0.5 ? "#fff" : "#ff4b7d";
        }

        particle.style.left = centerX + "px";
        particle.style.top = centerY + "px";

        container.appendChild(particle);

        animateParticle(particle, centerX, centerY);
    }
}

/* Фізика руху конфеті */
function animateParticle(el, startX, startY) {
    let x = startX;
    let y = startY;

    const angle = Math.random() * 2 * Math.PI;
    let velocity = Math.random() * 15 + 5;

    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;

    const gravity = 0.4;

    function update() {
        vx *= 0.98; // тертя
        vy += gravity; // гравітація

        x += vx;
        y += vy;

        el.style.left = x + "px";
        el.style.top = y + "px";

        if (y < window.innerHeight + 50) {
            requestAnimationFrame(update);
        } else {
            el.remove();
        }
    }

    update();
}
// Генерація сердечок
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);
