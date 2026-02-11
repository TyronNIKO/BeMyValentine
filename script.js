const noBtn = document.getElementById("noBtn");
const isMobile = window.matchMedia("(pointer: coarse)").matches;

// ПК — кнопка тікає
if (!isMobile) {
    noBtn.addEventListener("mouseover", () => {
        const maxX = 250;
        const maxY = 40;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
    });
}
// Мобільна — стає "Так"
else {
    noBtn.addEventListener("click", () => {
        noBtn.textContent = "Так 💘";
        noBtn.classList.remove("no");
        noBtn.classList.add("yes");
        noBtn.onclick = sayYes;
    });
}

function sayYes() {
    document.getElementById("loveMessage").style.display = "block";
    document.querySelector(".buttons").style.display = "none";
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
