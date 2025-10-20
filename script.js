document.getElementById('birthdayForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const dob = document.getElementById('dob').value;
  const wish = document.getElementById('wish').value.trim();
  const photo = document.getElementById('photo').files[0];

  const greeting = `🎈 Happy Birthday, ${name}! 🎈`;
  const dobDisplay = `🎂 Date of Birth: ${new Date(dob).toDateString()}`;
  const wishMessage = wish
    ? `💌 ${wish}`
    : "🎁 Wishing you joy, love, and laughter on your special day!";

  document.getElementById('greeting').textContent = greeting;
  document.getElementById('dobDisplay').textContent = dobDisplay;
  document.getElementById('wishMessage').textContent = wishMessage;

  if (photo) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById('userPhoto').src = event.target.result;
    };
    reader.readAsDataURL(photo);
  }

  document.getElementById('result').classList.remove('hidden');
  launchConfetti();
});

// 🎉 Confetti Animation
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = ['#ff4081', '#ffd700', '#00e676', '#29b6f6', '#f06292'];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 1,
      drift: Math.random() * 2 - 1
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.y += c.speed;
      c.x += c.drift;

      if (c.y > canvas.height) c.y = -10;
    });
    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();
}
