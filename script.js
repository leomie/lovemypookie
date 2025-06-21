const quotes = [
  "You are all I can think of no matter what I do.",
  "You are worthy of all the love and happiness in the world.",
  "If the world refuses to see your worth, I will always remind you.",
  "I will always be the shoulder you can lean on.",
  "Let's share our dreams and make them a reality together.",
  "Our past may not have been perfect, but our future can be beautiful.",
  "You are the reason I believe in love once again.",
  "Your imperfections are what make you perfect to me.",
];

const quoteBox = document.getElementById("quoteBox");
let quoteTimeout;
let isQuoteVisible = false;

function showQuote() {
  // Clear any previous timeout and show new quote
  clearTimeout(quoteTimeout);
  quoteBox.classList.remove("fade-out");
  quoteBox.classList.add("active");

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = quote;
  isQuoteVisible = true;

  const hide = () => {
    quoteBox.classList.add("fade-out");
    quoteBox.classList.remove("active");
    document.removeEventListener("click", hide);
    quoteTimeout = null;
    setTimeout(() => {
      isQuoteVisible = false;
    }, 1000);
  };

  document.removeEventListener("click", hide); // Avoid stacking listeners
  document.addEventListener("click", hide);
  quoteTimeout = setTimeout(hide, 7000);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  document.body.appendChild(heart);

  const startX = window.innerWidth / 2 + Math.random() * 100 - 50;
  const startY = window.innerHeight / 2 - 90;

  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;

  const duration = (Math.random() * 5 + 4) * 1.25;
  const offsetX = Math.random() * 100 - 50;

  heart.animate([
    { transform: `translate(0, 0)`, opacity: 1 },
    { transform: `translate(${offsetX}px, ${window.innerHeight}px)`, opacity: 0 }
  ], {
    duration: duration * 1000,
    easing: "ease-in",
    fill: "forwards"
  });

  heart.addEventListener("click", (e) => {
    e.stopPropagation();
    showQuote();
  });

  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 300);

let heartClickCount = 0;
const mainHeart = document.getElementById("mainHeart");
const envelope = document.getElementById("envelope");
const letterText = document.getElementById("letterText");
const closeLetterBtn = document.getElementById("closeLetterBtn");

let hasOpenedLetter = false;

mainHeart.addEventListener("click", () => {
  heartClickCount++;
  if (heartClickCount === 3) {
    const mainHeartRect = mainHeart.getBoundingClientRect();
    envelope.style.left = `${mainHeartRect.left + mainHeartRect.width / 2 - envelope.offsetWidth / 2}px`;
    envelope.style.top = `${mainHeartRect.top - envelope.offsetHeight - 60}px`;
    envelope.classList.add("visible");

    const heartSticker = document.createElement("div");
    heartSticker.classList.add("heart-sticker");
    envelope.appendChild(heartSticker);
  }
});

envelope.addEventListener("click", () => {
  if (!envelope.classList.contains("open")) {
    envelope.classList.add("open");

    if (!hasOpenedLetter) {
      hasOpenedLetter = true;
      setTimeout(() => {
        letterText.classList.add("visible");
      }, 2000);
    } else {
      letterText.classList.add("visible");
    }
  } else {
    if (!letterText.classList.contains("visible")) {
      letterText.classList.add("visible");
    }
  }
});

closeLetterBtn.addEventListener("click", () => {
  letterText.classList.remove("visible");
});
