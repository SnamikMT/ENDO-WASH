// js/components/site-footer.js
// <site-footer
//   brand="ENDO and WASH"
//   logo="images/logo.png"
//   phone="+7 (812) 123-45-67"
//   phonehref="+78121234567"
//   email="info@aude.ru"
//   address="Санкт‑Петербург, ул. Примерная, 1"
// ></site-footer>

const tpl = document.createElement('template');
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
      color:#e5e7eb;
      --bg1:#0b1220; --bg2:#0f172a;
      --border:#1f2937; --muted:#9ca3af; --link:#93c5fd; --accent:#22c55e;
      --radius:16px;
    }
    footer{
      background:
        radial-gradient(1000px 600px at 90% -10%, rgba(59,130,246,.20), transparent 60%),
        linear-gradient(180deg, var(--bg1) 0%, var(--bg2) 100%);
      border-top:1px solid var(--border);
      margin-top:64px;
      color:#e5e7eb;
    }

    /* Top CTA strip */
    .top-cta{
      display:flex; gap:12px; align-items:center; justify-content:center;
      padding:18px 12px;
      background:linear-gradient(90deg, rgba(59,130,246,.18), rgba(34,197,94,.18));
      border-bottom:1px solid var(--border);
      text-align:center;
      flex-wrap:wrap;
    }
    .top-cta strong{ font-weight:800 }
    .btn{
      appearance:none; border:0; border-radius:12px; padding:12px 18px;
      font-weight:800; color:#0b1220; background:#fff; cursor:pointer;
      text-decoration:none; display:inline-flex; align-items:center; gap:.6rem;
      transition:.2s transform, .2s box-shadow;
      box-shadow:0 10px 22px rgba(255,255,255,.08);
    }
    .btn:hover{ transform:translateY(-1px); box-shadow:0 14px 28px rgba(255,255,255,.12) }

    /* Main grid */
    .container{ max-width:1200px; margin:0 auto; padding:36px 16px 22px }
    .grid{
      display:grid; gap:28px;
      grid-template-columns: 1.1fr .9fr .9fr;
    }
    @media (max-width: 980px){ .grid{ grid-template-columns:1fr 1fr } }
    @media (max-width: 640px){ .grid{ grid-template-columns:1fr } }

    /* Brand column */
    .brand{
      display:grid; gap:14px; align-content:start;
    }
    .logo{
      display:flex; align-items:center; gap:12px;
    }
    .logo img{ width:140px; object-fit:contain; border-radius:10px; background:#111827 }
    .logo .name{ font-weight:900; font-family:"Manrope","Inter",system-ui; font-size:1.2rem; letter-spacing:.3px }
    .desc{ color:var(--muted); line-height:1.6 }
    .badges{ display:flex; gap:8px; flex-wrap:wrap }
    .badge{
      display:inline-flex; align-items:center; gap:.4rem; padding:.35rem .6rem; border-radius:999px;
      border:1px solid #334155; color:#e2e8f0; background:#0b1220; font-weight:800; font-size:.85rem;
    }

    /* Menu */
    .menu h4, .contacts h4{ font-weight:800; letter-spacing:.3px; margin:0 0 10px; color:#f1f5f9 }
    .links{ display:grid; gap:8px }
    .links a{
      color:var(--link); text-decoration:none; font-weight:700;
      display:inline-flex; align-items:center; gap:.5rem;
    }
    .links a:hover{ text-decoration:underline }
    .links small{ color:var(--muted); font-weight:600 }

    /* Contacts */
    .list{ display:grid; gap:10px }
    .row{
      display:grid; grid-template-columns: 24px 1fr; gap:10px; align-items:start;
      padding:10px; border:1px solid var(--border); border-radius:12px; background:rgba(17,24,39,.6)
    }
    .row a{ color:#fff; text-decoration:none; font-weight:800 }
    .row a:hover{ text-decoration:underline }
    .mut{ color:var(--muted) }

    /* Bottom */
    .bottom{
      margin-top:22px; padding:18px 16px; border-top:1px solid var(--border);
      display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;
      font-size:.92rem; color:#cbd5e1;
    }
    .legal{ display:flex; gap:14px; flex-wrap:wrap }
    .legal a{ color:#cbd5e1; text-decoration:none }
    .legal a:hover{ text-decoration:underline }

    /* Back to top */
    .toplink{
      display:inline-flex; align-items:center; gap:.4rem; color:#93c5fd; text-decoration:none; font-weight:800;
    }
    .toplink:hover{ text-decoration:underline }
  </style>

  <footer part="footer">
    <div class="top-cta">
      <div><strong>Нужна консультация?</strong> Оставьте заявку — ответим в течение ~15 минут.</div>
      <a class="btn" href="#qa">Задать вопрос</a>
    </div>

    <div class="container">
      <div class="grid">
        <!-- Brand -->
        <section class="brand">
          <div class="logo">
            <img data-logo alt="">

          </div>
          <p class="desc">Качественная дезинфекция эндоскопов. Автоматические установки, режимы ДВУ, документация циклов и сервисная поддержка.</p>
          <div class="badges">
            <span class="badge">🇷🇺 Сделано в России</span>
            <span class="badge">ДВУ</span>
            <span class="badge">Совместимость</span>
          </div>
          <div class="links">
            <a href="#home">← На главную</a>
          </div>
        </section>

        <!-- Menu -->
        <nav class="menu" aria-label="Нижнее меню">
          <h4>Разделы</h4>
          <div class="links">
            <a href="#benefits">Ключевые преимущества</a>
            <a href="#modes">Режимы работы</a>
            <a href="#specs">Технические характеристики</a>
            <a href="#exchange">Обмен на вашу мойку <small>(trade‑in)</small></a>
            <a href="#qa">Вопросы и консультация</a>
            <a href="#contacts">Контакты</a>
          </div>
        </nav>

        <!-- Contacts -->
        <section class="contacts">
          <h4>Контакты</h4>
          <div class="list">
            <div class="row">
              <span>📞</span>
              <div><a data-phonehref><span data-phone>+7 (812) 123‑45‑67</span></a><div class="mut">Телефон</div></div>
            </div>
            <div class="row">
              <span>✉️</span>
              <div><a data-emailhref><span data-email>info@aude.ru</span></a><div class="mut">Почта</div></div>
            </div>
            <div class="row">
              <span>📍</span>
              <div><span data-address>Санкт‑Петербург, ул. Примерная, 1</span><div class="mut">Адрес офиса</div></div>
            </div>
            <div class="row">
              <span>🕘</span>
              <div><span>Пн‑Пт 09:00–18:00</span><div class="mut">График</div></div>
            </div>
          </div>
        </section>
      </div>

      <div class="bottom">
        <div>© <span id="y"></span> <span data-brand>ENDO and WASH</span>. Все права защищены.</div>
        <div class="legal">
          <a href="#" onclick="return false">Политика конфиденциальности</a>
          <a href="#" onclick="return false">Пользовательское соглашение</a>
        </div>
        <a href="#top" class="toplink" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">Наверх ↑</a>
      </div>
    </div>
  </footer>
`;

class SiteFooter extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true));
  }
  static get observedAttributes(){ return ['brand','logo','phone','phonehref','email','address'] }
  connectedCallback(){ this._apply(); this.shadowRoot.getElementById('y').textContent = new Date().getFullYear() }
  attributeChangedCallback(){ this._apply() }

  $(s){ return this.shadowRoot.querySelector(s) }
  _apply(){
    const brand     = this.getAttribute('brand')     || 'ENDO and WASH';
    const logo      = this.getAttribute('logo')      || 'images/logo.png';
    const phone     = this.getAttribute('phone')     || '+7 (812) 123‑45‑67';
    const phonehref = this.getAttribute('phonehref') || '+78121234567';
    const email     = this.getAttribute('email')     || 'info@aude.ru';
    const address   = this.getAttribute('address')   || 'Санкт‑Петербург, ул. Примерная, 1';

    this.$('[data-brand]').textContent = brand;
    this.$('[data-logo]').src = logo;
    this.$('[data-logo]').alt = brand;

    this.$('[data-phone]').textContent = phone;
    this.$('[data-phonehref]').setAttribute('href', `tel:${phonehref}`);

    this.$('[data-email]').textContent = email;
    this.$('[data-emailhref]').setAttribute('href', `mailto:${email}`);

    this.$('[data-address]').textContent = address;
  }
}
customElements.define('site-footer', SiteFooter);
