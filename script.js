const cat = document.getElementById("cat");
const bubble = document.getElementById("bubble");

// ---- speech bubble ----
const phrases = ["meow!", "mrrp!", "feed me", "hi hi"];
let bubbleTimer;

function say(text) {
  bubble.textContent = text;
  bubble.classList.add("show");
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 1500);
}

// ---- click to meow ----
cat.addEventListener("click", () => {
  cat.classList.add("meow");
  say(phrases[Math.floor(Math.random() * phrases.length)]);
  setTimeout(() => cat.classList.remove("meow"), 600);
});

// ---- petting ----
let petAmount = 0;
let lastHeart = 0;
let happyTimer;

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "♥";
  heart.style.left = 50 + (Math.random() * 30 - 15) + "%";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

cat.addEventListener("mousemove", (e) => {
  petAmount += Math.abs(e.movementX) + Math.abs(e.movementY);
  if (petAmount < 120) return;

  cat.classList.add("happy");
  clearTimeout(happyTimer);
  happyTimer = setTimeout(() => cat.classList.remove("happy"), 800);

  const now = Date.now();
  if (now - lastHeart > 300) {
    spawnHeart();
    lastHeart = now;
  }
});

cat.addEventListener("mouseleave", () => {
  petAmount = 0;
});