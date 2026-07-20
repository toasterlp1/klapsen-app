
const ParticleSystem = (() => {
  let canvas, ctx, particles = [], animId, enabled = true;
  const config = {
    count: 42,
    speed: 0.18,
    maxSize: 2,
    connectionDist: 130,
    color: '#818cf8'
  };

  function init() {
    canvas = document.getElementById('particles');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    spawnAll();
    loop();
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * config.speed * 2,
      vy: (Math.random() - 0.5) * config.speed * 2,
      size: Math.random() * config.maxSize + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2
    };
  }

  function spawnAll() {
    particles = [];
    for (let i = 0; i < config.count; i++) particles.push(randomParticle());
  }

  function loop() {
    if (!ctx) return;
    if (!enabled) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.pulse += 0.015;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(config.color, p.opacity * pulse * 0.7);
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.connectionDist) {
          const lineOp = (1 - dist / config.connectionDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = hexToRgba(config.color, lineOp);
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    });
    animId = requestAnimationFrame(loop);
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function setColor(hex) { if (hex) config.color = hex; }
  function setEnabled(val) {
    enabled = val;
    if (!enabled && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (enabled) loop();
  }

  return { init, setColor, setEnabled };
})();

document.addEventListener('DOMContentLoaded', () => ParticleSystem.init());
