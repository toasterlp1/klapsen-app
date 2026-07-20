(function () {
  function an() {
    try { return localStorage.getItem('ka_sound') !== 'aus'; } catch (e) { return true; }
  }
  function setzen(wert) {
    try { localStorage.setItem('ka_sound', wert ? 'an' : 'aus'); } catch (e) {}
  }

  var css = document.createElement('style');
  css.textContent =
    '#ka-sound-toggle{position:fixed;right:16px;bottom:16px;z-index:99998;' +
    'display:flex;align-items:center;gap:9px;padding:9px 14px;border-radius:12px;' +
    'background:rgba(17,26,48,.92);border:1px solid #2a3a5f;color:#eef1f8;cursor:pointer;' +
    'font-family:Inter,system-ui,sans-serif;font-size:13px;font-weight:700;' +
    'box-shadow:0 8px 24px -12px rgba(0,0,0,.7);transition:border-color .2s,transform .12s;user-select:none;}' +
    '#ka-sound-toggle:hover{border-color:#ff4d4d;}' +
    '#ka-sound-toggle:active{transform:scale(.96);}' +
    '#ka-sound-toggle .ic{width:18px;height:18px;flex-shrink:0;}' +
    '#ka-sound-toggle.aus{color:#8792ab;}' +
    '#ka-sound-toggle.aus .ic{opacity:.6;}';
  document.head.appendChild(css);

  var ICON_AN = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  var ICON_AUS = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';

  var btn = document.createElement('div');
  btn.id = 'ka-sound-toggle';

  function zeichne() {
    var aktiv = an();
    btn.className = aktiv ? '' : 'aus';
    btn.innerHTML = (aktiv ? ICON_AN : ICON_AUS) + '<span>Sound ' + (aktiv ? 'an' : 'aus') + '</span>';
  }

  btn.onclick = function () {
    setzen(!an());
    zeichne();
  };

  function los() {
    document.body.appendChild(btn);
    zeichne();
  }
  if (document.body) los();
  else document.addEventListener('DOMContentLoaded', los);
})();
