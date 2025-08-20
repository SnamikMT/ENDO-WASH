// <exchange-section
//   img="images/device.jpg"
//   amount="500 000 ₽"
//   title="Получите новую моечно‑дезинфицирующую установку ПРОФИ‑АУДЭ"
//   subtitle="в обмен на вашу моечную машину с выгодой до 500 000 руб."
// ></exchange-section>

const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,"Noto Sans","Liberation Sans",sans-serif;
      -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
      --fg:#0f172a; --muted:#475569; --border:#e5e7eb;
      --blue:#2563eb; --blue-700:#1d4ed8; --green:#16a34a; --indigo-50:#eef2ff;
      --radius:18px; --shadow:0 16px 40px rgba(2,6,23,.10);
      color:var(--fg);
    }

    section{
      padding:84px 0;
      background:
        radial-gradient(1000px 480px at 85% 10%, rgba(37,99,235,.10), transparent 60%),
        linear-gradient(180deg, var(--indigo-50) 0%, #ffffff 60%);
    }
    .container{ max-width:1200px; margin:0 auto; padding:0 16px; }
    .grid{ display:grid; gap:28px; align-items:center; grid-template-columns: 1.05fr .95fr; }
    @media (max-width: 1024px){ .grid{ grid-template-columns:1fr } }

    .eyebrow{
      display:inline-flex; align-items:center; gap:.5rem; padding:8px 12px;
      border-radius:999px; border:1px solid #bfdbfe; background:#dbeafe; color:#1e40af;
      font-weight:800; font-size:.9rem;
    }
    h2{
      margin:12px 0 8px; font-size:clamp(28px,3.6vw,52px);
      font-family:"Manrope","Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
      font-weight:800; letter-spacing:.2px; text-wrap:balance; text-transform: uppercase;
    }
    .lead{ color:#334155; font-weight:600; letter-spacing:.2px; }

    /* шаги инфографики */
    .steps{ display:grid; grid-template-columns: repeat(4, minmax(140px,1fr)); gap:12px; margin:18px 0 8px }
    @media (max-width: 860px){ .steps{ grid-template-columns: repeat(2,1fr) } }
    .step{
      position:relative; background:#fff; border:1px solid var(--border); border-radius:14px; padding:12px;
      box-shadow:0 10px 24px rgba(15,23,42,.06); display:flex; gap:10px; align-items:flex-start;
    }
    .step .n{
      flex:0 0 28px; height:28px; width:28px; border-radius:8px; display:grid; place-items:center;
      background:#eef2ff; color:#1d4ed8; font-weight:800; font-size:13px; border:1px solid #c7d2fe;
    }
    .step .t{ font-weight:800; font-family:"Manrope","Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif; letter-spacing:.2px }
    .hint{ color:var(--muted); font-size:13px; }

    /* бренды */
    .brands{
      display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;
    }
    .tag{
      display:inline-flex; align-items:center; gap:.5rem; padding:8px 12px; border-radius:999px;
      background:#f1f5f9; color:#0f172a; border:1px solid #e2e8f0; font-weight:800; font-size:.9rem;
    }

    .accept{
      display:flex; align-items:center; gap:.6rem; color:#14532d; font-weight:800;
      background:#ecfdf5; border:1px solid #bbf7d0; border-radius:12px; padding:10px 12px; margin-top:12px;
    }

    /* кнопка */
    .cta{ display:flex; gap:12px; flex-wrap:wrap; margin-top:18px }
    .btn{
      appearance:none; border:0; border-radius:14px; padding:18px 26px; font-weight:800; font-size:17px; letter-spacing:.2px;
      cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:.6rem;
      color:#fff; background:linear-gradient(180deg, var(--blue), var(--blue-700)); box-shadow:0 12px 28px rgba(37,99,235,.30);
      transition:.25s transform,.25s box-shadow;
    }
    .btn:hover{ transform: translateY(-2px); box-shadow:0 16px 36px rgba(37,99,235,.38) }

    /* правая карточка с фото */
    .photo{
      position:relative; border-radius:var(--radius); overflow:hidden; background:#f3f4f6; box-shadow:var(--shadow);
    }
    .photo img{ display:block; width:100%; height:480px; object-fit:cover }
    @media (max-width:1024px){ .photo img{ height:360px } }

    /* бейдж выгоды */
    .save{
      position:absolute; right:14px; top:14px;
      background:linear-gradient(180deg,#22c55e,#16a34a); color:#fff; border-radius:14px; padding:12px 14px;
      font-weight:900; font-size:18px; letter-spacing:.3px; box-shadow:0 12px 30px rgba(22,163,74,.35);
      display:flex; align-items:center; gap:.5rem;
    }
    .save small{ display:block; font-weight:700; font-size:12px; opacity:.9; line-height:1 }
    .save .val{ font-size:20px }

    /* подпись к фото */
    .caption{
      position:absolute; left:14px; bottom:14px;
      background:rgba(255,255,255,.92); color:#0f172a; border:1px solid var(--border); border-radius:12px; padding:10px 12px;
      font-weight:700; box-shadow:0 12px 28px rgba(15,23,42,.18);
    }

    /* --- FIX overflow для шагов --- */

/* Грид: умещаем столько колонок, сколько влезет, от 220px до 1fr */
.steps{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap:12px;
}

/* Карточка может сжиматься внутри грида */
.steps > *{ min-width: 0; }

/* Внутри карточки разрешим переносы + не даём контенту выталкивать блок */
.step{ min-width:0; }
.step .t, .step .hint{
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

/* На очень узких экранах раскладываем содержимое под номером */
@media (max-width: 420px){
  .step{
    display:grid;
    grid-template-columns: 28px 1fr; /* номер слева, текст справа */
    align-items:start;
  }
  .step .n{
    grid-row: 1 / span 2; /* номер рядом с заголовком и подсказкой */
  }
}

/* Если хочется ровно 2 колонки на средних ширинах */
@media (min-width: 861px) and (max-width: 1060px){
  .steps{ grid-template-columns: repeat(2, minmax(240px, 1fr)); }
}

  </style>

  <section id="exchange">
    <div class="container">
      <div class="grid">
        <!-- Левый столбец -->
        <div>
          <div class="eyebrow">Обмен/Trade‑in</div>
          <h2 data-title>Получите новую моечно‑дезинфицирующую установку ПРОФИ‑АУДЭ</h2>
          <p class="lead" data-subtitle>в обмен на вашу моечную машину с выгодой до 500 000 руб.</p>

          <!-- Инфографика шагов -->
          <div class="steps" aria-label="Этапы обмена">
            <div class="step"><div class="n">1</div><div><div class="t">Заявка</div><div class="hint">Оставьте контакты — перезвоним</div></div></div>
            <div class="step"><div class="n">2</div><div><div class="t">Оценка</div><div class="hint">Проверяем вашу установку</div></div></div>
            <div class="step"><div class="n">3</div><div><div class="t">Зачёт стоимости</div><div class="hint">Определяем размер выгоды</div></div></div>
            <div class="step"><div class="n">4</div><div><div class="t">Поставка ПРОФИ‑АУДЭ</div><div class="hint">Монтаж и запуск</div></div></div>
          </div>

          <!-- Бренды -->
          <div class="brands" aria-label="Принимаемые бренды">
            <span class="tag">Bandeq</span>
            <span class="tag">Olympus</span>
            <span class="tag">DETRO WASH AER</span>
            <span class="tag">M‑TECHNOLOGY</span>
            <span class="tag">Medivators</span>
            <span class="tag">DGM</span>
            <span class="tag">APEX</span>
          </div>

          <div class="accept">Принимаем моечные машины всех производителей</div>

          <!-- CTA -->
          <div class="cta">
            <a class="btn" href="#tradein-form">Заявка на обмен</a>
          </div>
        </div>

        <!-- Правый столбец -->
        <div class="photo">
          <img data-img alt="ПРОФИ‑АУДЭ — моечно‑дезинфицирующая установка" />
          <div class="save">
            <small>Выгода до</small>
            <span class="val" data-amount>500 000 ₽</span>
          </div>
          <div class="caption">Новая ПРОФИ‑АУДЭ</div>
        </div>
      </div>
    </div>
  </section>
`

class ExchangeSection extends HTMLElement{
  constructor(){ super(); this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true)) }
  static get observedAttributes(){ return ['img','amount','title','subtitle'] }
  connectedCallback(){ this._apply() }
  attributeChangedCallback(){ this._apply() }

  _apply(){
    const $ = (s)=> this.shadowRoot.querySelector(s)
    // тексты
    if (this.hasAttribute('title'))    $('[data-title]').textContent = this.getAttribute('title')
    if (this.hasAttribute('subtitle')) $('[data-subtitle]').textContent = this.getAttribute('subtitle')
    if (this.hasAttribute('amount'))   $('[data-amount]').textContent = this.getAttribute('amount')

    // картинка
    const imgEl = $('[data-img]')
    const src = this.getAttribute('img') || 'images/device-tradein.jpg'
    imgEl.src = src
    imgEl.loading = 'lazy'
    imgEl.decoding = 'async'
  }
}
customElements.define('exchange-section', ExchangeSection)
