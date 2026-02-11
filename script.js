const noBtn = document.getElementById("noBtn");
const isMobile = window.matchMedia("(pointer: coarse)").matches;

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

function startLove() {
    const container = document.getElementById("splitContainer");
    const finalScene = document.getElementById("finalScene");

    container.classList.add("split");

    setTimeout(() => {
        finalScene.style.opacity = "1";
        launchConfetti();
    }, 1000);
}

/* Конфеті + сердечка */
function launchConfetti() {
    const container = document.querySelector(".confetti-container");

    for (let i = 0; i < 120; i++) {
        const conf = document.createElement("div");
        conf.classList.add("confetti");

        conf.style.left = Math.random() * 100 + "vw";
        conf.style.background = Math.random() > 0.5 ? "#fff" : "#ff4b7d";
        conf.style.top = "-10px";

        if (Math.random() > 0.7) {
            conf.innerHTML = "❤️";
            conf.style.fontSize = "18px";
            conf.style.background = "transparent";
        }

        container.appendChild(conf);

        setTimeout(() => conf.remove(), 2000);
    }
}
