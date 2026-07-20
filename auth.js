
(function () {
  const KA_URL = "https://dazabcxqplkvcyeiesgd.supabase.co";
  const KA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhemFiY3hxcGxrdmN5ZWllc2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTQ0NzksImV4cCI6MjA5NzQzMDQ3OX0.N3Dca8Quii4M8nFYLHjzBslby_tBUCyH1-WnPfYW01Y";
  const KA_EMAIL = "crew@klapsen.app";

  if (!window.supabase) { console.warn('auth.js: supabase-js fehlt auf dieser Seite'); return; }
  const client = window.supabase.createClient(KA_URL, KA_KEY);

  window.KA_SB = client;

  function zeigeLogin() {
    const css = document.createElement('style');
    css.textContent =
      '#ka-auth{position:fixed;inset:0;z-index:999999;background:#0a0f1e;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;}' +
      '#ka-auth .box{width:min(340px,90vw);text-align:center;}' +
      '#ka-auth h1{font-family:Anton,sans-serif;color:#eef1f8;letter-spacing:2px;font-size:2rem;margin:0 0 4px;}' +
      '#ka-auth h1 span{color:#ff4d4d;}' +
      '#ka-auth p{color:#8b96b3;font-size:0.85rem;margin:0 0 20px;}' +
      '#ka-auth input{width:100%;box-sizing:border-box;background:#111a30;border:1px solid #1e2a4a;color:#eef1f8;padding:13px 14px;border-radius:10px;font-size:16px;margin-bottom:10px;text-align:center;outline:none;}' +
      '#ka-auth input:focus{border-color:#ff4d4d;}' +
      '#ka-auth button{width:100%;background:#ff4d4d;border:none;color:#fff;padding:13px;border-radius:10px;font-size:15px;font-weight:700;letter-spacing:1px;cursor:pointer;}' +
      '#ka-auth button:disabled{opacity:0.6;}' +
      '#ka-auth .err{color:#ff4d4d;font-size:0.85rem;min-height:18px;margin-top:10px;}';
    document.head.appendChild(css);

    const div = document.createElement('div');
    div.id = 'ka-auth';
    div.innerHTML =
      '<div class="box">' +
        '<h1>KLAPSEN <span>APP</span></h1>' +
        '<p>Gruppenpasswort eingeben</p>' +
        '<input type="password" id="ka-auth-pw" placeholder="Passwort" autocomplete="current-password">' +
        '<button id="ka-auth-btn">FREISCHALTEN</button>' +
        '<div class="err" id="ka-auth-err"></div>' +
      '</div>';
    document.body.appendChild(div);

    const pw = document.getElementById('ka-auth-pw');
    const btn = document.getElementById('ka-auth-btn');
    const err = document.getElementById('ka-auth-err');

    async function login() {
      const val = pw.value;
      if (!val) return;
      btn.disabled = true; btn.textContent = 'PRÜFE...'; err.textContent = '';
      const { error } = await client.auth.signInWithPassword({ email: KA_EMAIL, password: val });
      if (error) {
        btn.disabled = false; btn.textContent = 'FREISCHALTEN';
        err.textContent = 'Falsches Passwort';
        pw.value = ''; pw.focus();
        return;
      }

      location.reload();
    }

    btn.addEventListener('click', login);
    pw.addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
    setTimeout(() => pw.focus(), 100);
  }

  async function pruefe() {
    const { data } = await client.auth.getSession();
    if (!data.session) zeigeLogin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pruefe);
  } else {
    pruefe();
  }
})();
