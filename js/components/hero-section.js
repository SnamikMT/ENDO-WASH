// hero-section.js
const tpl = document.createElement('template')
tpl.innerHTML = `
  <style>
    :host{
      display:block;
      --fg:#0f172a; --muted:#475569; --border:#e5e7eb;
      --blue:#2563eb; --blue-700:#1d4ed8; --green:#22c55e;
      --indigo-100:#e0e7ff; --indigo-200:#c7d2fe;
      --radius:18px; --shadow:0 18px 48px rgba(2,6,23,.14);
      font-family: 'Segoe UI', 'Inter', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    .hero{
      position:relative;
      padding: clamp(64px,8vw,96px) 0;
      background:
        radial-gradient(1200px 600px at 80% -10%, rgba(37,99,235,.08), transparent 60%),
        linear-gradient(180deg, #eef2ff 0%, #ffffff 55%);
      overflow:hidden;
      isolation:isolate;
    }

    .container{ 
      max-width:1200px; 
      margin:0 auto; 
      padding-inline: clamp(12px, 4vw, 24px);
    }

    .grid{ 
      display:grid; 
      gap:48px; 
      align-items:center; 
      grid-template-columns: 1.05fr .95fr; 
    }
    @media (max-width:1024px){
      .grid{ grid-template-columns:1fr; gap:36px; }
    }

    /* типографика */
    .badge{
      display:inline-flex; align-items:center; gap:.5rem; font-weight:800;
      padding:8px 12px; border-radius:999px; border:1px solid #bbf7d0;
      background:#ecfdf5; color:#166534;
      box-shadow: 0 6px 22px rgba(22,163,74,.12);
      white-space:nowrap;
    }
    h1{
      margin:16px 0 10px;
      font-size:clamp(32px,5vw,47px);
      line-height:1.12;
      color:var(--fg);
      letter-spacing:.6px;
      text-transform: uppercase; /* 👈 caps */
      word-break: break-word;
    }
    .sub{
      font-size:clamp(22px,3.2vw,28px);
      font-weight:900;
      color:var(--fg);
      margin:0 0 10px;
    }
    .lead{
      color:var(--muted);
      font-size:18px;
      line-height:1.65;
    }

    /* факты */
    .facts{ 
      display:grid; 
      grid-template-columns:repeat(3,1fr); 
      gap:16px; 
      margin-top:24px; 
    }
    .fact{
      text-align:center; background:#fff;
      border:1px solid var(--border); border-radius:14px; padding:14px;
      box-shadow: var(--shadow);
    }
    .num{ font-size:22px; font-weight:900 }
    .num.blue{ color:var(--blue) } .num.green{ color:var(--green) }
    .mut{ color:#64748b; font-size:14px }

    /* CTA */
    .cta{ display:flex; gap:14px; flex-wrap:wrap; margin-top:28px }
    .btn{
      appearance:none; border:0; border-radius:14px;
      padding:18px 28px; font-weight:800; font-size:18px;
      cursor:pointer; text-decoration:none;
      display:inline-flex; align-items:center; justify-content:center; gap:.6rem;
      transition:.25s transform,.25s box-shadow;
      position:relative; overflow:hidden;
      touch-action:manipulation;
      min-height:52px;
    }
    .btn-primary{
      background:linear-gradient(180deg, var(--blue), var(--blue-700));
      color:#fff;
      box-shadow:0 10px 28px rgba(37,99,235,.32)
    }
    .btn-primary:hover{ transform:translateY(-2px); box-shadow:0 14px 36px rgba(37,99,235,.40) }
    @media (prefers-reduced-motion: reduce){
      .btn{ transition:none }
      .btn-primary:hover{ transform:none }
    }

    /* блок изображения */
    .image{ position:relative; }
    .image img{ display:block; width:100%; height:440px; object-fit:cover; border-radius:16px; }
    @media (max-width:1024px){ .image img{ height:320px } }

    .badge-float{
      position:absolute; display:flex; align-items:center; gap:8px;
      background: rgba(255,255,255,.92);
      border:1px solid var(--border);
      border-radius:12px; padding:10px 12px;
      font-weight:700; box-shadow: var(--shadow);
      backdrop-filter: blur(6px);
    }
    .bf-1{ top:12px; left:12px }
    .bf-2{ bottom:12px; right:12px }

    /* ====== МОБИЛЬНАЯ АДАПТАЦИЯ ====== */
    @media (max-width:640px){
      .hero{ padding:48px 0 56px; }
      .grid{ gap:28px; }
      .badge{ font-size:12px; padding:6px 10px; }
      h1{ font-size: clamp(24px, 9vw, 30px); letter-spacing:.3px; }
      .sub{ font-size: clamp(16px, 6vw, 20px); }
      .lead{ font-size:15px; line-height:1.6; }

      .facts{
        grid-template-columns:1fr;
        gap:10px;
        margin-top:18px;
      }
      .fact{
        display:flex; align-items:center; gap:10px; text-align:left; padding:12px;
      }
      .num{ font-size:18px; }
      .mut{ font-size:13px; }

      .cta{ gap:10px; margin-top:22px; }
      .btn{ width:100%; padding:16px 18px; font-size:16px; border-radius:12px; min-height:48px; }

      .image img{ height:240px; border-radius:14px; }
      .badge-float{ padding:8px 10px; font-size:13px; }
      .bf-1{ top:8px; left:8px }
      .bf-2{ bottom:8px; right:8px }

      /* чтобы бейджи не загромождали экран на узких */
      @media (max-width:480px){
        .bf-2{ display:none; }
      }
    }
  </style>

  <section id="home" class="hero">
    <div class="container">
      <div class="grid">
        <!-- Левый столбец -->
        <div>
          <div class="badge" data-badge>🇷🇺 Сделано в России!</div>
          <h1 data-title>АВТОМАТИЧЕСКАЯ УСТАНОВКА ДЛЯ ДЕЗИНФЕКЦИИ ГИБКИХ ЭНДОСКОПОВ И ДВУ</h1>
          <div class="sub" data-sub>ПРОФИ-АУДЭ</div>
          <p class="lead" data-lead>
            Единовременная обработка двух эндоскопов, совместимость с гибкими эндоскопами ведущих производителей и документирование процесса.
          </p>

          <div class="facts">
            <div class="fact"><div class="num blue">2</div><div class="mut">Эндоскопа одновременно</div></div>
            <div class="fact"><div class="num green">ДВУ</div><div class="mut">Дезинфекция высокого уровня</div></div>
            <div class="fact"><div class="num blue">Принтер</div><div class="mut">Документирование цикла</div></div>
          </div>

          <div class="cta">
            <a class="btn btn-primary" data-cta href="#consult">ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ</a>
          </div>
        </div>

        <!-- Правый столбец -->
        <div class="image">
          <img alt="ПРОФИ-АУДЭ — автоматическая установка" data-image>
          <div class="badge-float bf-1">🏅 Класс мед. изделия</div>
          <div class="badge-float bf-2">🧪 ДВУ / совместимость</div>
        </div>
      </div>
    </div>
  </section>
`

class HeroSection extends HTMLElement{
  constructor(){
    super()
    this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true))
  }
  static get observedAttributes(){ 
    return ['img','badge','title','subtitle','lead','cta-text','cta-href'] 
  }
  connectedCallback(){ this._apply() }
  attributeChangedCallback(){ this._apply() }

  _apply(){
    const $ = (sel)=> this.shadowRoot.querySelector(sel)

    if (this.hasAttribute('badge'))     $('[data-badge]').innerHTML = this.getAttribute('badge')
    if (this.hasAttribute('title'))     $('[data-title]').innerHTML = this.getAttribute('title')
    if (this.hasAttribute('subtitle'))  $('[data-sub]').textContent = this.getAttribute('subtitle')
    if (this.hasAttribute('lead'))      $('[data-lead]').textContent = this.getAttribute('lead')

    const cta = $('[data-cta]')
    if (this.hasAttribute('cta-text'))  cta.textContent = this.getAttribute('cta-text').toUpperCase()
    if (this.hasAttribute('cta-href'))  cta.setAttribute('href', this.getAttribute('cta-href'))

    const imgEl = $('[data-image]')
    const src = this.getAttribute('img') || 'images/hero.png'
    this._setImg(imgEl, src)
  }

  _setImg(imgEl, src){
    imgEl.src = src
    imgEl.loading = 'lazy'
    imgEl.decoding = 'async'
  }
}

customElements.define('hero-section', HeroSection)
