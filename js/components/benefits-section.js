// <benefits-section
//   title="Ключевые преимущества"
//   lead="Автоматическая обработка двух эндоскопов..."
//   email="sales@aude.ru"
//   pricehref="/assets/files/price.pdf"
//   cols="2"     // 2 или 1 — сколько колонок у списка на десктопе
// ></benefits-section>

const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
      --c-fg:#0f172a; --c-muted:#475569; --c-border:#e5e7eb;
      --c-blue:#2563eb; --c-blue-700:#1d4ed8; --c-green:#16a34a;
      --radius:16px; --shadow:0 12px 38px rgba(2,6,23,.08);
    }

    /* теперь секция яркая */
    section{ 
      padding:84px 0; 
      background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
      color:#fff;
      position:relative;
      overflow:hidden;
    }

    /* декоративные круги */
    section::before, section::after{
      content:"";
      position:absolute;
      border-radius:50%;
      background:rgba(255,255,255,.08);
      z-index:0;
    }
    section::before{ width:280px; height:280px; top:-100px; left:-80px; }
    section::after{ width:360px; height:360px; bottom:-120px; right:-100px; }

    .container{ max-width:1200px; margin:0 auto; padding:0 16px; position:relative; z-index:1; }

    .eyebrow{
      display:inline-flex; align-items:center; gap:.5rem; padding:8px 14px;
      border-radius:999px; background:rgba(255,255,255,.12); color:#fff;
      font-family:"Manrope", "Inter", sans-serif; font-weight:800; font-size:.9rem;
    }
    h2{
      margin:12px 0 8px; font-size:clamp(26px,3.5vw,52px); color:#fff;
      font-family:"Manrope", "Inter", sans-serif; font-weight:800; letter-spacing:.2px;
      text-wrap:balance; text-transform: uppercase;
    }
    .lead{ color:rgba(255,255,255,.85); max-width:820px; margin:0 auto 24px; text-align:center; letter-spacing:.2px }

    .grid{ display:grid; gap:24px; grid-template-columns: 2fr 1fr; align-items:start; margin-top:28px }
    @media (max-width:992px){ .grid{ grid-template-columns:1fr } }

    /* список преимуществ */
    .list{
      background:#fff; border-radius:var(--radius); box-shadow: var(--shadow);
      padding:24px;
    }
    .list-grid{ display:grid; gap:12px }
    @media (min-width: 992px){
      .list-grid.cols-2{ grid-template-columns: 1fr 1fr }
      .list-grid.cols-1{ grid-template-columns: 1fr }
    }

    .item{
      display:flex; align-items:flex-start; gap:10px;
      padding:12px 8px; border-bottom:1px dashed #e5e7eb;
    }
    .item:last-child{ border-bottom:0 }
    .ico{
      flex:0 0 24px; height:24px; width:24px; border-radius:6px;
      display:grid; place-items:center;
      background:#ecfdf5; border:1px solid #bbf7d0; color:#16a34a;
      font-size:14px; line-height:1;
      box-shadow:0 0 10px rgba(22,163,74,.35);
    }
    .txt{
      color:var(--c-fg); font-weight:700; line-height:1.35;
      font-family:"Manrope", "Inter", sans-serif; letter-spacing:.2px
    }

    /* карточка CTA */
    .cta{
      background:#fff; color:var(--c-fg);
      border-radius:20px; box-shadow: var(--shadow);
      padding:26px; position:sticky; top:90px
    }
    .cta h3{ margin:0 0 8px; font-size:20px; font-weight:800; }
    .cta p{ margin:0 0 18px; color:var(--c-muted) }

    .btn{
      display:inline-flex; align-items:center; justify-content:center; gap:.6rem;
      width:100%; padding:18px 22px; border-radius:14px; border:0; cursor:pointer;
      background:linear-gradient(180deg, var(--c-blue), var(--c-blue-700)); color:#fff;
      font-family:"Manrope", sans-serif; font-weight:800; font-size:16.5px;
      box-shadow:0 10px 28px rgba(37,99,235,.38); transition:.25s transform, .25s box-shadow;
      text-decoration:none; letter-spacing:.2px;
    }
    .btn:hover{ transform: translateY(-2px); box-shadow:0 14px 36px rgba(37,99,235,.48) }

    .mini{ display:flex; align-items:center; gap:8px; margin-top:12px; color:var(--c-fg); font-weight:600 }
    .badge{ display:inline-flex; align-items:center; gap:.4rem; padding:.35rem .6rem; border-radius:999px;
      background:#ecfdf5; color:#166534; border:1px solid #bbf7d0; font-size:.85rem; font-weight:800 }

    @media (max-width: 992px){
      .cta{ position: static; top:auto; }
    }

    /* делаем кнопку адаптивной */
    .btn{
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
      white-space: normal;           /* разрешаем перенос строк */
      overflow-wrap: anywhere;       /* переносим длинные слова */
      word-break: break-word;
    }

    /* на очень узких экранах чуть уменьшим размер */
    @media (max-width: 420px){
      .btn{ padding:16px 18px; font-size:15.5px; }
    }

    /* sticky иногда даёт визуальные артефакты на мобиле — отключим */
    @media (max-width: 992px){
      .cta{ position: static; top: auto; }
    }
  </style>

  <section id="benefits" part="section">
    <div class="container">
      <div class="center" style="text-align:center">
        <div class="eyebrow">Ключевые преимущества</div>
        <h2 data-title>Эффективность, совместимость и документирование процесса</h2>
        <p class="lead" data-lead>Автоматическая обработка двух эндоскопов, принтер отчётов, ДВУ, ручной/автоматический режимы и поддержка дезсредств ведущих производителей.</p>
      </div>

      <div class="grid">
        <!-- Список преимуществ -->
        <div class="list">
          <div class="list-grid cols-2" data-list>
            <div class="item"><div class="ico">✔</div><div class="txt">Обработка одновременно двух эндоскопов в автоматическом режиме</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Принтер для документирования процесса дезинфекции</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Полная совместимость с гибкими эндоскопами ведущих производителей</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Ручной и автоматический режим работы</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Дезинфекция высокого уровня (ДВУ)</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Можно использовать дезсредства ведущих производителей</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Процесс предварительной очистки</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Тест на герметичность эндоскопа</div></div>
            <div class="item"><div class="ico">✔</div><div class="txt">Самодезинфекция</div></div>
          </div>
        </div>

        <!-- CTA карточка -->
        <aside class="cta">
          <h3>Получить прайс-лист</h3>
          <p>Оставьте заявку — пришлём актуальные цены и поможем подобрать комплектацию.</p>
          <a class="btn" data-price>Скачать / получить прайс-лист</a>
          <div class="mini"><span class="badge">PDF / XLS</span><span>• Обновляется регулярно</span></div>
        </aside>
      </div>
    </div>
  </section>
`


class BenefitsSection extends HTMLElement{
  constructor(){ super(); this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true)) }
  static get observedAttributes(){ return ['title','lead','email','pricehref','cols'] }
  connectedCallback(){ this._apply() }
  attributeChangedCallback(){ this._apply() }

  _apply(){
    const $ = (s)=> this.shadowRoot.querySelector(s)

    // Заголовки/описание
    if (this.hasAttribute('title')) $('[data-title]').textContent = this.getAttribute('title')
    if (this.hasAttribute('lead'))  $('[data-lead]').textContent  = this.getAttribute('lead')

    // Колонки списка
    const grid = $('[data-list]')
    const cols = (this.getAttribute('cols') || '2').trim()
    grid.classList.toggle('cols-2', cols === '2')
    grid.classList.toggle('cols-1', cols === '1')

    // Кнопка прайса
    const btn = this.shadowRoot.querySelector('[data-price]')
    const email = this.getAttribute('email') || 'info@aude.ru'
    const priceHref = this.getAttribute('pricehref')

    if (priceHref){
      btn.setAttribute('href', priceHref)
      btn.setAttribute('download', '')
      btn.textContent = 'Скачать прайс‑лист (PDF / XLS)'
    } else {
      const subject = encodeURIComponent('Запрос прайс‑листа — ПРОФИ‑АУДЭ')
      const body = encodeURIComponent('Здравствуйте!\nПрошу выслать актуальный прайс‑лист и спецификацию.\n\nКомпания:\nКонтактное лицо:\nТелефон:\n')
      btn.setAttribute('href', `mailto:${email}?subject=${subject}&body=${body}`)
      btn.removeAttribute('download')
      btn.textContent = 'Получить прайс‑лист'
    }
  }
}
customElements.define('benefits-section', BenefitsSection)
