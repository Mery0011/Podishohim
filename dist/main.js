"use strict";
const openButton = document.querySelector("#openButton");
const pages = document.querySelectorAll(".page");
const nextButtons = document.querySelectorAll(".next-button");
const card = document.querySelector(".birthday-card");
let currentPage = 1;
/* ========================================
   🎵 MUSIC
======================================== */
const music = new Audio("./public/song.mp3");
music.loop = true;
music.volume = 0.35;
let isMusicPlaying = false;
/* ========================================
   🎵 MUSIC BUTTON
======================================== */
const musicButton = document.createElement("button");
musicButton.className = "music-button";
musicButton.innerHTML = "🎵";
musicButton.title = "Musiqani yoqish / o‘chirish";
document.body.appendChild(musicButton);
/* ========================================
   🎵 PLAY MUSIC
======================================== */
function playMusic() {
    music
        .play()
        .then(() => {
        isMusicPlaying = true;
        musicButton.innerHTML = "🔊";
        musicButton.classList.add("playing");
    })
        .catch(() => {
        console.log("Music could not be played.");
    });
}
/* ========================================
   🎵 PAUSE MUSIC
======================================== */
function pauseMusic() {
    music.pause();
    isMusicPlaying = false;
    musicButton.innerHTML = "🎵";
    musicButton.classList.remove("playing");
}
/* ========================================
   🎵 FADE OUT MUSIC
======================================== */
function fadeOutMusic(duration = 10000) {
    if (!isMusicPlaying)
        return;
    const startVolume = music.volume;
    const startTime = Date.now();
    const fade = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        music.volume =
            startVolume * (1 - progress);
        if (progress >= 1) {
            clearInterval(fade);
            music.pause();
            music.currentTime = 0;
            music.volume = 0.35;
            isMusicPlaying = false;
            musicButton.innerHTML = "🎵";
            musicButton.classList.remove("playing");
        }
    }, 100);
}
/* ========================================
   🎵 MUSIC BUTTON CLICK
======================================== */
musicButton.addEventListener("click", () => {
    if (isMusicPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});
/* ========================================
   PAGE CHANGE
======================================== */
function showPage(pageNumber) {
    pages.forEach((page) => {
        page.classList.remove("active");
    });
    const nextPage = document.querySelector(`#page-${pageNumber}`);
    if (!nextPage)
        return;
    nextPage.classList.add("active");
    currentPage = pageNumber;
    /* ====================================
       EFFECTS
    ==================================== */
    createHearts();
    createSparkles(pageNumber);
    /* ====================================
       🎉 CONFETTI
    ==================================== */
    if (pageNumber === 2) {
        createConfetti();
    }
    /* ====================================
       👑 FINAL PAGE
    ==================================== */
    if (pageNumber === 9) {
        createFinalSparkles();
        /*
           Final page ochilgandan keyin
           2 soniya musiqa davom etadi.

           Keyin 10 soniya davomida
           musiqa asta-sekin pasayadi.
        */
        setTimeout(() => {
            fadeOutMusic(10000);
        }, 2000);
        /*
           Final page ochilgandan 20 soniya o'tib
           yana 1-page ga qaytadi.
        */
        setTimeout(() => {
            showPage(1);
            /*
               Musiqani boshidan boshlaymiz.
            */
            music.currentTime = 0;
            music.volume = 0.35;
            playMusic();
        }, 20000);
    }
}
/* ========================================
   🎁 OPEN GIFT
======================================== */
openButton?.addEventListener("click", () => {
    /*
       Gift ochilganda musiqa boshlanadi.
    */
    if (!isMusicPlaying) {
        playMusic();
    }
    /*
       Page 2 ga o'tish.
    */
    showPage(2);
});
/* ========================================
   NEXT BUTTONS
======================================== */
nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const nextPage = button.dataset.next;
        if (!nextPage)
            return;
        const pageNumber = Number(nextPage);
        if (pageNumber >= 2 &&
            pageNumber <= 9) {
            showPage(pageNumber);
        }
    });
});
/* ========================================
   ❤️ FLOATING HEARTS
======================================== */
function createHearts() {
    if (!card)
        return;
    const heartCount = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement("span");
        heart.className =
            "floating-heart";
        const heartSymbols = [
            "♥",
            "♡",
            "❤"
        ];
        heart.textContent =
            heartSymbols[Math.floor(Math.random() *
                heartSymbols.length)];
        heart.style.setProperty("--x", `${Math.random() * 200 - 100}px`);
        heart.style.setProperty("--delay", `${Math.random() * 1.2}s`);
        heart.style.left =
            `${15 + Math.random() * 70}%`;
        const size = 12 + Math.random() * 14;
        heart.style.fontSize =
            `${size}px`;
        card.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 4500);
    }
}
/* ========================================
   ✨ SPARKLES
======================================== */
function createSparkles(pageNumber) {
    if (!card)
        return;
    const sparkleCounts = {
        2: 14,
        3: 18,
        4: 20,
        5: 22,
        6: 24,
        7: 26,
        8: 28,
        9: 18,
    };
    const sparkleCount = sparkleCounts[pageNumber] ?? 18;
    const sparkleSymbols = [
        "✦",
        "✧",
        "⋆",
        "✦",
        "·"
    ];
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("span");
        sparkle.className =
            "sparkle";
        sparkle.textContent =
            sparkleSymbols[Math.floor(Math.random() *
                sparkleSymbols.length)];
        sparkle.style.left =
            `${5 + Math.random() * 90}%`;
        sparkle.style.top =
            `${5 + Math.random() * 90}%`;
        sparkle.style.setProperty("--delay", `${Math.random() * 2}s`);
        const size = 8 + Math.random() * 15;
        sparkle.style.fontSize =
            `${size}px`;
        sparkle.style.opacity =
            `${0.35 + Math.random() * 0.65}`;
        card.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }
}
/* ========================================
   👑 FINAL PAGE SPARKLES
======================================== */
function createFinalSparkles() {
    if (!card)
        return;
    for (let i = 0; i < 35; i++) {
        const sparkle = document.createElement("span");
        sparkle.className =
            "sparkle final-sparkle";
        sparkle.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✧";
        sparkle.style.left =
            `${Math.random() * 100}%`;
        sparkle.style.top =
            `${Math.random() * 100}%`;
        sparkle.style.setProperty("--delay", `${Math.random() * 2.5}s`);
        const size = 8 + Math.random() * 18;
        sparkle.style.fontSize =
            `${size}px`;
        card.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 5000);
    }
}
/* ========================================
   🎉 CONFETTI
======================================== */
function createConfetti() {
    const symbols = [
        "✦",
        "•",
        "♥",
        "✧"
    ];
    for (let i = 0; i < 28; i++) {
        const confetti = document.createElement("span");
        confetti.className =
            "confetti";
        confetti.textContent =
            symbols[Math.floor(Math.random() *
                symbols.length)];
        confetti.style.left =
            `${Math.random() * 100}%`;
        confetti.style.setProperty("--delay", `${Math.random() * 0.8}s`);
        confetti.style.setProperty("--duration", `${2.5 + Math.random() * 2}s`);
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}
