// js/components/contacts-section.js
// <contacts-section
//   phone="+7 (912) 123-45-67"
//   phonehref="+79121234567"
//   email="info@aude.ru"
//   address="Москва, ул. Красная, д. 51"
//   lat="55.587173"
//   lon="38.263677"
//   maphref="https://yandex.ru/maps/-/CHxunJ9I"
// ></contacts-section>

const tpl = document.createElement('template');
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
      color:#0f172a;
      --fg:#0f172a; --muted:#475569; --border:#e5e7eb; --soft:#f8fafc;
      --blue:#2563eb; --blue-700:#1d4ed8; --green:#16a34a; --indigo:#1e40af;
      --radius:18px; --shadow:0 16px 40px rgba(2,6,23,.10);
    }
    section{
      padding:88px 0;
      background:
        radial-gradient(1000px 480px at 90% -10%, rgba(37,99,235,.10), transparent 60%),
        linear-gradient(180deg, #f9fafb 0%, #fff 65%);
    }
    .container{
      max-width:1200px; margin:0 auto; padding:0 16px;
      display:grid; gap:28px;
      grid-template-columns: 1.05fr .95fr;
    }
    @media (max-width: 1000px){ .container{ grid-template-columns:1fr } }

    /* Заголовок */
    h2{
      margin:0 0 14px;
      font-size:clamp(28px,3.2vw,52px);
      font-weight:800; font-family:"Manrope","Inter",system-ui;
      letter-spacing:.2px;
      text-transform: uppercase;
    }
    .lead{ color:#334155; font-weight:600; margin:0 0 14px }

    /* Левая колонка */
    .panel{
      display:grid; gap:16px; align-content:start;
    }
    .phoneCard{
      display:grid; gap:12px;
      border:1px solid var(--border); border-radius:var(--radius);
      background:linear-gradient(180deg,#fff,#f8fafc);
      padding:20px;
      box-shadow:var(--shadow);
    }
    .bigphone{
      font-weight:900; font-size:clamp(22px,3.2vw,30px);
      letter-spacing:.3px;
    }
    .actions{ display:flex; flex-wrap:wrap; gap:10px }
    .btn{
      appearance:none; border:0; border-radius:14px; padding:14px 18px; font-weight:800;
      display:inline-flex; align-items:center; gap:.6rem; cursor:pointer;
      background:linear-gradient(180deg,var(--blue),var(--blue-700)); color:#fff;
      box-shadow:0 12px 28px rgba(37,99,235,.28);
      transition:.2s transform,.2s box-shadow;
      text-decoration:none;
    }
    .btn:hover{ transform:translateY(-1px); box-shadow:0 16px 36px rgba(37,99,235,.36) }
    .btn.secondary{
      background:#fff; color:#0f172a; border:1px solid var(--border);
      box-shadow:0 8px 20px rgba(2,6,23,.06);
    }

    .gridInfo{ display:grid; gap:10px }
    .item{
      display:grid; grid-template-columns: 32px 1fr; gap:10px; align-items:start;
      background:#fff; border:1px solid var(--border); border-radius:14px; padding:12px 14px;
      box-shadow:0 10px 24px rgba(2,6,23,.06);
    }
    .ico{ font-size:18px }
    .lbl{ font-weight:800; color:#0f172a }
    .val{ color:#334155; font-weight:600 }
    .link{ color:#2563eb; text-decoration:none; font-weight:700 }
    .link:hover{ text-decoration:underline }
    .badge{
      display:inline-flex; align-items:center; gap:.4rem; padding:.35rem .6rem; border-radius:999px;
      background:#ecfdf5; color:#166534; border:1px solid #bbf7d0; font-weight:800; font-size:.85rem;
      width:max-content; margin-top:2px;
    }

    /* Правая колонка: карта */
    .mapWrap{
      position:relative; border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow);
      background:#eef2ff; min-height:420px; border:1px solid var(--border);
    }
    .mapWrap iframe{ position:absolute; inset:0; width:100%; height:100%; border:0 }
    .mapTop{
      position:absolute; left:12px; top:12px;
      background:rgba(255,255,255,.96); border:1px solid var(--border); border-radius:12px;
      padding:10px 12px; font-weight:800; color:#0f172a; box-shadow:0 10px 22px rgba(0,0,0,.08);
    }
    .mapBtns{
      position:absolute; right:12px; bottom:12px; display:flex; gap:8px; flex-wrap:wrap;
    }
    .btnGhost{
      appearance:none; border-radius:12px; padding:10px 12px; font-weight:800; cursor:pointer;
      background:rgba(255,255,255,.96); border:1px solid var(--border); color:#0f172a;
      text-decoration:none; display:inline-flex; align-items:center; gap:.5rem;
      box-shadow:0 8px 18px rgba(0,0,0,.08);
    }
    .btnGhost:hover{ background:#fff }

  </style>

  <section id="contacts">
    <div class="container">
      <!-- Левая панель -->
      <div class="panel">
        <div>
          <h2>Контакты</h2>
          <p class="lead">Мы на связи: ответим на вопросы, поможем с подбором и логистикой.</p>
        </div>

        <div class="phoneCard">
          <div class="lbl">Телефон</div>
          <div class="bigphone" data-phone>+7 (912) 123-45-67</div>
          <div class="actions">
            <a class="btn" data-call href="#">Позвонить</a>
            <button class="btn secondary" type="button" data-copy>Скопировать номер</button>
          </div>
          <span class="badge">Среднее время ответа ~ 15 мин</span>
        </div>

        <div class="gridInfo">
          <div class="item">
            <div class="ico">✉️</div>
            <div>
              <div class="lbl">Почта</div>
              <div class="val"><a class="link" data-email href="#">info@aude.ru</a></div>
            </div>
          </div>
          <div class="item">
            <div class="ico">📍</div>
            <div>
              <div class="lbl">Адрес</div>
              <div class="val" data-address>Москва, ул. Красная, д. 51</div>
            </div>
          </div>
          <div class="item">
            <div class="ico">🕘</div>
            <div>
              <div class="lbl">График</div>
              <div class="val">Пн‑Пт 09:00–18:00</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая карта -->
      <div class="mapWrap">
        <div class="mapTop">Мы здесь</div>
        <iframe data-map loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        <div class="mapBtns">
          <a class="btnGhost" data-route target="_blank" rel="noopener">Маршрут в Яндекс.Картах</a>
          <a class="btnGhost" data-open target="_blank" rel="noopener">Открыть карту</a>
        </div>
      </div>
    </div>
  </section>
`;

class ContactsSection extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true));
  }
  static get observedAttributes(){
    return ['phone','phonehref','email','address','lat','lon','maphref']
  }
  connectedCallback(){ this._apply(); this._bind(); }
  attributeChangedCallback(){ this._apply(); }

  $(s){ return this.shadowRoot.querySelector(s) }

  _apply(){
    const phone     = this.getAttribute('phone')     || '+7 (912) 123-45-67';
    const phoneHref = this.getAttribute('phonehref') || '+79121234567';
    const email     = this.getAttribute('email')     || 'info@aude.ru';
    const address   = this.getAttribute('address')   || 'Москва, ул. Красная, д. 51';
    const lat       = parseFloat(this.getAttribute('lat') || '55.587173');
    const lon       = parseFloat(this.getAttribute('lon') || '38.263677');
    const mapHref   = this.getAttribute('maphref')   || `https://yandex.ru/maps/?ll=${lon}%2C${lat}&z=14&pt=${lon},${lat},pm2blm`;

    // Тексты/ссылки
    this.$('[data-phone]').textContent = phone;
    this.$('[data-call]').setAttribute('href', `tel:${phoneHref}`);
    this.$('[data-email]').textContent = email;
    this.$('[data-email]').setAttribute('href', `mailto:${email}`);
    this.$('[data-address]').textContent = address;

    // iframe Яндекс.Карт с центром и меткой
    // формат: ll=lon,lat  pt=lon,lat,pm2blm  z=zoom
    const src = `https://yandex.ru/map-widget/v1/?ll=${encodeURIComponent(lon+','+lat)}&z=14&pt=${encodeURIComponent(lon+','+lat+',pm2blm')}`;
    this.$('[data-map]').setAttribute('src', src);

    // Кнопки под картой
    this.$('[data-open]').setAttribute('href', `https://yandex.ru/maps/?ll=${lon}%2C${lat}&z=14`);
    this.$('[data-route]').setAttribute('href', `https://yandex.ru/maps/?rtext=~${lat},${lon}`);
  }

  _bind(){
    const copyBtn = this.$('[data-copy]');
    copyBtn.addEventListener('click', async ()=>{
      const txt = this.$('[data-phone]').textContent.trim();
      try {
        await navigator.clipboard.writeText(txt);
        copyBtn.textContent = 'Скопировано ✓';
        setTimeout(()=> copyBtn.textContent = 'Скопировать номер', 1500);
      } catch {
        copyBtn.textContent = 'Не удалось :(';
        setTimeout(()=> copyBtn.textContent = 'Скопировать номер', 1500);
      }
    });
  }
}

customElements.define('contacts-section', ContactsSection);
