
const Backgrounds = (() => {

  const moods = ['rainy', 'aurora', 'starfield', 'grid'];

  let canvas, ctx, current = 'aurora', animId = null, w = 0, h = 0;
  let raindrops = [], stars = [], flash = 0, t = 0;

  function ensureCanvas() {
    canvas = document.getElementById('bg-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'bg-canvas';
      canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
      document.body.prepend(canvas);
    }
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    if (current === 'starfield') initStars();
    if (current === 'rainy') initRain();
  }

  function initRain() {
    raindrops = [];
    const count = Math.floor(w / 4);
    for (let i = 0; i < count; i++) {
      raindrops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        len: Math.random() * 14 + 8,
        speed: Math.random() * 6 + 8,
        opacity: Math.random() * 0.35 + 0.15
      });
    }
  }
  function drawRainy() {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0a0f1e');
    g.addColorStop(1, '#050810');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    if (Math.random() < 0.004) flash = 1;
    if (flash > 0) {
      ctx.fillStyle = 'rgba(150,180,255,' + (flash * 0.35) + ')';
      ctx.fillRect(0, 0, w, h);
      flash -= 0.04;
      if (flash < 0) flash = 0;
    }

    ctx.strokeStyle = 'rgba(140,170,220,0.5)';
    ctx.lineWidth = 1.1;
    raindrops.forEach(d => {
      ctx.globalAlpha = d.opacity;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 1.5, d.y + d.len);
      ctx.stroke();
      d.y += d.speed;
      d.x -= 0.4;
      if (d.y > h) { d.y = -d.len; d.x = Math.random() * w; }
    });
    ctx.globalAlpha = 1;
  }

  function drawAurora() {
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, '#0e0e1a');
    base.addColorStop(1, '#0a0a16');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    const blobs = [
      { hue: '#4338ca', x: 0.2 + Math.sin(t * 0.0003) * 0.05, y: 0.25 },
      { hue: '#7c3aed', x: 0.8 + Math.cos(t * 0.00025) * 0.05, y: 0.35 },
      { hue: '#1e3a8a', x: 0.5, y: 0.9 + Math.sin(t * 0.0002) * 0.04 }
    ];
    ctx.globalCompositeOperation = 'lighter';
    blobs.forEach(b => {
      const r = Math.min(w, h) * 0.55;
      const grad = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, r);
      grad.addColorStop(0, hexA(b.hue, 0.30));
      grad.addColorStop(1, hexA(b.hue, 0));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    });
    ctx.globalCompositeOperation = 'source-over';
  }

  function initStars() {
    stars = [];
    const count = Math.floor((w * h) / 6000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        tw: Math.random() * Math.PI * 2
      });
    }
  }
  function drawStarfield() {
    ctx.fillStyle = '#05060d';
    ctx.fillRect(0, 0, w, h);
    stars.forEach(s => {
      s.x -= s.z * 0.35;
      if (s.x < 0) { s.x = w; s.y = Math.random() * h; }
      s.tw += 0.03;
      const tw = Math.sin(s.tw) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.z * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,210,255,' + (s.z * tw) + ')';
      ctx.fill();
    });
  }

  function drawGrid() {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0a0316');
    g.addColorStop(0.6, '#12042a');
    g.addColorStop(1, '#1a0838');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const horizon = h * 0.42;
    const glow = ctx.createLinearGradient(0, horizon - 80, 0, horizon + 40);
    glow.addColorStop(0, 'rgba(244,114,182,0)');
    glow.addColorStop(0.7, 'rgba(244,114,182,0.15)');
    glow.addColorStop(1, 'rgba(129,140,248,0.05)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, horizon - 80, w, 120);

    ctx.strokeStyle = 'rgba(129,140,248,0.35)';
    ctx.lineWidth = 1;

    const move = (t * 0.02) % 1;
    for (let i = 0; i < 18; i++) {
      const p = (i + move) / 18;
      const y = horizon + Math.pow(p, 2) * (h - horizon);
      ctx.globalAlpha = Math.min(1, p * 1.5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.3;
    const cx = w / 2;
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 40, horizon);
      ctx.lineTo(cx + i * (w / 6), h);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function frame() {
    t += 16;
    switch (current) {
      case 'rainy': drawRainy(); break;
      case 'starfield': drawStarfield(); break;
      case 'grid': drawGrid(); break;
      default: drawAurora();
    }
    animId = requestAnimationFrame(frame);
  }

  function hexA(hex, a) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function apply(name) {
    if (!canvas) ensureCanvas();
    current = moods.includes(name) ? name : 'aurora';
    document.body.setAttribute('data-bg', current);
    if (current === 'starfield') initStars();
    if (current === 'rainy') initRain();
    if (!animId) frame();
  }

  function clear() { apply('aurora'); }

  return { apply, clear, moods };
})();
