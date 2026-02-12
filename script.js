const noBtn = document.getElementById("noBtn");
const isMobile = window.matchMedia("(pointer: coarse)").matches;

/* Кнопка НІ */
if (!isMobile) {
    noBtn.addEventListener("mouseover", () => {
        noBtn.style.left = Math.random() * 250 + "px";
        noBtn.style.top = Math.random() * 40 + "px";
    });
} else {
    noBtn.addEventListener("click", () => {
        noBtn.textContent = "Так 💘";
        noBtn.onclick = startLove;
    });
}

/* Старт анімації */
function startLove() {
    const container = document.getElementById("splitContainer");
    const finalScene = document.getElementById("finalScene");

    container.classList.add("slide"); // жалюзі і контент

    setTimeout(() => {
        finalScene.style.opacity = "1";
        explodeConfetti();
    }, 900);
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
