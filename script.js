// Page 1: yes/no behavior (only runs if elements exist)
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
const reveal = document.getElementById("reveal");
const nextLink = document.getElementById("nextLink");

// Page 4: movie chips
const pickedMovie = document.getElementById("pickedMovie");
const chips = document.querySelectorAll(".chip");

let noCount = 0;

if (yesBtn && noBtn && hint && reveal && nextLink) {
  yesBtn.addEventListener("click", () => {
    reveal.classList.remove("hidden");
    hint.textContent = "Yay 💖 okay… next page 😌";
    popConfetti();

    // Enable "Next" button after YES
    nextLink.classList.remove("hidden");
    nextLink.focus();
    reveal.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  noBtn.addEventListener("click", () => {
    noCount++;
    const lines = [
      "No? are you sure 🙈",
      "That button is being dramatic 😅",
      "I brought snacks + movies though 🥺",
      "Plot twist: you meant YES 😇",
      "Okay okay I’ll ask again… YES? 💗"
    ];
    hint.textContent = lines[Math.min(noCount - 1, lines.length - 1)];

    // playful runaway
    const x = (Math.random() * 180) - 90;
    const y = (Math.random() * 120) - 60;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Movie selection (Page 4)
if (chips && pickedMovie) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      pickedMovie.textContent = chip.dataset.movie;
    });
  });
}

// Confetti (simple)
const canvas = document.getElementById("confetti");
let ctx = null;
let confettiPieces = [];

if (canvas) {
  ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();
}

function popConfetti() {
  if (!ctx || !canvas) return;

  confettiPieces = [];
  const colors = ["#ff4fa3", "#ff86c6", "#ffd1e6", "#ffffff", "#ffb3d7"];

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
  if (confettiPieces.length > 0) requestAnimationFrame(tick);
}
