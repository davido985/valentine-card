const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
const reveal = document.getElementById("reveal");
const pickedMovie = document.getElementById("pickedMovie");
const chips = document.querySelectorAll(".chip");

let noCount = 0;

yesBtn.addEventListener("click", () => {
  reveal.classList.remove("hidden");
  hint.textContent = "Best decision ever 😌💖";
  popConfetti();
  // Gentle scroll so she sees the plan
  reveal.scrollIntoView({ behavior: "smooth", block: "center" });
});

noBtn.addEventListener("click", () => {
  noCount++;
  const lines = [
    "No? are you sure 🙈",
    "That button is looking suspicious… 😅",
    "Okay okay… but what if I ask nicely? 🥺",
    "I cooked AND planned movies though 😭",
    "Plot twist: you meant YES 😇"
  ];
  hint.textContent = lines[Math.min(noCount - 1, lines.length - 1)];

  // Make the NO button run away a bit (cute, not annoying)
  const x = (Math.random() * 180) - 90;
  const y = (Math.random() * 120) - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Movie selection
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    pickedMovie.textContent = chip.dataset.movie;
  });
});

// Confetti (tiny, lightweight)
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function popConfetti() {
  confettiPieces = [];
  const colors = ["#ff4da6", "#7c5cff", "#32d296", "#ffd166", "#f6f4ff"];

  for (let i = 0; i < 160; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      size: 4 + Math.random() * 6,
      speedY: 2 + Math.random() * 4,
      speedX: -2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      rotSpeed: -0.12 + Math.random() * 0.24,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 240 + Math.random() * 80
    });
  }
  requestAnimationFrame(tick);
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rot += p.rotSpeed;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(p => p.life > 0 && p.y < canvas.height + 40);

  if (confettiPieces.length > 0) {
    requestAnimationFrame(tick);
  }
}

