
(function () {

  const KEY = 'ka_cam_' + location.pathname;

  let stream = null;
  let box = null;
  let video = null;

  const css = document.createElement('style');
  css.textContent = `
  #ka-cam-btn{
    position:fixed;right:14px;bottom:14px;z-index:2147483000;
    display:flex;align-items:center;gap:7px;
    background:rgba(17,26,48,.9);border:1px solid #2a3550;
    color:#c7d0e4;font-family:Inter,system-ui,sans-serif;
    font-size:11px;font-weight:700;letter-spacing:.6px;
    padding:8px 12px;border-radius:9px;cursor:pointer;
    backdrop-filter:blur(6px);
    transition:opacity .25s, background .2s, border-color .2s;
    opacity:.28;
  }
  #ka-cam-btn:hover{opacity:1;border-color:#4a5878;background:rgba(24,35,60,.95);}
  #ka-cam-btn.on{opacity:1;border-color:#2fd07a;color:#2fd07a;}
  #ka-cam-btn svg{width:14px;height:14px;display:block;}

  #ka-cam{
    position:fixed;z-index:2147482000;
    width:320px;aspect-ratio:4/3;
    border-radius:14px;overflow:hidden;
    background:#05070d;
    border:2px solid rgba(255,255,255,.16);
    box-shadow:0 12px 40px rgba(0,0,0,.65);
    cursor:grab;
    display:none;
  }
  #ka-cam.dragging{cursor:grabbing;}
  #ka-cam video{
    width:100%;height:100%;object-fit:cover;display:block;
    transform:scaleX(-1);           /* Spiegeln, wie man es gewohnt ist */
    pointer-events:none;
  }
  #ka-cam.unmirrored video{transform:none;}

  /* Griff zum Skalieren, unten rechts */
  #ka-cam .ka-grip{
    position:absolute;right:0;bottom:0;width:20px;height:20px;
    cursor:nwse-resize;
    background:linear-gradient(135deg, transparent 48%, rgba(255,255,255,.55) 50%, transparent 52%),
               linear-gradient(135deg, transparent 62%, rgba(255,255,255,.55) 64%, transparent 66%);
  }
  /* Leiste oben, erscheint beim Hovern */
  #ka-cam .ka-bar{
    position:absolute;left:0;right:0;top:0;height:26px;
    display:flex;align-items:center;justify-content:flex-end;gap:4px;padding:0 5px;
    background:linear-gradient(180deg, rgba(0,0,0,.65), transparent);
    opacity:0;transition:opacity .2s;
  }
  #ka-cam:hover .ka-bar{opacity:1;}
  #ka-cam .ka-bar button{
    background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.2);
    color:#fff;font-size:10px;font-weight:700;font-family:Inter,sans-serif;
    padding:3px 7px;border-radius:5px;cursor:pointer;
  }
  #ka-cam .ka-bar button:hover{background:rgba(255,255,255,.2);}

  #ka-cam .ka-err{
    position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    text-align:center;padding:14px;color:#ff8fa3;
    font-family:Inter,sans-serif;font-size:12px;line-height:1.5;
  }
  `;
  (document.head || document.documentElement).appendChild(css);

  function baueBox(){
    box = document.createElement('div');
    box.id = 'ka-cam';
    box.innerHTML = `
      <div class="ka-bar">
        <button data-a="mirror">Spiegeln</button>
        <button data-a="off">Aus</button>
      </div>
      <div class="ka-grip"></div>`;
    document.body.appendChild(box);

    video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    box.insertBefore(video, box.firstChild);

    const g = ladePos();
    box.style.left  = g.x + 'px';
    box.style.top   = g.y + 'px';
    box.style.width = g.w + 'px';
    if(g.unmirrored) box.classList.add('unmirrored');

    box.querySelector('[data-a="off"]').onclick = e => { e.stopPropagation(); aus(); };
    box.querySelector('[data-a="mirror"]').onclick = e => {
      e.stopPropagation();
      box.classList.toggle('unmirrored');
      merkePos();
    };

    ziehbar();
    skalierbar();
  }

  function ladePos(){
    try{
      const g = JSON.parse(localStorage.getItem(KEY));
      if(g && typeof g.x === 'number') return g;
    }catch(e){}
    return { x: 24, y: 24, w: 320, unmirrored: false };
  }
  function merkePos(){
    if(!box) return;
    localStorage.setItem(KEY, JSON.stringify({
      x: parseInt(box.style.left) || 24,
      y: parseInt(box.style.top) || 24,
      w: parseInt(box.style.width) || 320,
      unmirrored: box.classList.contains('unmirrored')
    }));
  }

  function ziehbar(){
    let start = null;
    box.addEventListener('mousedown', e => {
      if(e.target.closest('.ka-grip') || e.target.closest('.ka-bar')) return;
      start = {
        mx: e.clientX, my: e.clientY,
        x: parseInt(box.style.left) || 0,
        y: parseInt(box.style.top) || 0
      };
      box.classList.add('dragging');
      e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
      if(!start) return;
      const nx = start.x + (e.clientX - start.mx);
      const ny = start.y + (e.clientY - start.my);
      box.style.left = Math.max(0, Math.min(window.innerWidth  - box.offsetWidth,  nx)) + 'px';
      box.style.top  = Math.max(0, Math.min(window.innerHeight - box.offsetHeight, ny)) + 'px';
    });
    window.addEventListener('mouseup', () => {
      if(!start) return;
      start = null;
      box.classList.remove('dragging');
      merkePos();
    });
  }

  function skalierbar(){
    const grip = box.querySelector('.ka-grip');
    let start = null;
    grip.addEventListener('mousedown', e => {
      start = { mx: e.clientX, w: box.offsetWidth };
      e.stopPropagation();
      e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
      if(!start) return;
      const nw = Math.max(160, Math.min(760, start.w + (e.clientX - start.mx)));
      box.style.width = nw + 'px';
    });
    window.addEventListener('mouseup', () => {
      if(!start) return;
      start = null;
      merkePos();
    });
  }

  async function an(){
    if(!box) baueBox();
    try{
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      video.srcObject = stream;
      box.style.display = 'block';
      btn.classList.add('on');
      btn.querySelector('span').textContent = 'CAM AN';
    }catch(err){
      if(!box) baueBox();
      box.style.display = 'block';
      const e = document.createElement('div');
      e.className = 'ka-err';
      e.textContent = 'Keine Kamera gefunden. Läuft DroidCam? Und im Browser den Zugriff erlaubt?';
      box.appendChild(e);
      console.warn('Cam:', err);
    }
  }

  function aus(){
    if(stream){
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    if(box) box.style.display = 'none';
    btn.classList.remove('on');
    btn.querySelector('span').textContent = 'CAM';
  }

  const btn = document.createElement('button');
  btn.id = 'ka-cam-btn';
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3.5l6 4.5V6l-6 4.5Z"/>
    </svg><span>CAM</span>`;
  btn.onclick = () => stream ? aus() : an();
  document.body.appendChild(btn);

  window.addEventListener('keydown', e => {
    if(e.key === 'c' || e.key === 'C'){
      const t = e.target.tagName;
      if(t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      stream ? aus() : an();
    }
  });

})();
